import { NextResponse } from "next/server";
import { SUBMIT_DEADLINE_ISO } from "@/lib/site";

export const runtime = "nodejs";

const DEADLINE_MS = new Date(SUBMIT_DEADLINE_ISO).getTime();

type SubmitPayload = {
  projectName?: string;
  members?: string[];
  whatsapp?: string;
  miniAppUrl?: string;
  githubUrl?: string;
  youtubeUrl?: string;
  contractAddress?: string;
  contractNetwork?: string;
  description?: string;
  oneLiner?: string;
  firstDeploy?: string;
  willContinue?: string;
  nps?: number | null;
  testimonial?: string;
};

const FIRST_DEPLOY = new Set(["Sí", "No"]);
const WILL_CONTINUE = new Set(["Sí", "Probablemente", "No"]);

const URL_RE = /^https?:\/\//i;
const ADDR_RE = /^0x[a-fA-F0-9]{40}$/;
const NETWORKS = new Set(["Celo Mainnet", "Celo Sepolia"]);

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function invalid(error: string) {
  return NextResponse.json({ ok: false, error }, { status: 422 });
}

export async function POST(req: Request) {
  // Defensa real contra entregas tarde · el cliente no es fuente de verdad.
  if (Date.now() >= DEADLINE_MS) {
    return NextResponse.json(
      { ok: false, error: "Las entregas para Demo Day están cerradas." },
      { status: 403 }
    );
  }

  let body: SubmitPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Cuerpo de la solicitud inválido." },
      { status: 400 }
    );
  }

  const projectName = clean(body.projectName);
  const members = Array.isArray(body.members)
    ? body.members.map(clean).filter(Boolean).slice(0, 4)
    : [];
  const whatsapp = clean(body.whatsapp);
  const miniAppUrl = clean(body.miniAppUrl);
  const githubUrl = clean(body.githubUrl);
  const youtubeUrl = clean(body.youtubeUrl);
  const contractAddress = clean(body.contractAddress);
  const contractNetwork = clean(body.contractNetwork);
  const description = clean(body.description);
  const oneLiner = clean(body.oneLiner);
  const firstDeploy = clean(body.firstDeploy);
  const willContinue = clean(body.willContinue);
  const nps = typeof body.nps === "number" ? body.nps : NaN;
  const testimonial = clean(body.testimonial);

  if (!projectName) return invalid("El nombre del proyecto es obligatorio.");
  if (members.length === 0) return invalid("Necesitamos al menos un integrante.");
  if (whatsapp.replace(/\D/g, "").length < 7) return invalid("Ingresa un WhatsApp válido para poder coordinar los premios.");
  if (!URL_RE.test(miniAppUrl)) return invalid("El enlace de la mini app debe empezar con https://");
  if (!URL_RE.test(githubUrl)) return invalid("El enlace del repositorio de GitHub debe empezar con https://");
  if (!URL_RE.test(youtubeUrl)) return invalid("El enlace del video debe empezar con https://");
  if (!ADDR_RE.test(contractAddress)) return invalid("La dirección del contrato es inválida (debe ser 0x + 40 caracteres hex).");
  if (!NETWORKS.has(contractNetwork)) return invalid("La red del contrato es inválida.");
  if (description.length < 50) return invalid("La descripción del proyecto debe tener al menos 50 caracteres.");
  if (oneLiner.length < 5) return invalid("La frase de presentación es muy corta.");
  if (!FIRST_DEPLOY.has(firstDeploy)) return invalid("Indica si es la primera vez que tu equipo despliega un contrato inteligente.");
  if (!WILL_CONTINUE.has(willContinue)) return invalid("Indica si van a seguir construyendo el proyecto.");
  if (!Number.isInteger(nps) || nps < 0 || nps > 10) return invalid("Elige un valor entre 0 y 10 para qué tan probable es que recomiendes la hackathon.");

  const apiKey = process.env.AIRTABLE_DEMODAY_API_KEY;
  const baseId = process.env.AIRTABLE_DEMODAY_BASE_ID;
  const tableName = process.env.AIRTABLE_DEMODAY_TABLE_NAME ?? "Demo Day";

  // Sin credenciales: no rompemos en dev, solo logueamos.
  if (!apiKey || !baseId) {
    console.warn("[submit] Airtable no configurado, no persistido:", projectName);
    return NextResponse.json({ ok: true, persisted: false });
  }

  const fields: Record<string, string | number> = {
    "Nombre del proyecto": projectName,
    Integrantes: JSON.stringify(members),
    WhatsApp: whatsapp,
    "Link mini app": miniAppUrl,
    "Repo GitHub": githubUrl,
    "Video demo YouTube": youtubeUrl,
    "Dirección del contrato": contractAddress,
    "Red del contrato": contractNetwork,
    Descripción: description,
    "One-liner": oneLiner,
    "Primer contrato inteligente": firstDeploy,
    "Continuará el proyecto": willContinue,
    NPS: nps,
  };
  if (testimonial) fields["Testimonio público"] = testimonial;

  try {
    const res = await fetch(
      `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          typecast: true,
          records: [{ fields }],
        }),
      }
    );

    if (!res.ok) {
      const detail = await res.text();
      console.error("[submit] Error de Airtable:", res.status, detail);
      return NextResponse.json(
        { ok: false, error: "No pudimos guardar tu entrega. Intenta de nuevo." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, persisted: true });
  } catch (err) {
    console.error("[submit] Fallo de red con Airtable:", err);
    return NextResponse.json(
      { ok: false, error: "Error de conexión. Intenta de nuevo." },
      { status: 502 }
    );
  }
}
