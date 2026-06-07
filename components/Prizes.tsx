"use client";

import { motion } from "framer-motion";
import { Medal, Sparkles, Trophy } from "lucide-react";
import { PRIZES, PRIZE_BONUS, PRIZE_TOTAL } from "@/lib/site";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal, staggerChild, staggerParent } from "./ui/Reveal";

export function Prizes() {
  return (
    <section id="premios" className="relative overflow-hidden py-24 sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-[700px] -translate-x-1/2 rounded-full bg-accent/[0.06] blur-[150px]" />

      <div className="section relative">
        <SectionHeading
          eyebrow="Premios"
          title={
            <>
              Construye una mini app.{" "}
              <span className="gradient-text">
                Compite por premios en efectivo.
              </span>
            </>
          }
          description="Premios en efectivo para las mejores Mini Apps de la hackathon."
        />

        {/* Podio */}
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-14 grid gap-4 md:grid-cols-3"
        >
          {PRIZES.map((prize) => {
            const isFirst = prize.rank === 1;
            const Icon = isFirst ? Trophy : Medal;
            return (
              <motion.article
                key={prize.rank}
                variants={staggerChild}
                className={`group relative flex flex-col overflow-hidden rounded-2xl border p-7 transition-all duration-300 ${
                  isFirst
                    ? "border-accent/40 bg-accent/[0.05] md:-translate-y-3"
                    : "border-hairline bg-white/[0.015] hover:-translate-y-1.5 hover:border-white/15"
                }`}
              >
                {isFirst && (
                  <>
                    <div className="pointer-events-none absolute -inset-px rounded-2xl shadow-[0_0_70px_-16px_rgba(252,255,82,0.6)]" />
                    <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-accent/15 blur-3xl" />
                  </>
                )}

                <div className="relative flex items-center justify-between">
                  <span
                    className={`grid h-11 w-11 place-items-center rounded-xl ${
                      isFirst
                        ? "bg-accent text-ink"
                        : "bg-white/[0.05] text-white/70"
                    }`}
                  >
                    <Icon size={20} strokeWidth={2} />
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                    {prize.place}
                  </span>
                </div>

                <div className="relative mt-8 flex items-baseline gap-1.5">
                  <span
                    className={`font-display text-4xl font-semibold tracking-tight sm:text-[2.6rem] ${
                      isFirst ? "text-accent" : "text-white"
                    }`}
                  >
                    {prize.amount}
                  </span>
                  <span className="font-mono text-sm tracking-wider text-muted">
                    COPm
                  </span>
                </div>

                <p className="relative mt-3 text-sm text-muted">
                  {prize.note}
                </p>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Bonus */}
        <Reveal delay={0.1}>
          <div className="mt-4 flex flex-col gap-5 rounded-2xl border border-dashed border-hairline bg-white/[0.015] p-7 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent">
                <Sparkles size={20} strokeWidth={2} />
              </span>
              <div>
                <h3 className="text-lg font-semibold tracking-tight text-white">
                  {PRIZE_BONUS.title}
                </h3>
                <p className="mt-0.5 text-sm text-muted">
                  {PRIZE_BONUS.detail}
                </p>
              </div>
            </div>
            <div className="flex items-baseline gap-1.5 sm:shrink-0">
              <span className="font-display text-3xl font-semibold tracking-tight text-white">
                {PRIZE_BONUS.amount}
              </span>
              <span className="font-mono text-sm tracking-wider text-muted">
                COPm
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-7 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            Bolsa total · {PRIZE_TOTAL}{" "}
            <span className="normal-case">COPm</span> en premios
          </p>
        </Reveal>
      </div>
    </section>
  );
}
