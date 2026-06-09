"use client";

import type { ReactNode } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  AlertTriangle,
  ArrowLeftRight,
  ArrowRight,
  Award,
  Ban,
  BookOpen,
  Bot,
  Brain,
  Briefcase,
  Building2,
  Check,
  Code,
  Coins,
  Compass,
  Cpu,
  Database,
  Droplet,
  ExternalLink,
  Github,
  Globe,
  GraduationCap,
  Hammer,
  HeartHandshake,
  Lightbulb,
  Map,
  MapPin,
  Medal,
  MessageCircle,
  MessageSquare,
  MousePointer2,
  PartyPopper,
  PlayCircle,
  Server,
  Smartphone,
  Sparkles,
  Store,
  Target,
  Trophy,
  Users,
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
 * Kickoff — Hackathon de Agentes Onchain · Celo Colombia
 * Narrativa storytelling: WHO → WHY → HOW → WHAT → HANDS ON
 * ========================================================================= */

const COHORT_CHAT_URL = "https://t.me/celocol";
const CELO_COLOMBIA_TG = "https://t.me/celocol";
const CELO_DEVS_TG = "https://t.me/+mxsf6bMj6s1lMjVh";
const CAMILO_X_URL = "https://x.com/camilosaka";

/* ---------- Foto / Placeholder helpers ---------- */

