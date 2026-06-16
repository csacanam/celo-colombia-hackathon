"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ArrowUpRight, CheckCircle2, Clock, Lock } from "lucide-react";
import {
  SUBMIT_DEADLINE_ISO,
  SUBMIT_DEADLINE_LABEL,
} from "@/lib/site";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

const NETWORKS = ["Celo Mainnet", "Celo Sepolia"] as const;
const MEMBER_COUNTS = [1, 2, 3, 4] as const;
const FIRST_DEPLOY_OPTIONS = ["Sí", "No"] as const;
const WILL_CONTINUE_OPTIONS = ["Sí", "No", "Probablemente"] as const;
const NPS_OPTIONS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;
const DEADLINE_MS = new Date(SUBMIT_DEADLINE_ISO).getTime();

const DESCRIPTION_PLACEHOLDER =
  "nerdos.fun es una plataforma de juegos diarios para mentes curiosas. Resuelve retos de habilidad como Grammar o Math, compite contra jugadores de todo el mundo en rankings globales y gana premios en USDT. Cada jugador tiene una jugada gratis por día; los intentos adicionales cuestan $0.10 USDT y se acumulan en un pozo de premios que se reparte entre los mejores de la jornada. Hecho para quienes disfrutan aprender, competir y mejorar cada día.";

type Status = "idle" | "loading" | "success" | "error";

