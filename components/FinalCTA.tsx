"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./ui/Reveal";

export function FinalCTA() {
  return (
    <section className="section py-24 sm:py-32">
      <div className="relative overflow-hidden rounded-3xl border border-hairline bg-surface px-6 py-16 text-center sm:px-12 sm:py-20">
        {/* Glow + grid backdrop */}
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" />
        <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[620px] -translate-x-1/2 rounded-full bg-accent/[0.12] blur-[130px]" />
        <div className="pointer-events-none absolute -bottom-28 left-1/2 h-64 w-[480px] -translate-x-1/2 rounded-full bg-accent/[0.06] blur-[130px]" />

        <div className="relative">
          <Reveal>
            <span className="eyebrow">El momento es ahora</span>
          </Reveal>
          <Reveal delay={0.08} blur>
            <h2 className="mx-auto mt-6 max-w-3xl text-balance text-3xl font-semibold leading-[1.12] sm:text-[2.9rem]">
              Durante tres semanas, Colombia va a construir{" "}
              <span className="gradient-text">agentes onchain.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-5 max-w-md text-balance text-base text-muted sm:text-lg">
              ¿Vas a estar dentro o mirando desde afuera?
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <motion.a
              href="/equipos"
              whileHover={{ y: -2 }}
              className="btn-primary mt-9 !px-8 !py-4 text-base"
            >
              Entregar proyecto
              <ArrowRight size={18} />
            </motion.a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
