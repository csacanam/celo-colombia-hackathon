"use client";

import {
  ArrowLeftRight,
  Ban,
  Bot,
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
 * Bootcamp #2 — De frontend en Vercel a contrato vivo en mainnet. 24 slides.
 * ========================================================================= */

// TODO: pegar aquí el link del Google Form de fondeo cuando esté listo.
const FUNDING_FORM_URL = "https://forms.gle/REEMPLAZAR";

const AGENDA_ITEMS = [
  { time: "0:00", title: "Diagnóstico + la promesa" },
  { time: "0:10", title: "Las 3 capas + setup wallet" },
  { time: "0:25", title: "Checkpoint A · saldo + Celoscan" },
  { time: "0:30", title: "Wallets 101 + MetaMask vs MiniPay" },
  { time: "0:45", title: "Usar contrato deployado" },
  { time: "0:55", title: "Checkpoint B · tu tx en Celoscan" },
  { time: "1:00", title: "BD vs blockchain + gas" },
  { time: "1:20", title: "Tu agente despliega un contrato" },
  { time: "1:45", title: "Checkpoint C · tu contrato en mainnet" },
  { time: "1:50", title: "Equipos · arquitectura + entregable" },
];

const WALK_OUT_WITH = [
  "Wallet con saldo en Celo mainnet.",
  "Una tx tuya firmada y visible en Celoscan.",
  "Tu propio contrato deployado en Celo mainnet.",
];

const CHECKPOINT_A = [
  "Saldo de CELO + stablecoin en tu MetaMask.",
  "Tu dirección abierta en celoscan.io.",
];

const CHECKPOINT_B = [
  "El hash de tu primera tx en Celoscan.",
  "El contador del contrato actualizado con tu dirección.",
];

const CHECKPOINT_C = [
  "Tu propio contract address visible en Celoscan.",
  "El contrato verificado (código Solidity visible).",
];

const TRACK_EXTRA = [
  "Agregá un event al contrato (LogScoreSet) y léelo desde el frontend.",
  "Conectá tu contrato a la app que ya tenés en Vercel · mostrá el score en pantalla.",
  "Probá enviar USDC o COPm desde la app · ya tenés saldo.",
];

const DIAGNOSTIC_QUESTIONS = [
  "¿Quién ya tiene wallet (MetaMask u otra)?",
  "¿Quién ya tiene su repo en GitHub?",
  "¿Quién ya desplegó su frontend en Vercel?",
  "¿Quién ya firmó una transacción onchain alguna vez?",
];

const SETUP_STEPS = [
  { num: "01", text: "Instalar MetaMask (extensión de navegador)." },
  { num: "02", text: "Crear wallet · escribir la seed phrase en papel." },
  { num: "03", text: "Agregar Celo mainnet (un clic desde chainlist.org)." },
  { num: "04", text: "Copiar la dirección y enviarla por el form." },
  { num: "05", text: "Recibir CELO + stablecoin para la noche." },
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
    desc: "12 palabras. Reconstruyen la clave. Escríbelas en papel.",
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
    desc: "Token con valor anclado a una moneda. USDC, USDT, COPm.",
  },
];

const WALLET_COMPARE = [
  {
    label: "Builder",
    name: "MetaMask",
    accent: false,
    rows: [
      { k: "Clave privada", v: "La ves al exportar" },
      { k: "Seed phrase", v: "Te la muestra al crear" },
      { k: "Red", v: "Tú eliges · hoy Celo mainnet" },
      { k: "Cuándo la usas", v: "Para desplegar y testear" },
    ],
  },
  {
    label: "Usuario",
    name: "MiniPay",
    accent: true,
    rows: [
      { k: "Clave privada", v: "Opera la guarda · usuario no la ve" },
      { k: "Seed phrase", v: "Invisible al usuario" },
      { k: "Red", v: "Mainnet, fijo" },
      { k: "Cuándo la usas", v: "Cuando tu usuario abre tu app" },
    ],
  },
];

