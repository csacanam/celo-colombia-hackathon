"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  PiggyBank,
  Repeat,
  Send,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import { BUILD_EXAMPLES } from "@/lib/site";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal, staggerChild, staggerParent } from "./ui/Reveal";

const ICONS: Record<string, LucideIcon> = {
  PiggyBank,
  Users,
  Send,
  Repeat,
  TrendingUp,
  MapPin,
};

export function BuildExamples() {
  return (
    <section className="section py-24 sm:py-28">
      <SectionHeading
        eyebrow="¿Qué vas a construir?"
        title={
          <>
            Lo que puedes construir{" "}
            <span className="gradient-text">durante la hackathon.</span>
          </>
        }
      />

      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="mt-14 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {BUILD_EXAMPLES.map((example) => {
          const Icon = ICONS[example.icon] ?? Repeat;
          return (
            <motion.article
              key={example.text}
              variants={staggerChild}
              className="glass glass-hover group flex items-start gap-3.5 rounded-2xl p-5"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/[0.04] text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-ink">
                <Icon size={19} strokeWidth={2} />
              </span>
              <p className="pt-1 text-[15px] font-medium leading-snug text-white/90">
                {example.text}
              </p>
            </motion.article>
          );
        })}
      </motion.div>

      <Reveal delay={0.1}>
        <div className="mx-auto mt-10 max-w-md text-center">
          <p className="text-base text-white">
            No vienes a escuchar teoría.
          </p>
          <p className="text-base text-muted">
            Vienes a construir un proyecto real.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
