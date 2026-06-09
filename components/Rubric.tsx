"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { RUBRIC_CRITERIA, RUBRIC_GATES } from "@/lib/site";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal, staggerChild, staggerParent } from "./ui/Reveal";

export function Rubric() {
  return (
    <section id="rubrica" className="relative overflow-hidden py-24 sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-[700px] -translate-x-1/2 rounded-full bg-accent/[0.05] blur-[150px]" />

      <div className="section relative">
        <SectionHeading
          eyebrow="Transparencia"
          title={
            <>
              Cómo{" "}
              <span className="gradient-text">elegimos a los ganadores.</span>
            </>
          }
          description="Compartimos los criterios desde el día uno. Sin sorpresas — alineados con cómo Celo evalúa proyectos en su programa de builders."
        />

        <Reveal delay={0.12}>
          <div className="mt-14 overflow-hidden rounded-2xl border border-hairline bg-white/[0.015]">
            {/* Header */}
            <div className="hidden grid-cols-12 gap-4 border-b border-hairline bg-white/[0.02] px-6 py-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted md:grid">
              <span className="col-span-1">#</span>
              <span className="col-span-4">Criterio</span>
              <span className="col-span-1 text-right">Peso</span>
              <span className="col-span-6">Qué evaluamos</span>
            </div>

            <motion.ol
              variants={staggerParent}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
            >
              {RUBRIC_CRITERIA.map((c, i) => (
                <motion.li
                  key={c.title}
                  variants={staggerChild}
                  className={`grid grid-cols-1 gap-3 px-6 py-5 md:grid-cols-12 md:gap-4 md:py-6 ${
                    i < RUBRIC_CRITERIA.length - 1
                      ? "border-b border-hairline"
                      : ""
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-4 md:contents">
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted md:col-span-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex items-baseline gap-1 md:hidden">
                      <span className="font-display text-2xl font-semibold tracking-tight text-accent">
                        {c.weight}
                      </span>
                      <span className="font-mono text-xs text-muted">%</span>
                    </div>
                  </div>
                  <h3 className="text-base font-semibold tracking-tight text-white sm:text-lg md:col-span-4">
                    {c.title}
                  </h3>
                  <div className="hidden items-baseline justify-end gap-1 md:col-span-1 md:flex">
                    <span className="font-display text-2xl font-semibold tracking-tight text-accent">
                      {c.weight}
                    </span>
                    <span className="font-mono text-xs text-muted">%</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted md:col-span-6">
                    {c.desc}
                  </p>
                </motion.li>
              ))}
            </motion.ol>

            {/* Footer total */}
            <div className="grid grid-cols-12 gap-4 border-t border-hairline bg-white/[0.02] px-6 py-4">
              <span className="col-span-5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted md:col-span-5">
                Total
              </span>
              <div className="col-span-7 flex items-baseline justify-end gap-1 md:col-span-7">
                <span className="font-display text-xl font-semibold tracking-tight text-white">
                  100
                </span>
                <span className="font-mono text-xs text-muted">%</span>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-4 rounded-2xl border border-dashed border-hairline bg-white/[0.015] p-6 sm:p-7">
            <div className="flex items-start gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent">
                <ShieldCheck size={20} strokeWidth={2} />
              </span>
              <div className="flex-1">
                <h3 className="text-base font-semibold tracking-tight text-white">
                  Requisitos mínimos para entrar a evaluación
                </h3>
                <p className="mt-1 text-sm text-muted">
                  Si falta alguno, el proyecto no se puntúa.
                </p>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {RUBRIC_GATES.map((g) => (
                    <li
                      key={g}
                      className="flex items-start gap-2.5 text-sm text-white/85"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {g}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.22}>
          <p className="mt-7 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            Alineado con Proof of Ship · MiniPay App Fit
          </p>
        </Reveal>
      </div>
    </section>
  );
}
