import { NextResponse } from "next/server";

export const runtime = "nodejs";

/** Payload esperado desde el formulario de la landing. */
type ApplyPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  whatsapp?: string;
  city?: string;
  programmingExp?: string;
  aiToolsExp?: string;
  blockchainExp?: string;
  motivation?: string;
  modality?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(req: Request) {
  let body: ApplyPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Cuerpo de la solicitud inválido." },
      { status: 400 }
    );
  }

  const lead = {
    firstName: clean(body.firstName),
    lastName: clean(body.lastName),
    email: clean(body.email),
    whatsapp: clean(body.whatsapp),
    city: clean(body.city),
    programmingExp: clean(body.programmingExp),
    aiToolsExp: clean(body.aiToolsExp),
    blockchainExp: clean(body.blockchainExp),
    motivation: clean(body.motivation),
    modality: clean(body.modality),
  };

  // --- Validación ---
  if (!lead.firstName || !lead.lastName) {
    return NextResponse.json(
      { ok: false, error: "Nombre y apellido son obligatorios." },
      { status: 422 }
    );
  }
  if (!EMAIL_RE.test(lead.email)) {
    return NextResponse.json(
      { ok: false, error: "Ingresa un email válido." },
      { status: 422 }
    );
  }
  if (lead.whatsapp.replace(/\D/g, "").length < 7) {
    return NextResponse.json(
      { ok: false, error: "Ingresa un número de WhatsApp válido." },
      { status: 422 }
    );
  }
  if (!lead.city) {
    return NextResponse.json(
      { ok: false, error: "La ciudad es obligatoria." },
      { status: 422 }
    );
  }
  if (
    !lead.programmingExp ||
    !lead.aiToolsExp ||
    !lead.blockchainExp ||
    !lead.motivation ||
    !lead.modality
  ) {
    return NextResponse.json(
      { ok: false, error: "Responde todas las preguntas marcadas con *." },
      { status: 422 }
    );
  }

  const whatsappUrl =
    process.env.NEXT_PUBLIC_WHATSAPP_URL ?? "https://chat.whatsapp.com/";

  const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID } = process.env;
  const tableName = process.env.AIRTABLE_TABLE_NAME ?? "Hackathon Leads";

  // Sin credenciales: no rompemos el flujo en desarrollo, solo avisamos.
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    console.warn(
      "[apply] Airtable no configurado — registro no persistido:",
      lead.email
    );
    return NextResponse.json({ ok: true, whatsappUrl, persisted: false });
  }

  // --- Persistir en Airtable ---
  try {
    const res = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(
        tableName
      )}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          typecast: true,
          records: [
            {
              fields: {
                Nombre: lead.firstName,
                Apellido: lead.lastName,
                Email: lead.email,
                WhatsApp: lead.whatsapp,
                Ciudad: lead.city,
                "Experiencia programando": lead.programmingExp,
                "Experiencia con IA": lead.aiToolsExp,
                "Conocimiento blockchain": lead.blockchainExp,
                Motivación: lead.motivation,
                Modalidad: lead.modality,
                // La fecha la registra Airtable con un campo "Created time".
              },
            },
          ],
        }),
      }
    );

    if (!res.ok) {
      const detail = await res.text();
      console.error("[apply] Error de Airtable:", res.status, detail);
      return NextResponse.json(
        {
          ok: false,
          error: "No pudimos guardar tu registro. Intenta de nuevo.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, whatsappUrl, persisted: true });
  } catch (err) {
    console.error("[apply] Fallo de red con Airtable:", err);
    return NextResponse.json(
      { ok: false, error: "Error de conexión. Intenta de nuevo." },
      { status: 502 }
    );
  }
}
