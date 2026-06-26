import { NextResponse } from "next/server";
import {
  airtableUrl,
  demoDayConfig,
  evaluationsConfig,
  resolveJudge,
} from "@/lib/jury-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Vista privada de pagos (solo organización/jurado con token).
 * Lista los ganadores del podio (top 3 por promedio) y los proyectos que
 * integraron COPm, con su billetera, teléfono e integrantes — para coordinar
 * pagos. Incluye quién falta por registrar billetera.
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
      const p = JSON.parse(raw);
      if (Array.isArray(p)) return p.map(String);
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
    const res = await fetch(
      airtableUrl(baseId, table, `?${params.toString()}`),
      { headers: { Authorization: `Bearer ${apiKey}` }, cache: "no-store" }
    );
    if (!res.ok) throw new Error(`Airtable ${res.status}`);
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
  const judge = resolveJudge(new URL(req.url).searchParams.get("token"));
  if (!judge) {
    return NextResponse.json(
      { ok: false, error: "Acceso no autorizado." },
      { status: 401 }
    );
  }

  const demo = demoDayConfig();
  const evals = evaluationsConfig();
  if (!demo.apiKey || !demo.baseId) {
    return NextResponse.json(
      { ok: false, error: "No configurado (Airtable)." },
      { status: 500 }
    );
  }

  try {
    const projectRows = await fetchAll(demo.baseId, demo.table, demo.apiKey);

    // Promedio por proyecto para el podio.
    const avg = new Map<string, { sum: number; n: number }>();
    if (evals.apiKey && evals.baseId) {
      const evalRows = await fetchAll(evals.baseId, evals.table, evals.apiKey);
      for (const e of evalRows) {
        const pid = str(e.fields, "ProyectoId");
        const t = e.fields["Total ponderado"];
        if (!pid || typeof t !== "number") continue;
        const cur = avg.get(pid) ?? { sum: 0, n: 0 };
        cur.sum += t;
        cur.n += 1;
        avg.set(pid, cur);
      }
    }

    const meta = new Map(
      projectRows.map((r) => [
        r.id,
        {
          name: str(r.fields, "Nombre del proyecto"),
          members: parseMembers(r.fields["Integrantes"]),
          phone: str(r.fields, "WhatsApp"),
          wallet: str(r.fields, "Wallet de pago"),
          copm: str(r.fields, "Integró COPm") === "Sí",
        },
      ])
    );

    // Ranking → puesto del podio (top 3).
    const ranked = [...avg.entries()]
      .map(([id, v]) => ({ id, score: Math.round((v.sum / v.n) * 10) / 10 }))
      .sort((a, b) => b.score - a.score);
    const podiumRank = new Map<string, number>();
    ranked.slice(0, 3).forEach((r, i) => podiumRank.set(r.id, i + 1));

    // Relevantes = top 3 ∪ proyectos COPm.
    const relevantIds = new Set<string>([...podiumRank.keys()]);
    for (const [id, m] of meta) if (m.copm) relevantIds.add(id);

    const rows = [...relevantIds]
      .map((id) => {
        const m = meta.get(id)!;
        return {
          id,
          name: m.name,
          members: m.members,
          phone: m.phone,
          wallet: m.wallet,
          podiumRank: podiumRank.get(id) ?? null,
          copm: m.copm,
          score: avg.has(id)
            ? Math.round((avg.get(id)!.sum / avg.get(id)!.n) * 10) / 10
            : null,
        };
      })
      .sort((a, b) => {
        // Podio primero (1,2,3), luego COPm por nombre.
        const ra = a.podiumRank ?? 99;
        const rb = b.podiumRank ?? 99;
        if (ra !== rb) return ra - rb;
        return a.name.localeCompare(b.name, "es");
      });

    return NextResponse.json({ ok: true, rows });
  } catch (err) {
    console.error("[pagos] error:", err);
    return NextResponse.json(
      { ok: false, error: "No pudimos cargar la lista." },
      { status: 502 }
    );
  }
}
