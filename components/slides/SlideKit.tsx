"use client";

import {
  useCallback,
  useEffect,
  useState,
  type ComponentType,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Pieza compartida para construir decks de slides en el proyecto.
 * Cada `app/slides/<sesion>/page.tsx` define sus diapositivas e importa estos
 * helpers. El `<Deck />` se encarga de la navegación, transiciones y UI.
 */

export const SLIDE_EASE = [0.21, 0.47, 0.32, 0.98] as const;

/* ---------- Frame base ---------- */

export function SlideFrame({ children }: { children: ReactNode }) {
  return (
    <section className="relative h-screen w-screen overflow-hidden bg-ink">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-accent/[0.06] blur-[140px]" />
      <div className="relative z-10 flex h-full w-full flex-col justify-center px-10 py-14 sm:px-16 md:px-24">
        {children}
      </div>
    </section>
  );
}

/* ---------- Tipografía ---------- */

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.18em] text-accent">
      <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_2px_rgba(252,255,82,0.6)]" />
      {children}
    </span>
  );
}

const TITLE_SIZES = {
  md: "text-4xl sm:text-5xl",
  lg: "text-5xl sm:text-6xl md:text-7xl",
  xl: "text-6xl sm:text-7xl md:text-[5.5rem]",
} as const;

export function Title({
  children,
  size = "lg",
  className = "",
}: {
  children: ReactNode;
  size?: keyof typeof TITLE_SIZES;
  className?: string;
}) {
  return (
    <h1
      className={`font-display font-semibold leading-[1.04] tracking-tight text-white ${TITLE_SIZES[size]} ${className}`}
    >
      {children}
    </h1>
  );
}

export function Body({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`text-lg leading-relaxed text-muted sm:text-xl ${className}`}>
      {children}
    </p>
  );
}

/* ---------- Bloque "code/terminal" — para prompts, plantillas, submissions ---------- */

export function CodeBlock({
  filename,
  children,
}: {
  filename?: string;
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-hairline bg-surface">
      <div className="flex items-center gap-2 border-b border-hairline bg-white/[0.02] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        {filename && (
          <span className="ml-3 font-mono text-[11px] uppercase tracking-wider text-muted">
            {filename}
          </span>
        )}
      </div>
      <pre className="whitespace-pre-wrap p-5 font-mono text-[13px] leading-relaxed text-white/85 sm:text-sm">
        {children}
      </pre>
    </div>
  );
}

/* ---------- Deck — navegación y transiciones ---------- */

export function Deck({ slides }: { slides: ComponentType[] }) {
  const [i, setI] = useState(0);
  const total = slides.length;

  const next = useCallback(
    () => setI((v) => Math.min(v + 1, total - 1)),
    [total]
  );
  const prev = useCallback(() => setI((v) => Math.max(v - 1, 0)), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        next();
      } else if (
        e.key === "ArrowLeft" ||
        e.key === "PageUp" ||
        e.key === "Backspace"
      ) {
        e.preventDefault();
        prev();
      } else if (e.key === "Home") {
        setI(0);
      } else if (e.key === "End") {
        setI(total - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, total]);

  const Current = slides[i];
  const progress = ((i + 1) / total) * 100;

  return (
    <div className="fixed inset-0 overflow-hidden bg-ink">
      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.32, ease: SLIDE_EASE }}
          className="h-full w-full"
        >
          <Current />
        </motion.div>
      </AnimatePresence>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-0.5 bg-hairline">
        <div
          className="h-full bg-accent transition-[width] duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="absolute bottom-5 left-5 flex items-center gap-2">
        <button
          type="button"
          onClick={prev}
          disabled={i === 0}
          aria-label="Anterior"
          className="grid h-9 w-9 place-items-center rounded-lg border border-hairline bg-white/[0.02] text-white/60 transition-colors hover:border-white/20 hover:text-white disabled:opacity-30"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          type="button"
          onClick={next}
          disabled={i === total - 1}
          aria-label="Siguiente"
          className="grid h-9 w-9 place-items-center rounded-lg border border-hairline bg-white/[0.02] text-white/60 transition-colors hover:border-white/20 hover:text-white disabled:opacity-30"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="absolute bottom-5 right-5 flex items-center gap-3 font-mono text-xs text-muted">
        <span className="hidden sm:inline">← → para navegar</span>
        <span className="text-white">{String(i + 1).padStart(2, "0")}</span>
        <span>/ {String(total).padStart(2, "0")}</span>
      </div>
    </div>
  );
}
