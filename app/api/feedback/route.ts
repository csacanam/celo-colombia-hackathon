import { NextResponse } from "next/server";
import { airtableUrl, demoDayConfig } from "@/lib/jury-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Testimonios públicos que dejaron los equipos, con su traducción al inglés.
 * Página de lectura abierta — sin token.
 */

type AirtableRecord = { id: string; fields: Record<string, unknown> };

function str(fields: Record<string, unknown>, key: string): string {
  const v = fields[key];
  return typeof v === "string" ? v : "";
}

export async function GET() {
  const demo = demoDayConfig();
  if (!demo.apiKey || !demo.baseId) {
    return NextResponse.json(
      { ok: false, error: "No configurado (Airtable)." },
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

    const feedback = records
      .map((r) => ({
        project: str(r.fields, "Nombre del proyecto"),
        es: str(r.fields, "Testimonio público"),
        en: str(r.fields, "Testimonio EN"),
      }))
      .filter((f) => f.es)
      .sort((a, b) => a.project.localeCompare(b.project, "es"));

    return NextResponse.json({ ok: true, feedback });
  } catch (err) {
    console.error("[feedback] Error:", err);
    return NextResponse.json(
      { ok: false, error: "No pudimos cargar los testimonios." },
      { status: 502 }
    );
  }
}
