"use client";

import type { ReactNode } from "react";
import {
  Activity,
  ArrowRight,
  Award,
  Ban,
  Calendar,
  Check,
  Coins,
  Compass,
  Cpu,
  HelpCircle,
  Home,
  Layers,
  Lightbulb,
  MapPin,
  MousePointer2,
  PlayCircle,
  Sparkles,
  Store,
  Users,
  Wallet,
  Wand2,
  type LucideIcon,
} from "lucide-react";
import {
  Body,
  CodeBlock,
  Deck,
  Eyebrow,
  SlideFrame,
  Title,
} from "@/components/slides/SlideKit";

/* =========================================================================
 * Bootcamp #1 — De cero a mini app. 24 slides según la Sesión 1 del doc.
 * ========================================================================= */

/* ---------- Datos ---------- */

const AGENDA_ITEMS = [
  { time: "0:00", title: "Recap del Kickoff" },
  { time: "0:10", title: "Cómo elegir una buena idea" },
  { time: "0:30", title: "Anatomía de una mini app" },
  { time: "0:50", title: "Stack recomendado por nivel" },
  { time: "1:15", title: "Demo en vivo · Celo Rewards Quiz" },
  { time: "1:40", title: "Trabajo por equipos" },
  { time: "1:55", title: "Cierre y entregable" },
];

const ACTIVATION_QUESTIONS = [
  "¿Ya tengo equipo?",
  "¿Ya tengo idea?",
  "¿No sé qué construir?",
  "¿Necesito ayuda técnica desde cero?",
];

const CRITERIOS = [
  "Es pequeña.",
  "Se explica en una frase.",
  "Tiene una acción clara del usuario.",
  "Tiene una integración onchain simple.",
  "Se demuestra en menos de 3 minutos.",
  "Tiene potencial de continuidad después del demo.",
];

const EJEMPLOS_BUENOS = [
  "Una mini app para que estudiantes reciban recompensas en stablecoins por completar retos educativos.",
  "Un agente que ayuda a freelancers a crear facturas y cobrar en cCOP.",
  "Una app para que comunidades creen campañas de donación transparentes en Celo.",
  "Un juego de trivia donde los ganadores reciben recompensas en stablecoins.",
];

const EJEMPLOS_GRANDES = [
  "Un banco descentralizado para toda Latinoamérica.",
  "Un marketplace completo para todos los comercios de Colombia.",
  "Una super app financiera con pagos, lending, inversión y remesas.",
];

const REDUCCIONES = [
  {
    big: "Banco descentralizado",
    small: "App de ahorro semanal en stablecoins.",
  },
  {
    big: "Marketplace completo",
    small: "Directorio de 10 comercios que aceptan cCOP.",
  },
  {
    big: "Super app de remesas",
    small: "Simulador de envío y recepción con stablecoins.",
  },
];

const ANATOMIA: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Home, title: "Home", desc: "Explica qué hace la app." },
  { icon: MousePointer2, title: "Acción principal", desc: "La tarea central que ejecuta el usuario." },
  { icon: Activity, title: "Estado", desc: "Muestra qué pasó después de la acción." },
  { icon: Wallet, title: "Wallet / usuario", desc: "Identifica a la persona o su cuenta." },
  { icon: Check, title: "Resultado", desc: "Pago, registro, recompensa o comprobante." },
];

const CELO_REWARDS_APPLIED = [
  { part: "Home", text: "«Gana recompensas por completar retos sobre Celo.»" },
  { part: "Acción", text: "Completar 3 preguntas del quiz." },
  { part: "Estado", text: "Puntaje del usuario en pantalla." },
  { part: "Wallet", text: "Conectar wallet o pegar dirección manual." },
  { part: "Resultado", text: "Recompensa registrada para entrega." },
];

const STACKS = [
  {
    icon: Layers,
    tag: "Opción 1",
    title: "La más simple",
    desc: "Intermedio. El camino balanceado entre velocidad y control.",
  },
  {
    icon: Wand2,
    tag: "Opción 2",
    title: "Para no técnicos",
    desc: "Visual builders + IA. Construyes sin escribir todo a mano.",
  },
  {
    icon: Cpu,
    tag: "Opción 3",
    title: "Para más avanzados",
    desc: "Smart contracts propios y agentes con frameworks reales.",
  },
];

