"use client";

import type { ReactNode } from "react";
import {
  ArrowLeftRight,
  ArrowRight,
  Award,
  Ban,
  Bot,
  Calendar,
  Check,
  Code,
  Coins,
  FileCheck,
  Hash,
  HelpCircle,
  KeyRound,
  Layers,
  Lightbulb,
  MapPin,
  PenLine,
  PlayCircle,
  Wallet,
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
 * Bootcamp #2 — Pagos, stablecoins y lógica onchain. 22 slides.
 * ========================================================================= */

const AGENDA_ITEMS = [
  { time: "0:00", title: "Recap y diagnóstico técnico" },
  { time: "0:10", title: "Blockchain explicada para builders web2" },
  { time: "0:30", title: "Cuándo usar blockchain y cuándo no" },
  { time: "0:50", title: "5 patrones simples para la hackathon" },
  { time: "1:15", title: "Demo en vivo — wallet + pago" },
  { time: "1:40", title: "Equipos · escoger integración mínima" },
  { time: "1:55", title: "Cierre y entregable" },
];

const DIAGNOSTIC_QUESTIONS = [
  "¿Quién ya tiene frontend funcionando?",
  "¿Quién ya desplegó la demo?",
  "¿Quién quiere usar stablecoins?",
  "¿Quién necesita smart contract?",
];

const GLOSARIO_TECH: { icon: LucideIcon; term: string; desc: string }[] = [
  {
    icon: Wallet,
    term: "Wallet",
    desc: "Cuenta que firma acciones. Identidad y cuenta de valor en uno.",
  },
  {
    icon: Hash,
    term: "Dirección",
    desc: "El número de cuenta pública. Como tu IBAN, pero onchain.",
  },
  {
    icon: KeyRound,
    term: "Private key",
    desc: "La contraseña maestra. Nunca se comparte. Nunca.",
  },
  {
    icon: PenLine,
    term: "Firma",
    desc: "Autorización criptográfica. Prueba que el usuario aceptó.",
  },
  {
    icon: ArrowLeftRight,
    term: "Transaction",
    desc: "Acción enviada onchain: transferir, registrar, votar, reclamar.",
  },
  {
    icon: Code,
    term: "Smart contract",
    desc: "Programa público con reglas que se ejecutan solas.",
  },
  {
    icon: Award,
    term: "Token",
    desc: "Activo digital: dinero, puntos, acceso, propiedad o derechos.",
  },
  {
    icon: Coins,
    term: "Stablecoin",
    desc: "Token diseñado para mantener valor estable, anclado a una moneda.",
  },
];

const USE_ONCHAIN = [
  "Pagos.",
  "Recompensas.",
  "Transparencia.",
  "Propiedad de activos.",
  "Registro verificable.",
  "Acceso basado en tokens.",
  "Escrow.",
  "Historial público.",
];

const DONT_USE_ONCHAIN = [
  "Una landing.",
  "Información privada sensible.",
  "Lógica que cambia constantemente.",
  "Algo que no necesita verificación.",
];

const PATTERNS: {
  num: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  uses: string[];
}[] = [
  {
    num: "01",
    icon: Wallet,
    title: "Wallet login",
    desc: "El usuario conecta wallet para identificarse.",
    uses: ["Comunidad", "Juegos", "Recompensas", "Votaciones"],
  },
  {
    num: "02",
    icon: Coins,
    title: "Pago en stablecoin",
    desc: "El usuario paga o recibe stablecoins.",
    uses: ["Facturas", "Donaciones", "Marketplaces", "Recompensas", "Cobros"],
  },
  {
    num: "03",
    icon: FileCheck,
    title: "Registro onchain",
    desc: "La app guarda una acción verificable.",
    uses: ["Certificados", "Pruebas de participación", "Logros", "Evidencia de tareas"],
  },
  {
    num: "04",
    icon: Code,
    title: "Smart contract simple",
    desc: "Un contrato administra reglas automáticas.",
    uses: ["Escrow", "Recompensas auto", "Sorteos", "Pools", "Votaciones"],
  },
  {
    num: "05",
    icon: Bot,
    title: "Agente + transacción",
    desc: "La IA interpreta intención y prepara una acción onchain.",
    uses: ["Pagos conversacionales", "Facturas", "Ahorro", "Donaciones"],
  },
];

const DEMO_BASIC = [
  "Agregar campo de wallet en la app.",
  "Conectar wallet si el stack lo permite.",
  "Leer la dirección del usuario.",
  "Simular una recompensa al ganar.",
  "Preparar el pago en stablecoin.",
];

const DEMO_ADVANCED = [
  "Enviar una transferencia pequeña en testnet.",
  "Leer el balance del usuario.",
  "Mostrar el hash de la transacción.",
];

const INTEGRATIONS: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Wallet, title: "Conectar wallet", desc: "Login con MetaMask, RainbowKit o similar." },
  { icon: Hash, title: "Recibir wallet manualmente", desc: "El usuario pega su dirección." },
  { icon: Coins, title: "Leer balance", desc: "Mostrar saldo de stablecoins." },
  { icon: ArrowLeftRight, title: "Enviar pago", desc: "Transferencia de stablecoin en testnet." },
  { icon: FileCheck, title: "Registrar acción", desc: "Guardar evento o logro onchain." },
  { icon: Code, title: "Contrato simple", desc: "Un contrato con 1-2 funciones." },
  { icon: Award, title: "Usar cCOP", desc: "Stablecoin del peso colombiano." },
  { icon: Bot, title: "Tx desde un agente", desc: "El agente prepara, el usuario aprueba." },
];