function PhotoPlaceholder({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center rounded-2xl border border-dashed border-hairline bg-white/[0.02] ${className}`}
    >
      <div className="px-4 py-6 text-center">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
          Foto
        </span>
        <p className="mt-1 text-xs text-white/55">{label}</p>
      </div>
    </div>
  );
}

/* =========================================================================
 * BLOQUE A · WHO — Camilo en primera persona
 * ========================================================================= */

/* 01 — Cover */
function CoverSlide() {
  return (
    <SlideFrame>
      <div className="flex flex-col gap-6">
        <Eyebrow>Hackathon de Agentes Onchain · Celo Colombia</Eyebrow>

        <div className="flex items-baseline gap-6">
          <span className="font-display text-[8rem] font-semibold leading-none tracking-tighter text-accent drop-shadow-[0_0_40px_rgba(252,255,82,0.3)] sm:text-[10rem]">
            01
          </span>
          <span className="font-mono text-sm uppercase tracking-[0.2em] text-muted">
            Kickoff
          </span>
        </div>

        <Title size="xl">
          Hoy empieza algo —{" "}
          <span className="gradient-text">y ustedes son parte.</span>
        </Title>

        <div className="mt-2 flex flex-col gap-2 font-mono text-base text-white/70 sm:text-lg">
          <span className="flex items-center gap-2.5">
            <PlayCircle size={18} className="text-accent" />
            Lunes 1 de junio · 6:00 a 8:00 PM
          </span>
          <span className="flex flex-col gap-1">
            <span className="flex items-center gap-2.5">
              <MapPin size={18} className="text-accent" />
              Auditorio Ernesto de Lima · Edificio L
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

/* 02 — Hola, soy Camilo */
function HolaSoyCamiloSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Antes de empezar</Eyebrow>

      <div className="mt-8 flex flex-col gap-10 md:flex-row md:items-center md:gap-14">
        <div className="relative shrink-0">
          <div className="absolute -inset-3 rounded-3xl bg-accent/[0.12] blur-2xl" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/camilo.png"
            alt="Camilo Sacanamboy"
            className="relative h-44 w-44 rounded-3xl object-cover ring-1 ring-white/10 sm:h-52 sm:w-52"
          />
        </div>

        <div>
          <Title size="lg">Hola, soy Camilo.</Title>
          <p className="mt-3 text-lg text-muted sm:text-xl">
            Ingeniero de Sistemas e Ingeniero Telemático —{" "}
            <span className="font-medium text-accent">Universidad Icesi</span>.
          </p>

          <Body className="mt-6 max-w-2xl text-balance">
            Llevo{" "}
            <span className="font-semibold text-white">16 años</span>{" "}
            construyendo software y{" "}
            <span className="font-semibold text-white">9 años</span> creando
            negocios digitales.
          </Body>

          <div className="mt-7 flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="rounded-full border border-hairline bg-white/[0.02] px-3 py-1.5 text-white/70">
              2009 — empezó en Icesi
            </span>
            <span className="rounded-full border border-accent/30 bg-accent/[0.08] px-3 py-1.5 text-accent">
              Hoy — embajador Celo Colombia
            </span>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

/* 03 — Mis primeras apps */
function PrimerasAppsSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Mis primeros años · 2009 en adelante</Eyebrow>
      <Title size="md" className="mt-4 max-w-4xl">
        Apps móviles para{" "}
        <span className="gradient-text">BlackBerry, Android e iOS.</span>
      </Title>
      <Body className="mt-6 max-w-3xl">
        Mientras estudiaba en Icesi aprendí a desarrollar apps móviles. Las
        publiqué en las tiendas. Tuve miles de usuarios.
      </Body>

      <div className="mt-10 grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-[1fr_1fr]">
        <div className="rounded-2xl border border-hairline bg-white/[0.015] p-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
            Lo que aprendí
          </span>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-white/85">
            <li className="flex items-center gap-2">
              <Check size={14} className="text-accent" />
              A construir software
            </li>
            <li className="flex items-center gap-2">
              <Check size={14} className="text-accent" />
              A publicar en tiendas (Play Store, App Store)
            </li>
            <li className="flex items-center gap-2">
              <Check size={14} className="text-accent" />
              A llegar a miles de usuarios
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-orange-500/25 bg-orange-500/[0.05] p-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-orange-400">
            Lo que NO aprendí (todavía)
          </span>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-display text-5xl font-semibold text-white sm:text-6xl">
              $0
            </span>
            <span className="font-mono text-sm text-muted">de revenue</span>
          </div>
          <p className="mt-3 text-sm leading-snug text-white/75">
            Aprendí a construir, pero todavía no a construir{" "}
            <span className="font-semibold text-white">negocio</span>.
          </p>
        </div>
      </div>
    </SlideFrame>
  );
}

/* 04 — Peewah · 9 años */
function PeewahSlide() {
  return (
    <SlideFrame>
      <Eyebrow>2016 → hoy</Eyebrow>

      <div className="mt-6 grid grid-cols-1 items-center gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-12">
        <div>
          <Title size="md">
            Y entonces apareció{" "}
            <span className="gradient-text">Peewah.</span>
          </Title>
          <Body className="mt-6 max-w-2xl text-balance">
            Software de gestión de eventos. Una empresa real, con clientes
            reales, en operación desde hace 9 años.
          </Body>
        </div>

        <div className="rounded-2xl border border-hairline bg-white p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/peewah.png"
            alt="Peewah"
            className="mx-auto h-auto max-h-[260px] w-full rounded-lg object-contain"
          />
        </div>
      </div>

      <div className="mt-10 grid max-w-5xl grid-cols-1 gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-hairline bg-white/[0.015] p-5">
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
            Años
          </span>
          <p className="mt-2 font-display text-4xl font-semibold text-accent">
            9
          </p>
          <p className="mt-1 text-sm text-muted">construyendo Peewah</p>
        </div>
        <div className="rounded-2xl border border-hairline bg-white/[0.015] p-5">
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
            Eventos atendidos
          </span>
          <p className="mt-2 font-display text-4xl font-semibold text-accent">
            15K+
          </p>
          <p className="mt-1 text-sm text-muted">desde la plataforma</p>
        </div>
        <div className="rounded-2xl border border-accent/35 bg-accent/[0.06] p-5">
          <span className="font-mono text-[10px] uppercase tracking-wider text-accent">
            Personas alcanzadas
          </span>
          <p className="mt-2 font-display text-4xl font-semibold text-white">
            5M+
          </p>
          <p className="mt-1 text-sm text-muted">han usado un evento Peewah</p>
        </div>
      </div>

      <Body className="mt-6 max-w-3xl text-white/55">
        Acá aprendí que construir es{" "}
        <span className="text-white">solo una parte</span>. Lo otro es operar,
        distribuir, y mantener algo en pie.
      </Body>
    </SlideFrame>
  );
}

/* 05 — Transición a blockchain */
function TransicionBlockchainSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Hace 1 año · 2025</Eyebrow>

      <div className="mt-6 grid grid-cols-1 items-center gap-10 md:grid-cols-[1.2fr_0.8fr] md:gap-12">
        <div>
          <Title size="md">
            Decidí construir en{" "}
            <span className="gradient-text">blockchain.</span>
          </Title>
          <Body className="mt-6 max-w-2xl text-balance">
            Por las oportunidades que estaba viendo. Empecé a participar en
            múltiples hackathons.
          </Body>
        </div>

        <div className="relative">
          <div className="absolute -inset-3 rounded-3xl bg-accent/[0.12] blur-2xl" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/uhi.avif"
            alt="Uniswap Hook Incubator · trofeo"
            className="relative mx-auto h-auto max-h-[240px] w-full rounded-2xl object-contain"
          />
          <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-wider text-muted">
            Uniswap Hook Incubator
          </p>
        </div>
      </div>

      <div className="mt-10 grid max-w-5xl grid-cols-1 gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-hairline bg-white/[0.015] p-5">
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
            Hackathons probadas
          </span>
          <p className="mt-2 font-display text-3xl font-semibold text-white">
            4
          </p>
          <p className="mt-1 text-xs text-muted">a lo largo del año</p>
        </div>
        <div className="rounded-2xl border border-hairline bg-white/[0.015] p-5">
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
            Que gané
          </span>
          <p className="mt-2 font-display text-3xl font-semibold text-accent">
            1
          </p>
          <p className="mt-1 text-xs text-muted">la global de Uniswap</p>
        </div>
        <div className="rounded-2xl border border-accent/35 bg-accent/[0.06] p-5">
          <span className="font-mono text-[10px] uppercase tracking-wider text-accent">
            Premio
          </span>
          <p className="mt-2 font-display text-3xl font-semibold text-white">
            $1.000
          </p>
          <p className="mt-1 text-xs text-muted">USD · Uniswap Hook Incubator</p>
        </div>
      </div>

      <p className="mt-6 max-w-3xl text-sm text-muted">
        Con esos $1.000 me decidí a viajar a un evento muy importante de la
        industria, en{" "}
        <span className="text-white">Buenos Aires, Argentina</span>.
      </p>
    </SlideFrame>
  );
}

/* 06 — Buenos Aires + Embajador */
function EmbajadorBuenosAiresSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Buenos Aires · evento global</Eyebrow>
      <Title size="md" className="mt-4 max-w-5xl">
        Allá conocí al equipo de Celo Colombia —{" "}
        <span className="gradient-text">y me invitaron a ser embajador.</span>
      </Title>

      <div className="mt-10 grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr] lg:items-center">
        {/* Photo placeholder for Argentina */}
        <PhotoPlaceholder
          label="Camilo en Buenos Aires"
          className="h-64"
        />

        <div className="flex flex-col gap-4">
          <Body className="text-balance">
            Empecé como embajador desde{" "}
            <span className="font-semibold text-white">enero de 2026</span>.
            Esta hackathon nace de esa conversación.
          </Body>

          <div className="rounded-2xl border border-accent/35 bg-accent/[0.06] p-5">
            <Sparkles size={16} className="text-accent" />
            <p className="mt-3 text-base leading-relaxed text-white">
              «Los puntos se conectan hacia atrás. Pero hoy, aprovechando que
              están aquí,{" "}
              <span className="font-semibold text-accent">
                puede que sea el momento donde uno de esos puntos se conecta
                hacia adelante
              </span>{" "}
              — y todavía no lo saben.»
            </p>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

/* 07 — Agradecimientos */
function PuntosSeConectanSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Antes de seguir</Eyebrow>
      <Title size="lg" className="mt-6 max-w-5xl">
        Gracias por estar acá.{" "}
        <span className="gradient-text">Felicitaciones por estar acá.</span>
      </Title>
      <Body className="mt-8 max-w-3xl text-balance">
        Sé que no es fácil decidir entrar a estos temas. No los voy a engañar:
        es una oportunidad gigante.
      </Body>

      <div className="mt-10 inline-flex items-center gap-2.5 rounded-2xl border border-hairline bg-white/[0.02] px-5 py-3">
        <HeartHandshake size={16} className="text-accent" />
        <span className="text-sm text-white/85">
          Y gracias también a{" "}
          <span className="font-semibold text-white">Icesi</span> y a{" "}
          <span className="font-semibold text-white">Celo</span> por hacer esto
          posible.
        </span>
      </div>
    </SlideFrame>
  );
}

/* =========================================================================
 * BLOQUE B · WHAT THIS IS — Hackathon + Por qué gratis
 * ========================================================================= */

/* 08 — Qué es una hackathon */
function QueEsHackathonSlide() {
  const steps = [
    "Reúnes builders en un evento",
    "Construyen una solución en tiempo récord",
    "Presentan en demo day · pitch",
    "El jurado elige ganadores",
  ];
  return (
    <SlideFrame>
      <Eyebrow>Aclaremos qué es esto</Eyebrow>
      <Title size="md" className="mt-4">
        Una hackathon —{" "}
        <span className="gradient-text">en formato clásico.</span>
      </Title>

      <ol className="mt-10 grid max-w-5xl grid-cols-1 gap-3 md:grid-cols-2">
        {steps.map((s, i) => (
          <li
            key={s}
            className="flex items-center gap-3 rounded-xl border border-hairline bg-white/[0.015] p-4"
          >
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent/15 font-mono text-xs font-bold text-accent">
              {i + 1}
            </span>
            <span className="text-base text-white/85 sm:text-lg">{s}</span>
          </li>
        ))}
      </ol>

      <p className="mt-8 max-w-3xl text-sm text-muted">
        Problema: muchas hackathons asumen que todos saben construir.{" "}
        <span className="text-white">Solo evalúan — no educan.</span>
      </p>
    </SlideFrame>
  );
}

/* 09 — Esto es diferente · bootcamp + hackathon */
function BootcampHackathonSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Por eso este formato</Eyebrow>
      <Title size="md" className="mt-4">
        Esto no es solo una hackathon —{" "}
        <span className="gradient-text">es un bootcamp + hackathon.</span>
      </Title>

      <div className="mt-10 grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-hairline bg-white/[0.015] p-6">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
            <Ban size={13} />
            Hackathon normal
          </div>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-muted">
            <li>Un fin de semana</li>
            <li>Asume que ya sabes</li>
            <li>Solo evalúa al final</li>
            <li>El que sabe gana</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-accent/35 bg-accent/[0.06] p-6">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
            <Check size={13} strokeWidth={3} />
            Este formato · 3 semanas
          </div>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-white/90">
            <li>3 semanas · 4 sesiones</li>
            <li>Te educamos primero</li>
            <li>Office hours · mentores</li>
            <li>El que aprende y construye gana</li>
          </ul>
        </div>
      </div>

      <p className="mt-8 max-w-3xl text-sm text-muted">
        Es un experimento: si queremos que{" "}
        <span className="text-white">más personas participen</span>, lo primero
        es educarlas.
      </p>
    </SlideFrame>
  );
}

/* 10 — Por qué es gratis */
function PorQueGratisSlide() {
  return (
    <SlideFrame>
      <Eyebrow>La pregunta más común</Eyebrow>
      <Title size="md" className="mt-4">
        Es gratis porque se{" "}
        <span className="gradient-text">juntan 3 fuerzas.</span>
      </Title>

      <div className="mt-10 grid max-w-6xl grid-cols-1 gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-hairline bg-white/[0.015] p-5">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/15 text-accent">
            <Coins size={18} strokeWidth={2.2} />
          </span>
          <h3 className="mt-3 text-base font-semibold text-white">
            Celo Colombia
          </h3>
          <p className="mt-1.5 text-xs leading-snug text-muted">
            Como embajador, parte de mi rol es contribuir a que haya más gente
            construyendo en Celo. Premios + apoyo del ecosistema.
          </p>
        </div>

        <div className="rounded-2xl border border-hairline bg-white/[0.015] p-5">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/15 text-accent">
            <GraduationCap size={18} strokeWidth={2.2} />
          </span>
          <h3 className="mt-3 text-base font-semibold text-white">
            Universidad Icesi
          </h3>
          <p className="mt-1.5 text-xs leading-snug text-muted">
            La universidad donde estudié me contactó porque quiere que sus
            estudiantes tengan experiencias reales antes del mundo laboral.
          </p>
        </div>

        <div className="rounded-2xl border border-accent/35 bg-accent/[0.06] p-5">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-ink">
            <Sparkles size={18} strokeWidth={2.4} />
          </span>
          <h3 className="mt-3 text-base font-semibold text-white">
            Mi sueño personal
          </h3>
          <p className="mt-1.5 text-xs leading-snug text-muted">
            Que más colombianos construyan con esta tecnología y compitan a
            nivel global. Poner a Colombia en el mapa.
          </p>
        </div>
      </div>

      <p className="mt-8 max-w-3xl text-sm text-muted">
        Gracias a <span className="text-white">Icesi</span> por los espacios e
        infraestructura. Gracias a{" "}
        <span className="text-white">Celo</span> por los premios. Yo pongo el
        tiempo.
      </p>
    </SlideFrame>
  );
}

/* =========================================================================
 * BLOQUE C · WHY NOW — El mundo cambió
 * ========================================================================= */

/* 11 — El mundo cambió */
function MundoCambioSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Lo que nos trajo acá</Eyebrow>
      <Title size="lg" className="mt-6 max-w-5xl">
        El mundo cambió —{" "}
        <span className="gradient-text">por dos frentes.</span>
      </Title>
      <Body className="mt-8 max-w-3xl text-balance">
        Llevo 16 años construyendo software. Puedo decirles con certeza:{" "}
        <span className="text-white">esta industria no es la misma</span>. Y eso
        es lo que abre la oportunidad de esta hackathon.
      </Body>

      <div className="mt-12 grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-accent/35 bg-accent/[0.06] p-5">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-ink">
            <Coins size={18} strokeWidth={2.4} />
          </span>
          <h3 className="mt-3 text-xl font-semibold text-white">
            01 · Blockchain
          </h3>
          <p className="mt-1 text-sm text-muted">
            Mover dinero sin pedir permiso.
          </p>
        </div>

        <div className="rounded-2xl border border-accent/35 bg-accent/[0.06] p-5">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-ink">
            <Brain size={18} strokeWidth={2.4} />
          </span>
          <h3 className="mt-3 text-xl font-semibold text-white">02 · IA</h3>
          <p className="mt-1 text-sm text-muted">
            Cualquiera puede construir software.
          </p>
        </div>
      </div>
    </SlideFrame>
  );
}

/* 12 — Blockchain qué cambió */
function BlockchainCambioSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Frente 1 · Blockchain</Eyebrow>
      <Title size="md" className="mt-4 max-w-5xl">
        Mover dinero{" "}
        <span className="gradient-text">sin pedir permiso a nadie.</span>
      </Title>
      <Body className="mt-6 max-w-3xl text-balance">
        Nació hace 15 años con Bitcoin. Hoy permite mover valor con código —
        sin licencias, sin intermediarios, en cualquier parte del mundo.
      </Body>

      <div className="mt-10 grid max-w-5xl grid-cols-1 gap-3 md:grid-cols-2">
        <div className="rounded-2xl border border-hairline bg-white/[0.015] p-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
            Stablecoins
          </span>
          <p className="mt-3 text-sm leading-relaxed text-white/85">
            Dinero digital con valor estable. Crecimiento exponencial en
            volumen. Hoy es la forma más barata y rápida de hacer{" "}
            <span className="text-white">pagos transfronterizos</span>.
          </p>
        </div>

        <div className="rounded-2xl border border-hairline bg-white/[0.015] p-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
            Remesas
          </span>
          <p className="mt-3 text-sm leading-relaxed text-white/85">
            Lo que antes costaba 5–8% en comisiones y tardaba días, hoy con
            stablecoins onchain cuesta{" "}
            <span className="text-white">centavos · llega en segundos</span>.
          </p>
        </div>
      </div>
    </SlideFrame>
  );
}

/* 13 — IA qué cambió */
function IACambioSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Frente 2 · IA</Eyebrow>
      <Title size="md" className="mt-4 max-w-5xl">
        Los modelos hacen{" "}
        <span className="gradient-text">cada vez mejor código.</span>
      </Title>
      <Body className="mt-6 max-w-3xl text-balance">
        Cada nueva generación de modelo escribe código mejor. Ya hay
        herramientas enfocadas en ayudar a personas{" "}
        <span className="text-white">sin experiencia</span> a construir
        aplicaciones reales.
      </Body>

      <div className="mt-10 flex flex-wrap items-center gap-2 font-mono text-xs">
        <span className="rounded-full border border-hairline bg-white/[0.02] px-3.5 py-1.5 text-white/80">
          Cursor
        </span>
        <span className="rounded-full border border-hairline bg-white/[0.02] px-3.5 py-1.5 text-white/80">
          Claude Code
        </span>
        <span className="rounded-full border border-hairline bg-white/[0.02] px-3.5 py-1.5 text-white/80">
          Codex
        </span>
        <span className="rounded-full border border-accent/30 bg-accent/[0.08] px-3.5 py-1.5 text-accent">
          Lo vamos a usar
        </span>
      </div>

      <div className="mt-10 inline-flex items-center gap-2.5 rounded-2xl border border-hairline bg-white/[0.02] px-5 py-3">
        <ArrowRight size={16} className="text-accent" />
        <span className="text-sm text-white/85">
          El rol del «ingeniero único que sabe programar»{" "}
          <span className="font-semibold text-white">ya está cambiando</span>.
        </span>
      </div>
    </SlideFrame>
  );
}

/* 14 — Oportunidad y amenaza */
function OportunidadAmenazaSlide() {
  return (
    <SlideFrame>
      <Eyebrow>El doble filo del cambio</Eyebrow>
      <Title size="md" className="mt-4">
        Oportunidad gigante.{" "}
        <span className="gradient-text">Amenaza también gigante.</span>
      </Title>

      <div className="mt-10 grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-accent/35 bg-accent/[0.06] p-6">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
            <Check size={13} strokeWidth={3} />
            Oportunidad
          </div>
          <p className="mt-4 text-base leading-relaxed text-white/90">
            Cualquier persona puede construir productos digitales hoy. Sin
            necesidad de equipo grande. Sin necesidad de capital inicial. Solo
            con criterio y disciplina.
          </p>
        </div>

        <div className="rounded-2xl border border-orange-500/30 bg-orange-500/[0.06] p-6">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-orange-400">
            <AlertTriangle size={13} />
            Amenaza
          </div>
          <p className="mt-4 text-base leading-relaxed text-white/90">
            Cientos de miles de empleos tecnológicos se están perdiendo en el
            mundo.{" "}
            <span className="font-semibold text-white">
              Colombia no está preparada para tanto desempleo.
            </span>
          </p>
        </div>
      </div>

      <div className="mt-8 inline-flex items-center gap-2.5 rounded-2xl border border-accent/25 bg-accent/[0.06] px-5 py-3">
        <Sparkles size={16} className="text-accent" />
        <span className="text-sm text-white/90">
          Una solución: que{" "}
          <span className="font-semibold text-white">
            más colombianos construyan
          </span>{" "}
          este tipo de productos. Que generen empleo. Que no nos coja la ola
          desprevenidos.
        </span>
      </div>
    </SlideFrame>
  );
}

/* 15 — Casos famosos */
function CasosRealesSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Esto ya está pasando</Eyebrow>
      <Title size="md" className="mt-4">
        Builders independientes{" "}
        <span className="gradient-text">generando millones.</span>
      </Title>

      <div className="mt-8 grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-hairline bg-white/[0.015] p-5">
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
            Caso 1
          </span>
          <div className="mt-3 flex items-start gap-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/levels.png"
              alt="Pieter Levels"
              className="h-[34vh] w-auto shrink-0 rounded-xl object-contain ring-1 ring-white/10"
            />
            <div>
              <h3 className="text-xl font-semibold text-white">
                Pieter Levels
              </h3>
              <p className="font-mono text-xs text-muted">@levelsio</p>
              <p className="mt-4 text-sm leading-snug text-muted">
                Millones de dólares con apps que él construye solo. Incluso
                antes de la era de IA.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-hairline bg-white/[0.015] p-5">
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
            Caso 2
          </span>
          <div className="mt-3 flex items-start gap-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/marclou.png"
              alt="Marc Lou"
              className="h-[34vh] w-auto shrink-0 rounded-xl object-contain ring-1 ring-white/10"
            />
            <div>
              <h3 className="text-xl font-semibold text-white">Marc Lou</h3>
              <p className="font-mono text-xs text-muted">@marc_louvion</p>
              <p className="mt-4 text-sm leading-snug text-muted">
                Cientos de miles de dólares generados —{" "}
                <span className="text-white">construyendo en público</span> en
                su cuenta de X.
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-6 max-w-3xl text-sm text-muted">
        Pero les voy a hablar de un caso más cercano —{" "}
        <span className="text-white">el mío</span>. Más real. Más tangible. Y
        que está aquí.
      </p>
    </SlideFrame>
  );
}

/* =========================================================================
 * BLOQUE D · PROOF — Saka Labs
 * ========================================================================= */

/* 16 — Saka Labs · la historia */
function SakaLabsStorySlide() {
  return (
    <SlideFrame>
      <Eyebrow>Mi propio experimento</Eyebrow>
      <Title size="md" className="mt-4">
        Saka Labs —{" "}
        <span className="gradient-text">mi laboratorio personal.</span>
      </Title>
      <Body className="mt-4 max-w-3xl">
        Después de las hackathons, muchos de mis proyectos morían. Decidí ir un
        paso más allá: sacar adelante los que estaban en standby. Fundé{" "}
        <span className="text-white">Saka Labs</span>. Solo yo. Solo
        experimentos con IA + blockchain.
      </Body>

      <div className="mt-10 grid max-w-6xl grid-cols-1 gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-hairline bg-white/[0.015] p-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
            2025 · Hackathons
          </span>
          <p className="mt-3 text-sm leading-relaxed text-white/85">
            Gané la del Uniswap Hook Incubator. Pero a fin de año casi nada
            llegaba a usuarios reales.
          </p>
        </div>
        <div className="rounded-2xl border border-hairline bg-white/[0.015] p-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
            18 de abril · Reset
          </span>
          <p className="mt-3 text-sm leading-relaxed text-white/85">
            Empecé a usar <span className="font-semibold text-white">Claude Code</span> para sacar
            los proyectos en standby. Y empecé a compartir el revenue en
            público.
          </p>
        </div>
        <div className="rounded-2xl border border-accent/35 bg-accent/[0.06] p-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
            Hoy · 40 días después
          </span>
          <p className="mt-3 text-sm leading-relaxed text-white/85">
            Comparto el revenue de cada experimento en{" "}
            <span className="font-semibold text-white">sakalabs.io</span>.
            Build in public es mi motor.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <a
          href="https://www.sakalabs.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-accent/30 bg-accent/[0.06] px-4 py-2.5 font-mono text-xs text-accent transition-colors hover:bg-accent/[0.1] sm:text-sm"
        >
          <ExternalLink size={14} />
          sakalabs.io
        </a>
      </div>
    </SlideFrame>
  );
}

/* 17 — Saka Labs · revenue */
function SakaLabsRevenueSlide() {
  return (
    <SlideFrame>
      <Eyebrow>El resultado · 40 días</Eyebrow>
      <Title size="lg" className="mt-6 max-w-5xl">
        $172 →{" "}
        <span className="gradient-text">$1.000+ USD</span> · solo compartiendo.
      </Title>
      <Body className="mt-6 max-w-3xl text-balance">
        Mes y medio. Sin marketing pagado. Sin growth hacks. Solo el repo
        público y el progreso publicado en X y Telegram.
      </Body>

      <div className="mt-10 grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-3">
          <div className="rounded-2xl border border-hairline bg-white/[0.015] p-5">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
              18 de abril · arranque
            </span>
            <ul className="mt-3 flex flex-col gap-1.5 font-mono text-sm">
              <li className="flex justify-between text-white/75">
                <span>Hashproof</span>
                <span>$163.90</span>
              </li>
              <li className="flex justify-between text-white/75">
                <span>Lotero</span>
                <span>$6.20</span>
              </li>
              <li className="flex justify-between text-white/75">
                <span>Tutela en Línea</span>
                <span>$2.50</span>
              </li>
              <li className="flex justify-between text-white/75">
                <span>Voulti</span>
                <span>$0.04</span>
              </li>
              <li className="mt-1 flex justify-between border-t border-hairline pt-2 text-sm text-white">
                <span>Total</span>
                <span>$172.64</span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-accent/35 bg-accent/[0.06] p-5">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
              Hoy · 40 días después
            </span>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-display text-4xl font-semibold text-accent sm:text-5xl">
                $1.000+
              </span>
              <span className="font-mono text-xs text-muted">USD</span>
            </div>
            <p className="mt-2 text-sm text-muted">~6× en 40 días</p>
          </div>
        </div>

        {/* Follow on X with QR */}
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-hairline bg-white/[0.015] p-6 text-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
            Sígueme en X
          </span>
          <div className="rounded-2xl bg-white p-3">
            <QRCodeSVG
              value={CAMILO_X_URL}
              size={140}
              bgColor="#ffffff"
              fgColor="#050505"
              level="M"
            />
          </div>
          <div>
            <p className="text-base font-semibold text-white">@camilosaka</p>
            <p className="mt-1 text-xs text-muted">
              Ahí voy contando todo · lo bueno y lo malo.
            </p>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

/* 18 — El sueño del programa */
function SueñoProgramaSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Por eso estamos acá</Eyebrow>
      <Title size="lg" className="mt-6 max-w-5xl">
        Que algunos de ustedes —{" "}
        <span className="gradient-text">ojalá todos</span> — inicien su camino
        como builders.
      </Title>
      <Body className="mt-8 max-w-3xl text-balance">
        Creen sus primeras aplicaciones. Las publiquen. Ganen premios. Consigan
        cientos de miles de usuarios. Se vuelvan empresarios digitales.
      </Body>
      <Body className="mt-4 max-w-3xl text-white/55">
        Y si no quieren ser emprendedores: lo que aprendan acá les va a servir
        para su trabajo. Para crear agentes que les faciliten la vida. Para
        ascender. Para ayudar a un amigo o familiar.
      </Body>
    </SlideFrame>
  );
}

/* =========================================================================
 * BLOQUE E · HOW TO BUILD — Lean Startup, MVP, simplicidad
 * ========================================================================= */

/* 19 — 9 años en 4 sesiones */
function NueveAniosCuatroSesionesSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Lo que viene · educación</Eyebrow>
      <Title size="xl" className="mt-8 max-w-5xl">
        Voy a resumir 9 años de carrera{" "}
        <span className="gradient-text">en 4 sesiones.</span>
      </Title>
      <Body className="mt-10 max-w-3xl text-balance">
        A mí me ha costado mucho tiempo y mucho dolor.{" "}
        <span className="text-white">Aprovéchenlo.</span>
      </Body>
    </SlideFrame>
  );
}

/* 20 — Lean Startup */
function LeanStartupSlide() {
  return (
    <SlideFrame>
      <Eyebrow>El método</Eyebrow>
      <Title size="md" className="mt-4">
        Lean Startup —{" "}
        <span className="gradient-text">Build · Measure · Learn.</span>
      </Title>
      <Body className="mt-4 max-w-3xl">
        Una metodología basada en el método científico. Tres fases que se
        repiten hasta que tu producto encuentra a su usuario.
      </Body>

      <div className="mt-10 grid max-w-6xl grid-cols-1 gap-5 lg:grid-cols-[auto_1fr] lg:items-center">
        {/* Imagen */}
        <div className="rounded-2xl border border-hairline bg-white p-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/lean-startup.png"
            alt="Lean Startup · Build Measure Learn cycle"
            className="h-56 w-auto rounded-lg object-contain"
          />
        </div>

        {/* 3 cards */}
        <div className="grid grid-cols-1 gap-3">
          <div className="rounded-xl border border-hairline bg-white/[0.015] p-4">
            <span className="font-mono text-[10px] uppercase tracking-wider text-accent">
              01 · Build
            </span>
            <p className="mt-1.5 text-sm text-white/85">
              Construye una versión mínima de tu idea — la más pequeña que
              prueba la hipótesis.
            </p>
          </div>
          <div className="rounded-xl border border-hairline bg-white/[0.015] p-4">
            <span className="font-mono text-[10px] uppercase tracking-wider text-accent">
              02 · Measure
            </span>
            <p className="mt-1.5 text-sm text-white/85">
              Lánzala. Mide cómo te fue. Saca los datos reales.
            </p>
          </div>
          <div className="rounded-xl border border-hairline bg-white/[0.015] p-4">
            <span className="font-mono text-[10px] uppercase tracking-wider text-accent">
              03 · Learn
            </span>
            <p className="mt-1.5 text-sm text-white/85">
              Con esa data decides — sigues, modificas, o creas algo nuevo.
            </p>
          </div>
        </div>
      </div>

      <p className="mt-8 max-w-3xl text-sm text-muted">
        Mucha gente no respeta este proceso.{" "}
        <span className="text-white">
          Pasan 1–2 años construyendo algo que nadie quiere usar.
        </span>
      </p>
    </SlideFrame>
  );
}

/* 21 — MVP */
function MVPSlide() {
  return (
    <SlideFrame>
      <Eyebrow>El núcleo del Build</Eyebrow>
      <Title size="md" className="mt-4">
        MVP —{" "}
        <span className="gradient-text">Producto Mínimo Viable.</span>
      </Title>

      <div className="mt-8 grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr] lg:items-center">
        {/* Imagen */}
        <div className="rounded-2xl border border-hairline bg-white p-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/mvp.webp"
            alt="MVP — el camino correcto vs el incorrecto"
            className="h-auto w-full rounded-lg object-contain"
          />
        </div>

        {/* Explicación */}
        <div className="flex flex-col gap-4">
          <Body className="text-balance">
            La <span className="text-white">versión mínima</span> de tu idea
            que resuelve el dolor del usuario. Tal vez no de la mejor manera
            — pero lo resuelve.
          </Body>
          <div className="rounded-2xl border border-accent/30 bg-accent/[0.06] p-5">
            <Target size={16} className="text-accent" />
            <p className="mt-2 text-sm text-white/90">
              Lo más pequeño que prueba que{" "}
              <span className="font-semibold text-accent">
                el problema vale la pena resolver
              </span>{" "}
              — no «lo más pequeño que funciona técnicamente».
            </p>
          </div>
          <Body className="text-sm text-white/55">
            Yo cometí este error. Muchos emprendedores con experiencia siguen
            cometiéndolo. Quieren la mega app desde el día uno.
          </Body>
        </div>
      </div>
    </SlideFrame>
  );
}

/* 22 — Apps famosas en MVP */
function AppsFamosasMVPSlide() {
  return (
    <SlideFrame>
      <Eyebrow>La prueba histórica</Eyebrow>
      <Title size="md" className="mt-4">
        Todas las mega-apps que conoces{" "}
        <span className="gradient-text">empezaron como MVPs feos.</span>
      </Title>

      <div className="mt-10 grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-hairline bg-white/[0.02] p-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/facebook_mvp.webp"
            alt="Facebook en sus primeros días"
            className="h-auto w-full rounded-xl object-contain"
          />
          <p className="mt-3 text-center font-mono text-xs text-muted">
            Facebook · primer prototipo
          </p>
        </div>
        <div className="rounded-2xl border border-hairline bg-white/[0.02] p-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/twitter_mvp.webp"
            alt="Twitter en su versión inicial"
            className="h-auto w-full rounded-xl object-contain"
          />
          <p className="mt-3 text-center font-mono text-xs text-muted">
            Twitter · primer prototipo
          </p>
        </div>
      </div>

      <p className="mt-8 max-w-3xl text-sm text-muted">
        Dropbox empezó con un video explicativo, sin código. Airbnb con un
        sitio para alquilar 3 colchones inflables.{" "}
        <span className="text-white">
          Uno no sabe qué quieren los usuarios hasta que se lo pone enfrente.
        </span>
      </p>
    </SlideFrame>
  );
}

/* 23 — Los mejores no suenan complejos */
function MejoresProyectosSimplesSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Otro error común</Eyebrow>
      <Title size="lg" className="mt-6 max-w-5xl">
        Los mejores proyectos no son los más complejos —{" "}
        <span className="gradient-text">
          son los que resuelven mejor el problema.
        </span>
      </Title>
      <Body className="mt-8 max-w-3xl text-balance">
        No crean que porque su proyecto suena complejo, tiene mucha ingeniería
        o se mataron por detrás van a tener más oportunidades de ganar. Es{" "}
        <span className="text-white">justo lo contrario</span>.
      </Body>
      <Body className="mt-4 max-w-3xl text-white/55">
        Lo que gana mercados (y jurados) es resolver problemas reales{" "}
        <span className="text-white">y comunicarlo claro</span>. Mi pitch de
        Clipa quedó tercero en Venezuela — sencillo, directo, sin trucos.
      </Body>
    </SlideFrame>
  );
}

/* 24 — Construir vs Distribución */
function DistribucionEsElProblemaSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Pero ojo · la falacia</Eyebrow>
      <Title size="xl" className="mt-8 max-w-5xl">
        Construir está más fácil que nunca —{" "}
        <span className="gradient-text">conseguir usuarios sigue siendo lo difícil.</span>
      </Title>
      <Body className="mt-10 max-w-3xl text-balance">
        Hay mucho humo: «con IA puedes construir cualquier cosa». Cierto. Pero
        construir es solo una parte. La{" "}
        <span className="text-white">distribución</span> sigue siendo el reto
        real.
      </Body>
      <Body className="mt-4 max-w-3xl text-white/55">
        Y es ahí donde entra Celo — porque tiene una respuesta concreta a ese
        problema.
      </Body>
    </SlideFrame>
  );
}

/* =========================================================================
 * BLOQUE F · CELO — Qué es y las palancas
 * ========================================================================= */

/* 25 — Qué es Celo */
function QueEsCeloSlide() {
  return (
    <SlideFrame>
      <Eyebrow>La blockchain que vamos a usar</Eyebrow>
      <Title size="md" className="mt-4 max-w-5xl">
        Celo —{" "}
        <span className="gradient-text">
          programmable rails for global finance.
        </span>
      </Title>
      <Body className="mt-6 max-w-3xl text-balance">
        Una tecnología que nos permite{" "}
        <span className="text-white">mover dinero con código</span> dentro de
        nuestras aplicaciones — sin pedir permiso a nadie, sin necesitar
        licencias. Para usuarios en cualquier parte del mundo.
      </Body>

      <div className="mt-10 grid max-w-5xl grid-cols-2 gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-accent/30 bg-accent/[0.06] p-4">
          <span className="font-mono text-[10px] uppercase tracking-wider text-accent">
            Volumen mensual
          </span>
          <p className="mt-2 font-display text-2xl font-semibold text-white">
            $6.2B
          </p>
          <p className="text-xs text-muted">stablecoin payments</p>
        </div>
        <div className="rounded-2xl border border-hairline bg-white/[0.015] p-4">
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
            Enfoque
          </span>
          <p className="mt-2 font-display text-base font-semibold text-white">
            Pagos · Stablecoins
          </p>
          <p className="text-xs text-muted">mobile-first</p>
        </div>
        <div className="rounded-2xl border border-hairline bg-white/[0.015] p-4">
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
            Estado
          </span>
          <p className="mt-2 font-display text-base font-semibold text-white">
            Líder global
          </p>
          <p className="text-xs text-muted">adoption stablecoin</p>
        </div>
      </div>
    </SlideFrame>
  );
}

/* 26 — Por qué me gusta Celo */
function PorQueMeGustaCeloSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Yo conocí Celo en 3 papeles</Eyebrow>
      <Title size="md" className="mt-4">
        Usuario → Embajador →{" "}
        <span className="gradient-text">Builder.</span>
      </Title>
      <Body className="mt-6 max-w-3xl text-balance">
        Lo que más me gusta del ecosistema es que entiende el problema de
        distribución. Tiene un{" "}
        <span className="text-white">camino súper establecido</span> para que
        un developer pueda triunfar.
      </Body>

      <p className="mt-8 max-w-3xl text-base text-white/85">
        Voy a hablarles de las{" "}
        <span className="font-semibold text-accent">4 palancas</span> más
        importantes para ustedes.
      </p>
    </SlideFrame>
  );
}

/* 27 — Palanca 1 · Proof of Ship */
function ProofOfShipSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Palanca 1 · Proof of Ship</Eyebrow>
      <Title size="md" className="mt-4 max-w-5xl">
        $5.000 USDT al mes —{" "}
        <span className="gradient-text">para los Top 50 builders.</span>
      </Title>
      <Body className="mt-6 max-w-3xl text-balance">
        Programa que premia a builders por construir sus proyectos —{" "}
        <span className="text-white">sin pedirles nada a cambio</span>. Ni
        equity, ni propiedad. Office hours semanales con feedback.
      </Body>

      <div className="mt-8 grid max-w-6xl grid-cols-2 gap-3 md:grid-cols-4">
        <div className="rounded-2xl border border-accent/30 bg-accent/[0.06] p-4">
          <span className="font-mono text-[10px] uppercase tracking-wider text-accent">
            Pool mensual
          </span>
          <p className="mt-2 font-display text-2xl font-semibold text-white">
            $5.000
          </p>
          <p className="text-xs text-muted">USDT · Top 50</p>
        </div>
        <div className="rounded-2xl border border-hairline bg-white/[0.015] p-4">
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
            Yo en mayo
          </span>
          <p className="mt-2 font-display text-2xl font-semibold text-accent">
            Top 2
          </p>
          <p className="text-xs text-muted">con nerdos.fun</p>
        </div>
        <div className="rounded-2xl border border-hairline bg-white/[0.015] p-4">
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
            Yo acumulado
          </span>
          <p className="mt-2 font-display text-2xl font-semibold text-white">
            $500
          </p>
          <p className="text-xs text-muted">USDT en 2 meses</p>
        </div>
        <div className="rounded-2xl border border-hairline bg-white/[0.015] p-4">
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
            Máximo
          </span>
          <p className="mt-2 font-display text-2xl font-semibold text-white">
            $2.000
          </p>
          <p className="text-xs text-muted">por proyecto · season</p>
        </div>
      </div>

      <div className="mt-6 flex max-w-4xl flex-col gap-2">
        <a
          href="https://talent.app/~/earn/celo-proof-of-ship"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-accent/30 bg-accent/[0.06] px-4 py-2.5 font-mono text-xs text-accent transition-colors hover:bg-accent/[0.1] sm:text-sm"
        >
          <ExternalLink size={14} />
          talent.app/~/earn/celo-proof-of-ship
        </a>
      </div>
    </SlideFrame>
  );
}

/* 28 — Palanca 1.5 · AI Agent Track */
function AIAgentTrackSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Bonus exclusivo</Eyebrow>
      <Title size="md" className="mt-4 max-w-5xl">
        $1.000 USDT extra —{" "}
        <span className="gradient-text">si construyes con agentes IA.</span>
      </Title>
      <Body className="mt-4 max-w-3xl">
        4 ganadores al mes · $250 USDT cada uno. Aparte del Top 50 — un
        proyecto puede ganar en ambos.
      </Body>

      <div className="mt-8 grid max-w-5xl grid-cols-2 gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-accent/30 bg-accent/[0.06] p-4">
          <span className="font-mono text-[10px] uppercase tracking-wider text-accent">
            Pool extra
          </span>
          <p className="mt-2 font-display text-2xl font-semibold text-white">
            $1.000
          </p>
          <p className="text-xs text-muted">USDT al mes</p>
        </div>
        <div className="rounded-2xl border border-hairline bg-white/[0.015] p-4">
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
            Ganadores
          </span>
          <p className="mt-2 font-display text-2xl font-semibold text-white">
            4
          </p>
          <p className="text-xs text-muted">× $250 c/u</p>
        </div>
        <div className="rounded-2xl border border-hairline bg-white/[0.015] p-4">
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
            Stacking
          </span>
          <p className="mt-2 font-display text-base font-semibold text-white">
            Con Top 50
          </p>
          <p className="text-xs text-muted">acumula</p>
        </div>
      </div>

      <p className="mt-8 max-w-3xl text-sm text-muted">
        Estamos haciendo una hackathon de agentes onchain.{" "}
        <span className="text-white">Esto fue hecho para ustedes.</span>
      </p>
    </SlideFrame>
  );
}

/* 29 — Palanca 2 · MiniPay */
function MiniPaySlide() {
  return (
    <SlideFrame>
      <Eyebrow>Palanca 2 · MiniPay</Eyebrow>

      <div className="mt-4 flex items-baseline gap-4">
        <span className="font-display text-[6rem] font-semibold leading-none tracking-tighter text-accent drop-shadow-[0_0_40px_rgba(252,255,82,0.3)] sm:text-[8rem]">
          15M+
        </span>
        <span className="font-mono text-sm uppercase tracking-[0.18em] text-muted">
          Usuarios · principalmente África
        </span>
      </div>

      <Title size="md" className="mt-6 max-w-5xl">
        La wallet móvil donde{" "}
        <span className="gradient-text">aterrizan las mini apps.</span>
      </Title>
      <Body className="mt-6 max-w-3xl text-balance">
        Aplicación con 15M+ usuarios que ya están listos para usar mini apps.
        Las apps que llegan ahí generan cientos de miles —{" "}
        <span className="text-white">a veces millones</span> — de
        transacciones.
      </Body>

      <div className="mt-8 flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted">
        <span className="rounded-full border border-hairline bg-white/[0.02] px-3 py-1.5">
          Opera + Celo
        </span>
        <span className="rounded-full border border-hairline bg-white/[0.02] px-3 py-1.5">
          Mobile-first
        </span>
        <span className="rounded-full border border-hairline bg-white/[0.02] px-3 py-1.5">
          África · 60+ países
        </span>
        <span className="rounded-full border border-accent/30 bg-accent/[0.08] px-3 py-1.5 text-accent">
          Tu meta
        </span>
      </div>
    </SlideFrame>
  );
}

/* NUEVO — Screenshots de MiniPay */
function MiniPayScreenshotsSlide() {
  const shots = [
    { src: "/minipay1.jpeg", alt: "MiniPay · pantalla principal" },
    { src: "/minipay2.jpeg", alt: "MiniPay · mini apps" },
    { src: "/minipay3.jpeg", alt: "MiniPay · pago" },
  ];
  return (
    <SlideFrame>
      <Eyebrow>MiniPay por dentro</Eyebrow>
      <Title size="md" className="mt-4">
        Así se ve —{" "}
        <span className="gradient-text">por dentro.</span>
      </Title>
      <Body className="mt-4 max-w-3xl">
        Mobile-first, simple, con stablecoins listas para usar. Esto es lo que
        millones de usuarios en África abren a diario.
      </Body>

      <div className="mt-8 flex flex-wrap justify-center gap-4 sm:gap-6">
        {shots.map((s) => (
          <div key={s.src} className="relative">
            <div className="absolute -inset-2 rounded-3xl bg-accent/[0.08] blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border-2 border-white/10 bg-surface p-1.5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.src}
                alt={s.alt}
                className="h-[46vh] w-auto rounded-xl object-contain"
              />
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 max-w-3xl text-sm text-muted">
        Las mini apps viven{" "}
        <span className="text-white">dentro</span> de esta app. Esa es la
        oportunidad — su mini app puede aterrizar acá.
      </p>
    </SlideFrame>
  );
}

/* 30 — Palanca 3 · Comunidad */
function ComunidadCeloSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Palanca 3 · Comunidad</Eyebrow>
      <Title size="md" className="mt-4">
        Las sociedades crecen{" "}
        <span className="gradient-text">gracias a comunidades.</span>
      </Title>
      <Body className="mt-4 max-w-3xl">
        Mis primeros usuarios de nerdos.fun fueron la comunidad de Celo —
        probaron, dieron feedback, llevaron al proyecto al Top 2.
      </Body>

      <div className="mt-10 grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-2">
        {/* QR Celo Colombia */}
        <div className="flex items-center gap-5 rounded-2xl border border-hairline bg-white/[0.015] p-5">
          <div className="shrink-0 rounded-xl bg-white p-2.5">
            <QRCodeSVG
              value={CELO_COLOMBIA_TG}
              size={100}
              bgColor="#ffffff"
              fgColor="#050505"
              level="M"
            />
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-accent">
              Comunidad general
            </span>
            <p className="mt-1 text-base font-semibold text-white">
              Celo Colombia
            </p>
            <p className="mt-1 text-xs text-muted">
              Telegram · eventos, anuncios y comunidad local.
            </p>
          </div>
        </div>

        {/* QR Devs */}
        <div className="flex items-center gap-5 rounded-2xl border border-accent/35 bg-accent/[0.06] p-5">
          <div className="shrink-0 rounded-xl bg-white p-2.5">
            <QRCodeSVG
              value={CELO_DEVS_TG}
              size={100}
              bgColor="#ffffff"
              fgColor="#050505"
              level="M"
            />
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-accent">
              Comunidad builders
            </span>
            <p className="mt-1 text-base font-semibold text-white">
              Celo · Developers
            </p>
            <p className="mt-1 text-xs text-muted">
              Telegram · feedback técnico y otros builders.
            </p>
          </div>
        </div>
      </div>

      <p className="mt-8 max-w-3xl text-sm text-muted">
        Probar las apps de otros y compartir las propias{" "}
        <span className="text-white">acelera todo</span>.
      </p>
    </SlideFrame>
  );
}

/* 31 — Palanca 4 · Otras hackathons */
function OtrasHackathonsGlobalesSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Palanca 4 · Hackathons globales</Eyebrow>
      <Title size="md" className="mt-4 max-w-5xl">
        Celo organiza hackathons{" "}
        <span className="gradient-text">globales muy frecuentemente.</span>
      </Title>
      <Body className="mt-4 max-w-3xl">
        Pueden aplicar con lo que ya están construyendo acá. En este momento
        hay una activa.
      </Body>

      <div className="mt-10 max-w-5xl rounded-2xl border border-accent/35 bg-accent/[0.06] p-6">
        <div className="flex items-start gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent text-ink">
            <Bot size={22} strokeWidth={2.2} />
          </span>
          <div className="flex-1">
            <p className="text-lg font-semibold text-white">
              Onchain Agents Hackathon
            </p>
            <p className="mt-1 text-sm text-muted">
              Presupuesto:{" "}
              <span className="text-accent font-semibold">$5.000 USD</span> ·
              fecha límite{" "}
              <span className="text-white">15 de junio</span>.
            </p>
            <p className="mt-3 text-sm text-white/85">
              Si alguno le mete velocidad, con lo que construye acá puede estar
              aplicando a ese pool extra.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 inline-flex items-center gap-2.5 rounded-2xl border border-accent/25 bg-accent/[0.06] px-5 py-3">
        <Sparkles size={16} className="text-accent" />
        <span className="text-sm text-white/90">
          Sumando PoS ($5K) + AI Agent Track ($1K) + Onchain Agents ($5K) ={" "}
          <span className="font-semibold text-white">
            $11.000 USD extra al que pueden aplicar
          </span>{" "}
          además de los premios locales.
        </span>
      </div>
    </SlideFrame>
  );
}

/* =========================================================================
 * BLOQUE G · TIPOS, REQUISITOS Y PREMIOS LOCALES
 * ========================================================================= */

/* 32 — Tipos de apps que gustan en MiniPay */
function TiposAppsMiniPaySlide() {
  const apps: { icon: LucideIcon; text: string }[] = [
    { icon: Award, text: "Juegos simples con recompensas" },
    { icon: Coins, text: "Apps de ahorro / educación financiera" },
    { icon: ArrowLeftRight, text: "Pagos entre personas" },
    { icon: Target, text: "Recompensas por completar tareas" },
    { icon: Store, text: "Mini marketplaces" },
    { icon: Globe, text: "Remesas y cobros internacionales" },
    { icon: Users, text: "Herramientas para comunidades" },
    { icon: Briefcase, text: "Apps con stablecoins locales" },
  ];
  return (
    <SlideFrame>
      <Eyebrow>Lo que aterriza en MiniPay</Eyebrow>
      <Title size="md" className="mt-4">
        8 tipos de apps que{" "}
        <span className="gradient-text">funcionan ahí.</span>
      </Title>

      <ul className="mt-10 grid max-w-6xl grid-cols-2 gap-3 md:grid-cols-4">
        {apps.map((a) => {
          const Icon = a.icon;
          return (
            <li
              key={a.text}
              className="flex items-start gap-2.5 rounded-xl border border-hairline bg-white/[0.015] p-4"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent/15 text-accent">
                <Icon size={16} strokeWidth={2.2} />
              </span>
              <p className="pt-1 text-sm leading-snug text-white/85">
                {a.text}
              </p>
            </li>
          );
        })}
      </ul>

      <p className="mt-8 max-w-3xl text-sm text-muted">
        Lo que tienen en común:{" "}
        <span className="text-white">simples · móviles</span> · utilidad clara.
      </p>
    </SlideFrame>
  );
}

/* 33 — Requisitos */
function RequisitosSlide() {
  const reqs: { icon: LucideIcon; label: string; desc: string }[] = [
    {
      icon: Github,
      label: "Open source",
      desc: "Repo GitHub público. Tu código es de tu equipo, pero visible.",
    },
    {
      icon: PlayCircle,
      label: "Demo video",
      desc: "Un video corto mostrando el flujo funcionando.",
    },
    {
      icon: Check,
      label: "Funcional",
      desc: "Desplegado en Celo Mainnet con smart contracts verificados.",
    },
    {
      icon: Ban,
      label: "Sin apuestas · sin DeFi solo",
      desc: "Nada de gambling, farming o DeFi de manejo de fondos.",
    },
  ];
  return (
    <SlideFrame>
      <Eyebrow>Reglas del juego</Eyebrow>
      <Title size="md" className="mt-4">
        Requisitos para{" "}
        <span className="gradient-text">PoS y MiniPay.</span>
      </Title>

      <div className="mt-10 grid max-w-6xl grid-cols-1 gap-3 md:grid-cols-2">
        {reqs.map((r) => {
          const Icon = r.icon;
          return (
            <div
              key={r.label}
              className="flex items-start gap-3 rounded-xl border border-hairline bg-white/[0.015] p-4"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent/15 text-accent">
                <Icon size={16} strokeWidth={2.2} />
              </span>
              <div>
                <p className="text-base font-semibold text-white">{r.label}</p>
                <p className="mt-1 text-sm leading-snug text-muted">
                  {r.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </SlideFrame>
  );
}

/* 34 — Premios locales */
function PremiosSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Premios locales · esta hackathon</Eyebrow>
      <Title size="md" className="mt-4">
        Bolsa total ·{" "}
        <span className="gradient-text">3.000.000 COPm.</span>
      </Title>

      <div className="mt-8 grid max-w-5xl grid-cols-1 gap-3 md:grid-cols-3">
        {[
          { rank: 1, place: "1er lugar", amount: "1.000.000", icon: Trophy },
          { rank: 2, place: "2do lugar", amount: "600.000", icon: Medal },
          { rank: 3, place: "3er lugar", amount: "400.000", icon: Medal },
        ].map((p) => {
          const Icon = p.icon;
          const isFirst = p.rank === 1;
          return (
            <div
              key={p.rank}
              className={`rounded-2xl border p-5 ${
                isFirst
                  ? "border-accent/40 bg-accent/[0.06]"
                  : "border-hairline bg-white/[0.015]"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`grid h-9 w-9 place-items-center rounded-lg ${
                    isFirst
                      ? "bg-accent text-ink"
                      : "bg-white/[0.05] text-white/70"
                  }`}
                >
                  <Icon size={18} />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                  {p.place}
                </span>
              </div>
              <p className="mt-5 font-display text-3xl font-semibold text-white">
                {p.amount}
                <span className="ml-1 font-mono text-sm text-muted">COPm</span>
              </p>
              <p className="mt-2 text-sm text-muted">Mejor Mini App</p>
            </div>
          );
        })}
      </div>

      <div className="mt-4 max-w-5xl rounded-2xl border border-dashed border-hairline bg-white/[0.015] p-5">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent">
            <Sparkles size={18} />
          </span>
          <div>
            <p className="text-base font-semibold text-white">
              Bonus integración COPm · 1.000.000 COPm
            </p>
            <p className="mt-0.5 text-sm text-muted">
              Hasta 10 proyectos · 100.000 COPm cada uno · si integran el peso
              colombiano.
            </p>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