const STACK_SIMPLE: { layer: string; items: string }[] = [
  { layer: "Frontend", items: "Vite + React + Tailwind" },
  { layer: "Backend", items: "Supabase, Firebase o Express" },
  { layer: "Deploy", items: "Vercel" },
  { layer: "IA para construir", items: "Cursor + Claude / ChatGPT" },
  { layer: "Blockchain", items: "Viem / Wagmi + Celo" },
];

const STACK_NO_CODE: { layer: string; items: string }[] = [
  { layer: "Prototipo", items: "Lovable, Bolt, Replit o v0" },
  { layer: "Backend", items: "Supabase" },
  { layer: "Blockchain", items: "Asistido por mentor" },
];

const STACK_AVANZADO: { layer: string; items: string }[] = [
  { layer: "Framework", items: "Next.js + API routes" },
  { layer: "Smart contracts", items: "Solidity" },
  { layer: "Blockchain", items: "Viem / Wagmi + Celo testnet/mainnet" },
  { layer: "IA", items: "OpenAI API o agent framework" },
];

const DEMO_FLOW = [
  "Usuario entra a la app.",
  "Responde 3 preguntas sobre Celo.",
  "Deja su wallet o pega su dirección.",
  "La app calcula puntaje.",
  "Si gana, queda registrado para recibir recompensa.",
  "En Bootcamp #2 conectamos el pago onchain real.",
];

const TEAM_TASKS = [
  "Nombre del proyecto.",
  "Usuario objetivo.",
  "Problema que resuelve.",
  "Flujo de 3 pantallas.",
  "Acción onchain principal.",
  "Qué parte usará IA.",
  "Qué pueden tener listo para Bootcamp #2.",
];

const TRACKS: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Award,
    title: "Mini apps de recompensas",
    desc: "Trivias, retos, hábitos. Mobile-first y virales.",
  },
  {
    icon: Coins,
    title: "Pagos y cobros con stablecoins",
    desc: "Facturas, links de pago, splits, propinas, cobros locales.",
  },
  {
    icon: Sparkles,
    title: "Agentes financieros simples",
    desc: "IA que ayuda a ahorrar, cobrar, dividir o explicar.",
  },
  {
    icon: Users,
    title: "Comunidades y coordinación",
    desc: "Donaciones, fondos, recompensas, votaciones.",
  },
  {
    icon: Store,
    title: "Comercio local",
    desc: "Directorios, cashback, registros de pago con cCOP.",
  },
];

const HOMEWORK = [
  "Home funcional.",
  "Flujo principal mockeado.",
  "Repositorio creado.",
  "Demo desplegada o corriendo local.",
  "Decisión clara sobre la integración Celo.",
];

const PROMPT_MAESTRO = `Actúa como un senior full-stack engineer y product mentor
para una hackathon de Celo.

Quiero construir una mini app llamada [NOMBRE].

Contexto:
- Usuario objetivo: [USUARIO]
- Problema: [PROBLEMA]
- Acción principal: [ACCIÓN]
- Integración con Celo: [WALLET / STABLECOIN / SMART CONTRACT / TX]
- Uso de IA: [DESCRIPCIÓN]
- Nivel técnico del equipo: [PRINCIPIANTE / INTERMEDIO / AVANZADO]

Ayúdame a:
1. Reducir el alcance para que sea viable en una hackathon.
2. Definir las pantallas principales.
3. Definir el stack recomendado.
4. Crear una lista de tareas paso a paso.
5. Escribir el primer código del frontend.
6. Explicar cada decisión de forma simple.

No propongas una app gigante. Prioriza un MVP demostrable
en 3 minutos.`;

const ENTREGABLE_TEMPLATE = `Proyecto:
Equipo:
Usuario:
Problema:
Flujo principal:
Integración Celo:
Uso de IA:
Link GitHub:
Link demo si ya existe:`;

