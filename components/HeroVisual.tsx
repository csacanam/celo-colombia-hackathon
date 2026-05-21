"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Bot, User } from "lucide-react";

/**
 * Hero graphic — la economía de humanos y agentes, mostrada como un feed
 * de actividad en vivo: pagos reales entre todos los actores. Cada cierto
 * tiempo entra una transacción nueva por arriba y el feed se desplaza.
 */

type Party = "human" | "agent";
type Tx = { id: number; from: Party; to: Party; amount: string; note: string };

const POOL: Omit<Tx, "id">[] = [
  { from: "human", to: "agent", amount: "9.50", note: "le pide una tarea" },
  { from: "agent", to: "agent", amount: "2.00", note: "contrata a otro agente" },
  { from: "agent", to: "human", amount: "64.00", note: "le paga por su trabajo" },
  { from: "human", to: "human", amount: "25.00", note: "le envía a un amigo" },
  { from: "agent", to: "agent", amount: "0.80", note: "compra unos datos" },
  { from: "human", to: "agent", amount: "14.00", note: "activa una suscripción" },
  { from: "agent", to: "human", amount: "120.00", note: "reparte una ganancia" },
  { from: "human", to: "agent", amount: "6.50", note: "paga un servicio" },
];

const VISIBLE = 4;

export function HeroVisual() {
  // Estado inicial determinista (mismo en server y cliente).
  const [rows, setRows] = useState<Tx[]>(() =>
    Array.from({ length: VISIBLE }, (_, i) => ({ id: i, ...POOL[i] }))
  );

  useEffect(() => {
    let next = VISIBLE;
    const interval = window.setInterval(() => {
      setRows((prev) => {
        const row: Tx = { id: next, ...POOL[next % POOL.length] };
        next += 1;
        return [row, ...prev].slice(0, VISIBLE);
      });
    }, 2600);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-[420px]">
      {/* Ambient */}
      <div className="pointer-events-none absolute -inset-10 bg-grid opacity-30" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.13] blur-[90px]" />

      {/* Panel: feed de la economía en vivo */}
      <div className="glass relative overflow-hidden rounded-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-hairline px-4 py-3">
          <span className="flex items-center gap-2 text-[13px] font-semibold text-white">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Economía en vivo
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
            humanos + agentes
          </span>
        </div>

        {/* Feed */}
        <div className="relative h-[280px] overflow-hidden">
          <AnimatePresence initial={false} mode="popLayout">
            {rows.map((tx, i) => (
              <motion.div
                key={tx.id}
                layout
                initial={{ opacity: 0, y: -14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                className={`flex h-[70px] items-center justify-between gap-2 border-b border-hairline px-4 ${
                  i === 0 ? "bg-accent/[0.05]" : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <Avatar type={tx.from} />
                  <motion.span
                    initial={i === 0 ? { scale: 0.6, opacity: 0 } : false}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="grid h-5 w-5 place-items-center rounded-full bg-accent/15"
                  >
                    <ArrowRight size={11} className="text-accent" />
                  </motion.span>
                  <Avatar type={tx.to} />
                </div>

                <div className="flex flex-col items-end">
                  <span className="font-mono text-sm font-semibold text-white">
                    <span className="text-muted">$</span>
                    {tx.amount}
                  </span>
                  <span className="text-[10px] text-muted">{tx.note}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Fade inferior para el efecto de stream */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-ink to-transparent" />
        </div>

        {/* Footer / leyenda */}
        <div className="flex items-center gap-4 border-t border-hairline px-4 py-3">
          <LegendItem type="human" label="Humano" />
          <LegendItem type="agent" label="Agente IA" />
          <span className="ml-auto font-mono text-[10px] uppercase tracking-wider text-muted">
            pagos entre todos
          </span>
        </div>
      </div>
    </div>
  );
}

function Avatar({ type }: { type: Party }) {
  const isAgent = type === "agent";
  const Icon = isAgent ? Bot : User;
  return (
    <span className="flex items-center gap-1.5">
      <span
        className={`grid h-8 w-8 place-items-center rounded-lg ${
          isAgent
            ? "bg-accent text-ink"
            : "bg-white/[0.07] text-white ring-1 ring-white/10"
        }`}
      >
        <Icon size={15} strokeWidth={2.2} />
      </span>
      <span className="text-xs font-medium text-white/80">
        {isAgent ? "Agente" : "Humano"}
      </span>
    </span>
  );
}

function LegendItem({ type, label }: { type: Party; label: string }) {
  const isAgent = type === "agent";
  return (
    <span className="flex items-center gap-1.5">
      <span
        className={`h-2.5 w-2.5 rounded-sm ${
          isAgent ? "bg-accent" : "bg-white/25"
        }`}
      />
      <span className="text-[11px] text-muted">{label}</span>
    </span>
  );
}
