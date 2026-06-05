"use client";

import type { ReactNode } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Calendar,
  Folder,
  Github,
  Globe,
  HelpCircle,
  Key,
  Lightbulb,
  Lock,
  MapPin,
  MessageCircle,
  PlayCircle,
  RefreshCw,
  Rocket,
  Server,
  Shield,
  Sparkles,
  Timer,
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
 * Bootcamp #1 — De localhost a producción.
 * Show & Tell · GitHub + Vercel + seguridad · Estructura · Vibe coding en vivo.
 * ========================================================================= */

/* ---------- Datos ---------- */

const AGENDA_ITEMS = [
  { time: "0:00", title: "Show & Tell · 3-4 equipos cuentan" },
  { time: "0:25", title: "GitHub: llaves, repo, seguridad → Vercel" },
  { time: "1:00", title: "Estructura para que el backend no te explote" },
  { time: "1:15", title: "Vibe coding en vivo + Q&A" },
  { time: "1:50", title: "Tarea para Bootcamp #2" },
];

const KICKOFF_TASKS: { n: string; title: string; detail: string }[] = [
  {
    n: "01",
    title: "Conseguir un agente",
    detail: "Cursor, Claude Code o Codex.",
  },
  {
    n: "02",
    title: "Instalar el skill de Celopedia",
    detail: "Para que el agente entienda Celo desde dentro.",
  },
  {
    n: "03",
    title: "Elegir la idea con su agente",
    detail: "Conversaron con la IA y aterrizaron una.",
  },
  {
    n: "04",
    title: "Primera versión del frontend",
    detail: "Pantallas navegables corriendo en su laptop.",
  },
];

const ACTIVATION_QUESTIONS = [
  "¿Ya tienen su agente?",
  "¿Le instalaron el skill de Celopedia?",
  "¿Ya aterrizaron una idea?",
  "¿Su frontend ya corre en algún lado?",
];

const SHOW_TELL_RULES: { icon: LucideIcon; label: string; desc: string }[] = [
  { icon: Timer, label: "3 min", desc: "Muestras la idea y lo que ya tienes." },
  {
    icon: MessageCircle,
    label: "2 min",
    desc: "Feedback rápido + 1 o 2 preguntas.",
  },
  {
    icon: AlertTriangle,
    label: "Hard cap",
    desc: "Cuando suene el timer, gracias.",
  },
];

const GITHUB_THINGS: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: RefreshCw,
    title: "Tu undo button",
    desc: "Si rompen algo, se devuelven al commit anterior. No pierden nada.",
  },
  {
    icon: Shield,
    title: "Tu copia de seguridad",
    desc: "Su código vive en internet, no solo en su laptop. Si se les pierde la máquina, el proyecto sigue.",
  },
  {
    icon: Rocket,
    title: "Tu camino a Vercel",
    desc: "Cada git push redespliega su app sola. Sin tocar nada más.",
  },
];

const LLAVES_PROMPT = `Quiero conectar este equipo a GitHub.

Son dos cosas: la auth de git (por SSH) y la del CLI de GitHub (gh).

Para git, por SSH:
1. Revisa si ya tengo ~/.ssh/id_ed25519.pub.
2. Si no, genera una con ssh-keygen -t ed25519.
3. Carga al ssh-agent.
4. Imprime SOLO mi clave pública (.pub) para que la pegue en GitHub.

Yo la pego en github.com/settings/keys. Cuando te diga "ya":

5. Prueba la conexión: ssh -T git@github.com
6. Verifica si gh CLI está instalado. Si no, dime cómo instalarlo.
7. Corre gh auth login — eligiendo SSH como protocolo.

Paso por paso. NUNCA me muestres la clave privada.`;

const GITHUB_KEY_STEPS = [
  "Entra a github.com/settings/keys",
  'Click en "New SSH key"',
  'Pega la clave pública en "Key" y dale un title (ej. "Mi laptop")',
  "Vuelve al terminal y dale OK al agente — va a probar SSH y configurar gh",
];

const REPO_PROMPT = `Quiero subir este proyecto a GitHub.

1. Inicializa git en este proyecto.
2. Crea un .gitignore para Node + React.
   Excluye: .env, .env.local, node_modules, dist, .DS_Store.
3. Revisa que no haya secretos en lo que voy a subir.
4. Primer commit con un mensaje descriptivo.
5. Crea un repo nuevo en GitHub (usa gh) y conéctalo como origin.
6. Hazme push.

Avísame antes de cada paso destructivo.`;