/* ---------- Helper local — slot tipo placeholder ---------- */

function Slot({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-lg bg-accent/[0.1] px-2.5 py-0.5 font-display font-semibold text-accent ring-1 ring-accent/30">
      {children}
    </span>
  );
}

/* ---------- Diapositivas ---------- */

/* 01 — Cover */
function CoverSlide() {
  return (
    <SlideFrame>
      <div className="flex flex-col gap-6">
        <Eyebrow>Hackathon de Agentes Onchain · Celo Colombia</Eyebrow>

        <div className="flex items-baseline gap-6">
          <span className="font-display text-[8rem] font-semibold leading-none tracking-tighter text-accent drop-shadow-[0_0_40px_rgba(252,255,82,0.3)] sm:text-[10rem]">
            02
          </span>
          <span className="font-mono text-sm uppercase tracking-[0.2em] text-muted">
            Sesión · Bootcamp #1
          </span>
        </div>

        <Title size="xl">
          De cero a{" "}
          <span className="gradient-text">mini app.</span>
        </Title>

        <div className="mt-2 flex flex-col gap-2 font-mono text-base text-white/70 sm:text-lg">
          <span className="flex items-center gap-2.5">
            <PlayCircle size={18} className="text-accent" />
            Viernes 5 de junio · 6:00 a 8:00 PM
          </span>
          <span className="flex items-center gap-2.5">
            <MapPin size={18} className="text-accent" />
            Universidad Icesi, Cali · y virtual
          </span>
        </div>
      </div>
    </SlideFrame>
  );
}

/* 02 — Agenda */
function AgendaSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Agenda · 2 horas</Eyebrow>
      <Title size="md" className="mt-4">
        El recorrido de hoy.
      </Title>

      <ol className="mt-10 grid max-w-4xl grid-cols-1 gap-x-12 gap-y-3 md:grid-cols-2">
        {AGENDA_ITEMS.map((item) => (
          <li
            key={item.time}
            className="flex items-baseline gap-4 border-b border-hairline pb-3"
          >
            <span className="w-12 shrink-0 font-mono text-sm font-semibold text-accent">
              {item.time}
            </span>
            <span className="text-base text-white/85 sm:text-lg">
              {item.title}
            </span>
          </li>
        ))}
      </ol>
    </SlideFrame>
  );
}

/* 03 — Recap */
function RecapSlide() {
  return (
    <SlideFrame>
      <Eyebrow>0:00 · Recap</Eyebrow>
      <Title size="lg" className="mt-6 max-w-5xl">
        El Kickoff fue conceptos.{" "}
        <span className="gradient-text">Hoy bajamos a tierra.</span>
      </Title>
      <Body className="mt-8 max-w-3xl text-balance">
        Lo que viste —Celo, MiniPay, mini apps, agentes, Proof of Ship— ahora
        se convierte en código. La siguiente hora la pasamos eligiendo qué
        construir.
      </Body>

      <div className="mt-12 inline-flex items-center gap-2.5 rounded-2xl border border-hairline bg-white/[0.02] px-5 py-3">
        <Compass size={18} className="text-accent" />
        <span className="text-base text-white/75">
          Empezamos calibrando dónde estás.
        </span>
      </div>
    </SlideFrame>
  );
}

/* 04 — Activation */
function ActivationSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Calibremos</Eyebrow>
      <Title size="md" className="mt-4">
        ¿Dónde estás hoy?
      </Title>
      <Body className="mt-4 max-w-2xl">
        Levanta la mano si sí. Nos sirve para ajustar el ritmo de la sesión.
      </Body>

      <ul className="mt-12 grid max-w-4xl grid-cols-1 gap-3 md:grid-cols-2">
        {ACTIVATION_QUESTIONS.map((q) => (
          <li
            key={q}
            className="flex items-center gap-3 rounded-2xl border border-hairline bg-white/[0.015] p-5"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent/15 text-accent">
              <HelpCircle size={17} />
            </span>
            <span className="text-lg text-white">{q}</span>
          </li>
        ))}
      </ul>
    </SlideFrame>
  );
}

