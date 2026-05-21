"use client";

import { motion } from "framer-motion";
import { ArrowRight, CalendarDays } from "lucide-react";
import { HeroVisual } from "./HeroVisual";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 sm:pt-32">
      {/* Backdrop layers */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[460px] w-[860px] -translate-x-1/2 rounded-full bg-accent/[0.08] blur-[150px]" />
      <div className="pointer-events-none absolute -top-20 right-0 h-[320px] w-[420px] rounded-full bg-accent/[0.05] blur-[140px]" />

      <div className="section relative grid items-center gap-12 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pb-28">
        {/* Copy */}
        <div className="text-center lg:text-left">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="eyebrow !tracking-[0.13em]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_2px_rgba(252,255,82,0.6)]" />
            Hackathon híbrida · Presencial + Virtual · Celo Colombia
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 22, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.08 }}
            className="mt-6 text-balance text-4xl font-semibold leading-[1.04] sm:text-5xl lg:text-[3.5rem]"
          >
            Construye{" "}
            <span className="gradient-text">agentes con IA y stablecoins</span>{" "}
            en la hackathon más futurista de Colombia.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
            className="mx-auto mt-6 max-w-xl text-balance text-base leading-relaxed text-muted sm:text-lg lg:mx-0"
          >
            Aprende Vibe Coding desde cero, construye agentes y mini apps, y
            compite por premios en efectivo.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row lg:items-start"
          >
            <a href="#aplicar" className="btn-primary w-full sm:w-auto">
              Aplicar a la hackathon
              <ArrowRight size={17} />
            </a>
            <a href="#agenda" className="btn-ghost w-full sm:w-auto">
              <CalendarDays size={16} />
              Ver agenda
            </a>
          </motion.div>
        </div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
          className="order-first lg:order-none"
        >
          <HeroVisual />
        </motion.div>
      </div>
    </section>
  );
}
