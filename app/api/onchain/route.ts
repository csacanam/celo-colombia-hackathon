import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

/**
 * Métricas onchain públicas por contrato (transacciones, usuarios únicos y
 * comisiones en CELO), leídas de Blockscout. Solo datos públicos de la cadena.
 */

const EXPLORERS: Record<string, string> = {
  "Celo Mainnet": "https://celo.blockscout.com",
  "Celo Sepolia": "https://celo-sepolia.blockscout.com",
};

const ADDR_RE = /^0x[a-fA-F0-9]{40}$/;
const MAX_TXS = 10000;

type RawTx = { from?: string; gasUsed?: string; gasPrice?: string };

function weiToCelo(wei: bigint): string {
  const WEI_PER_CELO = 10n ** 18n;
  const whole = wei / WEI_PER_CELO;
  const frac = ((wei % WEI_PER_CELO) / 10n ** 14n).toString().padStart(4, "0");
  return `${whole.toString()}.${frac}`;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const network = url.searchParams.get("network") ?? "";
  const address = (url.searchParams.get("address") ?? "").trim();
  const base = EXPLORERS[network];

  if (!base)
    return NextResponse.json({ ok: false, error: "Red no soportada." }, { status: 422 });
  if (!ADDR_RE.test(address))
    return NextResponse.json({ ok: false, error: "Dirección inválida." }, { status: 422 });

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
    const data = (await res.json()) as { result?: RawTx[] | string };
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

    return NextResponse.json({
      ok: true,
      explorerUrl,
      metrics: {
        transactions: list.length,
        users: users.size,
        feesCelo: weiToCelo(feeWei),
        capped: list.length >= MAX_TXS,
      },
    });
  } catch (err) {
    console.error("[onchain-public] error:", err);
    return NextResponse.json(
      { ok: false, error: "No pudimos leer las métricas.", explorerUrl },
      { status: 502 }
    );
  }
}
