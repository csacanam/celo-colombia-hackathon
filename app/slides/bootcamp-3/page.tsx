"use client";

import { Ban, Mic } from "lucide-react";
import {
  Body,
  Deck,
  Eyebrow,
  SlideFrame,
  Title,
} from "@/components/slides/SlideKit";

/* =========================================================================
 * Bootcamp #3 · Una sola slide enfocada en el pitch de Demo Day.
 * ========================================================================= */

const PITCH_STEPS = [
  {
    num: "01",
    time: "20s",
    title: "Hook",
    desc: "¿Qué problema resolvés y para quién? Empezá con el dolor.",
  },
  {
    num: "02",
    time: "30s",
    title: "Solución",
    desc: "Tu app en una frase. Por qué onchain. Qué deja de existir sin Celo.",
  },
  {
    num: "03",
    time: "90s",
    title: "Demo en vivo",
    desc: "Una sola acción · la que demuestra el valor. La pantalla habla.",
  },
  {
    num: "04",
    time: "20s",
    title: "Stack + Celo",
    desc: "Qué construiste y cómo usaste Celo / MiniPay / stablecoins / agentes.",
  },
  {
    num: "05",
    time: "20s",
    title: "Próximos pasos",
    desc: "Qué vas a seguir construyendo después de hoy. La visión.",
  },
];

const AVOID = [
  "No expliques qué es blockchain.",
  "No muestres código.",
  "No leas la slide.",
  "No abras con 'Hola, somos el equipo X'.",
  "No dependas del wifi del auditorio.",
  "No salgas sin haber cronometrado.",
];

function PitchSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Demo Day · pitch de 3 minutos</Eyebrow>
      <Title size="md" className="mt-4">
        Cómo armar tu pitch para{" "}
        <span className="gradient-text">ganar el Demo Day.</span>
      </Title>
      <Body className="mt-4 max-w-3xl">
        Tres minutos. Sin más. Esta es la estructura que funciona.
      </Body>

      <div className="mt-10 grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Estructura · 5 pasos */}
        <ol className="flex flex-col gap-3 lg:col-span-2">
          {PITCH_STEPS.map((s) => (
            <li
              key={s.num}
              className="flex items-start gap-4 rounded-xl border border-hairline bg-white/[0.015] p-4"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent/15 font-mono text-xs font-bold text-accent">
                {s.num}
              </span>
              <div className="flex-1">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-base font-semibold text-white">
                    {s.title}
                  </span>
                  <span className="font-mono text-xs text-accent">
                    {s.time}
                  </span>
                </div>
                <p className="mt-1 text-sm leading-snug text-muted">
                  {s.desc}
                </p>
              </div>
            </li>
          ))}
        </ol>

        {/* Evita esto */}
        <div className="rounded-2xl border border-hairline bg-white/[0.015] p-5 lg:col-span-1">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
            <Ban size={13} />
            Evitá esto
          </div>
          <ul className="mt-4 flex flex-col gap-2.5">
            {AVOID.map((a) => (
              <li key={a} className="flex items-start gap-2 text-sm text-muted">
                <Ban size={14} className="mt-0.5 text-white/30" />
                {a}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 inline-flex items-center gap-2.5 rounded-2xl border border-accent/30 bg-accent/[0.06] px-5 py-3">
        <Mic size={16} className="text-accent" />
        <span className="text-sm text-white/85">
          Cronométralo. Si pasa de 3 minutos, recortá el hook · no la demo.
        </span>
      </div>
    </SlideFrame>
  );
}

const SLIDES = [PitchSlide];

export default function BootcampThreeDeck() {
  return <Deck slides={SLIDES} />;
}
