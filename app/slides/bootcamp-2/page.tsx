"use client";

import {
  ArrowLeftRight,
  Ban,
  Calendar,
  Check,
  Code,
  Coins,
  Database,
  Globe,
  Hash,
  HelpCircle,
  KeyRound,
  Layers,
  Lightbulb,
  MapPin,
  PlayCircle,
  Search,
  Smartphone,
  Wallet,
  Zap,
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
 * Bootcamp #2 — Persistencia, wallets y tu primer contrato. 23 slides.
 * ========================================================================= */

const AGENDA_ITEMS = [
  { time: "0:00", title: "Recap y diagnóstico" },
  { time: "0:05", title: "Las 3 capas de una miniapp" },
  { time: "0:15", title: "Wallets 101 + Celoscan" },
  { time: "0:25", title: "MiniPay = la wallet del usuario" },
  { time: "0:35", title: "Stablecoins en Celo" },
  { time: "0:45", title: "BD vs blockchain · qué guardo dónde" },
  { time: "1:00", title: "Gas como principio de diseño" },
  { time: "1:05", title: "Smart contracts: el mínimo viable" },
  { time: "1:20", title: "Demo en vivo" },
  { time: "1:35", title: "Equipos · arquitectura y contrato" },
  { time: "1:50", title: "Entregable y cierre" },
];

const DIAGNOSTIC_QUESTIONS = [
  "¿Quién ya tiene frontend en Vercel?",
  "¿Quién ya conectó dominio o GitHub?",
  "¿Quién sabe qué va a guardar y dónde?",
  "¿Quién entiende qué es un smart contract?",
];

const LAYERS: { icon: LucideIcon; label: string; role: string; tools: string }[] = [
  {
    icon: Globe,
    label: "Frontend",
    role: "Lo que el usuario ve y toca.",
    tools: "Next.js · React · Vercel",
  },
  {
    icon: Database,
    label: "Base de datos",
    role: "Lo que la app recuerda y procesa.",
    tools: "Supabase · Postgres · APIs",
  },
  {
    icon: Layers,
    label: "Blockchain",
    role: "Lo verificable: dinero, propiedad, pruebas.",
    tools: "Celo · COPm · Contratos",
  },
];

const GLOSARIO_TECH: { icon: LucideIcon; term: string; desc: string }[] = [
  {
    icon: Wallet,
    term: "Wallet",
    desc: "Cuenta que firma. Identidad y cuenta de valor en una.",
  },
  {
    icon: Hash,
    term: "Dirección",
    desc: "Tu número de cuenta. Pública. Se comparte.",
  },
  {
    icon: KeyRound,
    term: "Clave privada",
    desc: "El PIN. Nunca se comparte. Nunca.",
  },
  {
    icon: KeyRound,
    term: "Seed phrase",
    desc: "12-24 palabras. Reconstruyen la clave privada. Guárdalas seguras.",
  },
  {
    icon: ArrowLeftRight,
    term: "Transacción",
    desc: "Acción enviada onchain: transferir, registrar, llamar contrato.",
  },
  {
    icon: Code,
    term: "Smart contract",
    desc: "Programa público en blockchain. Reglas que se ejecutan solas.",
  },
  {
    icon: Zap,
    term: "Gas",
    desc: "El costo de escribir onchain. Leer es gratis.",
  },
  {
    icon: Coins,
    term: "Stablecoin",
    desc: "Token con valor anclado a una moneda. COPm, USDC, USDT.",
  },
];

const STABLECOINS: { name: string; visible: boolean; role: string }[] = [
  { name: "USDT", visible: true, role: "Tether. Anclado al dólar." },
  { name: "USDC", visible: true, role: "Circle. Anclado al dólar." },
  { name: "USDM", visible: true, role: "Mento. Anclado al dólar." },
  { name: "COPm", visible: false, role: "Mento. Anclado al peso colombiano." },
];

const PERSISTENCIA_TABLA = [
  {
    proyecto: "Juego de gramática",
    offchain: "Preguntas, respuestas, score temporal.",
    onchain: "Premio, claim, ranking final.",
  },
  {
    proyecto: "Animal Crossing-like",
    offchain: "Perfil, items, progreso.",
    onchain: "Propiedad de items especiales o pagos.",
  },
  {
    proyecto: "Juego de música",
    offchain: "Canciones, intentos, resultados.",
    onchain: "Recompensas o acceso pagado.",
  },
  {
    proyecto: "Remesas",
    offchain: "Metadata, contactos, estado interno.",
    onchain: "Transferencia de stablecoin.",
  },
  {
    proyecto: "Predicciones Mundial",
    offchain: "Grupos, nombres, partidos.",
    onchain: "Apuestas, pool, ganador, pagos.",
  },
  {
    proyecto: "Trivia",
    offchain: "Preguntas, score temporal.",
    onchain: "Premio final.",
  },
];

const GAS_RULE = {
  bad: [
    "Cada respuesta de trivia = transacción.",
    "Cada movimiento del juego = transacción.",
    "Cada clic en el menú = transacción.",
  ],
  good: [
    "Jugar offchain. Claim del premio = transacción.",
    "Juego en frontend/BD. Resultado final = transacción.",
    "Acciones de UI gratis. Solo el evento clave va onchain.",
  ],
};

const CONTRACT_WHEN = {
  yes: [
    "Pool de predicciones.",
    "Sistema de premios automático.",
    "Escrow entre dos partes.",
    "Reparto de pagos.",
    "Registro público de claims.",
  ],
  no: [
    "Login con wallet.",
    "Enviar una stablecoin existente.",
    "Leer balance.",
    "Guardar preguntas de un juego.",
    "Mostrar perfil del usuario.",
  ],
};

const CONTRACT_CODE = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Lo mínimo: guarda el mejor score de cada wallet.
contract HackathonScore {
    mapping(address => uint256) public bestScore;

    function setScore(uint256 score) external {
        if (score > bestScore[msg.sender]) {
            bestScore[msg.sender] = score;
        }
    }
}`;

const DEPLOY_STEPS = [
  { num: "01", text: "Abre Remix (remix.ethereum.org) o usa Foundry." },
  { num: "02", text: "Copia el contrato. Usa OpenZeppelin para plantillas seguras." },
  { num: "03", text: "Conecta tu wallet a Alfajores (testnet de Celo)." },
  { num: "04", text: "Pide CELO de prueba en el faucet." },
  { num: "05", text: "Deploy. Copia el address que te da Remix." },
  { num: "06", text: "Pega el código en Celoscan → 'Verify Contract'." },
];

const DEMO_FLOW = [
  "Abrir la miniapp dentro de MiniPay.",
  "Ver la dirección de la wallet (sin signup).",
  "Leer balance de COPm llamando al contrato del token.",
  "Enviar una transacción pequeña.",
  "Abrir Celoscan y ver la tx + el contrato.",
];

const ARQUITECTURA_TEMPLATE = `Nuestra app:
Flujo principal:

Qué guardamos offchain (Supabase / state):
Qué guardamos onchain:

Acción onchain principal (la tx):
Contrato (1 función mínima, qué hace):

Mayor bloqueo técnico:`;

const COPM_IDEAS = [
  "Cobro de servicios en COPm.",
  "Donaciones en COPm.",
  "Recompensas locales en COPm.",
  "Facturas para freelancers en COPm.",
  "Propinas en COPm.",
  "Marketplace de productos colombianos en COPm.",
  "App para dividir cuentas en COPm.",
  "Reto educativo que paga en COPm.",
  "Registro de pagos comunitarios en COPm.",
  "Agente que genera links de cobro en COPm.",
];

const HOMEWORK = [
  "App deployada en Vercel.",
  "Wallet conectada (MiniPay o RainbowKit).",
  "Contrato simple deployado en Alfajores.",
  "Contrato verificado en Celoscan · pegan el link.",
  "Flujo principal funcionando aunque sea simple.",
  "Tabla de arquitectura escrita.",
];

const ENTREGABLE_TEMPLATE = `Proyecto:
Flujo principal:

Qué guardamos offchain:
Qué guardamos onchain:
Acción onchain principal:

Contrato (función mínima):
Link de Celoscan (Alfajores):

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
          Persistencia, wallets{" "}
          <span className="gradient-text">y tu primer contrato.</span>
        </Title>

        <div className="mt-2 flex flex-col gap-2 font-mono text-base text-white/70 sm:text-lg">
          <span className="flex items-center gap-2.5">
            <PlayCircle size={18} className="text-accent" />
            Martes 9 de junio · 6:00 a 8:00 PM
          </span>
          <span className="flex flex-col gap-1">
            <span className="flex items-center gap-2.5">
              <MapPin size={18} className="text-accent" />
              Auditorio Carlos Arcesio Paz · Edificio D
            </span>
            <span className="pl-7 text-sm text-white/45 sm:text-base">
              Universidad Icesi, Cali · y virtual
            </span>
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
      <Eyebrow>0:00 · Diagnóstico</Eyebrow>
      <Title size="md" className="mt-4">
        ¿En qué punto está cada equipo?
      </Title>
      <Body className="mt-4 max-w-2xl">
        Ya tienen frontend en Vercel. Hoy le metemos persistencia y plata real.
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

/* 04 — Las 3 capas */
function LayersSlide() {
  return (
    <SlideFrame>
      <Eyebrow>0:05 · Las 3 capas</Eyebrow>
      <Title size="md" className="mt-4">
        Tu miniapp vive en{" "}
        <span className="gradient-text">tres capas.</span>
      </Title>
      <Body className="mt-4 max-w-3xl">
        Tener frontend en Vercel es la primera. Hoy le sumamos las otras dos.
      </Body>

      <div className="mt-10 grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-3">
        {LAYERS.map((l, i) => {
          const Icon = l.icon;
          return (
            <div
              key={l.label}
              className="rounded-2xl border border-hairline bg-white/[0.015] p-6"
            >
              <span className="font-mono text-xs text-accent">
                0{i + 1}
              </span>
              <div className="mt-3 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/15 text-accent">
                  <Icon size={18} strokeWidth={2.2} />
                </span>
                <span className="text-lg font-semibold text-white">
                  {l.label}
                </span>
              </div>
              <p className="mt-3 text-sm leading-snug text-white/80">
                {l.role}
              </p>
              <p className="mt-3 font-mono text-xs uppercase tracking-wider text-muted">
                {l.tools}
              </p>
            </div>
          );
        })}
      </div>
    </SlideFrame>
  );
}

/* 05 — Glosario / Wallets 101 */
function GlosarioSlide() {
  return (
    <SlideFrame>
      <Eyebrow>0:15 · Wallets 101</Eyebrow>
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

/* 06 — Celoscan */
function CeloscanSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Celoscan</Eyebrow>
      <Title size="md" className="mt-4">
        El extracto bancario{" "}
        <span className="gradient-text">público.</span>
      </Title>
      <Body className="mt-6 max-w-3xl">
        Todo lo que pasa en Celo lo puedes ver en celoscan.io. Sirve para dos
        cosas, siempre.
      </Body>

      <div className="mt-10 grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-accent/30 bg-accent/[0.04] p-6">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
            <Search size={13} />
            Debug
          </div>
          <p className="mt-4 text-base leading-relaxed text-white/90">
            ¿Llegó mi tx? Pego el hash en Celoscan y veo el estado, el costo y
            el resultado.
          </p>
        </div>

        <div className="rounded-2xl border border-hairline bg-white/[0.015] p-6">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
            <Check size={13} />
            Confianza
          </div>
          <p className="mt-4 text-base leading-relaxed text-white/90">
            ¿Este contrato es legítimo? Si está verificado, ves el código
            Solidity completo en Celoscan.
          </p>
        </div>
      </div>

      <p className="mt-8 text-sm text-muted">
        Para testnet usen alfajores.celoscan.io
      </p>
    </SlideFrame>
  );
}

/* 07 — MiniPay */
function MiniPaySlide() {
  return (
    <SlideFrame>
      <Eyebrow>0:25 · MiniPay</Eyebrow>
      <Title size="lg" className="mt-6 max-w-5xl">
        Tu app vive dentro de MiniPay.{" "}
        <span className="gradient-text">La wallet ya está.</span>
      </Title>
      <Body className="mt-8 max-w-3xl">
        El usuario abre tu miniapp desde MiniPay y su wallet aparece conectada.
        Sin signup, sin email, sin contraseña.
      </Body>

      <div className="mt-10 grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-hairline bg-white/[0.02] p-5">
          <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
            Antes
          </div>
          <p className="mt-3 text-base text-white/85">
            Email + contraseña + verificación.
          </p>
        </div>
        <div className="rounded-2xl border border-accent/30 bg-accent/[0.05] p-5">
          <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
            Ahora
          </div>
          <p className="mt-3 text-base text-white">
            La wallet es el usuario.
          </p>
        </div>
      </div>

      <div className="mt-8 inline-flex items-center gap-2.5 rounded-2xl border border-hairline bg-white/[0.02] px-5 py-3">
        <Smartphone size={16} className="text-accent" />
        <span className="text-sm text-white/75">
          Si alguien ya empezó con login email/password no es error — pero es
          scope que pueden recortar.
        </span>
      </div>
    </SlideFrame>
  );
}

/* 08 — Stablecoins en Celo */
function StablecoinsSlide() {
  return (
    <SlideFrame>
      <Eyebrow>0:35 · Stablecoins</Eyebrow>
      <Title size="md" className="mt-4">
        Tu wallet ve más que{" "}
        <span className="gradient-text">lo que MiniPay muestra.</span>
      </Title>
      <Body className="mt-4 max-w-3xl">
        MiniPay solo muestra unas pocas en su UI. Pero la wallet puede tener
        cualquier token de Celo. Tu app las lee del contrato.
      </Body>

      <div className="mt-10 grid max-w-5xl grid-cols-1 gap-3 md:grid-cols-2">
        {STABLECOINS.map((s) => (
          <div
            key={s.name}
            className={`rounded-xl border p-5 ${
              s.visible
                ? "border-hairline bg-white/[0.015]"
                : "border-accent/30 bg-accent/[0.05]"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-white">{s.name}</span>
              <span
                className={`font-mono text-[10px] uppercase tracking-wider ${
                  s.visible ? "text-muted" : "text-accent"
                }`}
              >
                {s.visible ? "Visible en MiniPay" : "Solo en tu app"}
              </span>
            </div>
            <p className="mt-3 text-sm text-white/75">{s.role}</p>
          </div>
        ))}
      </div>

      <p className="mt-8 max-w-3xl text-sm text-muted">
        Para mostrar COPm en tu app, llamas{" "}
        <span className="font-mono text-white/85">balanceOf(userAddress)</span>{" "}
        en el contrato del token. Eso es gratis — leer no cuesta gas.
      </p>
    </SlideFrame>
  );
}

/* 09 — Persistencia: la pregunta */
function PersistenciaPreguntaSlide() {
  return (
    <SlideFrame>
      <Eyebrow>0:45 · La pregunta del bootcamp</Eyebrow>
      <Title size="lg" className="mt-8 max-w-5xl">
        ¿Qué parte de mi app vive en{" "}
        <span className="gradient-text">Supabase</span> y qué parte vive{" "}
        <span className="gradient-text">onchain?</span>
      </Title>
      <Body className="mt-10 max-w-3xl">
        Si responden esto bien, todo lo demás se ordena solo.
      </Body>
    </SlideFrame>
  );
}

/* 10 — Persistencia: la tabla */
function PersistenciaTableSlide() {
  return (
    <SlideFrame>
      <Eyebrow>La tabla</Eyebrow>
      <Title size="md" className="mt-4">
        BD vs blockchain · por proyecto.
      </Title>

      <div className="mt-8 max-w-6xl overflow-hidden rounded-2xl border border-hairline">
        <div className="grid grid-cols-12 border-b border-hairline bg-white/[0.02] px-5 py-3 font-mono text-[11px] uppercase tracking-wider text-muted">
          <span className="col-span-4">Proyecto</span>
          <span className="col-span-4">Offchain (Supabase)</span>
          <span className="col-span-4">Onchain</span>
        </div>
        {PERSISTENCIA_TABLA.map((row, i) => (
          <div
            key={row.proyecto}
            className={`grid grid-cols-12 gap-2 px-5 py-3 text-sm ${
              i < PERSISTENCIA_TABLA.length - 1
                ? "border-b border-hairline"
                : ""
            }`}
          >
            <span className="col-span-4 font-semibold text-white">
              {row.proyecto}
            </span>
            <span className="col-span-4 text-white/75">{row.offchain}</span>
            <span className="col-span-4 text-accent/90">{row.onchain}</span>
          </div>
        ))}
      </div>
    </SlideFrame>
  );
}

/* 11 — La regla simple */
function ReglaSlide() {
  return (
    <SlideFrame>
      <Eyebrow>La regla simple</Eyebrow>
      <Title size="lg" className="mt-8 max-w-5xl">
        BD para datos{" "}
        <span className="gradient-text">baratos, rápidos y editables.</span>{" "}
        Blockchain para{" "}
        <span className="gradient-text">dinero, propiedad y pruebas.</span>
      </Title>
    </SlideFrame>
  );
}

/* 12 — Gas */
function GasSlide() {
  return (
    <SlideFrame>
      <Eyebrow>1:00 · Gas</Eyebrow>
      <Title size="md" className="mt-4">
        Leer es gratis.{" "}
        <span className="gradient-text">Escribir cuesta.</span>
      </Title>
      <Body className="mt-4 max-w-3xl">
        Por eso no conviertan cada clic en una transacción.
      </Body>

      <div className="mt-10 grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-hairline bg-white/[0.015] p-6">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
            <Ban size={13} />
            Mal
          </div>
          <ul className="mt-4 flex flex-col gap-2">
            {GAS_RULE.bad.map((b) => (
              <li
                key={b}
                className="flex items-start gap-2.5 text-sm text-muted"
              >
                <Ban size={14} className="mt-0.5 text-white/30" />
                {b}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-accent/30 bg-accent/[0.04] p-6">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
            <Check size={13} strokeWidth={3} />
            Mejor
          </div>
          <ul className="mt-4 flex flex-col gap-2">
            {GAS_RULE.good.map((g) => (
              <li
                key={g}
                className="flex items-start gap-2.5 text-sm text-white/90"
              >
                <Check size={14} className="mt-0.5 text-accent" />
                {g}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SlideFrame>
  );
}

/* 13 — Smart contracts: cuándo sí, cuándo no */
function ContractWhenSlide() {
  return (
    <SlideFrame>
      <Eyebrow>1:05 · Smart contracts</Eyebrow>
      <Title size="md" className="mt-4">
        Cuándo necesitas un contrato y{" "}
        <span className="gradient-text">cuándo no.</span>
      </Title>
      <Body className="mt-4 max-w-3xl">
        Un contrato sirve cuando la app necesita reglas públicas que se
        ejecuten sin confiar en una persona.
      </Body>

      <div className="mt-10 grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-accent/30 bg-accent/[0.04] p-6">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
            <Check size={13} strokeWidth={3} />
            Sí lo necesitas
          </div>
          <ul className="mt-4 flex flex-col gap-2">
            {CONTRACT_WHEN.yes.map((y) => (
              <li
                key={y}
                className="flex items-center gap-2.5 text-base text-white/90"
              >
                <Check size={14} className="text-accent" />
                {y}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-hairline bg-white/[0.015] p-6">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
            <Ban size={13} />
            No lo necesitas
          </div>
          <ul className="mt-4 flex flex-col gap-2">
            {CONTRACT_WHEN.no.map((n) => (
              <li
                key={n}
                className="flex items-center gap-2.5 text-base text-muted"
              >
                <Ban size={14} className="text-white/30" />
                {n}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SlideFrame>
  );
}

/* 14 — Contrato mínimo viable */
function ContractCodeSlide() {
  return (
    <SlideFrame>
      <Eyebrow>El mínimo viable</Eyebrow>
      <Title size="md" className="mt-4">
        Un contrato de{" "}
        <span className="gradient-text">12 líneas.</span>
      </Title>
      <Body className="mt-4 max-w-3xl">
        Guarda el mejor score de cada wallet. Es real, es deployable, es
        suficiente para empezar.
      </Body>

      <div className="mt-8 max-w-3xl">
        <CodeBlock filename="HackathonScore.sol">{CONTRACT_CODE}</CodeBlock>
      </div>
    </SlideFrame>
  );
}

/* 15 — Deploy + verify */
function ContractDeploySlide() {
  return (
    <SlideFrame>
      <Eyebrow>Deploy + verify</Eyebrow>
      <Title size="md" className="mt-4">
        De código a contrato vivo en{" "}
        <span className="gradient-text">6 pasos.</span>
      </Title>

      <ol className="mt-8 grid max-w-5xl grid-cols-1 gap-3 md:grid-cols-2">
        {DEPLOY_STEPS.map((s) => (
          <li
            key={s.num}
            className="flex items-start gap-3 rounded-xl border border-hairline bg-white/[0.015] p-4"
          >
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent/15 font-mono text-xs font-bold text-accent">
              {s.num}
            </span>
            <span className="pt-1 text-sm text-white/85">{s.text}</span>
          </li>
        ))}
      </ol>

      <p className="mt-8 max-w-3xl text-sm text-muted">
        Empiezan en Alfajores. Cuando esté estable repiten el deploy en
        mainnet — cuesta centavos en CELO.
      </p>
    </SlideFrame>
  );
}

/* 16 — Demo intro */
function DemoIntroSlide() {
  return (
    <SlideFrame>
      <Eyebrow>1:20 · Demo en vivo</Eyebrow>
      <Title size="lg" className="mt-6 max-w-5xl">
        Abrimos una miniapp{" "}
        <span className="gradient-text">y todo aparece conectado.</span>
      </Title>
      <Body className="mt-8 max-w-3xl text-balance">
        MiniPay abre la app, la wallet ya está, leemos COPm, mandamos una tx y
        la vemos en Celoscan.
      </Body>

      <div className="mt-12 flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted">
        <span className="rounded-full border border-hairline bg-white/[0.02] px-3 py-1.5">
          MiniPay
        </span>
        <span className="rounded-full border border-hairline bg-white/[0.02] px-3 py-1.5">
          Viem / Wagmi
        </span>
        <span className="rounded-full border border-hairline bg-white/[0.02] px-3 py-1.5">
          Alfajores
        </span>
        <span className="rounded-full border border-accent/30 bg-accent/[0.08] px-3 py-1.5 text-accent">
          En vivo
        </span>
      </div>
    </SlideFrame>
  );
}

/* 17 — Demo flow */
function DemoFlowSlide() {
  return (
    <SlideFrame>
      <Eyebrow>El flujo</Eyebrow>
      <Title size="md" className="mt-4">
        Lo que vamos a hacer en pantalla.
      </Title>

      <ol className="mt-10 grid max-w-5xl grid-cols-1 gap-3">
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

/* 18 — Equipos intro */
function TeamWorkIntroSlide() {
  return (
    <SlideFrame>
      <Eyebrow>1:35 · Su turno</Eyebrow>
      <Title size="lg" className="mt-6 max-w-5xl">
        Cada equipo decide{" "}
        <span className="gradient-text">
          qué guarda dónde y qué contrato hace.
        </span>
      </Title>
      <Body className="mt-8 max-w-3xl text-balance">
        No es la decisión más impresionante. Es la más coherente con lo que
        vale su producto.
      </Body>
    </SlideFrame>
  );
}

/* 19 — Tabla de arquitectura */
function ArquitecturaTableSlide() {
  return (
    <SlideFrame>
      <Eyebrow>La tabla del equipo</Eyebrow>
      <Title size="md" className="mt-4">
        Llenen esto antes de salir.
      </Title>

      <div className="mt-8 max-w-3xl">
        <CodeBlock filename="arquitectura-equipo.md">
          {ARQUITECTURA_TEMPLATE}
        </CodeBlock>
      </div>
    </SlideFrame>
  );
}

/* 20 — COPm ideas */
function COPMIdeasSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Bonus · 1.000.000 COPm</Eyebrow>
      <Title size="md" className="mt-4">
        10 ideas para integrar{" "}
        <span className="gradient-text">COPm.</span>
      </Title>
      <Body className="mt-4 max-w-3xl">
        Hasta 10 proyectos · 100.000 COPm cada uno. Si te encaja una, vas
        directo al bonus.
      </Body>

      <ul className="mt-10 grid max-w-6xl grid-cols-1 gap-2.5 md:grid-cols-2">
        {COPM_IDEAS.map((idea, i) => (
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

/* 21 — Entregable */
function EntregableSlide() {
  return (
    <SlideFrame>
      <Eyebrow>1:50 · Antes de irse</Eyebrow>
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

/* 22 — Homework */
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

/* 23 — Nos vemos en Bootcamp #3 */
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
        <span className="flex flex-col gap-1">
          <span className="flex items-center gap-2.5">
            <MapPin size={18} className="text-accent" />
            Auditorio Carlos Arcesio Paz · Edificio D
          </span>
          <span className="pl-7 text-sm text-white/45 sm:text-base">
            Universidad Icesi, Cali · y virtual
          </span>
        </span>
      </div>

      <div className="mt-12 inline-flex items-center gap-2.5 rounded-2xl border border-accent/25 bg-accent/[0.06] px-5 py-3">
        <Layers size={16} className="text-accent" />
        <span className="text-sm text-white/85">
          Vengan con su contrato deployado en Alfajores y verificado en Celoscan.
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
  LayersSlide,
  GlosarioSlide,
  CeloscanSlide,
  MiniPaySlide,
  StablecoinsSlide,
  PersistenciaPreguntaSlide,
  PersistenciaTableSlide,
  ReglaSlide,
  GasSlide,
  ContractWhenSlide,
  ContractCodeSlide,
  ContractDeploySlide,
  DemoIntroSlide,
  DemoFlowSlide,
  TeamWorkIntroSlide,
  ArquitecturaTableSlide,
  COPMIdeasSlide,
  EntregableSlide,
  HomeworkSlide,
  NextSessionSlide,
];

export default function BootcampTwoDeck() {
  return <Deck slides={SLIDES} />;
}
