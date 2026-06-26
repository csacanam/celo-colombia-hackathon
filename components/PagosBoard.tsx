"use client";

import { useEffect, useState } from "react";
import { Download, Loader2, Lock } from "lucide-react";
import { PRIZES } from "@/lib/site";

type Row = {
  id: string;
  name: string;
  members: string[];
  phone: string;
  wallet: string;
  podiumRank: number | null;
  copm: boolean;
  score: number | null;
};
type State = "loading" | "ready" | "denied" | "error";

const PRIZE_BY_RANK: Record<number, string> = Object.fromEntries(
  PRIZES.map((p) => [p.rank, p.amount])
);

function categoria(r: Row): string {
  const parts: string[] = [];
  if (r.podiumRank) parts.push(`${r.podiumRank}° puesto`);
  if (r.copm) parts.push("Bonus COPm");
  return parts.join(" + ");
}

function premio(r: Row): string {
  const parts: string[] = [];
  if (r.podiumRank) parts.push(`${PRIZE_BY_RANK[r.podiumRank]} COPm`);
  if (r.copm) parts.push("Bonus COPm (100.000)");
  return parts.join(" + ");
}

export function PagosBoard({ token }: { token: string | null }) {
  const [state, setState] = useState<State>("loading");
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    if (!token) {
      setState("denied");
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/pagos?token=${encodeURIComponent(token)}`, {
          cache: "no-store",
        });
        const json = await res.json();
        if (cancelled) return;
        if (res.status === 401) return setState("denied");
        if (!json.ok) return setState("error");
        setRows(json.rows ?? []);
        setState("ready");
      } catch {
        if (!cancelled) setState("error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token]);

  function downloadCsv() {
    const headers = [
      "Categoria",
      "Proyecto",
      "Integrantes",
      "Telefono",
      "Wallet",
      "Premio",
      "Puntaje",
    ];
    const esc = (s: string) => `"${(s ?? "").replace(/"/g, '""')}"`;
    const lines = [
      headers.join(","),
      ...rows.map((r) =>
        [
          categoria(r),
          r.name,
          r.members.join(" / "),
          r.phone,
          r.wallet || "FALTA",
          premio(r),
          r.score != null ? String(r.score) : "",
        ]
          .map(esc)
          .join(",")
      ),
    ];
    const blob = new Blob(["﻿" + lines.join("\n")], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pagos-demo-day.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  if (state === "loading")
    return (
      <Centered>
        <Loader2 className="animate-spin text-accent" size={28} />
        <p className="mt-4 text-sm text-muted">Cargando…</p>
      </Centered>
    );

  if (state === "denied")
    return (
      <Centered>
        <Lock className="text-accent" size={32} />
        <h1 className="mt-4 text-xl font-semibold text-white">
          Acceso restringido
        </h1>
        <p className="mt-2 text-sm text-muted">
          Esta vista es solo para la organización. Usa tu enlace con token.
        </p>
      </Centered>
    );

  if (state === "error")
    return (
      <Centered>
        <h1 className="text-xl font-semibold text-white">Algo salió mal</h1>
        <p className="mt-2 text-sm text-muted">Recarga la página.</p>
      </Centered>
    );

  const pendientes = rows.filter((r) => !r.wallet).length;

  return (
    <div className="section py-12 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="eyebrow">Pagos · Demo Day</span>
            <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              Ganadores y bonus COPm
            </h1>
            <p className="mt-2 text-sm text-muted">
              {rows.length} proyectos · {pendientes} sin billetera registrada.
            </p>
          </div>
          <button
            type="button"
            onClick={downloadCsv}
            className="btn-primary"
          >
            <Download size={16} />
            Descargar CSV
          </button>
        </div>

        <div className="mt-8 overflow-x-auto rounded-2xl border border-hairline">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-hairline bg-white/[0.02] font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
              <tr>
                <th className="px-4 py-3">Categoría</th>
                <th className="px-4 py-3">Proyecto</th>
                <th className="px-4 py-3">Integrantes</th>
                <th className="px-4 py-3">Teléfono</th>
                <th className="px-4 py-3">Wallet</th>
                <th className="px-4 py-3">Premio</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr
                  key={r.id}
                  className="border-b border-hairline last:border-0 align-top"
                >
                  <td className="px-4 py-3 font-medium text-accent">
                    {categoria(r)}
                  </td>
                  <td className="px-4 py-3 text-white">{r.name}</td>
                  <td className="px-4 py-3 text-white/60">
                    {r.members.join(", ")}
                  </td>
                  <td className="px-4 py-3 font-mono text-white/70">
                    {r.phone || "—"}
                  </td>
                  <td className="px-4 py-3">
                    {r.wallet ? (
                      <span className="break-all font-mono text-xs text-white/80">
                        {r.wallet}
                      </span>
                    ) : (
                      <span className="font-mono text-xs text-amber-300">
                        FALTA
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-white/70">{premio(r)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-white/40">
          El podio sale del promedio actual de los jurados. La integración COPm
          es autodeclarada (sujeta a verificación). El bonus aplica hasta 10
          proyectos.
        </p>
      </div>
    </div>
  );
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="section flex min-h-[70vh] flex-col items-center justify-center text-center">
      {children}
    </div>
  );
}
