"use client";

import {
  Bot,
  Calendar,
  Check,
  Cpu,
  FileCog,
  FileText,
  GraduationCap,
  Heart,
  HelpCircle,
  MapPin,
  MessageCircle,
  PiggyBank,
  PlayCircle,
  Receipt,
  Repeat,
  Rocket,
  Ship,
  Sparkles,
  Store,
  Target,
  Trophy,
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
 * Bootcamp #3 — Agentes, distribución y demo day. 18 slides.
 * ========================================================================= */

const AGENDA_ITEMS = [
  { time: "0:00", title: "Estado de proyectos" },
  { time: "0:10", title: "Qué es un agente onchain" },
  { time: "0:35", title: "Patrones de agentes para Celo" },
  { time: "0:55", title: "Distribución — el problema real" },
  { time: "1:15", title: "Cómo preparar una demo ganadora" },
  { time: "1:35", title: "README y submission" },
  { time: "1:50", title: "Plan para build days" },
];

const STATUS_PROMPTS = [
  "¿Qué construyes?",
  "¿Qué ya funciona?",
  "¿Qué está bloqueado?",
  "¿Qué van a demoear el 19?",
];

const LEVELS: {
  num: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  example: string;
  active?: boolean;
}[] = [
  {
    num: "01",
    icon: MessageCircle,
    title: "Asistente de decisión",
    desc: "La IA recomienda, el usuario ejecuta.",
    example: "«Te recomiendo ahorrar 10.000 COP esta semana.»",
  },
  {
    num: "02",
    icon: FileCog,
    title: "Preparador de transacción",
    desc: "La IA entiende la intención y prepara la tx para que el usuario apruebe.",
    example: "«Envía 5 cUSD a Diana por la cena.»",
  },
  {
    num: "03",
    icon: Repeat,
    title: "Automatizador con reglas",
    desc: "La IA o backend ejecuta acciones bajo reglas predefinidas.",
    example: "«Si un estudiante completa 5 retos, libera la recompensa.»",
  },
  {
    num: "04",
    icon: Cpu,
    title: "Agente autónomo avanzado",
    desc: "Más autonomía, presupuesto y reglas propias. No es necesario para esta hackathon.",
    example: "Para la hackathon, no es la apuesta.",
  },
];

const AGENT_PATTERNS: {
  icon: LucideIcon;
  title: string;
  said: string;
  does: string;
}[] = [
  {
    icon: Receipt,
    title: "Agente de pagos",
    said: "«Cobra 50.000 COP a Juan por el diseño del logo.»",
    does: "Genera solicitud de pago en stablecoin.",
  },
  {
    icon: PiggyBank,
    title: "Agente de ahorro",
    said: "Usuario dice cuánto gana o cuánto quiere ahorrar.",
    does: "Propone plan y registra metas.",
  },
  {
    icon: Trophy,
    title: "Agente de recompensas",
    said: "Una comunidad define tareas.",
    does: "Valida evidencia y prepara las recompensas.",
  },
  {
    icon: Heart,
    title: "Agente de donaciones",
    said: "Usuario describe una causa.",
    does: "Crea campaña y muestra transparencia.",
  },
  {
    icon: GraduationCap,
    title: "Agente educativo",
    said: "Usuario aprende sobre blockchain.",
    does: "Evalúa respuestas y libera recompensas.",
  },
  {
    icon: Store,
    title: "Agente de comercio local",
    said: "«¿Dónde puedo pagar con stablecoins?»",
    does: "Recomienda comercios y facilita el pago.",
  },
];

const DISTRIBUTION_LESSONS = [
  "Con IA se pueden construir muchas apps. Eso ya no es la barrera.",
  "La mayoría no consigue usuarios si no tiene canal de distribución.",
  "Los ecosistemas importan porque concentran usuarios, incentivos y feedback.",
  "Celo + MiniPay + Proof of Ship es una ruta concreta de distribución.",
];

const SEVEN_QUESTIONS = [
  "¿Quién es el primer usuario real?",
  "¿Dónde vive ese usuario?",
  "¿Por qué usaría esto hoy?",
  "¿Qué acción repetirá?",
  "¿Qué métrica mostraría que hay interés?",
  "¿Cómo podría funcionar dentro de MiniPay?",
  "¿Qué necesita para aplicar a Proof of Ship?",
];

const PITCH_TOTAL_SECONDS = 180;

const PITCH_SEGMENTS: {
  time: string;
  title: string;
  note: string;
  duration: number;
}[] = [
  { time: "0:00–0:20", title: "Problema", note: "«Hoy [usuario] tiene este problema…»", duration: 20 },
  { time: "0:20–0:40", title: "Solución", note: "«Creamos [nombre], una mini app que…»", duration: 20 },
  { time: "0:40–1:40", title: "Demo", note: "Mostrar el flujo real funcionando.", duration: 60 },
  { time: "1:40–2:10", title: "Integración Celo", note: "Qué parte es onchain y por qué.", duration: 30 },
  { time: "2:10–2:30", title: "Uso de IA", note: "Si ayudó a construir o si es parte del producto.", duration: 20 },
  { time: "2:30–2:50", title: "Distribución", note: "Por qué puede vivir en MiniPay o crecer en Celo.", duration: 20 },
  { time: "2:50–3:00", title: "Cierre", note: "«Lo siguiente es…»", duration: 10 },
];

const README_TEMPLATE = `# Nombre del proyecto

## Qué hace
## Problema
## Usuario objetivo
## Cómo funciona
## Integración con Celo
## Uso de IA
## Cómo correr el proyecto
## Link demo
## Equipo
## Próximos pasos`;

const BUILD_DAYS_PLAN: { icon: LucideIcon; label: string; desc: string }[] = [
  { icon: Target, label: "3 tareas críticas", desc: "Las que mueven la aguja del demo." },
  { icon: HelpCircle, label: "1 mentor", desc: "Quién te puede desbloquear esta semana." },
  { icon: Sparkles, label: "1 riesgo principal", desc: "Lo que puede romper la demo si no lo resuelves." },
  { icon: Rocket, label: "1 métrica o señal", desc: "Lo que vas a poder mostrar como prueba de interés." },
];

const HOMEWORK = [
  "Link demo desplegada.",
  "Link GitHub.",
  "README completo.",
  "Video o capturas de respaldo si algo falla.",
  "Pitch de 3 minutos listo.",
  "Descripción de la integración Celo.",
  "Indicar si integra cCOP.",
  "Próximos pasos hacia Proof of Ship.",
];

/* ---------- Diapositivas ---------- */

/* 01 — Cover */
function CoverSlide() {
  return (
    <SlideFrame>
      <div className="flex flex-col gap-6">
        <Eyebrow>Hackathon de Agentes Onchain · Celo Colombia</Eyebrow>

        <div className="flex items-baseline gap-6">
          <span className="font-display text-[8rem] font-semibold leading-none tracking-tighter text-accent drop-shadow-[0_0_40px_rgba(252,255,82,0.3)] sm:text-[10rem]">
            04
          </span>
          <span className="font-mono text-sm uppercase tracking-[0.2em] text-muted">
            Sesión · Bootcamp #3
          </span>
        </div>

        <Title size="xl">
          Agentes, distribución{" "}
          <span className="gradient-text">y demo day.</span>
        </Title>

        <div className="mt-2 flex flex-col gap-2 font-mono text-base text-white/70 sm:text-lg">
          <span className="flex items-center gap-2.5">
            <PlayCircle size={18} className="text-accent" />
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

/* 03 — Estado de proyectos */
function StatusSlide() {
  return (
    <SlideFrame>
      <Eyebrow>0:00 · Estado</Eyebrow>
      <Title size="md" className="mt-4">
        Round-robin —{" "}
        <span className="gradient-text">una frase cada equipo.</span>
      </Title>
      <Body className="mt-4 max-w-2xl">
        Una respuesta corta por pregunta. Nos calibramos antes de meternos al
        contenido.
      </Body>

      <ul className="mt-12 grid max-w-4xl grid-cols-1 gap-3 md:grid-cols-2">
        {STATUS_PROMPTS.map((q) => (
          <li
            key={q}
            className="flex items-center gap-3 rounded-2xl border border-hairline bg-white/[0.015] p-5"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent/15 text-accent">
              <MessageCircle size={17} />
            </span>
            <span className="text-lg text-white">{q}</span>
          </li>
        ))}
      </ul>
    </SlideFrame>
  );
}

/* 04 — ¿Qué es un agente onchain? */
function AgentDefinitionSlide() {
  return (
    <SlideFrame>
      <Eyebrow>0:10 · Definición práctica</Eyebrow>

      <div className="mt-6 flex items-center gap-5">
        <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-accent text-ink">
          <Bot size={28} strokeWidth={2.2} />
        </span>
        <Title size="lg">Un agente onchain.</Title>
      </div>

      <Body className="mt-8 max-w-3xl text-balance">
        Una IA que ayuda a{" "}
        <span className="text-white">tomar decisiones o ejecutar flujos</span>{" "}
        donde el resultado puede terminar en una acción onchain.
      </Body>
      <Body className="mt-3 max-w-3xl text-balance text-white/55">
        No es ciencia ficción. Es una capa que entiende intenciones humanas y
        las traduce en transacciones.
      </Body>
    </SlideFrame>
  );
}

/* 05 — Los 4 niveles (escalera de autonomía) */
function LevelsSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Los 4 niveles</Eyebrow>
      <Title size="md" className="mt-4">
        De recomendar{" "}
        <span className="gradient-text">a operar solo.</span>
      </Title>

      <div className="mt-10 flex max-w-6xl flex-col gap-3">
        {LEVELS.map((lvl, i) => {
          const Icon = lvl.icon;
          const isAdvanced = i === LEVELS.length - 1;
          const fillPercent = (i + 1) * 25;
          return (
            <div
              key={lvl.num}
              className={`relative overflow-hidden rounded-2xl border p-5 ${
                isAdvanced
                  ? "border-dashed border-hairline bg-white/[0.01]"
                  : "border-hairline bg-white/[0.015]"
              }`}
            >
              {/* Background fill — autonomía visual */}
              <div
                className={`pointer-events-none absolute inset-y-0 left-0 ${
                  isAdvanced ? "bg-white/[0.02]" : "bg-accent/[0.07]"
                }`}
                style={{ width: `${fillPercent}%` }}
              />

              <div className="relative flex items-center gap-5">
                <span
                  className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${
                    isAdvanced
                      ? "bg-white/[0.04] text-white/40"
                      : "bg-accent text-ink"
                  }`}
                >
                  <Icon size={20} strokeWidth={2.2} />
                </span>

                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-mono text-[10px] uppercase tracking-[0.16em] ${
                        isAdvanced ? "text-muted" : "text-accent"
                      }`}
                    >
                      Nivel {lvl.num}
                    </span>
                    <span className="h-px flex-1 bg-hairline" />
                    <span className="font-mono text-[10px] text-muted">
                      Autonomía {fillPercent}%
                    </span>
                  </div>
                  <h3
                    className={`mt-1.5 text-lg font-semibold tracking-tight ${
                      isAdvanced ? "text-white/60" : "text-white"
                    }`}
                  >
                    {lvl.title}
                  </h3>
                  <p
                    className={`mt-0.5 text-sm leading-snug ${
                      isAdvanced ? "text-white/40" : "text-muted"
                    }`}
                  >
                    {lvl.desc}
                  </p>
                  <p
                    className={`mt-1 font-mono text-xs italic ${
                      isAdvanced ? "text-white/30" : "text-white/55"
                    }`}
                  >
                    {lvl.example}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </SlideFrame>
  );
}

/* 06 — Mensaje clave de agentes */
function AgentMessageSlide() {
  return (
    <SlideFrame>
      <Eyebrow>La regla del agente para esta hackathon</Eyebrow>
      <Title size="lg" className="mt-8 max-w-5xl">
        Un agente{" "}
        <span className="gradient-text">simple pero útil</span> vale más que un
        agente complejo que no funciona.
      </Title>
      <Body className="mt-10 max-w-3xl">
        Apuntar a Nivel 1 o Nivel 2 bien hechos es mejor que prometer Nivel 4 y
        no llegar.
      </Body>
    </SlideFrame>
  );
}

/* 07 — 6 patrones de agentes */
function AgentPatternsSlide() {
  return (
    <SlideFrame>
      <Eyebrow>0:35 · Patrones para Celo</Eyebrow>
      <Title size="md" className="mt-4">
        6 agentes que funcionan{" "}
        <span className="gradient-text">en este ecosistema.</span>
      </Title>

      <div className="mt-10 grid max-w-6xl grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {AGENT_PATTERNS.map((p) => {
          const Icon = p.icon;
          return (
            <div
              key={p.title}
              className="flex flex-col gap-3 rounded-2xl border border-hairline bg-white/[0.015] p-5"
            >
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent/15 text-accent">
                <Icon size={17} strokeWidth={2.2} />
              </span>
              <h3 className="text-base font-semibold tracking-tight text-white">
                {p.title}
              </h3>
              <p className="font-mono text-xs italic leading-relaxed text-white/65">
                {p.said}
              </p>
              <p className="text-xs leading-snug text-muted">→ {p.does}</p>
            </div>
          );
        })}
      </div>
    </SlideFrame>
  );
}

/* 08 — Distribución: el problema real */
function DistributionProblemSlide() {
  return (
    <SlideFrame>
      <Eyebrow>0:55 · El verdadero juego</Eyebrow>
      <Title size="xl" className="mt-8 max-w-5xl">
        Construir es la mitad.{" "}
        <span className="gradient-text">
          La pregunta real es quién lo va a usar.
        </span>
      </Title>
      <Body className="mt-10 max-w-3xl">
        Para el Demo Day no nos importa solo qué tan bonito está. Nos importa si
        alguien en la calle lo usaría.
      </Body>
    </SlideFrame>
  );
}

/* 09 — Lecciones */
function LessonsSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Lecciones del camino</Eyebrow>
      <Title size="md" className="mt-4">
        Lo que aprendí construyendo apps que nadie usó.
      </Title>

      <ul className="mt-10 flex max-w-5xl flex-col gap-3">
        {DISTRIBUTION_LESSONS.map((l, i) => (
          <li
            key={l}
            className="flex items-start gap-4 rounded-xl border border-hairline bg-white/[0.015] p-4"
          >
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent/15 font-mono text-xs font-bold text-accent">
              {i + 1}
            </span>
            <span className="pt-1.5 text-base text-white/85 sm:text-lg">
              {l}
            </span>
          </li>
        ))}
      </ul>
    </SlideFrame>
  );
}

