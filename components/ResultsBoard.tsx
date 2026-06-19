"use client";

import { useEffect, useState } from "react";
import { Loader2, Medal, MessageSquare, Trophy } from "lucide-react";

type Criterion = {
  key: string;
  title: string;
  weight: number;
  avg: number | null;
};

type Result = {
  id: string;
  name: string;
  members: string[];
  oneLiner: string;
  judgeCount: number;
  finalScore: number;
  criteria: Criterion[];
  comments: string[];
};

type State = "loading" | "open" | "closed" | "error";

export function ResultsBoard() {
  const [state, setState] = useState<State>("loading");
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/resultados", { cache: "no-store" });
        const json = await res.json();
        if (cancelled) return;
        if (!json.ok) return setState("error");
        if (!json.open) return setState("closed");
        setResults(json.results ?? []);
        setState("open");
      } catch {
        if (!cancelled) setState("error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (state === "loading") {
    return (
      <Centered>
        <Loader2 className="animate-spin text-accent" size={28} />
        <p className="mt-4 text-sm text-muted">Cargando resultados…</p>
      </Centered>
    );
  }

  if (state === "closed") {
    return (
      <Centered>
        <Trophy className="text-accent" size={36} />
        <h1 className="mt-5 text-2xl font-semibold tracking-tight text-white">
          Resultados aún no publicados
        </h1>
        <p className="mt-2 max-w-md text-sm text-muted">
          Se publican al cerrar la evaluación del Demo Day. Vuelve en un rato.
        </p>
      </Centered>
    );
  }

  if (state === "error") {
    return (
      <Centered>
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Algo salió mal
        </h1>
        <p className="mt-2 text-sm text-muted">Recarga la página.</p>
      </Centered>
    );
  }

  return (
    <div className="section py-16 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <span className="eyebrow">Demo Day · Resultados</span>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          Resultados <span className="gradient-text">y feedback.</span>
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/50">
          Puntaje final (promedio de los jurados, 0–100), el desglose por
          criterio de la rúbrica y los comentarios del jurado para que sepas qué
          mejorar. Los comentarios son anónimos.
        </p>

        <div className="mt-10 flex flex-col gap-4">
          {results.map((r, i) => (
            <ResultCard key={r.id} result={r} rank={i + 1} />
          ))}
          {results.length === 0 && (
            <p className="rounded-2xl border border-hairline bg-white/[0.015] px-5 py-8 text-center text-sm text-muted">
              Aún no hay proyectos calificados.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

const RANK_ACCENT: Record<number, string> = {
  1: "text-accent",
  2: "text-white/80",
  3: "text-amber-600",
};

function ResultCard({ result, rank }: { result: Result; rank: number }) {
  const medal = rank <= 3;
  return (
    <div className="overflow-hidden rounded-2xl border border-hairline bg-white/[0.015]">
      <div className="flex items-center gap-4 px-5 py-4">
        <div className="flex w-10 shrink-0 items-center justify-center">
          {medal ? (
            <Medal size={22} className={RANK_ACCENT[rank]} />
          ) : (
            <span className="font-mono text-sm text-muted">
              {String(rank).padStart(2, "0")}
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold tracking-tight text-white">
            {result.name}
          </h3>
          {result.members.length > 0 && (
            <p className="mt-0.5 truncate text-sm text-white/45">
              {result.members.join(", ")}
            </p>
          )}
        </div>
        <div className="shrink-0 text-right">
          <div className="font-mono text-lg font-semibold text-accent">
            {result.finalScore}
            <span className="text-white/30">/100</span>
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
            {result.judgeCount}{" "}
            {result.judgeCount === 1 ? "jurado" : "jurados"}
          </div>
        </div>
      </div>

      <div className="border-t border-hairline px-5 py-5">
        {/* Desglose por criterio */}
        <div className="flex flex-col gap-2.5">
          {result.criteria.map((c) => (
            <div key={c.key} className="flex items-center gap-3">
              <span className="w-40 shrink-0 truncate text-xs text-white/60 sm:w-56 sm:text-sm">
                {c.title}
              </span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className="h-full rounded-full bg-accent/70"
                  style={{ width: `${((c.avg ?? 0) / 10) * 100}%` }}
                />
              </div>
              <span className="w-12 shrink-0 text-right font-mono text-xs text-white/70">
                {c.avg != null ? c.avg.toFixed(1) : "—"}
                <span className="text-white/30">/10</span>
              </span>
            </div>
          ))}
        </div>

        {/* Comentarios anónimos */}
        {result.comments.length > 0 && (
          <div className="mt-5 border-t border-hairline pt-4">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
              <MessageSquare size={13} />
              Feedback del jurado
            </div>
            <ul className="mt-3 flex flex-col gap-2.5">
              {result.comments.map((c, i) => (
                <li
                  key={i}
                  className="rounded-lg border border-hairline bg-surface px-4 py-3 text-sm leading-relaxed text-white/80"
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>
        )}
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
