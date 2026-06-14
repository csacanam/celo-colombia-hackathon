import type { Metadata } from "next";
import {
  Check,
  Clock,
  Mic,
  ShieldCheck,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Submit } from "@/components/Submit";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import {
  RUBRIC_CRITERIA,
  RUBRIC_GATES,
  SUBMIT_DEADLINE_LABEL,
} from "@/lib/site";

const PAGE_TITLE = "Guía para equipos · Demo Day · Hackathon Celo Colombia";
const PAGE_DESCRIPTION =
  "Todo lo que necesitas para presentar tu proyecto: rúbrica, pitch, demo y formulario. El formulario cierra el viernes 19 de junio a la 1:00 PM (hora Colombia).";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/equipos" },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "/equipos",
    siteName: "Hackathon de Agentes Onchain",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
};

const BEFORE_SUBMIT = [
  "Mini app desplegada y accesible públicamente.",
  "Repositorio público en GitHub con cambios reales.",
  "Contrato inteligente desplegado en Celo Mainnet o Sepolia.",
  "Video de demostración de máximo 3 min en YouTube (público).",
  "Descripción clara: qué es, para quién, qué hace.",
  "Frase de presentación pulida (≤ 140 caracteres).",
  "WhatsApp del contacto del equipo para coordinar premios.",
];

const PITCH_STEPS = [
  {
    num: "01",
    time: "20s",
    title: "Apertura",
    desc: "¿Qué problema resuelves y para quién? Empieza con el dolor.",
  },
  {
    num: "02",
    time: "30s",
    title: "Solución",
    desc: "Tu app en una frase. Por qué en blockchain. Qué deja de existir sin Celo.",
  },
  {
    num: "03",
    time: "90s",
    title: "Demostración en vivo",
    desc: "Una sola acción · la que demuestra el valor. La pantalla habla.",
  },
  {
    num: "04",
    time: "20s",
    title: "Tecnología + Celo",
    desc: "Qué construiste y cómo usaste Celo, MiniPay, stablecoins o agentes.",
  },
  {
    num: "05",
    time: "20s",
    title: "Próximos pasos",
    desc: "Qué vas a seguir construyendo después de hoy. La visión.",
  },
];

const DEMO_SHOW = [
  "El problema, contado en 15 segundos.",
  "La app abierta y funcional, en vivo.",
  "El flujo principal de principio a fin · el usuario abre, hace algo, ve un resultado.",
  "La transacción en blockchain visible · identificador o confirmación en pantalla.",
  "Una mirada al contrato en Celoscan (opcional pero potente).",
];

const FINAL_TIPS = [
  "Cronometra tu presentación al menos una vez antes del Demo Day.",
  "Una sola demostración bien contada gana a cinco mal contadas.",
  "No expliques qué es blockchain · deja que la app hable por sí sola.",
  "Si el wifi del auditorio falla, tu video grabado es el respaldo.",
  "Llena el formulario antes del cierre · viernes 19 de junio · 1:00 PM.",
];

