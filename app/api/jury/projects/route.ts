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

/** Proyecto tal como lo ve el jurado (sin datos de contacto). */
type JuryProject = {
  id: string;
  name: string;
  oneLiner: string;
  description: string;
  members: string[];
  miniAppUrl: string;
  githubUrl: string;
  youtubeUrl: string;
  contractAddress: string;
  contractNetwork: string;
};

type AirtableRecord = {
  id: string;
  fields: Record<string, unknown>;
};

function str(fields: Record<string, unknown>, key: string): string {
  const v = fields[key];
  return typeof v === "string" ? v : "";
}

/** Integrantes se guardan como JSON string; toleramos array o texto suelto. */
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

/** Trae todos los registros de una tabla, siguiendo la paginación de Airtable. */
async function fetchAll(
  baseId: string,
  table: string,
  apiKey: string,
  extraQs = ""
): Promise<AirtableRecord[]> {
  const records: AirtableRecord[] = [];
  let offset: string | undefined;
  do {
    const params = new URLSearchParams({ pageSize: "100" });
    if (offset) params.set("offset", offset);
    const qs = `?${params.toString()}${extraQs}`;
    const res = await fetch(airtableUrl(baseId, table, qs), {
      headers: { Authorization: `Bearer ${apiKey}` },
      cache: "no-store",
    });
    if (!res.ok) {
      const detail = await res.text();
      throw new Error(`Airtable ${res.status}: ${detail}`);
    }
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
  const judge = resolveJudge(token);
  if (!judge) {
    return NextResponse.json(
      { ok: false, error: "Acceso no autorizado." },
      { status: 401 }
    );
  }

  const demo = demoDayConfig();
  if (!demo.apiKey || !demo.baseId) {
    return NextResponse.json(
      { ok: false, error: "El portal no está configurado (Airtable)." },
      { status: 500 }
    );
  }

  try {
    const records = await fetchAll(demo.baseId, demo.table, demo.apiKey);
    const projects: JuryProject[] = records
      .map((r) => ({
        id: r.id,
        name: str(r.fields, "Nombre del proyecto"),
        oneLiner: str(r.fields, "One-liner"),
        description: str(r.fields, "Descripción"),
        members: parseMembers(r.fields["Integrantes"]),
        miniAppUrl: str(r.fields, "Link mini app"),
        githubUrl: str(r.fields, "Repo GitHub"),
        youtubeUrl: str(r.fields, "Video demo YouTube"),
        contractAddress: str(r.fields, "Dirección del contrato"),
        contractNetwork: str(r.fields, "Red del contrato"),
      }))
      .filter((p) => p.name)
      .sort((a, b) => a.name.localeCompare(b.name, "es"));

    // Evaluaciones previas de ESTE jurado, para precargar el formulario.
    const evals = evaluationsConfig();
    const myScores: Record<
      string,
      { scores: Record<string, number>; comment: string }
    > = {};
    if (evals.apiKey && evals.baseId) {
      try {
        const formula = `?filterByFormula=${encodeURIComponent(
          `{Jurado}="${judge.replace(/"/g, '\\"')}"`
        )}`;
        const myEvals = await fetchAll(
          evals.baseId,
          evals.table,
          evals.apiKey,
          formula.replace("?", "&")
        );
        for (const e of myEvals) {
          const projectId = str(e.fields, "ProyectoId");
          if (!projectId) continue;
          const scores: Record<string, number> = {};
          for (const c of JURY_CRITERIA) {
            const v = e.fields[c.field];
            if (typeof v === "number") scores[c.key] = v;
          }
          myScores[projectId] = {
            scores,
            comment: str(e.fields, "Comentario"),
          };
        }
      } catch (err) {
        // Si la tabla aún no existe, seguimos sin precargar.
        console.warn("[jury] No se pudieron leer evaluaciones previas:", err);
      }
    }

    return NextResponse.json({ ok: true, judge, projects, myScores });
  } catch (err) {
    console.error("[jury] Error leyendo proyectos:", err);
    return NextResponse.json(
      { ok: false, error: "No pudimos cargar los proyectos." },
      { status: 502 }
    );
  }
}
