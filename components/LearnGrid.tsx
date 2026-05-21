"use client";

import { motion } from "framer-motion";
import {
  Bot,
  Coins,
  LayoutGrid,
  Rocket,
  Sparkles,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { SKILLS } from "@/lib/site";
import { SectionHeading } from "./ui/SectionHeading";
import { staggerChild, staggerParent } from "./ui/Reveal";

const ICONS: Record<string, LucideIcon> = {
  Sparkles,
  Coins,
  Bot,
  LayoutGrid,
  Wallet,
  Rocket,
};

export function LearnGrid() {
  return (
    <section className="section py-24 sm:py-28">
      <SectionHeading
        eyebrow="¿Qué aprenderás?"
        title={
          <>
            Lo necesario para construir{" "}
            <span className="gradient-text">
              agentes y mini apps onchain.
            </span>
          </>
        }
        description="Durante el bootcamp y la hackathon aprenderás a usar herramientas modernas de IA y tecnologías onchain para pasar de idea a proyecto funcional."
      />

      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="mt-14 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {SKILLS.map((skill, i) => {
          const Icon = ICONS[skill.icon] ?? Sparkles;
          return (
            <motion.article
              key={skill.title}
              variants={staggerChild}
              className="glass glass-hover group relative overflow-hidden rounded-2xl p-6"
            >
              {/* Hover glow wash */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/[0.04] text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-ink">
                  <Icon size={20} strokeWidth={2} />
                </span>
                <span className="font-mono text-xs text-white/20">
                  0{i + 1}
                </span>
              </div>

              <h3 className="mt-5 text-lg font-semibold tracking-tight text-white">
                {skill.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/50">
                {skill.desc}
              </p>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
}