const CCOP_IDEAS = [
  "Cobro de servicios en cCOP.",
  "Donaciones en cCOP.",
  "Recompensas locales en cCOP.",
  "Facturas para freelancers en cCOP.",
  "Propinas en cCOP.",
  "Marketplace de productos colombianos en cCOP.",
  "App para dividir cuentas en cCOP.",
  "Reto educativo que paga en cCOP.",
  "Registro de pagos comunitarios en cCOP.",
  "Agente que genera links de cobro en cCOP.",
];

const HOMEWORK = [
  "Integración Celo parcialmente funcional.",
  "Flujo principal completo aunque sea simple.",
  "Demo desplegada.",
  "Lista de bugs identificados.",
  "Decisión: agente, IA interna, o solo IA para construir.",
];

const ENTREGABLE_TEMPLATE = `Proyecto:
Integración Celo elegida:
Por qué esa integración importa:
Qué ya funciona:
Qué falta:
Mayor bloqueo técnico:`;

/* ---------- Diapositivas ---------- */

/* 01 — Cover */
function CoverSlide() {
  return (
    <SlideFrame>
      <div className="flex flex-col gap-6">
        <Eyebrow>Hackathon de Agentes Onchain · Celo Colombia</Eyebrow>

        <div className="flex items-baseline gap-6">
          <span className="font-display text-[8rem] font-semibold leading-none tracking-tighter text-accent drop-shadow-[0_0_40px_rgba(252,255,82,0.3)] sm:text-[10rem]">
            03
          </span>
          <span className="font-mono text-sm uppercase tracking-[0.2em] text-muted">
            Sesión · Bootcamp #2
          </span>
        </div>

        <Title size="xl">
          Pagos, stablecoins{" "}
          <span className="gradient-text">y lógica onchain.</span>
        </Title>

        <div className="mt-2 flex flex-col gap-2 font-mono text-base text-white/70 sm:text-lg">
          <span className="flex items-center gap-2.5">
            <PlayCircle size={18} className="text-accent" />
            Martes 9 de junio · 6:00 a 8:00 PM
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

/* 03 — Recap técnico */
function RecapSlide() {
  return (
    <SlideFrame>
      <Eyebrow>0:00 · Diagnóstico técnico</Eyebrow>
      <Title size="md" className="mt-4">
        ¿En qué punto está cada equipo?
      </Title>
      <Body className="mt-4 max-w-2xl">
        Antes de meternos a blockchain, calibremos qué falta.
      </Body>

      <ul className="mt-12 grid max-w-4xl grid-cols-1 gap-3 md:grid-cols-2">
        {DIAGNOSTIC_QUESTIONS.map((q) => (
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

/* 04 — Glosario nivel 2 */
function GlosarioSlide() {
  return (
    <SlideFrame>
      <Eyebrow>0:10 · Blockchain para web2 builders</Eyebrow>
      <Title size="md" className="mt-4">
        El vocabulario que vas a oír toda la noche.
      </Title>

      <div className="mt-10 grid max-w-6xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {GLOSARIO_TECH.map((g) => {
          const Icon = g.icon;
          return (
            <div
              key={g.term}
              className="rounded-xl border border-hairline bg-white/[0.015] p-4"
            >
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent/15 text-accent">
                  <Icon size={15} strokeWidth={2.2} />
                </span>
                <span className="text-sm font-semibold text-white">
                  {g.term}
                </span>
              </div>
              <p className="mt-2 text-xs leading-snug text-muted">{g.desc}</p>
            </div>
          );
        })}
      </div>
    </SlideFrame>
  );
}

/* 05 — Cuándo usar / cuándo no */
function CuandoUsarSlide() {
  return (
    <SlideFrame>
      <Eyebrow>0:30 · Cuándo usar blockchain</Eyebrow>
      <Title size="md" className="mt-4">
        No todo tiene que ir{" "}
        <span className="gradient-text">onchain.</span>
      </Title>

      <div className="mt-10 grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-2">
        {/* Sí usar */}
        <div className="rounded-2xl border border-accent/30 bg-accent/[0.04] p-6">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
            <Check size={13} strokeWidth={3} />
            Sí, si necesitas
          </div>
          <ul className="mt-4 flex flex-col gap-2">
            {USE_ONCHAIN.map((u) => (
              <li
                key={u}
                className="flex items-center gap-2.5 text-base text-white/90"
              >
                <Check size={14} className="text-accent" />
                {u}
              </li>
            ))}
          </ul>
        </div>

        {/* No usar */}
        <div className="rounded-2xl border border-hairline bg-white/[0.015] p-6">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
            <Ban size={13} />
            No, si es
          </div>
          <ul className="mt-4 flex flex-col gap-2">
            {DONT_USE_ONCHAIN.map((u) => (
              <li
                key={u}
                className="flex items-center gap-2.5 text-base text-muted"
              >
                <Ban size={14} className="text-white/30" />
                {u}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SlideFrame>
  );
}

/* 06 — La regla simple */
function ReglaSlide() {
  return (
    <SlideFrame>
      <Eyebrow>La regla simple</Eyebrow>
      <Title size="lg" className="mt-8 max-w-5xl">
        Lo que necesita{" "}
        <span className="gradient-text">confianza, valor o propiedad</span>{" "}
        puede ir onchain.
      </Title>
      <Body className="mt-8 max-w-3xl">
        Lo demás puede vivir tranquilo en tu frontend o tu backend.
      </Body>
    </SlideFrame>
  );
}

/* 07 — 5 patrones overview */
function PatternsOverviewSlide() {
  return (
    <SlideFrame>
      <Eyebrow>0:50 · Los 5 patrones</Eyebrow>
      <Title size="md" className="mt-4">
        Cinco formas en las que tu app{" "}
        <span className="gradient-text">toca onchain.</span>
      </Title>
      <Body className="mt-4 max-w-3xl">
        Casi todo lo que vas a construir cae en uno de estos cinco.
      </Body>

      <ul className="mt-10 grid max-w-5xl grid-cols-1 gap-3">
        {PATTERNS.map((p) => {
          const Icon = p.icon;
          return (
            <li
              key={p.num}
              className="flex items-center gap-5 rounded-xl border border-hairline bg-white/[0.015] p-4"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent/15 text-accent">
                <Icon size={18} strokeWidth={2.2} />
              </span>
              <span className="w-12 shrink-0 font-mono text-sm text-muted">
                {p.num}
              </span>
              <div>
                <span className="text-base font-semibold text-white sm:text-lg">
                  {p.title}
                </span>
                <span className="ml-3 text-sm text-muted">{p.desc}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </SlideFrame>
  );
}

/** Layout reutilizable para cada slide de patrón. */
function PatternSlide({
  num,
  icon: Icon,
  title,
  desc,
  uses,
}: {
  num: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  uses: string[];
}) {
  return (
    <SlideFrame>
      <Eyebrow>Patrón {num} de 05</Eyebrow>

      <div className="mt-6 flex items-center gap-5">
        <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-accent text-ink">
          <Icon size={28} strokeWidth={2.2} />
        </span>
        <Title size="lg">{title}</Title>
      </div>

      <Body className="mt-8 max-w-3xl text-balance">{desc}</Body>

      <div className="mt-12">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
          Ideal para
        </span>
        <div className="mt-4 flex flex-wrap gap-2">
          {uses.map((u) => (
            <span
              key={u}
              className="rounded-full border border-hairline bg-white/[0.02] px-4 py-2 text-sm text-white/85"
            >
              {u}
            </span>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}

/* 08-12 — Los 5 patrones */
function PatternOneSlide() {
  return <PatternSlide {...PATTERNS[0]} />;
}
function PatternTwoSlide() {
  return <PatternSlide {...PATTERNS[1]} />;
}
function PatternThreeSlide() {
  return <PatternSlide {...PATTERNS[2]} />;
}
function PatternFourSlide() {
  return <PatternSlide {...PATTERNS[3]} />;
}
function PatternFiveSlide() {
  return <PatternSlide {...PATTERNS[4]} />;
}

/* 13 — Demo intro */
function DemoIntroSlide() {
  return (
    <SlideFrame>
      <Eyebrow>1:15 · Demo en vivo</Eyebrow>
      <Title size="lg" className="mt-6 max-w-5xl">
        Conectamos Celo Rewards{" "}
        <span className="gradient-text">a wallet y stablecoins.</span>
      </Title>
      <Body className="mt-8 max-w-3xl text-balance">
        Tomamos la app del Bootcamp #1 y le agregamos identidad onchain y un
        flujo de pago.
      </Body>

      <div className="mt-12 flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted">
        <span className="rounded-full border border-hairline bg-white/[0.02] px-3 py-1.5">
          Celo testnet
        </span>
        <span className="rounded-full border border-hairline bg-white/[0.02] px-3 py-1.5">
          Viem / Wagmi
        </span>
        <span className="rounded-full border border-hairline bg-white/[0.02] px-3 py-1.5">
          Wallet connect
        </span>
        <span className="rounded-full border border-accent/30 bg-accent/[0.08] px-3 py-1.5 text-accent">
          En vivo
        </span>
      </div>
    </SlideFrame>
  );
}

/* 14 — Flujo demo básico */
function DemoBasicSlide() {
  return (
    <SlideFrame>
      <Eyebrow>El flujo básico</Eyebrow>
      <Title size="md" className="mt-4">
        Lo que vamos a sumar.
      </Title>

      <ol className="mt-10 grid max-w-5xl grid-cols-1 gap-3 md:grid-cols-2">
        {DEMO_BASIC.map((step, i) => (
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

/* 15 — Versión avanzada */
function DemoAdvancedSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Si vamos rápido</Eyebrow>
      <Title size="md" className="mt-4">
        Versión avanzada —{" "}
        <span className="gradient-text">testnet real.</span>
      </Title>

      <ul className="mt-10 flex max-w-4xl flex-col gap-3">
        {DEMO_ADVANCED.map((step) => (
          <li
            key={step}
            className="flex items-center gap-3 rounded-xl border border-accent/25 bg-accent/[0.05] p-4"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent text-ink">
              <ArrowRight size={16} strokeWidth={2.6} />
            </span>
            <span className="text-base text-white sm:text-lg">{step}</span>
          </li>
        ))}
      </ul>

      <p className="mt-8 max-w-3xl text-sm text-muted">
        Si no llegamos hasta acá en vivo, queda como ejemplo para revisar en
        casa.
      </p>
    </SlideFrame>
  );
}

/* 16 — Trabajo equipos intro */
function TeamWorkIntroSlide() {
  return (
    <SlideFrame>
      <Eyebrow>1:40 · Su turno</Eyebrow>
      <Title size="lg" className="mt-6 max-w-5xl">
        Cada equipo escoge{" "}
        <span className="gradient-text">una integración mínima.</span>
      </Title>
      <Body className="mt-8 max-w-3xl text-balance">
        No la más impresionante. La que mejor demuestre el valor de su producto.
      </Body>
    </SlideFrame>
  );
}

/* 17 — Lista de integraciones */
function IntegrationsListSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Las 8 opciones</Eyebrow>
      <Title size="md" className="mt-4">
        Escoge solo una. Hazla bien.
      </Title>

      <div className="mt-10 grid max-w-6xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {INTEGRATIONS.map((it) => {
          const Icon = it.icon;
          return (
            <div
              key={it.title}
              className="rounded-xl border border-hairline bg-white/[0.015] p-4"
            >
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent/15 text-accent">
                <Icon size={16} strokeWidth={2.2} />
              </span>
              <p className="mt-3 text-sm font-semibold text-white">
                {it.title}
              </p>
              <p className="mt-1 text-xs leading-snug text-muted">{it.desc}</p>
            </div>
          );
        })}
      </div>
    </SlideFrame>
  );
}

/* 18 — Criterio para escoger */
function CriterioSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Cómo escoger</Eyebrow>
      <Title size="lg" className="mt-8 max-w-5xl">
        No escojan la integración más impresionante.{" "}
        <span className="gradient-text">
          Escojan la que demuestre el valor de su producto.
        </span>
      </Title>
      <Body className="mt-10 max-w-3xl">
        Si su app vale por el pago, hagan el pago. Si vale por la identidad, hagan
        el login. Si vale por la prueba, hagan el registro.
      </Body>
    </SlideFrame>
  );
}

/* 19 — Ideas cCOP */
function CCOPIdeasSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Bonus · 1.000.000 COPm</Eyebrow>
      <Title size="md" className="mt-4">
        10 ideas para integrar{" "}
        <span className="gradient-text">cCOP / COPm.</span>
      </Title>
      <Body className="mt-4 max-w-3xl">
        Hasta 10 proyectos · 100.000 COPm cada uno. Si te encaja una, vas
        directo al bonus.
      </Body>

      <ul className="mt-10 grid max-w-6xl grid-cols-1 gap-2.5 md:grid-cols-2">
        {CCOP_IDEAS.map((idea, i) => (
          <li
            key={idea}
            className="flex items-start gap-3 rounded-xl border border-hairline bg-white/[0.015] p-3.5"
          >
            <span className="font-mono text-xs text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-sm text-white/85">{idea}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 inline-flex items-center gap-2.5 rounded-2xl border border-hairline bg-white/[0.02] px-5 py-3">
        <Lightbulb size={16} className="text-accent" />
        <span className="text-sm text-white/75">
          El stablecoin del peso colombiano vive en Celo. Integrarlo es 100k
          extra.
        </span>
      </div>
    </SlideFrame>
  );
}

/* 20 — Entregable */
function EntregableSlide() {
  return (
    <SlideFrame>
      <Eyebrow>1:55 · Antes de irse</Eyebrow>
      <Title size="md" className="mt-4">
        Publiquen esto{" "}
        <span className="gradient-text">en el grupo.</span>
      </Title>

      <div className="mt-8 max-w-3xl">
        <CodeBlock filename="entregable-bootcamp-2.md">
          {ENTREGABLE_TEMPLATE}
        </CodeBlock>
      </div>
    </SlideFrame>
  );
}

/* 21 — Homework */
function HomeworkSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Para llegar a Bootcamp #3</Eyebrow>
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

/* 22 — Nos vemos en Bootcamp #3 */
function NextSessionSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Continúa el viernes</Eyebrow>
      <Title size="lg" className="mt-6 max-w-5xl">
        Nos vemos en{" "}
        <span className="gradient-text">Bootcamp #3.</span>
      </Title>
      <Body className="mt-6 max-w-3xl">
        Agentes onchain, distribución y preparación para el Demo Day.
      </Body>

      <div className="mt-12 flex flex-col gap-2 font-mono text-base text-white/70 sm:text-lg">
        <span className="flex items-center gap-2.5">
          <Calendar size={18} className="text-accent" />
          Viernes 12 de junio · 6:00 a 8:00 PM
        </span>
        <span className="flex items-center gap-2.5">
          <MapPin size={18} className="text-accent" />
          Universidad Icesi, Cali · y virtual
        </span>
      </div>

      <div className="mt-12 inline-flex items-center gap-2.5 rounded-2xl border border-accent/25 bg-accent/[0.06] px-5 py-3">
        <Layers size={16} className="text-accent" />
        <span className="text-sm text-white/85">
          Vengan con su integración Celo funcionando, aunque sea simple.
        </span>
      </div>
    </SlideFrame>
  );
}

/* ---------- Deck ---------- */

const SLIDES = [
  CoverSlide,
  AgendaSlide,
  RecapSlide,
  GlosarioSlide,
  CuandoUsarSlide,
  ReglaSlide,
  PatternsOverviewSlide,
  PatternOneSlide,
  PatternTwoSlide,
  PatternThreeSlide,
  PatternFourSlide,
  PatternFiveSlide,
  DemoIntroSlide,
  DemoBasicSlide,
  DemoAdvancedSlide,
  TeamWorkIntroSlide,
  IntegrationsListSlide,
  CriterioSlide,
  CCOPIdeasSlide,
  EntregableSlide,
  HomeworkSlide,
  NextSessionSlide,
];

export default function BootcampTwoDeck() {
  return <Deck slides={SLIDES} />;
}