/* 35 — Esto es tu entrada al ecosistema */
function EsTuEntradaEcosistemaSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Lo que viene después</Eyebrow>
      <Title size="lg" className="mt-6 max-w-5xl">
        Esto no es solo construir una app —{" "}
        <span className="gradient-text">es su entrada al ecosistema Celo.</span>
      </Title>
      <Body className="mt-8 max-w-3xl text-balance">
        Lo que construyan acá no termina el 19 de junio. Termina cuando
        ustedes dejen de actualizar el repo. Y esa decisión es solo de ustedes.
      </Body>
    </SlideFrame>
  );
}

/* =========================================================================
 * BLOQUE H · AI EDUCATION
 * ========================================================================= */

const AI_LAYERS: {
  icon: LucideIcon;
  label: string;
  desc: string;
  examples: string;
  highlight?: boolean;
}[] = [
  {
    icon: Brain,
    label: "Modelo",
    desc: "La IA en sí — el cerebro. Hecha por una compañía.",
    examples: "GPT-4 · Claude · Gemini",
  },
  {
    icon: MessageSquare,
    label: "App / Chat",
    desc: "Interfaz para conversar con un modelo.",
    examples: "chatgpt.com · claude.ai",
  },
  {
    icon: Code,
    label: "Agente · IDE",
    desc: "Donde escribes código. Usa un modelo como copiloto.",
    examples: "Cursor · Claude Code · Codex",
  },
  {
    icon: Sparkles,
    label: "Skill",
    desc: "Extensión que le da contexto extra al modelo.",
    examples: "Celopedia ← lo van a usar",
    highlight: true,
  },
];

