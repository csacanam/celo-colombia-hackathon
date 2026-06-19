import { NextResponse } from "next/server";
import { JURY_CRITERIA } from "@/lib/jury";
import {
  airtableUrl,
  demoDayConfig,
  evaluationsConfig,
  resolveJudge,
} from "@/lib/jury-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Data para el deck de Demo Day: proyectos entregados + podio automático
 * calculado desde la tabla "Evaluaciones" (promedio del total ponderado de
 * cada jurado por proyecto). Protegido por token, igual que el portal.
 */

type DeckProject = {
  id: string;
  name: string;
  oneLiner: string;
  members: string[];
  miniAppUrl: string;
  githubUrl: string;
  youtubeUrl: string;
};

type PodiumEntry = {
  id: string;
  name: string;
  members: string[];
  avgScore: number;
  judgeCount: number;
};

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

export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get("token");
  const who = resolveJudge(token);
  if (!who) {
    return NextResponse.json(
      { ok: false, error: "Acceso no autorizado." },
      { status: 401 }
    );
  }

  const demo = demoDayConfig();
  if (!demo.apiKey || !demo.baseId) {
    return NextResponse.json(
      { ok: false, error: "El deck no está configurado (Airtable)." },
      { status: 500 }
    );
  }

  try {
    const records = await fetchAll(demo.baseId, demo.table, demo.apiKey);
    const projects: DeckProject[] = records
      .map((r) => ({
        id: r.id,
        name: str(r.fields, "Nombre del proyecto"),
        oneLiner: str(r.fields, "One-liner"),
        members: parseMembers(r.fields["Integrantes"]),
        miniAppUrl: str(r.fields, "Link mini app"),
        githubUrl: str(r.fields, "Repo GitHub"),
        youtubeUrl: str(r.fields, "Video demo YouTube"),
      }))
      .filter((p) => p.name)
      .sort((a, b) => a.name.localeCompare(b.name, "es"));

    // Candidatos al bonus de integración COPm (autodeclarado, sujeto a verificación).
    const bonusCandidates = records
      .filter((r) => str(r.fields, "Integró COPm") === "Sí")
      .map((r) => ({
        name: str(r.fields, "Nombre del proyecto"),
        members: parseMembers(r.fields["Integrantes"]),
      }))
      .filter((p) => p.name)
      .sort((a, b) => a.name.localeCompare(b.name, "es"));

    // Testimonios públicos de los equipos.
    const testimonials = records
      .map((r) => ({
        text: str(r.fields, "Testimonio público"),
        project: str(r.fields, "Nombre del proyecto"),
      }))
      .filter((t) => t.text);

    // --- Podio automático desde "Evaluaciones" ---
    const evals = evaluationsConfig();
    let podium: PodiumEntry[] = [];
    if (evals.apiKey && evals.baseId) {
      try {
        const rows = await fetchAll(evals.baseId, evals.table, evals.apiKey);
        const byProject = new Map<
          string,
          { name: string; sum: number; count: number }
        >();
        for (const e of rows) {
          const pid = str(e.fields, "ProyectoId");
          const totalRaw = e.fields["Total ponderado"];
          if (!pid || typeof totalRaw !== "number") continue;
          const cur = byProject.get(pid) ?? {
            name: str(e.fields, "Proyecto"),
            sum: 0,
            count: 0,
          };
          cur.sum += totalRaw;
          cur.count += 1;
          if (!cur.name) cur.name = str(e.fields, "Proyecto");
          byProject.set(pid, cur);
        }

        const projectById = new Map(projects.map((p) => [p.id, p]));
        podium = [...byProject.entries()]
          .map(([id, v]) => ({
            id,
            name: projectById.get(id)?.name || v.name,
            members: projectById.get(id)?.members ?? [],
            avgScore: Math.round((v.sum / v.count) * 10) / 10,
            judgeCount: v.count,
          }))
          .sort((a, b) => b.avgScore - a.avgScore)
          .slice(0, 3);
      } catch (err) {
        console.warn("[deck] No se pudo calcular el podio:", err);
      }
    }

    return NextResponse.json({
      ok: true,
      projects,
      podium,
      bonusCandidates,
      testimonials,
      criteriaCount: JURY_CRITERIA.length,
    });
  } catch (err) {
    console.error("[deck] Error leyendo data del deck:", err);
    return NextResponse.json(
      { ok: false, error: "No pudimos cargar la data del Demo Day." },
      { status: 502 }
    );
  }
}
