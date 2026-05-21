"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

type RevealProps = {
  children: ReactNode;
  /** Seconds of delay before the element animates in. */
  delay?: number;
  /** Adds a soft blur-to-sharp reveal on top of the fade up. */
  blur?: boolean;
  /** Travel distance in px for the upward motion. */
  y?: number;
  className?: string;
  as?: "div" | "li" | "span";
};

/**
 * Fade-up reveal triggered once when the element scrolls into view.
 * Respects prefers-reduced-motion through Framer Motion's reduced-motion handling.
 */
export function Reveal({
  children,
  delay = 0,
  blur = false,
  y = 22,
  className,
  as = "div",
}: RevealProps) {
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={{
        opacity: 0,
        y,
        filter: blur ? "blur(10px)" : "blur(0px)",
      }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  );
}

/** Variants for a parent that staggers its direct children. */
export const staggerParent: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: EASE },
  },
};
