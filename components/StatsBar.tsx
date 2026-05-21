"use client";

import { motion } from "framer-motion";
import { STATS } from "@/lib/site";
import { staggerChild, staggerParent } from "./ui/Reveal";

export function StatsBar() {
  return (
    <section className="section">
      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="glass grid grid-cols-2 rounded-2xl lg:grid-cols-4"
      >
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            variants={staggerChild}
            className={`group flex flex-col items-center gap-1 px-5 py-7 text-center transition-colors hover:bg-white/[0.02] ${
              i % 2 === 1 ? "border-l border-hairline" : ""
            } ${i >= 2 ? "border-t border-hairline" : ""} lg:border-t-0 ${
              i > 0 ? "lg:border-l lg:border-hairline" : ""
            }`}
          >
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-3xl font-semibold tracking-tight text-white transition-all duration-300 group-hover:[text-shadow:0_0_24px_rgba(252,255,82,0.5)] sm:text-4xl">
                {stat.value}
              </span>
              {stat.unit && (
                <span className="font-mono text-xs tracking-wider text-accent">
                  {stat.unit}
                </span>
              )}
            </div>
            <span className="text-sm text-muted">{stat.label}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