/* 05 — 6 criterios */
function CriteriosSlide() {
  return (
    <SlideFrame>
      <Eyebrow>0:10 · Cómo elegir</Eyebrow>
      <Title size="md" className="mt-4 max-w-4xl">
        Una buena idea de hackathon{" "}
        <span className="gradient-text">cumple 6 cosas.</span>
      </Title>

      <ol className="mt-10 grid max-w-5xl grid-cols-1 gap-3 sm:grid-cols-2">
        {CRITERIOS.map((c, i) => (
          <li
            key={c}
            className="flex items-center gap-4 rounded-xl border border-hairline bg-white/[0.015] p-4"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent text-ink font-mono text-sm font-bold">
              {i + 1}
            </span>
            <span className="text-base text-white/90 sm:text-lg">{c}</span>
          </li>
        ))}
      </ol>
    </SlideFrame>
  );
}

/* 06 — La fórmula */
function FormulaSlide() {
  return (
    <SlideFrame>
      <Eyebrow>La fórmula</Eyebrow>
      <Title size="md" className="mt-4">
        Si la puedes llenar, la puedes construir.
      </Title>

      <div className="mt-12 max-w-5xl rounded-3xl border border-hairline bg-white/[0.015] p-8 sm:p-10">
        <p className="font-display text-2xl leading-[1.5] tracking-tight text-white/55 sm:text-4xl sm:leading-[1.45]">
          Estamos construyendo una mini app para{" "}
          <Slot>[usuario]</Slot>
          {" "}que le permite{" "}
          <Slot>[acción]</Slot>
          {" "}usando{" "}
          <Slot>[IA / stablecoins / blockchain]</Slot>
          {" "}para lograr{" "}
          <Slot>[resultado]</Slot>
          .
        </p>
      </div>

      <p className="mt-6 max-w-3xl text-sm text-muted">
        Si una de las casillas no tiene respuesta clara, todavía no tienes
        idea — tienes intuición.
      </p>
    </SlideFrame>
  );
}

/* 07 — Ejemplos buenos */
function BuenosSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Lo que sí cabe</Eyebrow>
      <Title size="md" className="mt-4">
        Así se ven las ideas que funcionan.
      </Title>

      <ul className="mt-10 flex max-w-5xl flex-col gap-3">
        {EJEMPLOS_BUENOS.map((ex) => (
          <li
            key={ex}
            className="flex items-start gap-4 rounded-xl border border-accent/25 bg-accent/[0.05] p-4"
          >
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent text-ink">
              <Check size={16} strokeWidth={2.8} />
            </span>
            <span className="pt-1 text-base leading-relaxed text-white/90 sm:text-lg">
              {ex}
            </span>
          </li>
        ))}
      </ul>
    </SlideFrame>
  );
}

