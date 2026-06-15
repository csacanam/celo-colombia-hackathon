import { NextResponse } from "next/server";
import { resolveJudge } from "@/lib/jury-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

/**
 * Métricas onchain por contrato, leídas de Blockscout (sin API key).
 * Usamos la API estilo Etherscan (txlist): trae todo el historial en UNA
 * llamada, así calculamos transacciones, usuarios únicos y gas de forma
 * consistente y rápida (el endpoint /counters de Blockscout viene cacheado).
 */

const EXPLORERS: Record<string, string> = {
  "Celo Mainnet": "https://celo.blockscout.com",
  "Celo Sepolia": "https://celo-sepolia.blockscout.com",
};

const ADDR_RE = /^0x[a-fA-F0-9]{40}$/;
const MAX_TXS = 10000; // tope de la API en una página

type RawTx = {
  from?: string;
  to?: string;
  gasUsed?: string;
  gasPrice?: string;
};

/** Convierte wei (bigint) a CELO con 4 decimales, sin perder precisión. */
function weiToCelo(wei: bigint): string {
  const WEI_PER_CELO = 10n ** 18n;
  const whole = wei / WEI_PER_CELO;
  const frac = ((wei % WEI_PER_CELO) / 10n ** 14n).toString().padStart(4, "0");
  return `${whole.toString()}.${frac}`;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const judge = resolveJudge(url.searchParams.get("token"));
  if (!judge) {
    return NextResponse.json(
      { ok: false, error: "Acceso no autorizado." },
      { status: 401 }
    );
  }

  const network = url.searchParams.get("network") ?? "";
  const address = (url.searchParams.get("address") ?? "").trim();
  const base = EXPLORERS[network];

  if (!base) {
    return NextResponse.json(
      { ok: false, error: "Red no soportada." },
      { status: 422 }
    );
  }
  if (!ADDR_RE.test(address)) {
    return NextResponse.json(
      { ok: false, error: "Dirección de contrato inválida." },
      { status: 422 }
    );
  }

  const explorerUrl = `${base}/address/${address}`;
  const apiUrl =
    `${base}/api?module=account&action=txlist&address=${address}` +
    `&page=1&offset=${MAX_TXS}&sort=desc`;

  try {
    const res = await fetch(apiUrl, {
      cache: "no-store",
      signal: AbortSignal.timeout(25000),
    });
    if (!res.ok) throw new Error(`Blockscout ${res.status}`);

    const data = (await res.json()) as {
      status?: string;
      message?: string;
      result?: RawTx[] | string;
    };

    // Sin transacciones: Blockscout responde status "0" / "No transactions found".
    const list = Array.isArray(data.result) ? data.result : [];

    const users = new Set<string>();
    let feeWei = 0n; // comisiones totales = Σ gasUsed × gasPrice
    for (const tx of list) {
      if (tx.from) users.add(tx.from.toLowerCase());
      if (tx.gasUsed && tx.gasPrice) {
        try {
          feeWei += BigInt(tx.gasUsed) * BigInt(tx.gasPrice);
        } catch {
          /* ignora valores no numéricos */
        }
      }
    }

    return NextResponse.json({
      ok: true,
      network,
      explorerUrl,
      metrics: {
        transactions: list.length,
        users: users.size,
        feesCelo: weiToCelo(feeWei), // comisiones pagadas, en CELO
        capped: list.length >= MAX_TXS, // historial más largo que el tope
      },
    });
  } catch (err) {
    console.error("[onchain] Error consultando Blockscout:", err);
    return NextResponse.json(
      { ok: false, error: "No pudimos leer las métricas onchain.", explorerUrl },
      { status: 502 }
    );
  }
}