const NEVER_COMMIT: { name: string; desc: string }[] = [
  {
    name: ".env / .env.local",
    desc: "API keys, tokens, secrets de Supabase / OpenAI / Anthropic.",
  },
  {
    name: "Credenciales de wallet",
    desc: "Private keys, seed phrases, archivos JSON de wallet.",
  },
  {
    name: "node_modules/",
    desc: "Pesa GB. Se reconstruye con npm install. Nunca al repo.",
  },
  {
    name: "Backups y dumps",
    desc: ".bak, .old, exports de base de datos con datos reales.",
  },
];

const SECURITY_CONSEQUENCES = [
  "GitHub te escanea y te avisa — pero ya quedó público.",
  "Bots monitorean GitHub 24/7 cazando API keys.",
  "Tu key puede ser usada (y cobrada) en minutos.",
  "Borrarla después no sirve: git guarda la historia.",
];

const VERCEL_SETUP_STEPS = [
  "Entrar a vercel.com y hacer Sign Up con la cuenta de GitHub.",
  'Click en "Add New" → "Project".',
  "Seleccionar el repo que acaban de crear.",
  'Click en "Deploy" — Vercel detecta el framework solo (Next.js, Vite, etc.).',
  "En 1-2 minutos: URL pública. Cópienla — esa es su app en internet.",
];

const VERCEL_AFTER: { n: string; text: string }[] = [
  { n: "01", text: "Hacen git push." },
  { n: "02", text: "Vercel detecta el push y construye." },
  { n: "03", text: "Su URL pública se actualiza sola." },
];

const FOLDER_LAYOUTS: { tag: string; title: string; tree: string[] }[] = [
  {
    tag: "Opción A · Next.js full-stack",
    title: "Todo en un solo proyecto.",
    tree: [
      "/app",
      "  page.tsx         ← frontend (lo que ya tienen)",
      "  api/",
      "    route.ts       ← backend (Bootcamp #2)",
      "/components",
      "/lib",
      ".env.local         ← jamás al repo",
      ".gitignore",
    ],
  },
  {
    tag: "Opción B · Separado",
    title: "Frontend y backend como apps distintas.",
    tree: [
      "/frontend          ← lo que ya tienen",
      "  src/",
      "  package.json",
      "/backend           ← viene en Bootcamp #2",
      "  src/",
      "  package.json",
      ".env               ← jamás al repo",
      ".gitignore",
    ],
  },
];

const QA_TOPICS = [
  "Mi app corre local pero rompe en Vercel.",
  "No sé pedirle bien al agente lo que quiero.",
  "Las variables de entorno no me cargan.",
  "Mi prompt da resultados pobres.",
  "No sé qué partes son frontend vs backend.",
];