export default function EquiposPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Header */}
        <section className="relative overflow-hidden pt-28 sm:pt-32">
          <div className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-accent/[0.08] blur-[150px]" />
          <div className="section relative pb-16 sm:pb-20">
            <Reveal>
              <span className="eyebrow">Para equipos · Demo Day</span>
            </Reveal>
            <Reveal delay={0.08} blur>
              <h1 className="mt-5 max-w-3xl text-balance text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
                Todo lo que necesitas{" "}
                <span className="gradient-text">
                  para presentar tu proyecto.
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 max-w-xl text-base text-white/60 sm:text-lg">
                Léelo, prepárate, llena el formulario antes del cierre. El Demo
                Day es el viernes 19 de junio.
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <div className="mt-7 inline-flex items-center gap-2.5 rounded-full border border-accent/30 bg-accent/[0.06] px-4 py-2">
                <Clock size={14} className="text-accent" />
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                  Cierre del formulario
                </span>
                <span className="text-sm text-white/85">
                  {SUBMIT_DEADLINE_LABEL}
                </span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 01 · Antes de entregar */}
        <section className="section py-16 sm:py-20">
          <SectionHeading
            eyebrow="01 · Antes de entregar"
            title={
              <>
                Esto tiene que estar{" "}
                <span className="gradient-text">listo.</span>
              </>
            }
            description="Lo mínimo. Si te falta alguno, no podrán evaluarte."
            align="left"
          />
          <Reveal delay={0.1}>
            <ul className="mt-10 grid max-w-4xl gap-3 md:grid-cols-2">
              {BEFORE_SUBMIT.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-hairline bg-white/[0.015] p-4"
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                    <Check size={14} strokeWidth={2.6} />
                  </span>
                  <span className="pt-0.5 text-sm text-white/85 sm:text-base">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* 02 · El pitch */}
        <section className="section py-16 sm:py-20">
          <SectionHeading
            eyebrow="02 · La presentación"
            title={
              <>
                Tres minutos.{" "}
                <span className="gradient-text">Cinco pasos.</span>
              </>
            }
            description="Esta es la estructura que funciona. Cronómetro en mano."
            align="left"
          />
          <Reveal delay={0.1}>
            <ol className="mt-10 grid max-w-4xl gap-3">
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
          </Reveal>
        </section>

        {/* 03 · La demo */}
        <section className="section py-16 sm:py-20">
          <SectionHeading
            eyebrow="03 · La demostración"
            title={
              <>
                Qué tiene que verse{" "}
                <span className="gradient-text">en pantalla.</span>
              </>
            }
            description="No leas las diapositivas. La pantalla hace el trabajo."
            align="left"
          />
          <Reveal delay={0.1}>
            <ul className="mt-10 grid max-w-4xl gap-3">
              {DEMO_SHOW.map((item, i) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-hairline bg-white/[0.015] p-4"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent/15 font-mono text-xs font-bold text-accent">
                    {i + 1}
                  </span>
                  <span className="pt-1.5 text-sm text-white/85 sm:text-base">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* 04 · Cómo se evalúa */}
        <section className="section py-16 sm:py-20">
          <SectionHeading
            eyebrow="04 · Cómo se evalúa"
            title={
              <>
                Estos son{" "}
                <span className="gradient-text">los criterios.</span>
              </>
            }
            description="Sin sorpresas. La rúbrica está pública desde el día uno."
            align="left"
          />
          <Reveal delay={0.1}>
            <div className="mt-10 overflow-hidden rounded-2xl border border-hairline bg-white/[0.015]">
              <div className="hidden grid-cols-12 gap-4 border-b border-hairline bg-white/[0.02] px-6 py-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted md:grid">
                <span className="col-span-1">#</span>
                <span className="col-span-4">Criterio</span>
                <span className="col-span-1 text-right">Peso</span>
                <span className="col-span-6">Qué evaluamos</span>
              </div>
              <ol>
                {RUBRIC_CRITERIA.map((c, i) => (
                  <li
                    key={c.title}
                    className={`grid grid-cols-1 gap-3 px-6 py-5 md:grid-cols-12 md:gap-4 md:py-6 ${
                      i < RUBRIC_CRITERIA.length - 1
                        ? "border-b border-hairline"
                        : ""
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-4 md:contents">
                      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted md:col-span-1">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex items-baseline gap-1 md:hidden">
                        <span className="font-display text-2xl font-semibold tracking-tight text-accent">
                          {c.weight}
                        </span>
                        <span className="font-mono text-xs text-muted">%</span>
                      </div>
                    </div>
                    <h3 className="text-base font-semibold tracking-tight text-white sm:text-lg md:col-span-4">
                      {c.title}
                    </h3>
                    <div className="hidden items-baseline justify-end gap-1 md:col-span-1 md:flex">
                      <span className="font-display text-2xl font-semibold tracking-tight text-accent">
                        {c.weight}
                      </span>
                      <span className="font-mono text-xs text-muted">%</span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted md:col-span-6">
                      {c.desc}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-4 max-w-6xl rounded-2xl border border-dashed border-hairline bg-white/[0.015] p-6 sm:p-7">
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent">
                  <ShieldCheck size={20} strokeWidth={2} />
                </span>
                <div className="flex-1">
                  <h3 className="text-base font-semibold tracking-tight text-white">
                    Requisitos mínimos para entrar a evaluación
                  </h3>
                  <p className="mt-1 text-sm text-muted">
                    Si falta alguno, el proyecto no se puntúa.
                  </p>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {RUBRIC_GATES.map((g) => (
                      <li
                        key={g}
                        className="flex items-start gap-2.5 text-sm text-white/85"
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {g}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* 05 · Recomendaciones finales */}
        <section className="section py-16 sm:py-20">
          <SectionHeading
            eyebrow="05 · Antes de subirlo"
            title={
              <>
                Cinco cosas que{" "}
                <span className="gradient-text">marcan la diferencia.</span>
              </>
            }
            description="Lo aprendemos viendo demos que vuelan y demos que se quedan cortas."
            align="left"
          />
          <Reveal delay={0.1}>
            <ul className="mt-10 grid max-w-4xl gap-3">
              {FINAL_TIPS.map((tip) => (
                <li
                  key={tip}
                  className="flex items-start gap-3 rounded-xl border border-hairline bg-white/[0.015] p-4"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent/15 text-accent">
                    <Mic size={14} strokeWidth={2.2} />
                  </span>
                  <span className="pt-1.5 text-sm text-white/85 sm:text-base">
                    {tip}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* 06 · Form de entrega */}
        <Submit />
      </main>
      <Footer />
    </>
  );
}
