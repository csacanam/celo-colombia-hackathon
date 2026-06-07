"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  MapPin,
  Presentation,
  Youtube,
  type LucideIcon,
} from "lucide-react";
import { TIMELINE } from "@/lib/site";
import { SectionHeading } from "./ui/SectionHeading";
import { staggerChild, staggerParent } from "./ui/Reveal";

const LINK_ICONS: Record<string, LucideIcon> = {
  Youtube,
  Presentation,
};

export function Timeline() {
  return (
    <section id="agenda" className="section py-24 sm:py-28">
      <SectionHeading
        eyebrow="Agenda"
        title={
          <>
            Tres semanas para{" "}
            <span className="gradient-text">aprender, construir y lanzar.</span>
          </>
        }
        description="Del primer workshop al Demo Day — este es el camino completo."
      />

      <motion.ol
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="relative mx-auto mt-14 max-w-2xl"
      >
        {/* Rail vertical */}
        <div className="absolute bottom-6 left-[19px] top-6 w-px bg-hairline" />

        {TIMELINE.map((step) => (
          <motion.li
            key={step.phase}
            variants={staggerChild}
            className="relative flex gap-4 pb-4 last:pb-0 sm:gap-5"
          >
            {/* Marcador / número */}
            <span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-hairline bg-surface font-mono text-sm font-bold text-accent">
              {step.phase}
            </span>

            {/* Card */}
            <div className="glass glass-hover flex-1 rounded-xl p-5">
              <div className="flex flex-col items-start gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent/[0.06] px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-accent">
                  <CalendarDays size={11} />
                  {step.date}
                </span>
                {"venue" in step && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted">
                    <MapPin size={11} />
                    {step.venue}
                  </span>
                )}
              </div>
              <h3 className="mt-3 text-lg font-semibold tracking-tight text-white">
                {step.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                {step.desc}
              </p>

              {"links" in step && step.links.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {step.links.map((link) => {
                    const Icon = LINK_ICONS[link.icon];
                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/[0.08] px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-accent transition-colors hover:bg-accent/[0.15]"
                      >
                        {Icon && <Icon size={11} />}
                        {link.label}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.li>
        ))}
      </motion.ol>
    </section>
  );
}