/* 08 — Ejemplos grandes */
function GrandesSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Lo que NO cabe</Eyebrow>
      <Title size="md" className="mt-4">
        Y así se ven las que no caben en una hackathon.
      </Title>

      <ul className="mt-10 flex max-w-5xl flex-col gap-3">
        {EJEMPLOS_GRANDES.map((ex) => (
          <li
            key={ex}
            className="flex items-start gap-4 rounded-xl border border-hairline bg-white/[0.015] p-4"
          >
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/[0.05] text-white/40">
              <Ban size={15} />
            </span>
            <span className="pt-1 text-base leading-relaxed text-muted sm:text-lg">
              {ex}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-8 max-w-3xl text-sm text-muted">
        No es que sean malas ideas. Es que no se pueden demostrar en 3 minutos.
      </p>
    </SlideFrame>
  );
}

/* 09 — Cómo reducir */
function ReducirSlide() {
  return (
    <SlideFrame>
      <Eyebrow>El truco</Eyebrow>
      <Title size="md" className="mt-4">
        Cómo achicar una idea grande.
      </Title>

      <div className="mt-10 flex max-w-5xl flex-col gap-3">
        {REDUCCIONES.map((r) => (
          <div
            key={r.big}
            className="grid grid-cols-1 items-center gap-3 rounded-xl border border-hairline bg-white/[0.015] p-5 md:grid-cols-[1fr_auto_1.5fr]"
          >
            <span className="text-lg text-muted line-through decoration-white/20">
              {r.big}
            </span>
            <ArrowRight
              size={18}
              className="hidden text-accent md:inline"
            />
            <span className="text-base font-medium text-white sm:text-lg">
              {r.small}
            </span>
          </div>
        ))}
      </div>
    </SlideFrame>
  );
}

/* Wireframe de celular — usado en AnatomiaSlide */
function PhoneWireframe() {
  const sections = [
    {
      num: "01",
      content: (
        <div className="px-3 py-2.5">
          <p className="font-display text-[12px] font-semibold leading-tight text-white">
            Mini app
          </p>
          <p className="mt-0.5 text-[9px] text-muted">
            Una acción clara para un usuario.
          </p>
        </div>
      ),
    },
    {
      num: "02",
      content: (
        <div className="rounded-lg bg-accent px-3 py-2.5 text-center text-[11px] font-semibold text-ink">
          Acción principal →
        </div>
      ),
    },
    {
      num: "03",
      content: (
        <div className="flex items-center justify-between rounded-lg border border-hairline bg-white/[0.03] px-3 py-2 font-mono text-[10px]">
          <span className="text-white/70">Estado actual</span>
          <span className="text-accent">en proceso</span>
        </div>
      ),
    },
    {
      num: "04",
      content: (
        <div className="flex items-center gap-2 rounded-lg border border-hairline bg-white/[0.03] px-3 py-2">
          <span className="grid h-5 w-5 place-items-center rounded bg-accent/15">
            <Wallet size={11} className="text-accent" />
          </span>
          <span className="font-mono text-[10px] text-muted">
            0x12a…3f9b
          </span>
        </div>
      ),
    },
    {
      num: "05",
      content: (
        <div className="flex items-center gap-2 rounded-lg border border-accent/30 bg-accent/[0.1] px-3 py-2 text-[11px] text-accent">
          <Check size={12} strokeWidth={3} />
          Resultado
        </div>
      ),
    },
  ];

  return (
    <div className="relative mx-auto w-[280px]">
      <div className="absolute -inset-5 rounded-[3rem] bg-accent/[0.1] blur-2xl" />
      <div className="relative rounded-[2.5rem] border-2 border-white/10 bg-surface p-3 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]">
        {/* Speaker */}
        <div className="mx-auto mb-2.5 mt-2 h-1 w-12 rounded-full bg-white/15" />
        {/* Screen */}
        <div className="space-y-2.5 rounded-[1.75rem] bg-ink p-3.5">
          {sections.map((s) => (
            <div key={s.num} className="flex items-stretch gap-2">
              <span className="flex w-8 shrink-0 items-center justify-center rounded-md bg-accent/15 font-mono text-[10px] font-bold text-accent">
                {s.num}
              </span>
              <div className="flex-1">{s.content}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* 10 — Anatomía */
function AnatomiaSlide() {
  return (
    <SlideFrame>
      <Eyebrow>0:30 · Anatomía</Eyebrow>
      <Title size="md" className="mt-4">
        Toda mini app tiene{" "}
        <span className="gradient-text">las mismas 5 partes.</span>
      </Title>

      <div className="mt-10 grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-[auto_1fr] md:gap-14">
        <PhoneWireframe />

        <ol className="flex flex-col gap-3.5">
          {ANATOMIA.map((p, i) => {
            const Icon = p.icon;
            return (
              <li key={p.title} className="flex items-start gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent/15 font-mono text-xs font-bold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <h3 className="flex items-center gap-2 text-base font-semibold tracking-tight text-white sm:text-lg">
                    <Icon size={15} className="text-accent" />
                    {p.title}
                  </h3>
                  <p className="mt-0.5 text-sm leading-snug text-muted">
                    {p.desc}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </SlideFrame>
  );
}

/* 11 — Celo Rewards Quiz aplicado */
function CeloRewardsSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Ejemplo aplicado</Eyebrow>
      <Title size="md" className="mt-4">
        Celo Rewards Quiz —{" "}
        <span className="gradient-text">parte por parte.</span>
      </Title>

      <div className="mt-10 max-w-4xl overflow-hidden rounded-2xl border border-hairline">
        {CELO_REWARDS_APPLIED.map((row) => (
          <div
            key={row.part}
            className="grid grid-cols-[120px_1fr] border-b border-hairline last:border-b-0 sm:grid-cols-[200px_1fr]"
          >
            <span className="bg-white/[0.02] px-5 py-4 font-mono text-[11px] uppercase tracking-[0.16em] text-accent sm:text-xs">
              {row.part}
            </span>
            <span className="px-5 py-4 text-base text-white/85 sm:text-lg">
              {row.text}
            </span>
          </div>
        ))}
      </div>
    </SlideFrame>
  );
}

/* 12 — Stack — 3 opciones */
function StackOptionsSlide() {
  return (
    <SlideFrame>
      <Eyebrow>0:50 · El stack</Eyebrow>
      <Title size="md" className="mt-4">
        Tres rutas según tu nivel.
      </Title>

      <div className="mt-10 grid max-w-5xl grid-cols-1 gap-3 md:grid-cols-3">
        {STACKS.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.tag}
              className="flex flex-col gap-3 rounded-2xl border border-hairline bg-white/[0.015] p-6"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/15 text-accent">
                <Icon size={18} strokeWidth={2.2} />
              </span>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                  {s.tag}
                </span>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {s.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </SlideFrame>
  );
}

/** Layout reutilizable para detalle de un stack. */
function StackDetail({
  tag,
  title,
  icon: Icon,
  layers,
}: {
  tag: string;
  title: ReactNode;
  icon: LucideIcon;
  layers: { layer: string; items: string }[];
}) {
  return (
    <SlideFrame>
      <Eyebrow>{tag}</Eyebrow>
      <Title size="md" className="mt-4">
        {title}
      </Title>

      <div className="mt-10 max-w-3xl overflow-hidden rounded-2xl border border-hairline">
        {layers.map((l) => (
          <div
            key={l.layer}
            className="flex items-baseline justify-between gap-6 border-b border-hairline px-6 py-4 last:border-b-0"
          >
            <span className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
              <Icon size={14} />
              {l.layer}
            </span>
            <span className="text-right font-mono text-sm text-white sm:text-base">
              {l.items}
            </span>
          </div>
        ))}
      </div>
    </SlideFrame>
  );
}

/* 13 — Opción 1 detalle */
function StackSimpleSlide() {
  return (
    <StackDetail
      tag="Opción 1 · La más simple"
      title={
        <>
          El stack <span className="gradient-text">balanceado.</span>
        </>
      }
      icon={Layers}
      layers={STACK_SIMPLE}
    />
  );
}

/* 14 — Opción 2 detalle */
function StackNoCodeSlide() {
  return (
    <StackDetail
      tag="Opción 2 · Para no técnicos"
      title={
        <>
          Construye <span className="gradient-text">sin escribir todo.</span>
        </>
      }
      icon={Wand2}
      layers={STACK_NO_CODE}
    />
  );
}

/* 15 — Opción 3 detalle */
function StackAdvancedSlide() {
  return (
    <StackDetail
      tag="Opción 3 · Para más avanzados"
      title={
        <>
          Contratos y agentes{" "}
          <span className="gradient-text">de verdad.</span>
        </>
      }
      icon={Cpu}
      layers={STACK_AVANZADO}
    />
  );
}

/* 16 — Mensaje clave del stack */
function StackMessageSlide() {
  return (
    <SlideFrame>
      <Eyebrow>La regla</Eyebrow>
      <Title size="xl" className="mt-8 max-w-5xl">
        No los obligamos a usar el mismo stack.{" "}
        <span className="gradient-text">
          Lo importante es desplegar algo funcional.
        </span>
      </Title>
      <Body className="mt-10 max-w-3xl">
        Si tu equipo va más rápido con Lovable, perfecto. Si quieres escribir
        Solidity, perfecto. La hackathon premia ejecución, no el setup.
      </Body>
    </SlideFrame>
  );
}

/* 17 — Demo en vivo intro */
function DemoIntroSlide() {
  return (
    <SlideFrame>
      <Eyebrow>1:15 · Demo en vivo</Eyebrow>
      <Title size="lg" className="mt-6 max-w-5xl">
        Ahora lo construyo{" "}
        <span className="gradient-text">con IA, en directo.</span>
      </Title>
      <Body className="mt-8 max-w-3xl text-balance">
        Celo Rewards Quiz — la base funcional en menos de 25 minutos, usando
        Cursor y Claude.
      </Body>

      <div className="mt-12 flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted">
        <span className="rounded-full border border-hairline bg-white/[0.02] px-3 py-1.5">
          Cursor
        </span>
        <span className="rounded-full border border-hairline bg-white/[0.02] px-3 py-1.5">
          Claude
        </span>
        <span className="rounded-full border border-hairline bg-white/[0.02] px-3 py-1.5">
          Vite + React
        </span>
        <span className="rounded-full border border-hairline bg-white/[0.02] px-3 py-1.5">
          Tailwind
        </span>
        <span className="rounded-full border border-accent/30 bg-accent/[0.08] px-3 py-1.5 text-accent">
          En vivo
        </span>
      </div>
    </SlideFrame>
  );
}

/* 18 — Flujo de la demo */
function DemoFlowSlide() {
  return (
    <SlideFrame>
      <Eyebrow>El flujo</Eyebrow>
      <Title size="md" className="mt-4">
        Lo que vamos a tener al final.
      </Title>

      <ol className="mt-10 grid max-w-5xl grid-cols-1 gap-3 md:grid-cols-2">
        {DEMO_FLOW.map((step, i) => (
          <li
            key={step}
            className="flex items-start gap-3 rounded-xl border border-hairline bg-white/[0.015] p-4"
          >
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent/15 font-mono text-xs font-bold text-accent">
              {i + 1}
            </span>
            <span className="pt-1.5 text-base text-white/85 sm:text-lg">
              {step}
            </span>
          </li>
        ))}
      </ol>
    </SlideFrame>
  );
}

/* 19 — Trabajo por equipos */
function TeamWorkSlide() {
  return (
    <SlideFrame>
      <Eyebrow>1:40 · Su turno</Eyebrow>
      <Title size="md" className="mt-4">
        Definan su proyecto{" "}
        <span className="gradient-text">en 20 minutos.</span>
      </Title>

      <ul className="mt-10 grid max-w-5xl grid-cols-1 gap-2.5 md:grid-cols-2">
        {TEAM_TASKS.map((t) => (
          <li
            key={t}
            className="flex items-center gap-3 rounded-xl border border-hairline bg-white/[0.015] p-3.5"
          >
            <Check size={16} className="shrink-0 text-accent" />
            <span className="text-base text-white/85">{t}</span>
          </li>
        ))}
      </ul>

      <p className="mt-8 max-w-3xl text-sm text-muted">
        Si no llegan a todo, no importa. La idea es que salgan con un{" "}
        <span className="text-white">enunciado claro</span> de lo que van a
        construir.
      </p>
    </SlideFrame>
  );
}

/* 20 — Prompt maestro */
function PromptSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Tu prompt para arrancar</Eyebrow>
      <Title size="md" className="mt-4">
        Copia esto en Cursor o ChatGPT.
      </Title>

      <div className="mt-8 max-w-4xl">
        <CodeBlock filename="prompt-maestro.txt">{PROMPT_MAESTRO}</CodeBlock>
      </div>
    </SlideFrame>
  );
}

/* 21 — Banco de ideas */
function TracksSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Si todavía no tienes idea</Eyebrow>
      <Title size="md" className="mt-4">
        5 tracks{" "}
        <span className="gradient-text">donde puedes buscar.</span>
      </Title>

      <ul className="mt-10 grid max-w-6xl grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {TRACKS.map((t) => {
          const Icon = t.icon;
          return (
            <li
              key={t.title}
              className="flex items-start gap-3 rounded-xl border border-hairline bg-white/[0.015] p-4"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent/15 text-accent">
                <Icon size={17} strokeWidth={2.2} />
              </span>
              <div>
                <p className="text-base font-semibold text-white">{t.title}</p>
                <p className="mt-1 text-sm leading-snug text-muted">{t.desc}</p>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-8 inline-flex items-center gap-2.5 rounded-2xl border border-hairline bg-white/[0.02] px-5 py-3">
        <Lightbulb size={16} className="text-accent" />
        <span className="text-sm text-white/75">
          En el grupo dejamos 8 ideas concretas con integración Celo lista.
        </span>
      </div>
    </SlideFrame>
  );
}

/* 22 — Entregable */
function EntregableSlide() {
  return (
    <SlideFrame>
      <Eyebrow>1:55 · Antes de irse</Eyebrow>
      <Title size="md" className="mt-4">
        Publiquen esto{" "}
        <span className="gradient-text">en el grupo.</span>
      </Title>

      <div className="mt-8 max-w-3xl">
        <CodeBlock filename="entregable.md">{ENTREGABLE_TEMPLATE}</CodeBlock>
      </div>
    </SlideFrame>
  );
}

/* 23 — Homework */
function HomeworkSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Para llegar a Bootcamp #2</Eyebrow>
      <Title size="md" className="mt-4">
        Lo que cada equipo trae listo.
      </Title>

      <ul className="mt-10 grid max-w-4xl grid-cols-1 gap-3">
        {HOMEWORK.map((h) => (
          <li
            key={h}
            className="flex items-center gap-3 rounded-xl border border-hairline bg-white/[0.015] p-4"
          >
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-hairline text-accent">
              <Check size={14} />
            </span>
            <span className="text-base text-white/85 sm:text-lg">{h}</span>
          </li>
        ))}
      </ul>
    </SlideFrame>
  );
}

/* 24 — Nos vemos en Bootcamp #2 */
function NextSessionSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Continúa el martes</Eyebrow>
      <Title size="lg" className="mt-6 max-w-5xl">
        Nos vemos en{" "}
        <span className="gradient-text">Bootcamp #2.</span>
      </Title>
      <Body className="mt-6 max-w-3xl">
        Wallets, stablecoins y cómo conectar dinero programable dentro de tus
        apps.
      </Body>

      <div className="mt-12 flex flex-col gap-2 font-mono text-base text-white/70 sm:text-lg">
        <span className="flex items-center gap-2.5">
          <Calendar size={18} className="text-accent" />
          Martes 9 de junio · 6:00 a 8:00 PM
        </span>
        <span className="flex items-center gap-2.5">
          <MapPin size={18} className="text-accent" />
          Universidad Icesi, Cali · y virtual
        </span>
      </div>

      <div className="mt-12 max-w-md">
        <Body className="text-sm">
          Vengan con su <span className="text-white">home funcional</span>{" "}
          desplegado. Eso desbloquea todo lo de la siguiente sesión.
        </Body>
      </div>
    </SlideFrame>
  );
}

/* ---------- Deck ---------- */

const SLIDES = [
  CoverSlide,
  AgendaSlide,
  RecapSlide,
  ActivationSlide,
  CriteriosSlide,
  FormulaSlide,
  BuenosSlide,
  GrandesSlide,
  ReducirSlide,
  AnatomiaSlide,
  CeloRewardsSlide,
  StackOptionsSlide,
  StackSimpleSlide,
  StackNoCodeSlide,
  StackAdvancedSlide,
  StackMessageSlide,
  DemoIntroSlide,
  DemoFlowSlide,
  TeamWorkSlide,
  PromptSlide,
  TracksSlide,
  EntregableSlide,
  HomeworkSlide,
  NextSessionSlide,
];

export default function BootcampOneDeck() {
  return <Deck slides={SLIDES} />;
}