export function Submit() {
  const [memberCount, setMemberCount] = useState<number>(1);
  const [copmIntegration, setCopmIntegration] = useState<string>("");
  const [firstDeploy, setFirstDeploy] = useState<string>("");
  const [willContinue, setWillContinue] = useState<string>("");
  const [nps, setNps] = useState<number | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");
  const [isClosed, setIsClosed] = useState<boolean>(false);

  useEffect(() => {
    const check = () => {
      if (Date.now() >= DEADLINE_MS) setIsClosed(true);
    };
    check();
    const interval = setInterval(check, 30_000);
    return () => clearInterval(interval);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);

    const members: string[] = [];
    for (let i = 1; i <= memberCount; i++) {
      const v = (data.get(`member${i}`) as string | null) ?? "";
      const trimmed = v.trim();
      if (trimmed) members.push(trimmed);
    }

    const payload = {
      projectName: data.get("projectName"),
      members,
      whatsapp: data.get("whatsapp"),
      miniAppUrl: data.get("miniAppUrl"),
      githubUrl: data.get("githubUrl"),
      youtubeUrl: data.get("youtubeUrl"),
      proofOfShipUrl: data.get("proofOfShipUrl"),
      contractAddress: data.get("contractAddress"),
      contractNetwork: data.get("contractNetwork"),
      description: data.get("description"),
      oneLiner: data.get("oneLiner"),
      copmIntegration,
      firstDeploy,
      willContinue,
      nps,
      testimonial: data.get("testimonial"),
    };

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!json.ok) {
        setStatus("error");
        setError(json.error ?? "No pudimos guardar tu entrega.");
        return;
      }
      setStatus("success");
      form.reset();
      setMemberCount(1);
      setCopmIntegration("");
      setFirstDeploy("");
      setWillContinue("");
      setNps(null);
    } catch {
      setStatus("error");
      setError("Error de conexión. Intenta de nuevo.");
    }
  }

  return (
    <section
      id="entregar"
      className="relative overflow-hidden py-24 sm:py-28"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-[700px] -translate-x-1/2 rounded-full bg-accent/[0.05] blur-[150px]" />

      <div className="section relative">
        <SectionHeading
          eyebrow="Demo Day · Entrega"
          title={
            <>
              Sube tu proyecto{" "}
              <span className="gradient-text">antes del Demo Day.</span>
            </>
          }
          description="Llena el formulario para que el jurado pueda evaluar tu proyecto. Te toma 5 minutos si tienes todo listo."
        />

        <Reveal delay={0.08}>
          <div
            className={`mx-auto mt-10 flex max-w-3xl items-center gap-2.5 rounded-full border px-4 py-2 ${
              isClosed
                ? "border-red-500/30 bg-red-500/[0.06]"
                : "border-accent/30 bg-accent/[0.06]"
            }`}
          >
            <Clock
              size={14}
              className={isClosed ? "text-red-300" : "text-accent"}
            />
            <span
              className={`font-mono text-[11px] uppercase tracking-[0.14em] ${
                isClosed ? "text-red-300" : "text-accent"
              }`}
            >
              {isClosed ? "Entregas cerradas" : "Cierra"}
            </span>
            <span className="text-sm text-white/85">
              {SUBMIT_DEADLINE_LABEL}
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mx-auto mt-6 max-w-3xl rounded-3xl border border-hairline bg-white/[0.015] p-7 sm:p-9">
            {isClosed ? (
              <ClosedPanel />
            ) : status === "success" ? (
              <SuccessPanel onReset={() => setStatus("idle")} />
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-6"
              >
                <Field
                  label="Nombre del proyecto"
                  name="projectName"
                  type="text"
                  required
                  placeholder="nerdos.fun"
                />

                {/* Member count selector */}
                <div>
                  <Label>¿Cuántos integrantes son? *</Label>
                  <div className="mt-2.5 flex gap-2">
                    {MEMBER_COUNTS.map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setMemberCount(n)}
                        className={`flex-1 rounded-lg border px-4 py-2.5 text-sm font-medium transition ${
                          memberCount === n
                            ? "border-accent/40 bg-accent/[0.08] text-accent"
                            : "border-hairline bg-surface text-muted hover:border-white/15 hover:text-white"
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Member name fields */}
                <div className="grid gap-4 md:grid-cols-2">
                  {Array.from({ length: memberCount }, (_, i) => (
                    <Field
                      key={`member${i + 1}`}
                      label={`Integrante ${i + 1}`}
                      name={`member${i + 1}`}
                      type="text"
                      required
                      placeholder="Camilo Sacanamboy"
                    />
                  ))}
                </div>

                <div>
                  <Field
                    label="WhatsApp para coordinar premios"
                    name="whatsapp"
                    type="tel"
                    required
                    placeholder="300 000 0000"
                  />
                  <p className="mt-1.5 text-xs text-white/40">
                    Solo lo usamos para coordinar Demo Day, premios o próximos
                    pasos.
                  </p>
                </div>

                <Field
                  label="Enlace a la mini app"
                  name="miniAppUrl"
                  type="url"
                  required
                  placeholder="https://nerdos.fun"
                />
                <Field
                  label="Repositorio público en GitHub"
                  name="githubUrl"
                  type="url"
                  required
                  placeholder="https://github.com/csacanam/freaking-grammar"
                />
                <Field
                  label="Video de demostración en YouTube (máx. 3 min, público)"
                  name="youtubeUrl"
                  type="url"
                  required
                  placeholder="https://www.youtube.com/watch?v=4HP9T5Sze6k"
                />
                <div>
                  <Field
                    label="Link de tu proyecto en Proof of Ship (talent.app)"
                    name="proofOfShipUrl"
                    type="url"
                    required
                    placeholder="https://talent.app/..."
                  />
                  <p className="mt-1.5 text-xs text-white/40">
                    Regístrate en{" "}
                    <a
                      href="https://talent.app/~/earn/celo-proof-of-ship"
                      target="_blank"
                      rel="noreferrer"
                      className="text-accent underline underline-offset-2"
                    >
                      Proof of Ship
                    </a>
                    , crea la página de tu proyecto e inscríbela en la campaña.
                    Pega aquí el link que te genera la plataforma · así tu
                    proyecto también aplica a PoS.
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
                  <Field
                    label="Dirección del contrato"
                    name="contractAddress"
                    type="text"
                    required
                    placeholder="0x88a59c58Ca70DF6971F9499f6117A2BA41653e3e"
                  />
                  <div>
                    <Label>Red *</Label>
                    <select
                      name="contractNetwork"
                      required
                      defaultValue=""
                      className="mt-2.5 w-full rounded-lg border border-hairline bg-surface px-3.5 py-2.5 text-sm text-white transition-all duration-200 focus:border-accent/45 focus:outline-none focus:ring-2 focus:ring-accent/15"
                    >
                      <option value="" disabled>
                        Elegir
                      </option>
                      {NETWORKS.map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <Label>¿Integraste COPm en tu app? *</Label>
                  <div className="mt-2.5 flex gap-2">
                    {FIRST_DEPLOY_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setCopmIntegration(opt)}
                        className={`flex-1 rounded-lg border px-4 py-2.5 text-sm font-medium transition ${
                          copmIntegration === opt
                            ? "border-accent/40 bg-accent/[0.08] text-accent"
                            : "border-hairline bg-surface text-muted hover:border-white/15 hover:text-white"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  <p className="mt-1.5 text-xs text-white/40">
                    COPm es el peso colombiano digital de Celo. Si lo integraste,
                    tu proyecto aplica al bonus de integración (queda sujeto a
                    verificación).
                  </p>
                </div>

                <Field
                  label="Descripción del proyecto"
                  name="description"
                  as="textarea"
                  required
                  placeholder={DESCRIPTION_PLACEHOLDER}
                  rows={6}
                />
                <Field
                  label="Frase de presentación"
                  name="oneLiner"
                  type="text"
                  required
                  maxLength={140}
                  placeholder="Daily games for nerdos. Rewards for curious minds."
                />

                {/* Preguntas de impacto */}
                <div>
                  <Label>
                    ¿Es la primera vez que tu equipo despliega un contrato
                    inteligente? *
                  </Label>
                  <div className="mt-2.5 flex gap-2">
                    {FIRST_DEPLOY_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setFirstDeploy(opt)}
                        className={`flex-1 rounded-lg border px-4 py-2.5 text-sm font-medium transition ${
                          firstDeploy === opt
                            ? "border-accent/40 bg-accent/[0.08] text-accent"
                            : "border-hairline bg-surface text-muted hover:border-white/15 hover:text-white"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>
                    ¿Van a seguir construyendo este proyecto después de la
                    hackathon? *
                  </Label>
                  <div className="mt-2.5 flex gap-2">
                    {WILL_CONTINUE_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setWillContinue(opt)}
                        className={`flex-1 rounded-lg border px-4 py-2.5 text-sm font-medium transition ${
                          willContinue === opt
                            ? "border-accent/40 bg-accent/[0.08] text-accent"
                            : "border-hairline bg-surface text-muted hover:border-white/15 hover:text-white"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>
                    Del 0 al 10, ¿qué tan probable es que recomiendes esta
                    hackathon a otro builder? *
                  </Label>
                  <div className="mt-2.5 grid grid-cols-6 gap-1.5 sm:grid-cols-11 sm:gap-2">
                    {NPS_OPTIONS.map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setNps(n)}
                        className={`rounded-lg border py-2.5 text-sm font-medium transition ${
                          nps === n
                            ? "border-accent/40 bg-accent/[0.08] text-accent"
                            : "border-hairline bg-surface text-muted hover:border-white/15 hover:text-white"
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                  <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-wider text-muted">
                    <span>Nada probable</span>
                    <span>Muy probable</span>
                  </div>
                </div>

                <Field
                  label="¿Querés dejar un testimonio que podamos compartir públicamente? (opcional)"
                  name="testimonial"
                  as="textarea"
                  rows={3}
                  placeholder="Lo que más nos llevamos de esta hackathon fue..."
                />

                {error && (
                  <p className="rounded-lg border border-red-500/30 bg-red-500/[0.05] px-3.5 py-2.5 text-sm text-red-300">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-primary self-start disabled:opacity-60"
                >
                  {status === "loading" ? (
                    "Enviando..."
                  ) : (
                    <>
                      Entregar proyecto
                      <ArrowUpRight size={16} strokeWidth={2.4} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- helpers ---------- */

function Label({ children }: { children: ReactNode }) {
  return (
    <label className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
      {children}
    </label>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
  as?: "input" | "textarea";
};

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  rows = 3,
  maxLength,
  as = "input",
}: FieldProps) {
  const cls =
    "mt-2.5 w-full rounded-lg border border-hairline bg-surface px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 transition-all duration-200 focus:border-accent/45 focus:outline-none focus:ring-2 focus:ring-accent/15";
  return (
    <div>
      <Label>
        {label}
        {required ? " *" : ""}
      </Label>
      {as === "textarea" ? (
        <textarea
          name={name}
          required={required}
          placeholder={placeholder}
          rows={rows}
          maxLength={maxLength}
          className={cls}
        />
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          placeholder={placeholder}
          maxLength={maxLength}
          className={cls}
        />
      )}
    </div>
  );
}

function ClosedPanel() {
  return (
    <div className="flex flex-col items-center py-6 text-center">
      <div className="grid h-14 w-14 place-items-center rounded-full bg-red-500/15 text-red-300">
        <Lock size={22} strokeWidth={2.2} />
      </div>
      <h3 className="mt-5 text-xl font-semibold tracking-tight text-white">
        Las entregas están cerradas.
      </h3>
      <p className="mt-2 max-w-md text-sm text-muted">
        El cierre fue el {SUBMIT_DEADLINE_LABEL}. Si tu equipo entregó a tiempo,
        nos vemos en el Demo Day.
      </p>
    </div>
  );
}

function SuccessPanel({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center py-6 text-center">
      <div className="grid h-14 w-14 place-items-center rounded-full bg-accent/15 text-accent">
        <CheckCircle2 size={24} strokeWidth={2.2} />
      </div>
      <h3 className="mt-5 text-xl font-semibold tracking-tight text-white">
        ¡Entrega registrada!
      </h3>
      <p className="mt-2 max-w-md text-sm text-muted">
        El jurado va a revisar tu proyecto. Mucho éxito en el Demo Day.
      </p>
      <button type="button" onClick={onReset} className="btn-ghost mt-7">
        Entregar otro proyecto
      </button>
    </div>
  );
}