/* 36 — AI 101 */
function AILiteracySlide() {
  return (
    <SlideFrame>
      <Eyebrow>AI 101 · qué es qué</Eyebrow>
      <Title size="md" className="mt-4">
        Si vas a construir con IA, debes saber{" "}
        <span className="gradient-text">qué es cada cosa.</span>
      </Title>

      <div className="mt-10 grid max-w-6xl grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
        {AI_LAYERS.map((l) => {
          const Icon = l.icon;
          return (
            <div
              key={l.label}
              className={`rounded-2xl border p-5 ${
                l.highlight
                  ? "border-accent/35 bg-accent/[0.06]"
                  : "border-hairline bg-white/[0.015]"
              }`}
            >
              <span
                className={`grid h-9 w-9 place-items-center rounded-lg ${
                  l.highlight
                    ? "bg-accent text-ink"
                    : "bg-accent/15 text-accent"
                }`}
              >
                <Icon size={16} strokeWidth={2.2} />
              </span>
              <h3 className="mt-3 text-base font-semibold text-white">
                {l.label}
              </h3>
              <p className="mt-1 text-xs leading-snug text-muted">{l.desc}</p>
              <p className="mt-3 font-mono text-[11px] text-white/55">
                {l.examples}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 max-w-5xl rounded-2xl border border-orange-500/25 bg-orange-500/[0.05] p-4">
        <div className="flex items-start gap-3">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-orange-500/15 text-orange-400">
            <AlertTriangle size={15} />
          </span>
          <div>
            <p className="text-sm font-semibold text-white">
              La confusión más común
            </p>
            <p className="mt-0.5 text-sm text-white/75">
              <span className="font-mono text-orange-300">ChatGPT</span> es la
              app ·{" "}
              <span className="font-mono text-orange-300">GPT-4</span> es el
              modelo ·{" "}
              <span className="font-mono text-orange-300">OpenAI</span> es la
              compañía.{" "}
              <span className="font-semibold text-white">
                Tres cosas distintas.
              </span>
            </p>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

const CELOPEDIA_STATS = [
  { value: "150+", label: "contratos verificados" },
  { value: "6,300+", label: "productos del ecosistema" },
  { value: "5", label: "templates de MiniPay" },
  { value: "20+", label: "programas de grants" },
];

/* 37 — Celopedia */
function CelopediaSlide() {
  return (
    <SlideFrame>
      <Eyebrow>El skill esencial · creado por Celo</Eyebrow>
      <Title size="md" className="mt-4">
        Celopedia —{" "}
        <span className="gradient-text">tu copiloto sabe de Celo.</span>
      </Title>
      <Body className="mt-5 max-w-3xl text-balance">
        El modelo solo no conoce los contratos ni los templates de MiniPay.
        Celopedia es un{" "}
        <span className="text-white">skill creado por Celo</span> que le da ese
        contexto a tu IDE.
      </Body>

      <div className="mt-7 max-w-4xl">
        <CodeBlock filename="terminal">
          npx skills add celo-org/celopedia-skills
        </CodeBlock>
      </div>

      <div className="mt-5 grid max-w-6xl grid-cols-2 gap-3 md:grid-cols-4">
        {CELOPEDIA_STATS.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-hairline bg-white/[0.015] p-4"
          >
            <p className="font-display text-2xl font-semibold text-accent">
              {s.value}
            </p>
            <p className="mt-1 text-xs leading-snug text-muted">{s.label}</p>
          </div>
        ))}
      </div>
    </SlideFrame>
  );
}

/* =========================================================================
 * BLOQUE I · HANDS ON
 * ========================================================================= */

/* 38 — Manos a la obra · explorar ideas */
function ManosObraSlide() {
  const steps = [
    {
      icon: Smartphone,
      title: "Descarguen MiniPay",
      desc: "Vean el tipo de mini apps que ya hay ahí — qué resuelven, cómo se ven.",
    },
    {
      icon: Sparkles,
      title: "Instalen Celopedia en su IDE",
      desc: "Para que su agente IA conozca el ecosistema Celo a fondo.",
    },
    {
      icon: Lightbulb,
      title: "Empiecen a explorar ideas",
      desc: "Pídanle a su agente que les sugiera proyectos. No hay que cerrar la idea HOY.",
    },
  ];
  return (
    <SlideFrame>
      <Eyebrow>Manos a la obra · 1</Eyebrow>
      <Title size="md" className="mt-4">
        Tomemos unos minutos —{" "}
        <span className="gradient-text">exploremos ideas.</span>
      </Title>
      <Body className="mt-4 max-w-3xl">
        No tienen que definir la idea hoy. Es para empezar a moverse.
      </Body>

      <ol className="mt-10 flex max-w-5xl flex-col gap-3">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <li
              key={s.title}
              className="flex items-start gap-4 rounded-xl border border-hairline bg-white/[0.015] p-4"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent/15 text-accent">
                <Icon size={16} strokeWidth={2.2} />
              </span>
              <div className="flex-1">
                <p className="text-base font-semibold text-white">
                  {i + 1}. {s.title}
                </p>
                <p className="mt-1 text-sm leading-snug text-muted">{s.desc}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </SlideFrame>
  );
}

/* 39 — Forma equipo o trabaja solo */
function EquipoSoloSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Manos a la obra · 2</Eyebrow>
      <Title size="md" className="mt-4">
        Formen equipo —{" "}
        <span className="gradient-text">o trabajen solos.</span>
      </Title>

      <div className="mt-10 grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-accent/35 bg-accent/[0.06] p-6">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
            <Users size={13} />
            Si quieren equipo
          </div>
          <p className="mt-4 text-base leading-relaxed text-white/90">
            Recomendación: mezclen{" "}
            <span className="font-semibold text-white">
              principiantes con gente que ha programado
            </span>
            . Equipos balanceados llegan más lejos.
          </p>
        </div>

        <div className="rounded-2xl border border-hairline bg-white/[0.015] p-6">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
            <Compass size={13} />
            Si quieren ir solos
          </div>
          <p className="mt-4 text-base leading-relaxed text-white/90">
            También está bien. Con IA pueden avanzar mucho.{" "}
            <span className="text-white">
              Y el grupo de Telegram es para preguntar.
            </span>
          </p>
        </div>
      </div>
    </SlideFrame>
  );
}

/* 40 — Arquitectura simple */
function ArquitecturaSimpleSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Arquitectura — para hoy</Eyebrow>
      <Title size="md" className="mt-4 max-w-5xl">
        Una app tiene muchas piezas. Hoy solo nos importan{" "}
        <span className="gradient-text">dos.</span>
      </Title>
      <Body className="mt-4 max-w-3xl">
        Para que no se compliquen, hoy solo vamos a hablar de Frontend y
        Backend. Lo demás viene en las siguientes sesiones.
      </Body>

      <div className="mt-8 grid max-w-6xl grid-cols-1 items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        {/* Imagen FE vs BE */}
        <div className="flex items-center justify-center rounded-2xl border border-hairline bg-white p-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/frontend.jpg"
            alt="Frontend vs Backend"
            className="max-h-[50vh] w-auto rounded-lg object-contain"
          />
        </div>

        {/* Cards apiladas */}
        <div className="overflow-hidden rounded-2xl border border-hairline">
          <div className="grid grid-cols-1 divide-y divide-hairline">
            <div className="bg-accent/[0.06] p-5">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-ink">
                  <MousePointer2 size={18} strokeWidth={2.2} />
                </span>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                    Capa 1
                  </span>
                  <p className="text-lg font-semibold text-white">Frontend</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-white/80">
                Lo que el usuario ve y toca.{" "}
                <span className="text-accent">Empezamos por acá.</span>
              </p>
            </div>
            <div className="bg-white/[0.015] p-5">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/[0.05] text-white/70">
                  <Server size={18} strokeWidth={2.2} />
                </span>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                    Capa 2
                  </span>
                  <p className="text-lg font-semibold text-white">Backend</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted">
                El cerebro que procesa y guarda info. Lo vemos en Bootcamp #2.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

/* 41 — Qué es Frontend */
function QueEsFrontendSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Capa 1 · Frontend</Eyebrow>
      <Title size="md" className="mt-4">
        Lo que el usuario{" "}
        <span className="gradient-text">ve y toca.</span>
      </Title>
      <Body className="mt-6 max-w-3xl text-balance">
        Las pantallas. Los botones. Los textos. Los colores. Es lo que se abre
        cuando alguien entra a tu app.
      </Body>

      <div className="mt-10 grid max-w-5xl grid-cols-1 gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-hairline bg-white/[0.015] p-5">
          <span className="font-mono text-[10px] uppercase tracking-wider text-accent">
            Por qué empezamos acá
          </span>
          <p className="mt-3 text-sm text-white/85">
            Es lo más{" "}
            <span className="font-semibold text-white">fácil de ver</span>. Sin
            necesidad de conectar nada todavía.
          </p>
        </div>
        <div className="rounded-2xl border border-hairline bg-white/[0.015] p-5">
          <span className="font-mono text-[10px] uppercase tracking-wider text-accent">
            Qué deben lograr
          </span>
          <p className="mt-3 text-sm text-white/85">
            Que se vea. Que se le pueda dar clic. Que la navegación funcione
            entre pantallas.
          </p>
        </div>
        <div className="rounded-2xl border border-hairline bg-white/[0.015] p-5">
          <span className="font-mono text-[10px] uppercase tracking-wider text-accent">
            Cómo
          </span>
          <p className="mt-3 text-sm text-white/85">
            Con Cursor + IA pueden generar todo el frontend con prompts. No
            tienen que escribir código a mano.
          </p>
        </div>
      </div>
    </SlideFrame>
  );
}

