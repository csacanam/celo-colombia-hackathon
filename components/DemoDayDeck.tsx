"use client";

import { useEffect, useState, type ComponentType } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Loader2, Lock, Medal, Trophy } from "lucide-react";
import {
  Body,
  Deck,
  Eyebrow,
  SlideFrame,
  Title,
} from "@/components/slides/SlideKit";
import {
  JURY,
  MENTORS,
  OFFICE_HOURS,
  PRIZES,
  PRIZE_BONUS,
  PRIZE_TOTAL,
  RUBRIC_CRITERIA,
  TIMELINE,
  WHATSAPP_URL,
} from "@/lib/site";

type DeckProject = {
  id: string;
  name: string;
  oneLiner: string;
  members: string[];
  miniAppUrl: string;
  githubUrl: string;
  youtubeUrl: string;
};

/** Extrae el ID de video de cualquier formato de URL de YouTube. */
function youtubeId(url: string): string | null {
  const patterns = [
    /[?&]v=([^?&]+)/,
    /youtu\.be\/([^?&/]+)/,
    /\/embed\/([^?&/]+)/,
    /\/shorts\/([^?&/]+)/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

type PodiumEntry = {
  id: string;
  name: string;
  members: string[];
  avgScore: number;
  judgeCount: number;
};

type BonusCandidate = { name: string; members: string[] };

type Testimonial = { text: string; project: string };

// POAP por palabra secreta: se reclama en la app POAP escribiendo la palabra.
const POAP = { secretWord: "misioncumplida", appUrl: "https://poap.xyz" };

const COMMUNITIES = [
  { name: "Celo Builders · Telegram", url: "https://t.me/+mxsf6bMj6s1lMjVh" },
  { name: "Celo Colombia · Telegram", url: "https://t.me/celocol" },
  { name: "Sígueme · @camilosaka en X", url: "https://x.com/camilosaka" },
];

type LoadState = "loading" | "ready" | "denied" | "error";

export function DemoDayDeck({ token }: { token: string | null }) {
  const [state, setState] = useState<LoadState>("loading");
  const [projects, setProjects] = useState<DeckProject[]>([]);
  const [podium, setPodium] = useState<PodiumEntry[]>([]);
  const [bonusCandidates, setBonusCandidates] = useState<BonusCandidate[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    if (!token) {
      setState("denied");
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(
          `/api/demoday/deck?token=${encodeURIComponent(token)}`,
          { cache: "no-store" }
        );
        const json = await res.json();
        if (cancelled) return;
        if (res.status === 401) return setState("denied");
        if (!json.ok) return setState("error");
        setProjects(json.projects ?? []);
        setPodium(json.podium ?? []);
        setBonusCandidates(json.bonusCandidates ?? []);
        setTestimonials(json.testimonials ?? []);
        setState("ready");
      } catch {
        if (!cancelled) setState("error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token]);

  if (state === "loading") {
    return (
      <SlideFrame>
        <div className="flex items-center gap-3 text-muted">
          <Loader2 className="animate-spin text-accent" size={28} />
          <span className="text-xl">Cargando Demo Day…</span>
        </div>
      </SlideFrame>
    );
  }

  if (state === "denied") {
    return (
      <SlideFrame>
        <div className="flex max-w-xl flex-col gap-4">
          <Lock className="text-accent" size={36} />
          <Title size="md">Acceso restringido</Title>
          <Body>
            Este deck es para la organización. Ábrelo con el enlace privado
            (token).
          </Body>
        </div>
      </SlideFrame>
    );
  }

  if (state === "error") {
    return (
      <SlideFrame>
        <div className="flex max-w-xl flex-col gap-4">
          <Title size="md">No pudimos cargar la data</Title>
          <Body>Revisa la conexión con Airtable y recarga.</Body>
        </div>
      </SlideFrame>
    );
  }

  const slides = buildSlides(projects, podium, bonusCandidates, testimonials);
  return <Deck slides={slides} />;
}

/* ========================================================================= */

function buildSlides(
  projects: DeckProject[],
  podium: PodiumEntry[],
  bonusCandidates: BonusCandidate[],
  testimonials: Testimonial[]
): ComponentType[] {
  const slides: ComponentType[] = [];

  // 1 · Portada
  slides.push(() => (
    <SlideFrame>
      <Eyebrow>Hackathon de Agentes Onchain · Celo Colombia</Eyebrow>
      <Title size="xl" className="mt-6">
        Demo <span className="gradient-text">Day</span>
      </Title>
      <Body className="mt-6">Viernes 19 de junio</Body>
    </SlideFrame>
  ));

  // 2 · Bienvenida
  slides.push(() => (
    <SlideFrame>
      <Eyebrow>Bienvenida</Eyebrow>
      <Title size="lg" className="mt-6 max-w-4xl">
        Hoy cerramos la hackathon con las{" "}
        <span className="gradient-text">demos finales</span> de los equipos.
      </Title>
    </SlideFrame>
  ));

  // 2.1 · Gracias a todos los equipos
  slides.push(() => (
    <SlideFrame>
      <Eyebrow>Gracias a los equipos</Eyebrow>
      <Title size="lg" className="mt-6 max-w-4xl">
        {projects.length} equipos construyeron, desplegaron y shippearon.{" "}
        <span className="gradient-text">La rompieron.</span>
      </Title>
      <Body className="mt-6 max-w-3xl">
        Pasar de una idea a una app onchain funcionando en semanas no es poca
        cosa. Hoy es de ustedes.
      </Body>
    </SlideFrame>
  ));

  // 2.5 · Gracias a los mentores
  slides.push(() => (
    <SlideFrame>
      <Eyebrow>Gracias</Eyebrow>
      <Title size="md" className="mt-6">
        A los mentores que lo hicieron posible
      </Title>
      <div className="mt-10 grid max-w-5xl gap-5 sm:grid-cols-3">
        {MENTORS.map((m) => (
          <div
            key={m.name}
            className="flex flex-col items-center rounded-2xl border border-hairline bg-white/[0.015] p-6 text-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={m.photo}
              alt={m.name}
              className="h-24 w-24 rounded-full object-cover"
            />
            <div className="mt-4 text-xl font-semibold tracking-tight text-white">
              {m.name}
            </div>
            <div className="mt-1.5 text-sm leading-snug text-muted">
              {m.role.map((t) => t.text).join("")}
            </div>
          </div>
        ))}
      </div>
    </SlideFrame>
  ));

  // 2.7 · POAP — reclama tu prueba de asistencia
  slides.push(() => (
    <SlideFrame>
      <div className="flex items-center justify-between gap-10">
        <div className="max-w-2xl">
          <Eyebrow>Reclama tu POAP</Eyebrow>
          <Title size="lg" className="mt-6">
            Llévate tu{" "}
            <span className="gradient-text">prueba de asistencia.</span>
          </Title>
          <Body className="mt-6">
            Abre la app <strong className="text-white">POAP</strong> → elige
            “Secret word” → escribe la palabra (sensible a mayúsculas):
          </Body>
          <div className="mt-5 inline-block rounded-xl border border-accent/30 bg-accent/[0.06] px-6 py-3 font-mono text-3xl text-accent">
            {POAP.secretWord}
          </div>
        </div>
        <div className="shrink-0 text-center">
          <div className="rounded-2xl bg-white p-4">
            <QRCodeSVG value={POAP.appUrl} size={180} />
          </div>
          <div className="mt-3 font-mono text-xs text-muted">app POAP</div>
        </div>
      </div>
    </SlideFrame>
  ));

  // 3 · Qué fue la hackathon
  slides.push(() => (
    <SlideFrame>
      <Eyebrow>El recorrido</Eyebrow>
      <Title size="md" className="mt-6">
        Lo que construimos juntos
      </Title>
      <div className="mt-10 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3">
        {[
          ["8h 30m", "Bootcamps en 4 sesiones"],
          ["1 semana", "Build week construyendo"],
          ["5 horas", "Office hours con mentores"],
          [
            `${projects.length} ${
              projects.length === 1 ? "proyecto" : "proyectos"
            }`,
            "Mini apps entregadas",
          ],
        ].map(([h, d]) => (
          <div
            key={h}
            className="rounded-2xl border border-hairline bg-white/[0.015] p-5"
          >
            <div className="text-2xl font-semibold tracking-tight text-white">
              {h}
            </div>
            <div className="mt-1 text-sm text-muted">{d}</div>
          </div>
        ))}
      </div>
    </SlideFrame>
  ));

  // 3.1 · Línea de tiempo (hitos)
  slides.push(() => (
    <SlideFrame>
      <Eyebrow>La línea de tiempo</Eyebrow>
      <Title size="md" className="mt-6">
        Del kickoff al Demo Day
      </Title>
      <ol className="mt-9 max-w-4xl border-l border-hairline">
        {TIMELINE.map((t) => (
          <li key={t.phase} className="relative py-3 pl-8">
            <span className="absolute -left-[7px] top-5 h-3 w-3 rounded-full border-2 border-accent bg-ink" />
            <div className="flex flex-wrap items-baseline gap-x-3">
              <span className="text-lg font-semibold tracking-tight text-white">
                {t.title}
              </span>
              <span className="font-mono text-xs text-accent">{t.date}</span>
            </div>
            <p className="mt-0.5 text-sm text-muted">{t.desc}</p>
          </li>
        ))}
      </ol>
    </SlideFrame>
  ));

  // 3.2 · Office Hours diarios
  slides.push(() => (
    <SlideFrame>
      <Eyebrow>Office Hours · toda la semana</Eyebrow>
      <Title size="md" className="mt-6">
        Una hora al día, lunes a viernes
      </Title>
      <Body className="mt-4 max-w-3xl">
        Durante la semana de hackathon acompañamos a los equipos cada día con
        feedback en vivo.
      </Body>
      <div className="mt-9 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-5">
        {OFFICE_HOURS.map((o) => (
          <div
            key={o.day}
            className="rounded-2xl border border-hairline bg-white/[0.015] p-5 text-center"
          >
            <div className="text-base font-semibold tracking-tight text-white">
              {o.day.replace(" de junio", "")}
            </div>
            <div className="mt-2 font-mono text-xs text-accent">{o.time}</div>
          </div>
        ))}
      </div>
    </SlideFrame>
  ));

  // 4 · Cómo funcionará
  slides.push(() => (
    <SlideFrame>
      <Eyebrow>Cómo funcionará</Eyebrow>
      <Title size="md" className="mt-6">
        El formato de hoy
      </Title>
      <ol className="mt-10 grid max-w-3xl gap-3">
        {[
          "Reproducimos el video de cada equipo (máx. 3 minutos).",
          "El equipo se conecta para responder las preguntas del jurado.",
          "Los jurados evalúan con la rúbrica oficial.",
          "Al final anunciamos los ganadores.",
        ].map((t, i) => (
          <li
            key={t}
            className="flex items-center gap-4 rounded-xl border border-hairline bg-white/[0.015] px-5 py-4"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent/15 font-mono text-sm font-bold text-accent">
              {i + 1}
            </span>
            <span className="text-lg text-white/90">{t}</span>
          </li>
        ))}
      </ol>
    </SlideFrame>
  ));

  // 5 · Criterios de evaluación (rúbrica real)
  slides.push(() => (
    <SlideFrame>
      <Eyebrow>Criterios de evaluación</Eyebrow>
      <Title size="md" className="mt-6">
        Cómo se juzga cada proyecto
      </Title>
      <ul className="mt-8 grid max-w-4xl gap-2.5">
        {RUBRIC_CRITERIA.map((c) => (
          <li
            key={c.title}
            className="flex items-center justify-between gap-6 rounded-xl border border-hairline bg-white/[0.015] px-5 py-3.5"
          >
            <span className="text-lg text-white/90">{c.title}</span>
            <span className="font-display text-2xl font-semibold text-accent">
              {c.weight}%
            </span>
          </li>
        ))}
      </ul>
    </SlideFrame>
  ));

  // 6 · Jurados
  slides.push(() => (
    <SlideFrame>
      <Eyebrow>Jurado</Eyebrow>
      <Title size="md" className="mt-6">
        Quiénes evalúan
      </Title>
      <div className="mt-10 grid max-w-5xl gap-5 sm:grid-cols-3">
        {JURY.map((j) => (
          <div
            key={j.name}
            className="flex flex-col items-center rounded-2xl border border-hairline bg-white/[0.015] p-6 text-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={j.photo}
              alt={j.name}
              className="h-24 w-24 rounded-full object-cover"
            />
            <div className="mt-4 text-xl font-semibold tracking-tight text-white">
              {j.name}
            </div>
            <div className="mt-1.5 text-sm leading-snug text-muted">
              {j.roleText}
              {j.roleLinks.map((l) => l.label).join(", ")}
            </div>
          </div>
        ))}
      </div>
    </SlideFrame>
  ));

  // 7 · Premios
  slides.push(() => (
    <SlideFrame>
      <Eyebrow>Premios</Eyebrow>
      <Title size="md" className="mt-6">
        {PRIZE_TOTAL} <span className="text-accent">COPm</span> en juego
      </Title>
      <div className="mt-9 grid max-w-5xl gap-4 sm:grid-cols-3">
        {PRIZES.map((p) => (
          <div
            key={p.rank}
            className="rounded-2xl border border-hairline bg-white/[0.015] p-6"
          >
            <div className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
              {p.place}
            </div>
            <div className="mt-3 flex items-baseline gap-1.5">
              <span className="font-display text-4xl font-semibold tracking-tight text-white">
                {p.amount}
              </span>
              <span className="font-mono text-sm text-accent">COPm</span>
            </div>
            <div className="mt-2 text-sm text-muted">{p.note}</div>
          </div>
        ))}
      </div>
      <Body className="mt-6">
        + {PRIZE_BONUS.title}: {PRIZE_BONUS.amount} COPm · {PRIZE_BONUS.detail}
      </Body>
    </SlideFrame>
  ));

  // 8 · Orden de presentación
  slides.push(() => (
    <SlideFrame>
      <Eyebrow>Orden de presentación</Eyebrow>
      <Title size="md" className="mt-6">
        {projects.length} equipos
      </Title>
      <div className="mt-8 grid max-w-5xl gap-x-8 gap-y-2 sm:grid-cols-2">
        {projects.map((p, i) => (
          <div
            key={p.id}
            className="flex items-center gap-4 border-b border-hairline py-2.5"
          >
            <span className="w-7 shrink-0 font-mono text-sm text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="flex-1 truncate text-lg text-white/90">
              {p.name}
            </span>
            <span className="hidden truncate text-sm text-muted sm:block">
              {p.members.join(", ")}
            </span>
          </div>
        ))}
      </div>
    </SlideFrame>
  ));

  // 9 · Un slide por proyecto — video embebido + equipo para el Q&A
  projects.forEach((p, i) => {
    const vid = youtubeId(p.youtubeUrl);
    slides.push(() => (
      <SlideFrame>
        <div className="flex items-center gap-10">
          {/* Video */}
          <div className="min-w-0 flex-[1.4]">
            {vid ? (
              <div className="aspect-video w-full overflow-hidden rounded-2xl border border-hairline bg-black">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${vid}`}
                  title={p.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="flex aspect-video w-full items-center justify-center rounded-2xl border border-dashed border-hairline text-muted">
                Sin video
              </div>
            )}
          </div>

          {/* Info para el Q&A */}
          <div className="min-w-0 flex-1">
            <Eyebrow>
              Proyecto {i + 1} / {projects.length}
            </Eyebrow>
            <Title size="md" className="mt-4">
              {p.name}
            </Title>
            {p.oneLiner && (
              <p className="mt-3 text-lg leading-relaxed text-muted">
                {p.oneLiner}
              </p>
            )}
            {p.members.length > 0 && (
              <div className="mt-5">
                <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                  Equipo · listo para preguntas
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {p.members.map((m) => (
                    <span
                      key={m}
                      className="rounded-full border border-hairline bg-white/[0.02] px-4 py-1.5 text-sm text-white/80"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {p.miniAppUrl && (
              <div className="mt-5 font-mono text-xs text-muted">
                {p.miniAppUrl.replace(/^https?:\/\//, "")}
              </div>
            )}
          </div>
        </div>
      </SlideFrame>
    ));
  });

  // 10 · Resultados (intermedio mientras se calcula el podio)
  slides.push(() => (
    <SlideFrame>
      <div className="flex items-center justify-between gap-10">
        <div className="max-w-2xl">
          <Eyebrow>Resultados</Eyebrow>
          <Title size="lg" className="mt-6">
            Sumando los{" "}
            <span className="gradient-text">puntajes del jurado.</span>
          </Title>
          <Body className="mt-6">
            Cada jurado calificó los proyectos con la rúbrica. El podio sale de
            esos puntajes. Mientras tanto, conéctate con la comunidad de Celo
            Colombia.
          </Body>
        </div>
        <div className="shrink-0 text-center">
          <div className="rounded-2xl bg-white p-4">
            <QRCodeSVG value={WHATSAPP_URL} size={180} />
          </div>
          <div className="mt-3 font-mono text-xs text-muted">Comunidad</div>
        </div>
      </div>
    </SlideFrame>
  ));

  // 11 · Bonus de integración COPm
  slides.push(() => (
    <SlideFrame>
      <Eyebrow>Bonus de integración</Eyebrow>
      <Title size="md" className="mt-6">
        {PRIZE_BONUS.title}
      </Title>
      <Body className="mt-4 max-w-3xl">
        {PRIZE_BONUS.amount} COPm · {PRIZE_BONUS.detail}.
      </Body>

      {bonusCandidates.length > 0 ? (
        <>
          <div className="mt-8 grid max-w-4xl gap-x-8 gap-y-2 sm:grid-cols-2">
            {bonusCandidates.map((b) => (
              <div
                key={b.name}
                className="flex items-center gap-3 rounded-xl border border-hairline bg-white/[0.015] px-4 py-3"
              >
                <span className="font-display text-lg font-semibold text-accent">
                  COPm
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-base text-white/90">
                    {b.name}
                  </span>
                  {b.members.length > 0 && (
                    <span className="block truncate text-xs text-muted">
                      {b.members.join(", ")}
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-amber-300/80">
            Integración autodeclarada · sujeta a verificación
          </p>
        </>
      ) : (
        <Body className="mt-8 text-white/50">
          Sin proyectos que hayan declarado integración de COPm.
        </Body>
      )}
    </SlideFrame>
  ));

  // 12–14 · Podio (3º, 2º, 1º)
  slides.push(makeWinnerSlide(3, podium[2]));
  slides.push(makeWinnerSlide(2, podium[1]));
  slides.push(makeWinnerSlide(1, podium[0]));

  // 14.5 · Testimonios de los equipos (chunks de 3)
  for (let i = 0; i < testimonials.length; i += 3) {
    const group = testimonials.slice(i, i + 3);
    slides.push(() => (
      <SlideFrame>
        <Eyebrow>Lo que dicen los equipos</Eyebrow>
        <Title size="md" className="mt-6">
          Testimonios
        </Title>
        <div className="mt-8 grid max-w-4xl gap-4">
          {group.map((t, j) => (
            <blockquote
              key={j}
              className="rounded-2xl border border-hairline bg-white/[0.015] p-6"
            >
              <p className="text-lg leading-relaxed text-white/85">
                “{t.text}”
              </p>
              {t.project && (
                <footer className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-accent">
                  {t.project}
                </footer>
              )}
            </blockquote>
          ))}
        </div>
      </SlideFrame>
    ));
  }

  // 14.7 · Conéctate (comunidades + X)
  slides.push(() => (
    <SlideFrame>
      <Eyebrow>Conéctate</Eyebrow>
      <Title size="md" className="mt-6">
        Sigue construyendo con la comunidad
      </Title>
      <div className="mt-10 grid max-w-4xl gap-6 sm:grid-cols-3">
        {COMMUNITIES.map((c) => (
          <div key={c.url} className="text-center">
            <div className="mx-auto w-fit rounded-2xl bg-white p-4">
              <QRCodeSVG value={c.url} size={150} />
            </div>
            <div className="mt-3 text-sm leading-snug text-white/80">
              {c.name}
            </div>
          </div>
        ))}
      </div>
    </SlideFrame>
  ));

  // 15 · Cierre
  slides.push(() => (
    <SlideFrame>
      <Eyebrow>Gracias</Eyebrow>
      <Title size="lg" className="mt-6 max-w-4xl">
        Felicitaciones a{" "}
        <span className="gradient-text">todos los equipos.</span>
      </Title>
      <Body className="mt-6 max-w-3xl">
        Gracias por construir, desplegar y presentar aplicaciones onchain
        durante la Hackathon de Agentes Onchain · Celo Colombia.
      </Body>
    </SlideFrame>
  ));

  return slides;
}

const RANK_META: Record<number, { label: string; accent: string }> = {
  1: { label: "Primer lugar", accent: "text-accent" },
  2: { label: "Segundo lugar", accent: "text-white/80" },
  3: { label: "Tercer lugar", accent: "text-amber-600" },
};

function makeWinnerSlide(rank: number, entry?: PodiumEntry): ComponentType {
  const prize = PRIZES.find((p) => p.rank === rank);
  const meta = RANK_META[rank];
  const Icon = rank === 1 ? Trophy : Medal;

  return () => (
    <SlideFrame>
      <div className="flex flex-col items-center text-center">
        <Icon size={52} className={meta.accent} />
        <div className="mt-5 font-mono text-sm uppercase tracking-[0.2em] text-muted">
          {meta.label}
        </div>
        {entry ? (
          <>
            <Title size="xl" className="mt-4">
              {entry.name}
            </Title>
            {entry.members.length > 0 && (
              <div className="mt-5 text-xl text-white/70">
                {entry.members.join(" · ")}
              </div>
            )}
            {prize && (
              <div className="mt-7 inline-flex items-baseline gap-2 rounded-full border border-accent/30 bg-accent/[0.06] px-6 py-2.5">
                <span className="font-display text-3xl font-semibold text-white">
                  {prize.amount}
                </span>
                <span className="font-mono text-sm text-accent">COPm</span>
              </div>
            )}
          </>
        ) : (
          <Title size="lg" className="mt-4 text-white/50">
            Por anunciar
          </Title>
        )}
      </div>
    </SlideFrame>
  );
}
