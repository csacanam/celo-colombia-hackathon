import { NextResponse } from "next/server";
import { airtableUrl, demoDayConfig } from "@/lib/jury-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Directorio público de proyectos de la hackathon (para compartir con el ecosistema). */

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

export async function GET() {
  const demo = demoDayConfig();
  if (!demo.apiKey || !demo.baseId) {
    return NextResponse.json(
      { ok: false, error: "Not configured (Airtable)." },
      { status: 500 }
    );
  }

  try {
    const records: AirtableRecord[] = [];
    let offset: string | undefined;
    do {
      const params = new URLSearchParams({ pageSize: "100" });
      if (offset) params.set("offset", offset);
      const res = await fetch(
        airtableUrl(demo.baseId, demo.table, `?${params.toString()}`),
        { headers: { Authorization: `Bearer ${demo.apiKey}` }, cache: "no-store" }
      );
      if (!res.ok) throw new Error(`Airtable ${res.status}`);
      const json = (await res.json()) as {
        records: AirtableRecord[];
        offset?: string;
      };
      records.push(...json.records);
      offset = json.offset;
    } while (offset);

    const projects = records
      .map((r) => ({
        id: r.id,
        name: str(r.fields, "Nombre del proyecto"),
        oneLiner: str(r.fields, "One-liner"),
        members: parseMembers(r.fields["Integrantes"]),
        githubUrl: str(r.fields, "Repo GitHub"),
        miniAppUrl: str(r.fields, "Link mini app"),
        youtubeUrl: str(r.fields, "Video demo YouTube"),
        proofOfShipUrl: str(r.fields, "Proof of Ship"),
        contractAddress: str(r.fields, "Dirección del contrato"),
        contractNetwork: str(r.fields, "Red del contrato"),
      }))
      .filter((p) => p.name)
      .sort((a, b) => a.name.localeCompare(b.name, "es"));

    return NextResponse.json({ ok: true, projects });
  } catch (err) {
    console.error("[projects] error:", err);
    return NextResponse.json(
      { ok: false, error: "Could not load projects." },
      { status: 502 }
    );
  }
}
