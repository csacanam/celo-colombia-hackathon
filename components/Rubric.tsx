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

        <motion.ol
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {RUBRIC_CRITERIA.map((c, i) => (
            <motion.li
              key={c.title}
              variants={staggerChild}
              className="glass glass-hover relative flex flex-col rounded-2xl p-7"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-4xl font-semibold tracking-tight text-accent sm:text-[2.6rem]">
                    {c.weight}
                  </span>
                  <span className="font-mono text-sm text-muted">%</span>
                </div>
              </div>
              <h3 className="mt-6 text-lg font-semibold tracking-tight text-white">
                {c.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {c.desc}
              </p>
            </motion.li>
          ))}
        </motion.ol>

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
