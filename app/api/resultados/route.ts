import { NextResponse } from "next/server";
import { JURY_CRITERIA } from "@/lib/jury";
import {
  airtableUrl,
  demoDayConfig,
  evaluationsConfig,
} from "@/lib/jury-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Resultados públicos del Demo Day: ranking de todos los proyectos con el
 * promedio final, el desglose por criterio y los comentarios del jurado
 * (anónimos). Se abre solo cuando RESULTS_OPEN === "true" para no revelar
 * resultados parciales mientras el jurado aún califica.
 */

type AirtableRecord = { id: string; fields: Record<string, unknown> };

function str(fields: Record<string, unknown>, key: string): string {
  const v = fields[key];
  return typeof v === "string" ? v : "";
}

function parseMembers(raw: unknown): string[] {
  if (Array.isArray(raw)) return raw.map(String);
  if (typeof raw === "string" && raw.trim()) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed.map(String);
    } catch {
      return [raw];
    }
  }
  return [];
}

async function fetchAll(
  baseId: string,
  table: string,
  apiKey: string
): Promise<AirtableRecord[]> {
  const records: AirtableRecord[] = [];
  let offset: string | undefined;
  do {
    const params = new URLSearchParams({ pageSize: "100" });
    if (offset) params.set("offset", offset);
    const res = await fetch(airtableUrl(baseId, table, `?${params.toString()}`), {
      headers: { Authorization: `Bearer ${apiKey}` },
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Airtable ${res.status}: ${await res.text()}`);
    const json = (await res.json()) as {
      records: AirtableRecord[];
      offset?: string;
    };
    records.push(...json.records);
    offset = json.offset;
  } while (offset);
  return records;
}

export async function GET() {
  if (process.env.RESULTS_OPEN !== "true") {
    return NextResponse.json({ ok: true, open: false, results: [] });
  }

  const demo = demoDayConfig();
  const evals = evaluationsConfig();
  if (!evals.apiKey || !evals.baseId || !demo.apiKey || !demo.baseId) {
    return NextResponse.json(
      { ok: false, error: "Resultados no configurados (Airtable)." },
      { status: 500 }
    );
  }

  try {
    const [projectRows, evalRows] = await Promise.all([
      fetchAll(demo.baseId, demo.table, demo.apiKey),
      fetchAll(evals.baseId, evals.table, evals.apiKey),
    ]);

    const projectMeta = new Map(
      projectRows.map((r) => [
        r.id,
        {
          name: str(r.fields, "Nombre del proyecto"),
          members: parseMembers(r.fields["Integrantes"]),
          oneLiner: str(r.fields, "One-liner"),
        },
      ])
    );

    type Agg = {
      name: string;
      totalSum: number;
      count: number;
      critSum: Record<string, number>;
      comments: string[];
    };
    const byProject = new Map<string, Agg>();

    for (const e of evalRows) {
      const pid = str(e.fields, "ProyectoId");
      const total = e.fields["Total ponderado"];
      if (!pid || typeof total !== "number") continue;
      const agg =
        byProject.get(pid) ??
        ({
          name: str(e.fields, "Proyecto"),
          totalSum: 0,
          count: 0,
          critSum: {},
          comments: [],
        } as Agg);
      agg.totalSum += total;
      agg.count += 1;
      for (const c of JURY_CRITERIA) {
        const v = e.fields[c.field];
        if (typeof v === "number") {
          agg.critSum[c.key] = (agg.critSum[c.key] ?? 0) + v;
        }
      }
      const comment = str(e.fields, "Comentario");
      if (comment) agg.comments.push(comment);
      if (!agg.name) agg.name = str(e.fields, "Proyecto");
      byProject.set(pid, agg);
    }

    const results = [...byProject.entries()]
      .map(([id, a]) => {
        const meta = projectMeta.get(id);
        return {
          id,
          name: meta?.name || a.name,
          members: meta?.members ?? [],
          oneLiner: meta?.oneLiner ?? "",
          judgeCount: a.count,
          finalScore: Math.round((a.totalSum / a.count) * 10) / 10,
          criteria: JURY_CRITERIA.map((c) => ({
            key: c.key,
            title: c.title,
            weight: c.weight,
            avg:
              a.critSum[c.key] != null
                ? Math.round((a.critSum[c.key] / a.count) * 10) / 10
                : null,
          })),
          comments: a.comments,
        };
      })
      .sort((x, y) => y.finalScore - x.finalScore);

    return NextResponse.json({ ok: true, open: true, results });
  } catch (err) {
    console.error("[resultados] Error:", err);
    return NextResponse.json(
      { ok: false, error: "No pudimos cargar los resultados." },
      { status: 502 }
    );
  }
}