const HOMEWORK: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Github,
    title: "Repo en GitHub",
    desc: "Su proyecto subido, con .gitignore que no expone secretos.",
  },
  {
    icon: Globe,
    title: "Frontend en Vercel",
    desc: "URL pública navegable, conectada para auto-deploy desde GitHub.",
  },
  {
    icon: Server,
    title: "Lista de qué necesita backend",
    desc: "Identifiquen qué partes de su app no viven solo en frontend (login, persistencia, conectar wallet, llamar IA...).",
  },
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
            02
          </span>
          <span className="font-mono text-sm uppercase tracking-[0.2em] text-muted">
            Sesión · Bootcamp #1
          </span>
        </div>

        <Title size="xl">
          De localhost{" "}
          <span className="gradient-text">a producción.</span>
        </Title>

        <div className="mt-2 flex flex-col gap-2 font-mono text-base text-white/70 sm:text-lg">
          <span className="flex items-center gap-2.5">
            <PlayCircle size={18} className="text-accent" />
            Viernes 5 de junio · 6:00 a 8:00 PM
          </span>
          <span className="flex flex-col gap-1">
            <span className="flex items-center gap-2.5">
              <MapPin size={18} className="text-accent" />
              Auditorio Banco de Occidente · Edificio E
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

      <ol className="mt-10 flex max-w-4xl flex-col gap-3">
        {AGENDA_ITEMS.map((item) => (
          <li
            key={item.time}
            className="flex items-baseline gap-5 border-b border-hairline pb-3"
          >
            <span className="w-14 shrink-0 font-mono text-sm font-semibold text-accent">
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

/* 03 — Recap · 4 tareas */
function RecapSlide() {
  return (
    <SlideFrame>
      <Eyebrow>0:00 · Recap del Kickoff</Eyebrow>
      <Title size="md" className="mt-4">
        Les dejé 4 tareas —{" "}
        <span className="gradient-text">¿dónde están?</span>
      </Title>

      <ol className="mt-8 grid max-w-5xl grid-cols-1 gap-3 md:grid-cols-2">
        {KICKOFF_TASKS.map((t, i) => (
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

      <p className="mt-8 max-w-3xl text-sm text-muted">
        Si solo cumplieron 1 o 2,{" "}
        <span className="text-white">no pasa nada</span>. Hoy avanzamos desde
        donde estén.
      </p>
    </SlideFrame>
  );
}

/* 04 — Activation */
function ActivationSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Calibremos</Eyebrow>
      <Title size="md" className="mt-4">
        Levanten la mano si sí.
      </Title>
      <Body className="mt-4 max-w-2xl">
        Nos sirve para ajustar el ritmo de la sesión.
      </Body>

      <ul className="mt-10 grid max-w-4xl grid-cols-1 gap-3 md:grid-cols-2">
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

/* 05 — Show & Tell */
function ShowTellSlide() {
  return (
    <SlideFrame>
      <Eyebrow>0:00 · Show & Tell</Eyebrow>
      <Title size="md" className="mt-4">
        Ahora se ven —{" "}
        <span className="gradient-text">3-4 equipos, 5 min cada uno.</span>
      </Title>
      <Body className="mt-6 max-w-3xl">
        No es pitch ni demo perfecta. Es contarle al grupo qué están
        construyendo y dónde están atorados.
      </Body>

      <div className="mt-10 grid max-w-5xl grid-cols-1 gap-3 md:grid-cols-3">
        {SHOW_TELL_RULES.map((r) => {
          const Icon = r.icon;
          return (
            <div
              key={r.label}
              className="flex flex-col gap-3 rounded-2xl border border-hairline bg-white/[0.015] p-5"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/15 text-accent">
                <Icon size={18} strokeWidth={2.2} />
              </span>
              <div>
                <p className="text-lg font-semibold text-white">{r.label}</p>
                <p className="mt-1 text-sm text-white/70">{r.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-8 max-w-3xl text-sm text-muted">
        Si están escuchando: tomen <span className="text-white">1 idea</span>{" "}
        que les sirva para su propio proyecto.
      </p>
    </SlideFrame>
  );
}

/* 06 — ¿Qué es GitHub? */
function WhatIsGitHubSlide() {
  return (
    <SlideFrame>
      <Eyebrow>0:25 · GitHub</Eyebrow>
      <Title size="md" className="mt-4">
        Lo que construyeron vive en su laptop.{" "}
        <span className="gradient-text">Hay que moverlo.</span>
      </Title>
      <Body className="mt-4 max-w-3xl">
        GitHub es un sistema de{" "}
        <span className="text-white">control de versiones</span>. Para
        ustedes, eso significa 3 cosas a la vez.
      </Body>

      <div className="mt-10 grid max-w-6xl grid-cols-1 gap-3 md:grid-cols-3">
        {GITHUB_THINGS.map((t) => {
          const Icon = t.icon;
          return (
            <div
              key={t.title}
              className="flex flex-col gap-3 rounded-2xl border border-hairline bg-white/[0.015] p-6"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/15 text-accent">
                <Icon size={18} strokeWidth={2.2} />
              </span>
              <div>
                <h3 className="text-lg font-semibold tracking-tight text-white">
                  {t.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {t.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </SlideFrame>
  );
}

/* 07 — Llaves pública/privada · SSH */
function LlavesSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Cómo te autentica</Eyebrow>
      <Title size="md" className="mt-4 max-w-5xl">
        GitHub no usa password.{" "}
        <span className="gradient-text">Usa llaves.</span>
      </Title>
      <Body className="mt-4 max-w-3xl">
        Esto se llama{" "}
        <span className="text-white">criptografía asimétrica</span>: dos llaves
        conectadas por matemática. Lo que se firma con la privada, cualquiera
        lo verifica con la pública —{" "}
        <span className="text-white">pero solo el dueño de la privada pudo firmarlo</span>.{" "}
        <span className="font-mono text-white">SSH</span> la usa para
        autenticarte. Las wallets, para firmar transacciones.
      </Body>

      <div className="mt-8 grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-hairline bg-white/[0.015] p-6">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/15 text-accent">
            <Key size={18} strokeWidth={2.2} />
          </span>
          <h3 className="mt-4 text-lg font-semibold tracking-tight text-white">
            Clave pública
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            La que registras en GitHub. La pueden ver todos sin problema.
          </p>
          <div className="mt-4 rounded-xl border border-hairline bg-surface p-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
              En wallets
            </span>
            <p className="mt-1 text-sm text-white/80">
              Es su dirección — la pegan para recibir dinero.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-accent/30 bg-accent/[0.05] p-6">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/20 text-accent">
            <Lock size={18} strokeWidth={2.2} />
          </span>
          <h3 className="mt-4 text-lg font-semibold tracking-tight text-white">
            Clave privada
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Vive en su laptop.{" "}
            <span className="text-white">JAMÁS la comparten con nadie.</span>
          </p>
          <div className="mt-4 rounded-xl border border-accent/25 bg-surface p-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
              En wallets
            </span>
            <p className="mt-1 text-sm text-white/80">
              Es lo que da acceso al dinero. Si la pierden, lo pierden todo.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 inline-flex items-center gap-2.5 rounded-2xl border border-hairline bg-white/[0.02] px-5 py-3">
        <Sparkles size={16} className="text-accent" />
        <span className="text-sm text-white/85">
          Su agente puede generar las llaves (
          <span className="font-mono text-white">ssh-keygen</span>) y
          conectarlas a GitHub (
          <span className="font-mono text-white">gh auth login</span>).
        </span>
      </div>
    </SlideFrame>
  );
}

/* 08 — Llaves en vivo: prompt + pasos en GitHub */
function LlavesEnVivoSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Manos a la obra</Eyebrow>
      <Title size="md" className="mt-4">
        Generar las llaves —{" "}
        <span className="gradient-text">con tu agente.</span>
      </Title>
      <Body className="mt-4 max-w-3xl">
        Un prompt en su terminal + 3 clicks en GitHub. Listo.
      </Body>

      <div className="mt-8 grid max-w-6xl grid-cols-1 gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
            1 · Pídeselo a su agente
          </span>
          <div className="mt-4">
            <CodeBlock filename="cursor / claude code">
              {LLAVES_PROMPT}
            </CodeBlock>
          </div>
        </div>

        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
            2 · En GitHub
          </span>
          <ol className="mt-4 flex flex-col gap-2.5">
            {GITHUB_KEY_STEPS.map((step, i) => (
              <li
                key={step}
                className="flex items-start gap-3 rounded-xl border border-hairline bg-white/[0.015] p-3.5"
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent/15 font-mono text-xs font-bold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="pt-1 text-sm leading-snug text-white/85">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="mt-6 inline-flex items-center gap-2.5 rounded-2xl border border-accent/25 bg-accent/[0.06] px-5 py-3">
        <AlertTriangle size={16} className="text-accent" />
        <span className="text-sm text-white/85">
          Solo peguen la clave{" "}
          <span className="font-semibold text-white">pública</span> (el archivo{" "}
          <span className="font-mono text-white">.pub</span>). La privada jamás
          sale de su laptop.
        </span>
      </div>
    </SlideFrame>
  );
}

/* 09 — Crear repo con tu agente (en vivo) */
function CrearRepoSlide() {
  return (
    <SlideFrame>
      <Eyebrow>En vivo</Eyebrow>
      <Title size="md" className="mt-4">
        Crea tu repo —{" "}
        <span className="gradient-text">pídeselo a tu agente.</span>
      </Title>
      <Body className="mt-4 max-w-3xl">
        No tienen que memorizar comandos de git. Su agente sabe. Lo importante
        es saber qué pedirle.
      </Body>

      <div className="mt-8 max-w-4xl">
        <CodeBlock filename="cursor / claude code">{REPO_PROMPT}</CodeBlock>
      </div>

      <div className="mt-6 inline-flex items-center gap-2.5 rounded-2xl border border-accent/25 bg-accent/[0.06] px-5 py-3">
        <Sparkles size={16} className="text-accent" />
        <span className="text-sm text-white/85">
          Yo lo voy a hacer ahora con mi agente.{" "}
          <span className="font-semibold text-white">Síganme.</span>
        </span>
      </div>
    </SlideFrame>
  );
}

/* 08 — Seguridad */
function SeguridadSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Esto les ahorra mil dolores</Eyebrow>
      <Title size="md" className="mt-4 max-w-5xl">
        Hay archivos que{" "}
        <span className="gradient-text">jamás suben al repo.</span>
      </Title>

      <div className="mt-8 grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <ul className="flex flex-col gap-2.5">
          {NEVER_COMMIT.map((item) => (
            <li
              key={item.name}
              className="flex items-start gap-3 rounded-xl border border-accent/30 bg-accent/[0.05] p-4"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent/20 text-accent">
                <AlertTriangle size={16} strokeWidth={2.4} />
              </span>
              <div>
                <p className="font-mono text-sm font-semibold text-white">
                  {item.name}
                </p>
                <p className="mt-0.5 text-sm leading-snug text-white/70">
                  {item.desc}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-4 rounded-2xl border border-hairline bg-white/[0.015] p-5">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
            Si se equivocan
          </span>
          <ul className="flex flex-col gap-2.5">
            {SECURITY_CONSEQUENCES.map((c) => (
              <li
                key={c}
                className="flex items-start gap-2.5 text-sm leading-snug text-white/80"
              >
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 inline-flex items-center gap-2.5 rounded-2xl border border-accent/25 bg-accent/[0.06] px-5 py-3">
        <Shield size={16} className="text-accent" />
        <span className="text-sm text-white/85">
          <span className="font-mono text-white">.gitignore</span> + tu agente
          revisándolo antes del commit ={" "}
          <span className="font-semibold text-white">paz</span>.
        </span>
      </div>
    </SlideFrame>
  );
}

/* 09 — Vercel + auto-deploy */
function VercelSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Vercel</Eyebrow>
      <Title size="md" className="mt-4">
        Su app, en una{" "}
        <span className="gradient-text">URL pública.</span>
      </Title>
      <Body className="mt-4 max-w-3xl">
        Setup una vez. Después, cada <span className="font-mono text-white">git push</span> redespliega solo.
      </Body>

      <div className="mt-8 grid max-w-6xl grid-cols-1 gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
            1 · Primera vez en vercel.com
          </span>
          <ol className="mt-4 flex flex-col gap-2.5">
            {VERCEL_SETUP_STEPS.map((step, i) => (
              <li
                key={step}
                className="flex items-start gap-3 rounded-xl border border-hairline bg-white/[0.015] p-3.5"
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent/15 font-mono text-xs font-bold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="pt-1 text-sm leading-snug text-white/85">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
              2 · Después · automático
            </span>
            <ol className="mt-4 flex flex-col gap-2">
              {VERCEL_AFTER.map((s) => (
                <li
                  key={s.n}
                  className="flex items-start gap-3 rounded-lg border border-hairline bg-white/[0.015] p-3"
                >
                  <span className="font-mono text-xs font-semibold text-accent">
                    {s.n}
                  </span>
                  <span className="text-sm text-white/85">{s.text}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-col gap-2 rounded-2xl border border-accent/25 bg-accent/[0.06] p-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
              Recuerden
            </span>
            <p className="text-sm leading-relaxed text-white/85">
              API keys y secrets van en el{" "}
              <span className="font-semibold text-white">
                dashboard de Vercel
              </span>
              , no en el código.
            </p>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

/* 10 — Estructura de carpetas */
function EstructuraSlide() {
  return (
    <SlideFrame>
      <Eyebrow>1:00 · Estructura</Eyebrow>
      <Title size="md" className="mt-4">
        Para que el backend{" "}
        <span className="gradient-text">no les explote en la cara.</span>
      </Title>
      <Body className="mt-4 max-w-3xl">
        Hoy todo es frontend. La próxima semana viene backend. Decidan ahora
        cómo separar.
      </Body>

      <div className="mt-8 grid max-w-6xl grid-cols-1 gap-4 lg:grid-cols-2">
        {FOLDER_LAYOUTS.map((l) => (
          <div
            key={l.tag}
            className="flex flex-col gap-4 rounded-2xl border border-hairline bg-white/[0.015] p-5"
          >
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                {l.tag}
              </span>
              <h3 className="mt-2 text-lg font-semibold tracking-tight text-white">
                {l.title}
              </h3>
            </div>
            <pre className="overflow-hidden rounded-xl border border-hairline bg-surface p-4 font-mono text-[12px] leading-relaxed text-white/85">
              {l.tree.join("\n")}
            </pre>
          </div>
        ))}
      </div>

      <div className="mt-6 inline-flex items-center gap-2.5 rounded-2xl border border-hairline bg-white/[0.02] px-5 py-3">
        <Folder size={16} className="text-accent" />
        <span className="text-sm text-white/85">
          No refactoreen lo que ya tienen.{" "}
          <span className="text-white">Solo decidan hacia dónde van.</span>
        </span>
      </div>
    </SlideFrame>
  );
}

/* 11 — Vibe coding en vivo + Q&A */
function VibeCodingQASlide() {
  return (
    <SlideFrame>
      <Eyebrow>1:15 · Vibe coding en vivo + Q&A</Eyebrow>
      <Title size="md" className="mt-4">
        Ahora programo{" "}
        <span className="gradient-text">el problema de alguien.</span>
      </Title>
      <Body className="mt-6 max-w-3xl">
        Cuéntenme qué los frenó esta semana. Si nadie habla, yo elijo a alguien
        al azar y resolvemos su problema en vivo.
      </Body>

      <div className="mt-10 max-w-5xl">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
          Para arrancar — algunos atascos típicos
        </span>
        <ul className="mt-4 flex flex-col gap-2.5">
          {QA_TOPICS.map((t) => (
            <li
              key={t}
              className="flex items-start gap-3 rounded-xl border border-hairline bg-white/[0.015] p-3.5"
            >
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-accent/15 text-accent">
                <ArrowRight size={14} />
              </span>
              <span className="text-base text-white/85">{t}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 inline-flex items-center gap-2.5 rounded-2xl border border-accent/25 bg-accent/[0.06] px-5 py-3">
        <Lightbulb size={16} className="text-accent" />
        <span className="text-sm text-white/85">
          Lo más valioso de hoy:{" "}
          <span className="font-semibold text-white">
            ver cómo le piden mejor a su agente
          </span>
          .
        </span>
      </div>
    </SlideFrame>
  );
}

/* 12 — Tarea para Bootcamp #2 */
function HomeworkSlide() {
  return (
    <SlideFrame>
      <Eyebrow>1:50 · Antes de irse</Eyebrow>
      <Title size="md" className="mt-4">
        3 cosas para llegar a Bootcamp #2{" "}
        <span className="gradient-text">con backend listo para conectar.</span>
      </Title>

      <ol className="mt-10 flex max-w-5xl flex-col gap-3">
        {HOMEWORK.map((h, i) => {
          const Icon = h.icon;
          return (
            <li
              key={h.title}
              className="flex items-start gap-4 rounded-2xl border border-hairline bg-white/[0.015] p-5"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent">
                <Icon size={18} strokeWidth={2.2} />
              </span>
              <div className="flex-1">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-lg font-semibold text-white">{h.title}</p>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  {h.desc}
                </p>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="mt-8 inline-flex items-center gap-2.5 rounded-2xl border border-accent/25 bg-accent/[0.06] px-5 py-3">
        <MessageCircle size={16} className="text-accent" />
        <span className="text-sm text-white/85">
          Publiquen en Telegram:{" "}
          <span className="font-semibold text-white">link del repo</span>,
          <span className="font-semibold text-white"> link de Vercel</span> y
          su lista de qué necesita backend.
        </span>
      </div>
    </SlideFrame>
  );
}

/* 13 — Nos vemos en Bootcamp #2 */
function NextSessionSlide() {
  return (
    <SlideFrame>
      <Eyebrow>Continúa el martes</Eyebrow>
      <Title size="lg" className="mt-6 max-w-5xl">
        Nos vemos en{" "}
        <span className="gradient-text">Bootcamp #2.</span>
      </Title>
      <Body className="mt-6 max-w-3xl">
        Wallets, stablecoins y cómo conectar dinero programable dentro de sus
        apps.
      </Body>

      <div className="mt-12 flex flex-col gap-2 font-mono text-base text-white/70 sm:text-lg">
        <span className="flex items-center gap-2.5">
          <Calendar size={18} className="text-accent" />
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

      <div className="mt-10 max-w-2xl">
        <Body className="text-sm">
          Lleguen con su{" "}
          <span className="text-white">repo + Vercel + lista de backend</span>.
          Eso desbloquea todo lo de la siguiente sesión.
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
  ShowTellSlide,
  WhatIsGitHubSlide,
  LlavesSlide,
  LlavesEnVivoSlide,
  CrearRepoSlide,
  SeguridadSlide,
  VercelSlide,
  EstructuraSlide,
  VibeCodingQASlide,
  HomeworkSlide,
  NextSessionSlide,
];

export default function BootcampOneDeck() {
  return <Deck slides={SLIDES} />;
}
