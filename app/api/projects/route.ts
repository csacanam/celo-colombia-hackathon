import { NextResponse } from "next/server";
import { airtableUrl, demoDayConfig } from "@/lib/jury-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

/** Directorio público de proyectos, ordenado por actividad onchain. */

type AirtableRecord = { id: string; fields: Record<string, unknown> };

const EXPLORERS: Record<string, string> = {
  "Celo Mainnet": "https://celo.blockscout.com",
  "Celo Sepolia": "https://celo-sepolia.blockscout.com",
};
const ADDR_RE = /^0x[a-fA-F0-9]{40}$/;
const MAX_TXS = 10000;

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

function weiToCelo(wei: bigint): string {
  const WEI_PER_CELO = 10n ** 18n;
  const whole = wei / WEI_PER_CELO;
  const frac = ((wei % WEI_PER_CELO) / 10n ** 14n).toString().padStart(4, "0");
  return `${whole.toString()}.${frac}`;
}

type Metrics = {
  transactions: number;
  users: number;
  feesCelo: string;
  capped: boolean;
};

async function fetchMetrics(
  network: string,
  address: string
): Promise<Metrics | null> {
  const base = EXPLORERS[network];
  if (!base || !ADDR_RE.test(address)) return null;
  try {
    const res = await fetch(
      `${base}/api?module=account&action=txlist&address=${address}&page=1&offset=${MAX_TXS}&sort=desc`,
      { cache: "no-store", signal: AbortSignal.timeout(20000) }
    );
    if (!res.ok) return null;
    const data = (await res.json()) as {
      result?: { from?: string; gasUsed?: string; gasPrice?: string }[] | string;
    };
    const list = Array.isArray(data.result) ? data.result : [];
    const users = new Set<string>();
    let feeWei = 0n;
    for (const tx of list) {
      if (tx.from) users.add(tx.from.toLowerCase());
      if (tx.gasUsed && tx.gasPrice) {
        try {
          feeWei += BigInt(tx.gasUsed) * BigInt(tx.gasPrice);
        } catch {
          /* ignora */
        }
      }
    }
    return {
      transactions: list.length,
      users: users.size,
      feesCelo: weiToCelo(feeWei),
      capped: list.length >= MAX_TXS,
    };
  } catch {
    return null;
  }
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

    const base = records
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
      .filter((p) => p.name);

    // Métricas onchain en paralelo.
    const projects = await Promise.all(
      base.map(async (p) => ({
        ...p,
        metrics: await fetchMetrics(p.contractNetwork, p.contractAddress),
      }))
    );

    // Orden por transacciones (desc). Sin métricas → al final, por nombre.
    projects.sort((a, b) => {
      const ta = a.metrics?.transactions ?? -1;
      const tb = b.metrics?.transactions ?? -1;
      if (tb !== ta) return tb - ta;
      return a.name.localeCompare(b.name, "es");
    });

    return NextResponse.json({ ok: true, projects });
  } catch (err) {
    console.error("[projects] error:", err);
    return NextResponse.json(
      { ok: false, error: "Could not load projects." },
      { status: 502 }
    );
  }
}