/* =========================================================================
 * BLOQUE J · CLOSING — Tarea + Plan + Cierre
 * ========================================================================= */

/* 42 — Tu tarea para el viernes */
function TareaParaVierneSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Su tarea</Eyebrow>
      <Title size="xl" className="mt-8 max-w-5xl">
        Avanza tu{" "}
        <span className="gradient-text">frontend.</span>
      </Title>
      <Body className="mt-10 max-w-3xl text-balance">
        Que se vea. Que le puedas dar clic. Que navegues entre pantallas. Sin
        conectar nada todavía. Solo el flujo visual.
      </Body>
      <Body className="mt-4 max-w-3xl text-white/55">
        El viernes, en Bootcamp #1, partimos desde ahí. Si llegan con eso —
        avanzamos rápido.
      </Body>
    </SlideFrame>
  );
}

const PLAN_4_TASKS: { n: string; title: string; detail: string }[] = [
  {
    n: "01",
    title: "Conseguir un agente",
    detail: "Cursor, Claude Code o Codex. El que más les guste.",
  },
  {
    n: "02",
    title: "Instalar el skill de Celopedia",
    detail: "Para que el agente entienda Celo desde dentro.",
  },
  {
    n: "03",
    title: "Elegir la idea con su agente",
    detail: "Conversen con la IA. Boten ideas. Aterricen una.",
  },
  {
    n: "04",
    title: "Primera versión del frontend",
    detail: "Pantallas navegables. Sin conectar nada todavía.",
  },
];

