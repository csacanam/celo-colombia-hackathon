"use client";

import { useEffect, useState } from "react";
import { Loader2, Quote } from "lucide-react";

type Feedback = { project: string; es: string; en: string };
type Lang = "es" | "en";
type State = "loading" | "ready" | "error";

export function FeedbackBoard() {
  const [state, setState] = useState<State>("loading");
  const [items, setItems] = useState<Feedback[]>([]);
  const [lang, setLang] = useState<Lang>("es");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/feedback", { cache: "no-store" });
        const json = await res.json();
        if (cancelled) return;
        if (!json.ok) return setState("error");
        setItems(json.feedback ?? []);
        setState("ready");
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
        <p className="mt-4 text-sm text-muted">Cargando…</p>
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
        <span className="eyebrow">Hackathon de Agentes Onchain</span>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          {lang === "es" ? (
            <>
              Lo que dijeron <span className="gradient-text">los builders.</span>
            </>
          ) : (
            <>
              What the <span className="gradient-text">builders said.</span>
            </>
          )}
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/50">
          {lang === "es"
            ? "Testimonios reales de los equipos que construyeron durante la hackathon."
            : "Real testimonials from the teams that built during the hackathon."}
        </p>

        {/* Toggle de idioma */}
        <div className="mt-6 inline-flex rounded-full border border-hairline bg-surface p-1">
          {(["es", "en"] as Lang[]).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              className={`rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] transition ${
                lang === l
                  ? "bg-accent/[0.12] text-accent"
                  : "text-muted hover:text-white"
              }`}
            >
              {l === "es" ? "Español" : "English"}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {items.map((f, i) => {
            const text = lang === "en" && f.en ? f.en : f.es;
            const noTranslation = lang === "en" && !f.en;
            return (
              <figure
                key={i}
                className="flex flex-col rounded-2xl border border-hairline bg-white/[0.015] p-6"
              >
                <Quote size={18} className="text-accent/70" />
                <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-white/80">
                  {text}
                  {noTranslation && (
                    <span className="mt-2 block font-mono text-[10px] uppercase tracking-wider text-muted">
                      (sin traducción · original en español)
                    </span>
                  )}
                </blockquote>
                {f.project && (
                  <figcaption className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                    {f.project}
                  </figcaption>
                )}
              </figure>
            );
          })}
          {items.length === 0 && (
            <p className="text-sm text-muted">Aún no hay testimonios.</p>
          )}
        </div>
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
