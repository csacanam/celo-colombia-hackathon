import { NextResponse } from "next/server";
import {
  JURY_CRITERIA,
  JURY_MAX_SCORE,
  computeWeightedTotal,
  type ScoreMap,
} from "@/lib/jury";
import { airtableUrl, evaluationsConfig, resolveJudge } from "@/lib/jury-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ScorePayload = {
  token?: string;
  projectId?: string;
  projectName?: string;
  scores?: ScoreMap;
  comment?: string;
};

export async function POST(req: Request) {
  let body: ScorePayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Cuerpo de la solicitud inválido." },
      { status: 400 }
    );
  }

  const judge = resolveJudge(body.token ?? null);
  if (!judge) {
    return NextResponse.json(
      { ok: false, error: "Acceso no autorizado." },
      { status: 401 }
    );
  }

  const projectId =
    typeof body.projectId === "string" ? body.projectId.trim() : "";
  const projectName =
    typeof body.projectName === "string" ? body.projectName.trim() : "";
  if (!projectId) {
    return NextResponse.json(
      { ok: false, error: "Falta el proyecto a evaluar." },
      { status: 422 }
    );
  }

  // Validar y normalizar los puntajes (0–10 enteros por criterio).
  const scores: ScoreMap = {};
  for (const c of JURY_CRITERIA) {
    const v = body.scores?.[c.key];
    if (
      typeof v !== "number" ||
      !Number.isInteger(v) ||
      v < 0 ||
      v > JURY_MAX_SCORE
    ) {
      return NextResponse.json(
        { ok: false, error: `Puntúa "${c.title}" de 0 a ${JURY_MAX_SCORE}.` },
        { status: 422 }
      );
    }
    scores[c.key] = v;
  }

  const total = computeWeightedTotal(scores);
  const comment = typeof body.comment === "string" ? body.comment.trim() : "";

  const evals = evaluationsConfig();
  if (!evals.apiKey || !evals.baseId) {
    console.warn("[score] Airtable no configurado, no persistido:", projectName);
    return NextResponse.json({ ok: true, persisted: false, total });
  }

  // Una fila única por (jurado × proyecto). Merge por "Clave".
  const fields: Record<string, string | number> = {
    Clave: `${judge}::${projectId}`,
    Jurado: judge,
    Proyecto: projectName,
    ProyectoId: projectId,
    Comentario: comment,
    "Total ponderado": total ?? 0,
  };
  for (const c of JURY_CRITERIA) {
    fields[c.field] = scores[c.key] as number;
  }

  try {
    const res = await fetch(airtableUrl(evals.baseId, evals.table), {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${evals.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        performUpsert: { fieldsToMergeOn: ["Clave"] },
        typecast: true,
        records: [{ fields }],
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("[score] Error de Airtable:", res.status, detail);
      return NextResponse.json(
        { ok: false, error: "No pudimos guardar la evaluación. Intenta de nuevo." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, persisted: true, total });
  } catch (err) {
    console.error("[score] Fallo de red con Airtable:", err);
    return NextResponse.json(
      { ok: false, error: "Error de conexión. Intenta de nuevo." },
      { status: 502 }
    );
  }
}
