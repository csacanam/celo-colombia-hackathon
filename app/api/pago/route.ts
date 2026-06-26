import { NextResponse } from "next/server";
import { airtableUrl, demoDayConfig } from "@/lib/jury-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Recolección de billeteras de pago.
 * GET  → lista de proyectos (id + nombre) para el selector.
 * POST → el equipo registra su billetera, validando su teléfono contra el
 *        WhatsApp con el que entregó el proyecto.
 */

type AirtableRecord = { id: string; fields: Record<string, unknown> };

const ADDR_RE = /^0x[a-fA-F0-9]{40}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function str(fields: Record<string, unknown>, key: string): string {
  const v = fields[key];
  return typeof v === "string" ? v : "";
}

/** Solo dígitos; comparamos por los últimos 10 (móvil colombiano). */
function phoneKey(s: string): string {
  return s.replace(/\D/g, "").slice(-10);
}

async function fetchAll(): Promise<{
  baseId: string;
  table: string;
  apiKey: string;
  records: AirtableRecord[];
}> {
  const demo = demoDayConfig();
  if (!demo.apiKey || !demo.baseId) throw new Error("Airtable no configurado");
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
  return { baseId: demo.baseId, table: demo.table, apiKey: demo.apiKey, records };
}

export async function GET() {
  try {
    const { records } = await fetchAll();
    const projects = records
      .map((r) => ({ id: r.id, name: str(r.fields, "Nombre del proyecto") }))
      .filter((p) => p.name)
      .sort((a, b) => a.name.localeCompare(b.name, "es"));
    return NextResponse.json({ ok: true, projects });
  } catch (err) {
    console.error("[pago] GET error:", err);
    return NextResponse.json(
      { ok: false, error: "No pudimos cargar los proyectos." },
      { status: 502 }
    );
  }
}

export async function POST(req: Request) {
  let body: {
    projectId?: string;
    phone?: string;
    wallet?: string;
    email?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Solicitud inválida." },
      { status: 400 }
    );
  }

  const projectId = (body.projectId ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const wallet = (body.wallet ?? "").trim();
  const email = (body.email ?? "").trim();

  if (!projectId) return invalid("Selecciona tu proyecto.");
  if (phoneKey(phone).length < 7)
    return invalid("Ingresa un número de teléfono válido.");
  if (!ADDR_RE.test(wallet))
    return invalid("La billetera debe ser una dirección 0x válida (42 caracteres).");
  if (!EMAIL_RE.test(email)) return invalid("Ingresa un email válido.");

  try {
    const { baseId, table, apiKey, records } = await fetchAll();
    const project = records.find((r) => r.id === projectId);
    if (!project) return invalid("Proyecto no encontrado.");

    // Validar identidad: el teléfono debe coincidir con el WhatsApp registrado.
    const stored = phoneKey(str(project.fields, "WhatsApp"));
    if (!stored || stored !== phoneKey(phone)) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "El teléfono no coincide con el que registró este proyecto. Usa el mismo WhatsApp de la entrega o escríbele a la organización.",
        },
        { status: 403 }
      );
    }

    const res = await fetch(`${airtableUrl(baseId, table)}/${projectId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: { "Wallet de pago": wallet, "Email de pago": email },
      }),
    });
    if (!res.ok) {
      console.error("[pago] PATCH error:", res.status, await res.text());
      return NextResponse.json(
        { ok: false, error: "No pudimos guardar tu billetera. Intenta de nuevo." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[pago] POST error:", err);
    return NextResponse.json(
      { ok: false, error: "Error de conexión. Intenta de nuevo." },
      { status: 502 }
    );
  }
}

function invalid(error: string) {
  return NextResponse.json({ ok: false, error }, { status: 422 });
}