/* 43 — Plan de 4 días */
function PlanDe4DiasSlide() {
  return (
    <SlideFrame>
      <Eyebrow>De aquí al viernes</Eyebrow>
      <Title size="md" className="mt-4">
        4 pasos para llegar a Bootcamp #1{" "}
        <span className="gradient-text">con el frontend adelantado.</span>
      </Title>

      <ol className="mt-10 grid max-w-5xl grid-cols-1 gap-3 md:grid-cols-2">
        {PLAN_4_TASKS.map((t, i) => (
          <li
            key={t.n}
            className={`flex items-start gap-4 rounded-2xl border p-5 ${
              i === 3
                ? "border-accent/35 bg-accent/[0.06]"
                : "border-hairline bg-white/[0.015]"
            }`}
          >
            <span
              className={`font-mono text-sm ${
                i === 3 ? "font-semibold text-accent" : "text-muted"
              }`}
            >
              {t.n}
            </span>
            <div>
              <p className="text-base font-semibold text-white">{t.title}</p>
              <p className="mt-1 text-sm text-white/70">{t.detail}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-10 inline-flex items-center gap-2.5 rounded-2xl border border-accent/25 bg-accent/[0.06] px-5 py-3">
        <MessageCircle size={16} className="text-accent" />
        <span className="text-sm text-white/85">
          Si se traban, en Telegram preguntan.{" "}
          <span className="font-semibold text-white">
            Llegar con algo desplegado vale 100× más que llegar con dudas.
          </span>
        </span>
      </div>
    </SlideFrame>
  );
}

/* 45 — Mensaje final */
function MensajeFinalSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Mensaje final</Eyebrow>
      <Title size="lg" className="mt-8 max-w-5xl">
        Colombia no debe ser solo consumidora de tecnología.{" "}
        <span className="gradient-text">
          Podemos construir productos onchain desde aquí
        </span>{" "}
        para usuarios reales.
      </Title>
      <Body className="mt-10 max-w-3xl">
        Aprovechen estas 3 semanas. Aprovechen estos espacios.{" "}
        <span className="text-white">Hoy empezamos.</span>
      </Body>
    </SlideFrame>
  );
}

/* 46 — Cierre · QR Telegram + QR X */
function CierreSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Antes de irse</Eyebrow>
      <Title size="md" className="mt-4">
        Únanse al grupo —{" "}
        <span className="gradient-text">y síganme en X.</span>
      </Title>

      <div className="mt-10 grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-2">
        {/* QR del grupo */}
        <div className="flex items-center gap-5 rounded-2xl border border-accent/35 bg-accent/[0.06] p-5">
          <div className="shrink-0 rounded-xl bg-white p-2.5">
            <QRCodeSVG
              value={COHORT_CHAT_URL}
              size={120}
              bgColor="#ffffff"
              fgColor="#050505"
              level="M"
            />
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-accent">
              Grupo del bootcamp
            </span>
            <p className="mt-1 text-base font-semibold text-white">
              Telegram · cohorte 2026
            </p>
            <p className="mt-1 text-xs text-muted">
              Anuncios, mentorías, retos.
            </p>
          </div>
        </div>

        {/* QR de Camilo en X */}
        <div className="flex items-center gap-5 rounded-2xl border border-hairline bg-white/[0.015] p-5">
          <div className="shrink-0 rounded-xl bg-white p-2.5">
            <QRCodeSVG
              value={CAMILO_X_URL}
              size={120}
              bgColor="#ffffff"
              fgColor="#050505"
              level="M"
            />
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-accent">
              Sígueme en X
            </span>
            <p className="mt-1 text-base font-semibold text-white">
              @camilosaka
            </p>
            <p className="mt-1 text-xs text-muted">
              El recorrido en vivo · lo bueno y lo malo.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 inline-flex items-center gap-2.5 rounded-2xl border border-hairline bg-white/[0.02] px-5 py-3">
        <PartyPopper size={16} className="text-accent" />
        <span className="text-sm text-white/85">
          <span className="font-semibold text-white">Vamos a construir.</span>{" "}
          Nos vemos el viernes.
        </span>
      </div>
    </SlideFrame>
  );
}