const STABLECOINS: { name: string; visible: boolean; role: string }[] = [
  { name: "USDT", visible: true, role: "Tether. Anclado al dólar." },
  { name: "USDC", visible: true, role: "Circle. Anclado al dólar." },
  { name: "USDm", visible: true, role: "Mento. Anclado al dólar." },
  { name: "COPm", visible: false, role: "Mento. Anclado al peso colombiano." },
];

const USE_CONTRACT_STEPS = [
  "Abren la app demo que les pasamos (link en pantalla).",
  "Conectan su MetaMask.",
  "Escriben un score y presionan 'Guardar'.",
  "MetaMask les pide firmar — confirman.",
  "Ven la confirmación + link a Celoscan.",
  "Abren Celoscan: su dirección, su tx, el contrato. Real.",
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

contract MyScore {
    mapping(address => uint256) public score;

    function setScore(uint256 s) external {
        score[msg.sender] = s;
    }
}`;

const AGENT_PROMPT = `Crea un contrato Solidity llamado MyScore.

Requisitos:
- Guarda el mejor score por wallet · mapping(address => uint256).
- setScore(uint256 score) · solo actualiza si el nuevo score es mayor.
- view getScore(address user) · devuelve el score.

Stack:
- Hardhat.
- Script de deploy para Celo mainnet.
- PRIVATE_KEY desde .env.

Al terminar:
- Imprime el address del contrato.
- Dime cómo verificarlo en Celoscan.`;

const AGENT_FLOW = [
  "Le piden al agente que despliegue (prompt en la slide siguiente).",
  "El agente genera el contrato + scripts de Hardhat.",
  "El agente firma la tx con la private key del .env.",
  "Devuelve el address del contrato.",
  "Lo abren en Celoscan y lo verifican.",
];

const DEMO_FLOW = [
  "Abrir la app dentro de MiniPay (en celular).",
  "Ver la dirección de la wallet (sin signup).",
  "Leer balance de stablecoin desde el contrato del token.",
  "Llamar nuestro contrato MyScore desde la app.",
  "Ver la tx confirmada + link a Celoscan.",
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
  "Wallet conectada (MetaMask o MiniPay).",
  "Contrato propio deployado en Celo mainnet.",
  "Address del contrato verificado en Celoscan · pegan el link.",
  "Flujo principal funcionando aunque sea simple.",
  "Tabla de arquitectura escrita.",
];

const ENTREGABLE_TEMPLATE = `Proyecto:
Flujo principal:

Qué guardamos offchain:
Qué guardamos onchain:
Acción onchain principal:

Contrato (función mínima):
Link de Celoscan (mainnet):

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
          De frontend en Vercel{" "}
          <span className="gradient-text">a contrato vivo en mainnet.</span>
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

/* 03 — Diagnóstico */
function RecapSlide() {
  return (
    <SlideFrame>
      <Eyebrow>0:00 · Diagnóstico</Eyebrow>
      <Title size="md" className="mt-4">
        ¿En qué escalón está cada equipo?
      </Title>
      <Body className="mt-4 max-w-2xl">
        Cada pregunta es prerrequisito de la siguiente. Si decís no en una, esa
        es tu siguiente tarea.
      </Body>

      <ul className="mt-12 grid max-w-4xl grid-cols-1 gap-3 md:grid-cols-2">
        {DIAGNOSTIC_QUESTIONS.map((q, i) => (
          <li
            key={q}
            className="flex items-center gap-3 rounded-2xl border border-hairline bg-white/[0.015] p-5"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent/15 font-mono text-xs font-bold text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-base text-white sm:text-lg">{q}</span>
          </li>
        ))}
      </ul>
    </SlideFrame>
  );
}

/* 04 — Setup wallet */
function WalletSetupSlide() {
  return (
    <SlideFrame>
      <Eyebrow>0:05 · Setup wallet</Eyebrow>
      <Title size="md" className="mt-4">
        Tu noche empieza con{" "}
        <span className="gradient-text">una wallet en Celo mainnet.</span>
      </Title>
      <Body className="mt-4 max-w-3xl">
        Sin testnet, sin faucet. Una sola red. Nosotros les enviamos los
        fondos para la noche.
      </Body>

      <ol className="mt-10 grid max-w-5xl grid-cols-1 gap-3 md:grid-cols-2">
        {SETUP_STEPS.map((s) => (
          <li
            key={s.num}
            className="flex items-start gap-3 rounded-xl border border-hairline bg-white/[0.015] p-4"
          >
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent/15 font-mono text-xs font-bold text-accent">
              {s.num}
            </span>
            <span className="pt-1 text-sm text-white/85 sm:text-base">
              {s.text}
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-8 inline-flex items-center gap-2.5 rounded-2xl border border-accent/30 bg-accent/[0.06] px-5 py-3">
        <Wallet size={16} className="text-accent" />
        <span className="text-sm text-white/85">
          Form para recibir fondos:{" "}
          <a
            href={FUNDING_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-accent underline-offset-2 hover:underline"
          >
            {FUNDING_FORM_URL}
          </a>
        </span>
      </div>
    </SlideFrame>
  );
}

/* 05 — Las 3 capas */
function LayersSlide() {
  return (
    <SlideFrame>
      <Eyebrow>0:20 · Las 3 capas</Eyebrow>
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

/* 06 — Wallets 101 / Glosario */
function GlosarioSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Wallets 101</Eyebrow>
      <Title size="md" className="mt-4">
        Lo que acaban de instalar,{" "}
        <span className="gradient-text">en palabras.</span>
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

/* 07 — Celoscan */
function CeloscanSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Celoscan</Eyebrow>
      <Title size="md" className="mt-4">
        El extracto bancario{" "}
        <span className="gradient-text">público.</span>
      </Title>
      <Body className="mt-6 max-w-3xl">
        Todo lo que pasa en Celo lo ven en celoscan.io. Sirve para dos cosas,
        siempre.
      </Body>

      <div className="mt-10 grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-accent/30 bg-accent/[0.04] p-6">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
            <Search size={13} />
            Debug
          </div>
          <p className="mt-4 text-base leading-relaxed text-white/90">
            ¿Llegó mi tx? Pego el hash y veo el estado, el costo y el resultado.
          </p>
        </div>

        <div className="rounded-2xl border border-hairline bg-white/[0.015] p-6">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
            <Check size={13} />
            Confianza
          </div>
          <p className="mt-4 text-base leading-relaxed text-white/90">
            ¿Este contrato es legítimo? Si está verificado, ves el código
            completo en Celoscan.
          </p>
        </div>
      </div>
    </SlideFrame>
  );
}

/* 08 — MetaMask vs MiniPay */
function MetaMaskVsMiniPaySlide() {
  return (
    <SlideFrame>
      <Eyebrow>0:30 · El reframe importante</Eyebrow>
      <Title size="md" className="mt-4">
        MetaMask y MiniPay son{" "}
        <span className="gradient-text">la misma cosa por dentro.</span>
      </Title>
      <Body className="mt-4 max-w-3xl">
        Clave privada + dirección + firma. Cambia dónde vive la clave y cuánto
        se la mostramos al usuario.
      </Body>

      <div className="mt-10 grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2">
        {WALLET_COMPARE.map((w) => (
          <div
            key={w.name}
            className={`rounded-2xl border p-6 ${
              w.accent
                ? "border-accent/30 bg-accent/[0.05]"
                : "border-hairline bg-white/[0.015]"
            }`}
          >
            <div
              className={`flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] ${
                w.accent ? "text-accent" : "text-muted"
              }`}
            >
              {w.label}
            </div>
            <div className="mt-2 flex items-center gap-2">
              {w.name === "MetaMask" ? (
                <Wallet size={18} className="text-white/80" />
              ) : (
                <Smartphone size={18} className="text-accent" />
              )}
              <span className="text-lg font-semibold text-white">
                {w.name}
              </span>
            </div>
            <ul className="mt-5 flex flex-col gap-2.5">
              {w.rows.map((r) => (
                <li key={r.k} className="text-sm">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
                    {r.k}
                  </span>
                  <span className="ml-2 text-white/85">{r.v}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-7 max-w-3xl text-sm text-muted">
        Tu contrato no nota la diferencia · recibe{" "}
        <span className="font-mono text-white/85">msg.sender</span> igual sea
        MetaMask o MiniPay.
      </p>
    </SlideFrame>
  );
}

/* 09 — Stablecoins en Celo */
function StablecoinsSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Stablecoins</Eyebrow>
      <Title size="md" className="mt-4">
        La wallet ve más que{" "}
        <span className="gradient-text">lo que MiniPay muestra.</span>
      </Title>
      <Body className="mt-4 max-w-3xl">
        MiniPay solo muestra unas pocas en su UI. Pero la wallet tiene todas
        las que existan en Celo. Tu app las lee del contrato.
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
    </SlideFrame>
  );
}

/* 10 — Usar un contrato deployado por nosotros */
function UseContractSlide() {
  return (
    <SlideFrame>
      <Eyebrow>0:40 · Hands-on</Eyebrow>
      <Title size="md" className="mt-4">
        Tu primera tx contra{" "}
        <span className="gradient-text">un contrato real.</span>
      </Title>
      <Body className="mt-4 max-w-3xl">
        Desplegamos un contrato simple antes del bootcamp. Tu trabajo: usarlo
        desde tu wallet.
      </Body>

      <ol className="mt-10 grid max-w-5xl grid-cols-1 gap-3">
        {USE_CONTRACT_STEPS.map((step, i) => (
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

      <p className="mt-7 text-sm text-muted">
        Cuando vean su tx confirmada en Celoscan · ya usaron un smart contract.
      </p>
    </SlideFrame>
  );
}

/* 11 — Persistencia: la pregunta */
function PersistenciaPreguntaSlide() {
  return (
    <SlideFrame>
      <Eyebrow>0:55 · La pregunta del bootcamp</Eyebrow>
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

/* 12 — Persistencia: la tabla */
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

/* 13 — La regla simple */
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

/* 14 — Gas */
function GasSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Gas</Eyebrow>
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

/* 15 — Contrato: cuándo sí / cuándo no */
function ContractWhenSlide() {
  return (
    <SlideFrame>
      <Eyebrow>1:10 · Smart contracts</Eyebrow>
      <Title size="md" className="mt-4">
        Cuándo necesitas uno y{" "}
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

/* 16 — Así se ve un contrato */
function ContractCodeSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Por dentro</Eyebrow>
      <Title size="md" className="mt-4">
        Así se ve un contrato.{" "}
        <span className="gradient-text">No lo escribís tú.</span>
      </Title>
      <Body className="mt-4 max-w-3xl">
        Es código. Son 7 líneas. Tu agente lo va a escribir y desplegar.
        Solo tienen que entender qué hace.
      </Body>

      <div className="mt-8 max-w-3xl">
        <CodeBlock filename="MyScore.sol">{CONTRACT_CODE}</CodeBlock>
      </div>
    </SlideFrame>
  );
}

/* 17 — Tu agente despliega */
function AgentDeploySlide() {
  return (
    <SlideFrame>
      <Eyebrow>El prompt</Eyebrow>
      <Title size="md" className="mt-4">
        Le piden a su agente{" "}
        <span className="gradient-text">algo así.</span>
      </Title>
      <Body className="mt-4 max-w-3xl">
        Cursor, Claude Code, lo que estén usando. Hardhat por debajo. Mainnet
        directo.
      </Body>

      <div className="mt-8 max-w-3xl">
        <CodeBlock filename="prompt-al-agente.md">{AGENT_PROMPT}</CodeBlock>
      </div>
    </SlideFrame>
  );
}

/* 18 — Agente despliega: qué pasa */
function AgentFlowSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Qué pasa por debajo</Eyebrow>
      <Title size="md" className="mt-4">
        El agente hace estos{" "}
        <span className="gradient-text">5 pasos.</span>
      </Title>

      <ol className="mt-10 grid max-w-5xl grid-cols-1 gap-3">
        {AGENT_FLOW.map((step, i) => {
          const Icon = i === 4 ? Search : i === 0 ? Bot : Code;
          return (
            <li
              key={step}
              className="flex items-start gap-3 rounded-xl border border-hairline bg-white/[0.015] p-4"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent/15 text-accent">
                <Icon size={16} strokeWidth={2.2} />
              </span>
              <span className="pt-1.5 text-base text-white/85 sm:text-lg">
                {step}
              </span>
            </li>
          );
        })}
      </ol>
    </SlideFrame>
  );
}

/* 19 — Demo intro */
function DemoIntroSlide() {
  return (
    <SlideFrame>
      <Eyebrow>1:30 · Demo en vivo</Eyebrow>
      <Title size="lg" className="mt-6 max-w-5xl">
        Una miniapp completa{" "}
        <span className="gradient-text">dentro de MiniPay.</span>
      </Title>
      <Body className="mt-8 max-w-3xl text-balance">
        Mostramos cómo se ve todo conectado: wallet, stablecoin, contrato propio
        y Celoscan.
      </Body>

      <div className="mt-12 flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted">
        <span className="rounded-full border border-hairline bg-white/[0.02] px-3 py-1.5">
          MiniPay
        </span>
        <span className="rounded-full border border-hairline bg-white/[0.02] px-3 py-1.5">
          Hardhat
        </span>
        <span className="rounded-full border border-hairline bg-white/[0.02] px-3 py-1.5">
          Celo mainnet
        </span>
        <span className="rounded-full border border-accent/30 bg-accent/[0.08] px-3 py-1.5 text-accent">
          En vivo
        </span>
      </div>
    </SlideFrame>
  );
}

/* 20 — Demo flow */
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

/* 21 — Equipos intro */
function TeamWorkIntroSlide() {
  return (
    <SlideFrame>
      <Eyebrow>1:40 · Su turno</Eyebrow>
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

/* 22 — Tabla de arquitectura */
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

/* 23 — COPm ideas */
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

/* 24 — Entregable */
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

/* 25 — Homework */
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

/* 26 — Next session */
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
          Vengan con su contrato propio deployado en Celo mainnet y verificado.
        </span>
      </div>
    </SlideFrame>
  );
}

/* NEW · Promesa */
function WalkOutSlide() {
  return (
    <SlideFrame>
      <Eyebrow>La promesa</Eyebrow>
      <Title size="lg" className="mt-6 max-w-5xl">
        Esta noche te vas{" "}
        <span className="gradient-text">con tres cosas concretas.</span>
      </Title>
      <Body className="mt-6 max-w-3xl">
        Si tenés los tres ✓ al final, la noche fue un éxito.
      </Body>

      <ul className="mt-12 flex max-w-3xl flex-col gap-3">
        {WALK_OUT_WITH.map((item) => (
          <li
            key={item}
            className="flex items-center gap-3 rounded-2xl border border-accent/30 bg-accent/[0.05] p-5"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent text-ink">
              <Check size={16} strokeWidth={2.6} />
            </span>
            <span className="text-base text-white sm:text-lg">{item}</span>
          </li>
        ))}
      </ul>
    </SlideFrame>
  );
}

/* NEW · Checkpoint A */
function CheckpointASlide() {
  return (
    <SlideFrame>
      <Eyebrow>Checkpoint A · 0:25</Eyebrow>
      <Title size="md" className="mt-4">
        Para todos.{" "}
        <span className="gradient-text">Antes de seguir.</span>
      </Title>
      <Body className="mt-4 max-w-3xl">
        Mostrale a tu mentor estos dos:
      </Body>

      <ul className="mt-10 flex max-w-3xl flex-col gap-3">
        {CHECKPOINT_A.map((item, i) => (
          <li
            key={item}
            className="flex items-start gap-3 rounded-xl border border-hairline bg-white/[0.015] p-4"
          >
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent/15 font-mono text-xs font-bold text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="pt-1.5 text-base text-white/85 sm:text-lg">
              {item}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-7 text-sm text-muted">
        Si te falta alguno, levantá la mano. No avanzamos sin todos.
      </p>
    </SlideFrame>
  );
}

/* NEW · Checkpoint B */
function CheckpointBSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Checkpoint B · 0:55</Eyebrow>
      <Title size="md" className="mt-4">
        Tu primera tx onchain{" "}
        <span className="gradient-text">existe.</span>
      </Title>
      <Body className="mt-4 max-w-3xl">
        Mostrale a tu mentor:
      </Body>

      <ul className="mt-10 flex max-w-3xl flex-col gap-3">
        {CHECKPOINT_B.map((item, i) => (
          <li
            key={item}
            className="flex items-start gap-3 rounded-xl border border-hairline bg-white/[0.015] p-4"
          >
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent/15 font-mono text-xs font-bold text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="pt-1.5 text-base text-white/85 sm:text-lg">
              {item}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-7 text-sm text-muted">
        Si te falta alguno, levantá la mano. No avanzamos sin todos.
      </p>
    </SlideFrame>
  );
}

/* NEW · Checkpoint C */
function CheckpointCSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Checkpoint C · 1:45</Eyebrow>
      <Title size="md" className="mt-4">
        Tu contrato propio{" "}
        <span className="gradient-text">ya vive en mainnet.</span>
      </Title>
      <Body className="mt-4 max-w-3xl">
        Mostrale a tu mentor:
      </Body>

      <ul className="mt-10 flex max-w-3xl flex-col gap-3">
        {CHECKPOINT_C.map((item, i) => (
          <li
            key={item}
            className="flex items-start gap-3 rounded-xl border border-accent/30 bg-accent/[0.04] p-4"
          >
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent text-ink">
              <Check size={14} strokeWidth={2.6} />
            </span>
            <span className="pt-1.5 text-base text-white/85 sm:text-lg">
              {item}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-7 text-sm text-muted">
        Si tenés esto, ya cumpliste la promesa de la noche.
      </p>
    </SlideFrame>
  );
}

/* NEW · Track extra */
function TrackExtraSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Si terminaste rápido</Eyebrow>
      <Title size="md" className="mt-4">
        Ya tenés los tres ✓.{" "}
        <span className="gradient-text">Sumá estas extensiones.</span>
      </Title>
      <Body className="mt-4 max-w-3xl">
        Te dan ventaja real para Bootcamp #3 y para tu demo final.
      </Body>

      <ul className="mt-10 flex max-w-4xl flex-col gap-3">
        {TRACK_EXTRA.map((item, i) => (
          <li
            key={item}
            className="flex items-start gap-3 rounded-xl border border-hairline bg-white/[0.015] p-4"
          >
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent/15 font-mono text-xs font-bold text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="pt-1.5 text-base text-white/85 sm:text-lg">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </SlideFrame>
  );
}

/* ---------- Deck ---------- */

const SLIDES = [
  CoverSlide,
  AgendaSlide,
  RecapSlide,
  WalkOutSlide,
  LayersSlide,
  WalletSetupSlide,
  CheckpointASlide,
  GlosarioSlide,
  CeloscanSlide,
  MetaMaskVsMiniPaySlide,
  StablecoinsSlide,
  UseContractSlide,
  CheckpointBSlide,
  PersistenciaPreguntaSlide,
  PersistenciaTableSlide,
  ReglaSlide,
  GasSlide,
  ContractWhenSlide,
  ContractCodeSlide,
  AgentDeploySlide,
  AgentFlowSlide,
  CheckpointCSlide,
  DemoIntroSlide,
  DemoFlowSlide,
  TeamWorkIntroSlide,
  ArquitecturaTableSlide,
  TrackExtraSlide,
  COPMIdeasSlide,
  EntregableSlide,
  HomeworkSlide,
  NextSessionSlide,
];

export default function BootcampTwoDeck() {
  return <Deck slides={SLIDES} />;
}
