"use client";

import { motion } from "framer-motion";
import { ERAS } from "@/lib/site";
import { Reveal, staggerChild, staggerParent } from "./ui/Reveal";

export function WhySection() {
  return (
    <section className="relative py-24 sm:py-28">
      <div className="section grid items-center gap-14 lg:grid-cols-[1fr_1fr] lg:gap-16">
        {/* Narrative */}
        <div>
          <Reveal>
            <span className="eyebrow">¿Por qué esto importa?</span>
          </Reveal>
          <Reveal delay={0.08} blur>
            <h2 className="mt-5 text-balance text-3xl font-semibold leading-[1.12] sm:text-4xl">
              La IA ya escribe código.{" "}
              <span className="gradient-text">
                Ahora los agentes también podrán usar dinero.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 text-base leading-relaxed text-muted">
              Agentes que usan wallets, stablecoins y pagos onchain van a
              abrir una nueva generación de apps en internet.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-7 text-base leading-relaxed text-muted">
              Durante esta hackathon, builders de toda Colombia construirán
              agentes y miniapps de la mano de la comunidad de Celo Colombia.
            </p>
          </Reveal>
        </div>

        {/* Eras visual */}
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="flex flex-col gap-3"
        >
          {ERAS.map((era, i) => {
            const active = i === ERAS.length - 1;
            return (
              <motion.div
                key={era.title}
                variants={staggerChild}
                className={`relative rounded-2xl border p-5 transition-colors ${
                  active
                    ? "border-accent/35 bg-accent/[0.06]"
                    : "border-hairline bg-white/[0.015]"
                }`}
              >
                {active && (
                  <div className="pointer-events-none absolute -inset-px rounded-2xl shadow-[0_0_50px_-14px_rgba(252,255,82,0.55)]" />
                )}
                <div className="flex items-center gap-3">
                  <span
                    className={`font-mono text-[10px] uppercase tracking-[0.16em] ${
                      active ? "text-accent" : "text-white/40"
                    }`}
                  >
                    {era.tag}
                  </span>
                  <span className="h-px flex-1 bg-hairline" />
                  <span className="font-mono text-[10px] text-white/25">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-2.5 text-lg font-semibold text-white">
                  {era.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  {era.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