/* 10 — 7 preguntas */
function SevenQuestionsSlide() {
  return (
    <SlideFrame>
      <Eyebrow>El test de distribución</Eyebrow>
      <Title size="md" className="mt-4">
        7 preguntas que cada proyecto{" "}
        <span className="gradient-text">tiene que poder responder.</span>
      </Title>

      <ol className="mt-10 grid max-w-6xl grid-cols-1 gap-2.5 md:grid-cols-2">
        {SEVEN_QUESTIONS.map((q, i) => (
          <li
            key={q}
            className="flex items-start gap-3 rounded-xl border border-hairline bg-white/[0.015] p-3.5"
          >
            <span className="font-mono text-xs text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-sm text-white/90 sm:text-base">{q}</span>
          </li>
        ))}
      </ol>

      <p className="mt-6 max-w-3xl text-sm text-muted">
        Si fallas en 3 o más, todavía no tienes producto — tienes prototipo.
      </p>
    </SlideFrame>
  );
}

/* 11 — Pitch 3 min: timeline proporcional */
function PitchStructureSlide() {
  return (
    <SlideFrame>
      <Eyebrow>1:15 · Demo ganadora</Eyebrow>
      <Title size="md" className="mt-4">
        Pitch de 3 minutos —{" "}
        <span className="gradient-text">cada segundo cuenta.</span>
      </Title>

      {/* Timeline horizontal proporcional */}
      <div className="mt-10 max-w-6xl">
        <div className="flex h-24 overflow-hidden rounded-2xl border border-hairline">
          {PITCH_SEGMENTS.map((seg) => {
            const width = (seg.duration / PITCH_TOTAL_SECONDS) * 100;
            const isDemo = seg.title === "Demo";
            return (
              <div
                key={seg.time}
                className={`relative flex flex-col items-center justify-center gap-1 border-r border-hairline px-2 last:border-r-0 ${
                  isDemo
                    ? "bg-accent/[0.18] text-white"
                    : "bg-white/[0.02] text-white/85"
                }`}
                style={{ width: `${width}%` }}
              >
                <span className="font-mono text-[10px] font-semibold text-accent">
                  {seg.duration}s
                </span>
                <span className="text-center text-[11px] font-semibold leading-tight sm:text-xs">
                  {seg.title}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-2 flex justify-between font-mono text-[10px] text-muted">
          <span>0:00</span>
          <span className="text-white/55">Demo = 1/3 del tiempo</span>
          <span>3:00</span>
        </div>
      </div>

      {/* Detalle abajo */}
      <ul className="mt-10 grid max-w-6xl grid-cols-1 gap-2 md:grid-cols-2">
        {PITCH_SEGMENTS.map((seg) => (
          <li
            key={seg.time}
            className="flex items-baseline gap-3 rounded-lg border border-hairline bg-white/[0.015] px-3.5 py-2.5"
          >
            <span className="shrink-0 font-mono text-[10px] text-accent">
              {seg.time}
            </span>
            <span className="shrink-0 text-sm font-semibold text-white">
              {seg.title}
            </span>
            <span className="text-xs leading-snug text-muted">{seg.note}</span>
          </li>
        ))}
      </ul>
    </SlideFrame>
  );
}

/* 12 — Regla del pitch */
function PitchRuleSlide() {
  return (
    <SlideFrame>
      <Eyebrow>La regla del pitch</Eyebrow>
      <Title size="lg" className="mt-8 max-w-5xl">
        No dediquen dos minutos a explicar tecnología.{" "}
        <span className="gradient-text">
          Muestren el producto funcionando.
        </span>
      </Title>
      <Body className="mt-10 max-w-3xl">
        El jurado ya conoce blockchain. Lo que no conoce es qué construiste tú.
      </Body>
    </SlideFrame>
  );
}

/* 13 — README template */
function ReadmeSlide() {
  return (
    <SlideFrame>
      <Eyebrow>1:35 · README</Eyebrow>
      <Title size="md" className="mt-4">
        La plantilla{" "}
        <span className="gradient-text">para que tu repo cuente la historia.</span>
      </Title>

      <div className="mt-8 max-w-3xl">
        <CodeBlock filename="README.md">{README_TEMPLATE}</CodeBlock>
      </div>
    </SlideFrame>
  );
}

/* 14 — Plan build days */
function BuildDaysSlide() {
  return (
    <SlideFrame>
      <Eyebrow>1:50 · Antes de irse</Eyebrow>
      <Title size="md" className="mt-4">
        Plan personal para la build week.
      </Title>
      <Body className="mt-4 max-w-2xl">
        Cada equipo deja por escrito estas 4 cosas. Vamos a usarlas en las
        office hours.
      </Body>

      <div className="mt-10 grid max-w-6xl grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
        {BUILD_DAYS_PLAN.map((p) => {
          const Icon = p.icon;
          return (
            <div
              key={p.label}
              className="flex flex-col gap-3 rounded-2xl border border-hairline bg-white/[0.015] p-5"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/15 text-accent">
                <Icon size={17} strokeWidth={2.2} />
              </span>
              <h3 className="text-base font-semibold tracking-tight text-white">
                {p.label}
              </h3>
              <p className="text-xs leading-relaxed text-muted">{p.desc}</p>
            </div>
          );
        })}
      </div>
    </SlideFrame>
  );
}

/* 15 — Próximos pasos: Proof of Ship */
function NextStepsSlide() {
  return (
    <SlideFrame>
      <Eyebrow>La continuidad</Eyebrow>
      <Title size="lg" className="mt-6 max-w-5xl">
        El Demo Day no es el final.{" "}
        <span className="gradient-text">
          Es la puerta a Proof of Ship.
        </span>
      </Title>
      <Body className="mt-8 max-w-3xl text-balance">
        Programa mensual de Celo. Mientras sigan mostrando progreso, sigue
        habiendo recompensa, feedback y visibilidad.
      </Body>

      <div className="mt-10 flex flex-wrap gap-2">
        {["Recurrente", "Premia activos", "Feedback global", "Visibilidad"].map(
          (tag) => (
            <span
              key={tag}
              className="rounded-full border border-accent/30 bg-accent/[0.08] px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider text-accent"
            >
              {tag}
            </span>
          )
        )}
      </div>

      <div className="mt-10 inline-flex items-center gap-2.5 rounded-2xl border border-hairline bg-white/[0.02] px-5 py-3">
        <Ship size={16} className="text-accent" />
        <span className="text-sm text-white/80">
          Vamos a apuntar a que <span className="text-white">todos</span>{" "}
          apliquen a Proof of Ship después del 19.
        </span>
      </div>
    </SlideFrame>
  );
}

/* 16 — Homework para Demo Day */
function HomeworkSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Para el Demo Day</Eyebrow>
      <Title size="md" className="mt-4">
        Lo que cada equipo entrega antes del 19.
      </Title>

      <ul className="mt-10 grid max-w-5xl grid-cols-1 gap-2.5 md:grid-cols-2">
        {HOMEWORK.map((h) => (
          <li
            key={h}
            className="flex items-center gap-3 rounded-xl border border-hairline bg-white/[0.015] p-3.5"
          >
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-hairline text-accent">
              <Check size={13} />
            </span>
            <span className="text-sm text-white/85 sm:text-base">{h}</span>
          </li>
        ))}
      </ul>

      <p className="mt-6 max-w-3xl text-sm text-muted">
        En las office hours de la semana de build days revisamos avances y los
        ayudamos a destrabarse.
      </p>
    </SlideFrame>
  );
}

/* 17 — Demo Day 19 jun */
function DemoDaySlide() {
  return (
    <SlideFrame>
      <Eyebrow>Su momento</Eyebrow>

      <div className="mt-6 flex items-baseline gap-6">
        <span className="font-display text-[8rem] font-semibold leading-none tracking-tighter text-accent drop-shadow-[0_0_40px_rgba(252,255,82,0.3)] sm:text-[10rem]">
          19
        </span>
        <span className="font-mono text-sm uppercase tracking-[0.2em] text-muted">
          Junio
        </span>
      </div>

      <Title size="lg" className="mt-4">
        Demo Day &{" "}
        <span className="gradient-text">Ganadores.</span>
      </Title>

      <div className="mt-8 flex flex-col gap-2 font-mono text-base text-white/70 sm:text-lg">
        <span className="flex items-center gap-2.5">
          <Calendar size={18} className="text-accent" />
          Viernes 19 de junio
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
        <span className="flex items-center gap-2.5">
          <Trophy size={18} className="text-accent" />
          Bolsa total: 3.000.000 COPm en premios
        </span>
      </div>

      <p className="mt-10 max-w-md text-sm text-muted">
        Vienen jurados, el ecosistema y otros builders. Vienen a ver qué
        construiste.
      </p>
    </SlideFrame>
  );
}

/* 18 — Mensaje de cierre */
function ClosingSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Mensaje de cierre</Eyebrow>
      <Title size="lg" className="mt-8 max-w-5xl">
        Lo que construyan esta semana{" "}
        <span className="gradient-text">no termina el 19.</span>
      </Title>
      <Body className="mt-8 max-w-3xl text-balance">
        Termina cuando dejen de actualizar el repo. Y la decisión de cuándo
        dejar de hacerlo es solo suya.
      </Body>
      <Body className="mt-3 max-w-3xl text-balance text-white/55">
        Hoy se cierra el bootcamp. Mañana arranca la build week. Nos vemos en
        Telegram.
      </Body>

      <div className="mt-12 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
        <FileText size={14} />
        Vamos a construir
      </div>
    </SlideFrame>
  );
}

/* ---------- Deck ---------- */

const SLIDES = [
  CoverSlide,
  AgendaSlide,
  StatusSlide,
  AgentDefinitionSlide,
  LevelsSlide,
  AgentMessageSlide,
  AgentPatternsSlide,
  DistributionProblemSlide,
  LessonsSlide,
  SevenQuestionsSlide,
  PitchStructureSlide,
  PitchRuleSlide,
  ReadmeSlide,
  BuildDaysSlide,
  NextStepsSlide,
  HomeworkSlide,
  DemoDaySlide,
  ClosingSlide,
];

export default function BootcampThreeDeck() {
  return <Deck slides={SLIDES} />;
}
