"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  Fuel,
  Github,
  Lock,
  Loader2,
  Search,
  Users,
  Youtube,
} from "lucide-react";
import { JURY_CRITERIA, JURY_MAX_SCORE, computeWeightedTotal } from "@/lib/jury";

type Project = {
  id: string;
  name: string;
  oneLiner: string;
  description: string;
  members: string[];
  miniAppUrl: string;
  githubUrl: string;
  youtubeUrl: string;
  contractAddress: string;
  contractNetwork: string;
};

type SavedEval = { scores: Record<string, number>; comment: string };

type LoadState = "loading" | "ready" | "denied" | "error";

type Metrics = {
  transactions: number;
  users: number;
  feesCelo: string;
  capped: boolean;
};

/** Estado de las métricas onchain de un proyecto, cacheado en el portal. */
type OnchainEntry = {
  state: "loading" | "ready" | "error";
  metrics?: Metrics;
  explorerUrl?: string;
};

const SCORE_OPTIONS = Array.from({ length: JURY_MAX_SCORE + 1 }, (_, i) => i);

export function JuryPortal({ token }: { token: string | null }) {
  const [state, setState] = useState<LoadState>("loading");
  const [judge, setJudge] = useState<string>("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [saved, setSaved] = useState<Record<string, SavedEval>>({});
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [query, setQuery] = useState<string>("");
  const [pendingOnly, setPendingOnly] = useState<boolean>(false);
  const [onchain, setOnchain] = useState<Record<string, OnchainEntry>>({});
  const requested = useRef<Set<string>>(new Set());

  // Pide las métricas onchain de un proyecto una sola vez y las cachea.
  const loadOnchain = useCallback(
    async (p: Project) => {
      if (!token || !p.contractAddress) return;
      if (requested.current.has(p.id)) return; // ya pedido (o en curso)
      requested.current.add(p.id);
      setOnchain((prev) => ({ ...prev, [p.id]: { state: "loading" } }));
      try {
        const params = new URLSearchParams({
          token,
          network: p.contractNetwork,
          address: p.contractAddress,
        });
        const res = await fetch(`/api/jury/onchain?${params.toString()}`, {
          cache: "no-store",
        });
        const json = await res.json();
        setOnchain((prev) => ({
          ...prev,
          [p.id]: json.ok
            ? {
                state: "ready",
                metrics: json.metrics,
                explorerUrl: json.explorerUrl,
              }
            : { state: "error", explorerUrl: json.explorerUrl },
        }));
      } catch {
        // Permite reintentar en una próxima apertura.
        requested.current.delete(p.id);
        setOnchain((prev) => ({ ...prev, [p.id]: { state: "error" } }));
      }
    },
    [token]
  );

  const isEvaluated = useMemo(() => {
    return (id: string) => {
      const s = saved[id]?.scores;
      return Boolean(
        s && JURY_CRITERIA.every((c) => typeof s[c.key] === "number")
      );
    };
  }, [saved]);

  useEffect(() => {
    if (!token) {
      setState("denied");
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(
          `/api/jury/projects?token=${encodeURIComponent(token)}`,
          { cache: "no-store" }
        );
        const json = await res.json();
        if (cancelled) return;
        if (res.status === 401) {
          setState("denied");
          return;
        }
        if (!json.ok) {
          setErrorMsg(json.error ?? "No pudimos cargar los proyectos.");
          setState("error");
          return;
        }
        setJudge(json.judge);
        setProjects(json.projects);
        setSaved(json.myScores ?? {});
        setState("ready");
      } catch {
        if (!cancelled) {
          setErrorMsg("Error de conexión. Recarga la página.");
          setState("error");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token]);

  const evaluatedCount = useMemo(
    () => projects.filter((p) => isEvaluated(p.id)).length,
    [projects, isEvaluated]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = projects;
    if (q) {
      list = list.filter((p) => {
        const haystack = [p.name, p.oneLiner, ...p.members]
          .join(" ")
          .toLowerCase();
        return haystack.includes(q);
      });
    }
    if (pendingOnly) list = list.filter((p) => !isEvaluated(p.id));
    // Pendientes primero; los ya evaluados se van al final.
    return [...list].sort(
      (a, b) => Number(isEvaluated(a.id)) - Number(isEvaluated(b.id))
    );
  }, [projects, query, pendingOnly, isEvaluated]);

  if (state === "loading") {
    return (
      <Centered>
        <Loader2 className="animate-spin text-accent" size={28} />
        <p className="mt-4 text-sm text-muted">Cargando proyectos…</p>
      </Centered>
    );
  }

  if (state === "denied") {
    return (
      <Centered>
        <div className="grid h-14 w-14 place-items-center rounded-full bg-red-500/15 text-red-300">
          <Lock size={22} strokeWidth={2.2} />
        </div>
        <h1 className="mt-5 text-xl font-semibold tracking-tight text-white">
          Acceso restringido
        </h1>
        <p className="mt-2 max-w-md text-sm text-muted">
          Este portal es solo para el jurado. Usa el enlace privado que te
          compartimos por WhatsApp.
        </p>
      </Centered>
    );
  }

  if (state === "error") {
    return (
      <Centered>
        <h1 className="text-xl font-semibold tracking-tight text-white">
          Algo salió mal
        </h1>
        <p className="mt-2 max-w-md text-sm text-muted">{errorMsg}</p>
      </Centered>
    );
  }

  return (
    <div className="section py-14 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <span className="eyebrow">Portal del jurado</span>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          Hola, <span className="gradient-text">{judge}</span>.
        </h1>
        <p className="mt-3 text-base leading-relaxed text-white/50">
          Evalúa cada proyecto con la rúbrica oficial. Tus puntajes se guardan
          al instante y puedes volver a ajustarlos cuando quieras.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-accent/30 bg-accent/[0.06] px-4 py-2">
            <CheckCircle2 size={14} className="text-accent" />
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
              {evaluatedCount} de {projects.length} evaluados
            </span>
          </div>
          {projects.length > 0 && (
            <button
              type="button"
              onClick={() => setPendingOnly((v) => !v)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition ${
                pendingOnly
                  ? "border-accent/40 bg-accent/[0.08] text-accent"
                  : "border-hairline bg-surface text-muted hover:border-white/15 hover:text-white"
              }`}
            >
              Solo pendientes
            </button>
          )}
        </div>

        {projects.length > 0 && (
          <div className="relative mt-8">
            <Search
              size={16}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar proyecto por nombre, frase o integrante…"
              className="w-full rounded-lg border border-hairline bg-surface py-2.5 pl-10 pr-3.5 text-sm text-white placeholder:text-white/30 transition-all duration-200 focus:border-accent/45 focus:outline-none focus:ring-2 focus:ring-accent/15"
            />
          </div>
        )}

        <div className="mt-4 flex flex-col gap-3">
          {filtered.map((p) => (
            <ProjectCard
              key={p.id}
              project={p}
              token={token as string}
              initial={saved[p.id]}
              open={openId === p.id}
              onToggle={() => setOpenId((id) => (id === p.id ? null : p.id))}
              onSaved={(ev) =>
                setSaved((prev) => ({ ...prev, [p.id]: ev }))
              }
              onchainEntry={onchain[p.id]}
              onRequestOnchain={() => loadOnchain(p)}
            />
          ))}
          {projects.length === 0 && (
            <p className="rounded-2xl border border-hairline bg-white/[0.015] px-5 py-8 text-center text-sm text-muted">
              Todavía no hay proyectos entregados. Vuelve cuando los equipos
              hayan subido sus entregas.
            </p>
          )}
          {projects.length > 0 && filtered.length === 0 && (
            <p className="rounded-2xl border border-hairline bg-white/[0.015] px-5 py-8 text-center text-sm text-muted">
              {query.trim()
                ? `Ningún proyecto coincide con “${query}”.`
                : "¡Ya evaluaste todos los proyectos! 🎉"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- tarjeta por proyecto ---------- */

type CardProps = {
  project: Project;
  token: string;
  initial?: SavedEval;
  open: boolean;
  onToggle: () => void;
  onSaved: (ev: SavedEval) => void;
  onchainEntry?: OnchainEntry;
  onRequestOnchain: () => void;
};

type SaveStatus = "idle" | "saving" | "saved" | "error";

function ProjectCard({
  project,
  token,
  initial,
  open,
  onToggle,
  onSaved,
  onchainEntry,
  onRequestOnchain,
}: CardProps) {
  const [scores, setScores] = useState<Record<string, number>>(
    initial?.scores ?? {}
  );
  const [comment, setComment] = useState<string>(initial?.comment ?? "");
  const [status, setStatus] = useState<SaveStatus>("idle");
  const [error, setError] = useState<string>("");

  // Carga las métricas onchain la primera vez que se abre el proyecto.
  useEffect(() => {
    if (open && project.contractAddress) onRequestOnchain();
  }, [open, project.contractAddress, onRequestOnchain]);

  const total = computeWeightedTotal(scores);
  const isComplete = JURY_CRITERIA.every(
    (c) => typeof scores[c.key] === "number"
  );

  async function save() {
    if (!isComplete) {
      setError("Puntúa los 5 criterios antes de guardar.");
      setStatus("error");
      return;
    }
    setStatus("saving");
    setError("");
    try {
      const res = await fetch("/api/jury/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          projectId: project.id,
          projectName: project.name,
          scores,
          comment,
        }),
      });
      const json = await res.json();
      if (!json.ok) {
        setError(json.error ?? "No pudimos guardar.");
        setStatus("error");
        return;
      }
      setStatus("saved");
      onSaved({ scores, comment });
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
      setStatus("error");
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-hairline bg-white/[0.015]">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-white/[0.02]"
      >
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2.5">
            <h3 className="truncate text-base font-semibold tracking-tight text-white">
              {project.name}
            </h3>
            {isComplete && (
              <CheckCircle2
                size={15}
                className="shrink-0 text-accent"
                aria-label="Evaluado"
              />
            )}
          </div>
          {project.oneLiner && (
            <p className="mt-0.5 truncate text-sm text-white/45">
              {project.oneLiner}
            </p>
          )}
        </div>
        {typeof total === "number" && (
          <span className="shrink-0 font-mono text-sm font-medium text-accent">
            {total}
            <span className="text-white/30">/100</span>
          </span>
        )}
        <ChevronDown
          size={18}
          className={`shrink-0 text-muted transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="border-t border-hairline px-5 py-6">
          {/* meta del proyecto */}
          {project.members.length > 0 && (
            <p className="text-xs text-white/40">
              <span className="font-mono uppercase tracking-[0.14em]">
                Equipo:
              </span>{" "}
              {project.members.join(", ")}
            </p>
          )}

          <div className="mt-3 flex flex-wrap gap-2">
            <LinkPill href={project.miniAppUrl} label="Mini app">
              <ArrowUpRight size={13} />
            </LinkPill>
            <LinkPill href={project.githubUrl} label="GitHub">
              <Github size={13} />
            </LinkPill>
            <LinkPill href={project.youtubeUrl} label="Video">
              <Youtube size={13} />
            </LinkPill>
          </div>

          {project.description && (
            <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-white/65">
              {project.description}
            </p>
          )}

          {project.contractAddress && (
            <>
              <p className="mt-3 break-all font-mono text-[11px] text-white/35">
                {project.contractAddress} · {project.contractNetwork}
              </p>
              <OnchainMetrics
                entry={onchainEntry}
                network={project.contractNetwork}
              />
            </>
          )}

          {/* rúbrica */}
          <div className="mt-7 flex flex-col gap-6">
            {JURY_CRITERIA.map((c) => (
              <div key={c.key}>
                <div className="flex items-baseline justify-between gap-3">
                  <label className="text-sm font-medium text-white">
                    {c.title}
                  </label>
                  <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                    Peso {c.weight}%
                  </span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-white/40">
                  {c.desc}
                </p>
                <div className="mt-2.5 grid grid-cols-6 gap-1.5 sm:grid-cols-11 sm:gap-2">
                  {SCORE_OPTIONS.map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => {
                        setScores((prev) => ({ ...prev, [c.key]: n }));
                        if (status === "saved") setStatus("idle");
                      }}
                      className={`rounded-lg border py-2 text-sm font-medium transition ${
                        scores[c.key] === n
                          ? "border-accent/40 bg-accent/[0.08] text-accent"
                          : "border-hairline bg-surface text-muted hover:border-white/15 hover:text-white"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <div>
              <label className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                Comentario (opcional)
              </label>
              <textarea
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                  if (status === "saved") setStatus("idle");
                }}
                rows={3}
                placeholder="Notas para la deliberación: fortalezas, dudas, banderas rojas…"
                className="mt-2.5 w-full rounded-lg border border-hairline bg-surface px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 transition-all duration-200 focus:border-accent/45 focus:outline-none focus:ring-2 focus:ring-accent/15"
              />
            </div>

            {error && (
              <p className="rounded-lg border border-red-500/30 bg-red-500/[0.05] px-3.5 py-2.5 text-sm text-red-300">
                {error}
              </p>
            )}

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={save}
                disabled={status === "saving"}
                className="btn-primary disabled:opacity-60"
              >
                {status === "saving" ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    Guardando…
                  </>
                ) : status === "saved" ? (
                  <>
                    <CheckCircle2 size={15} />
                    Guardado
                  </>
                ) : (
                  "Guardar evaluación"
                )}
              </button>
              {typeof total === "number" && (
                <span className="text-sm text-white/50">
                  Total ponderado:{" "}
                  <span className="font-mono font-medium text-white">
                    {total}/100
                  </span>
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- métricas onchain (presentacional; datos cacheados en el portal) ---------- */

function formatNum(n: number): string {
  return n.toLocaleString("es-CO");
}

function OnchainMetrics({
  entry,
  network,
}: {
  entry?: OnchainEntry;
  network: string;
}) {
  const state = entry?.state ?? "loading";
  const metrics = entry?.metrics;
  const explorerUrl = entry?.explorerUrl;

  return (
    <div className="mt-3 rounded-xl border border-hairline bg-surface/60 p-4">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
          Actividad onchain · {network}
        </span>
        {explorerUrl && (
          <a
            href={explorerUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-[11px] text-white/50 transition hover:text-accent"
          >
            Ver en explorer
            <ExternalLink size={11} />
          </a>
        )}
      </div>

      {state === "loading" && (
        <div className="mt-3 flex items-center gap-2 text-sm text-muted">
          <Loader2 size={14} className="animate-spin" />
          Leyendo blockchain…
        </div>
      )}

      {state === "error" && (
        <p className="mt-3 text-sm text-white/45">
          No pudimos leer las métricas. Revísalo directo en el explorer.
        </p>
      )}

      {state === "ready" && metrics && (
        <>
          <div className="mt-3 grid grid-cols-3 gap-3">
            <Metric
              icon={<Activity size={15} />}
              label="Transacciones"
              value={`${formatNum(metrics.transactions)}${
                metrics.capped ? "+" : ""
              }`}
            />
            <Metric
              icon={<Users size={15} />}
              label="Usuarios"
              value={`${formatNum(metrics.users)}${
                metrics.capped ? "+" : ""
              }`}
            />
            <Metric
              icon={<Fuel size={15} />}
              label="Gas (CELO)"
              value={Number(metrics.feesCelo).toLocaleString("es-CO", {
                maximumFractionDigits: 4,
              })}
            />
          </div>
          {metrics.transactions === 0 && (
            <p className="mt-3 text-xs text-amber-300/80">
              Sin actividad onchain registrada — bandera roja según la rúbrica.
            </p>
          )}
          {metrics.capped && (
            <p className="mt-2 text-[11px] text-white/35">
              Conteo parcial (alto volumen). Cifra exacta en el explorer.
            </p>
          )}
        </>
      )}
    </div>
  );
}

function Metric({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-hairline bg-white/[0.015] px-3 py-2.5">
      <div className="flex items-center gap-1.5 text-accent">{icon}</div>
      <div className="mt-1.5 font-mono text-lg font-semibold leading-none text-white">
        {value}
      </div>
      <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
        {label}
      </div>
    </div>
  );
}

function LinkPill({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-surface px-3 py-1.5 text-xs text-white/70 transition hover:border-accent/40 hover:text-accent"
    >
      {children}
      {label}
    </a>
  );
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="section flex min-h-[70vh] flex-col items-center justify-center text-center">
      {children}
    </div>
  );
}