/* ---------- Deck ---------- */

const SLIDES = [
  CoverSlide,
  HolaSoyCamiloSlide,
  PrimerasAppsSlide,
  PeewahSlide,
  TransicionBlockchainSlide,
  EmbajadorBuenosAiresSlide,
  PuntosSeConectanSlide,
  QueEsHackathonSlide,
  BootcampHackathonSlide,
  PorQueGratisSlide,
  MundoCambioSlide,
  BlockchainCambioSlide,
  IACambioSlide,
  OportunidadAmenazaSlide,
  CasosRealesSlide,
  SakaLabsStorySlide,
  SakaLabsRevenueSlide,
  SueñoProgramaSlide,
  NueveAniosCuatroSesionesSlide,
  LeanStartupSlide,
  MVPSlide,
  AppsFamosasMVPSlide,
  MejoresProyectosSimplesSlide,
  DistribucionEsElProblemaSlide,
  QueEsCeloSlide,
  PorQueMeGustaCeloSlide,
  ProofOfShipSlide,
  AIAgentTrackSlide,
  MiniPaySlide,
  MiniPayScreenshotsSlide,
  ComunidadCeloSlide,
  OtrasHackathonsGlobalesSlide,
  TiposAppsMiniPaySlide,
  RequisitosSlide,
  PremiosSlide,
  EsTuEntradaEcosistemaSlide,
  AILiteracySlide,
  CelopediaSlide,
  ManosObraSlide,
  EquipoSoloSlide,
  ArquitecturaSimpleSlide,
  QueEsFrontendSlide,
  TareaParaVierneSlide,
  PlanDe4DiasSlide,
  MensajeFinalSlide,
  CierreSlide,
];

export default function KickoffDeck() {
  return <Deck slides={SLIDES} />;
}
