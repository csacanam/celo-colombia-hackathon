"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { FAQS } from "@/lib/site";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section py-24 sm:py-28">
      <SectionHeading
        eyebrow="FAQ"
        title={
          <>
            Preguntas <span className="gradient-text">frecuentes.</span>
          </>
        }
      />

      <div className="mx-auto mt-12 flex max-w-2xl flex-col gap-3">
        {FAQS.map((faq, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={faq.q} delay={i * 0.05}>
              <div
                className={`overflow-hidden rounded-xl border transition-colors duration-300 ${
                  isOpen
                    ? "border-white/15 bg-white/[0.03]"
                    : "border-white/[0.07] bg-white/[0.012]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-[18px] text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-[15px] font-medium text-white">
                    {faq.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-full transition-colors ${
                      isOpen
                        ? "bg-accent text-ink"
                        : "bg-white/[0.05] text-white/60"
                    }`}
                  >
                    <Plus size={15} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="flex flex-col gap-2.5 px-5 pb-5 pr-12">
                        {faq.a.map((paragraph, idx) => (
                          <p
                            key={idx}
                            className="text-sm leading-relaxed text-white/55"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
