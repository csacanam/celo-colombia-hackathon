"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import {
  ArrowRight,
  Check,
  Copy,
  Loader2,
  MessageCircle,
  X,
} from "lucide-react";
import {
  AI_TOOLS_EXP,
  APPLY_STEPS,
  BLOCKCHAIN_EXP,
  MODALITIES,
  MOTIVATIONS,
  PROGRAMMING_EXP,
  WHATSAPP_URL,
} from "@/lib/site";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

type Status = "idle" | "loading" | "success" | "error";

const INITIAL = {
  firstName: "",
  lastName: "",
  email: "",
  whatsapp: "",
  city: "",
  programmingExp: "",
  aiToolsExp: "",
  blockchainExp: "",
  motivation: "",
  modality: "",
};

export function ApplyForm() {
  const [form, setForm] = useState(INITIAL);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState(WHATSAPP_URL);
  const [modalOpen, setModalOpen] = useState(false);

  const update = (key: keyof typeof INITIAL, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  // Bloquea el scroll del body mientras el modal está abierto.
  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Las preguntas de selección no las cubre el `required` del HTML.
    if (
      !form.programmingExp ||
      !form.aiToolsExp ||
      !form.blockchainExp ||
      !form.motivation ||
      !form.modality
    ) {
      setStatus("error");
      setError("Responde todas las preguntas marcadas con *.");
      return;
    }

    setStatus("loading");
    setError("");
    setModalOpen(true); // el modal aparece de inmediato con el estado de carga

    try {
      // El campo solo guarda el número local; anteponemos el indicativo.
      const payload = {
        ...form,
        whatsapp: `+57 ${form.whatsapp.trim()}`,
      };

      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "No pudimos guardar tu registro.");
      }

      setWhatsappUrl(data.whatsappUrl ?? WHATSAPP_URL);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setModalOpen(false);
      setError(
        err instanceof Error
          ? err.message
          : "Algo salió mal. Intenta de nuevo."
      );
    }
  }

  const registered = status === "success";

  return (
    <section id="aplicar" className="relative overflow-hidden py-24 sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[760px] -translate-x-1/2 rounded-full bg-accent/[0.07] blur-[150px]" />

      <div className="section relative">
        <SectionHeading
          eyebrow="Aplicar"
          title={
            <>
              Aplica a la Hackathon de{" "}
              <span className="gradient-text">Agentes Onchain.</span>
            </>
          }
          description="Cupos limitados para builders presenciales en Cali. Al enviar, te llevamos directo al grupo de WhatsApp donde arranca todo."
        />

        <Reveal delay={0.1} blur>
          <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-3xl border border-hairline bg-white/[0.015]">
            <div className="grid md:grid-cols-[0.82fr_1.18fr]">
              {/* Side panel */}
              <aside className="relative hidden flex-col justify-between gap-8 border-r border-hairline bg-gradient-to-b from-white/[0.03] to-transparent p-8 md:flex">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                    Cómo funciona
                  </span>
                  <div className="mt-6 flex flex-col gap-6">
                    {APPLY_STEPS.map((s) => (
                      <div key={s.n} className="flex gap-3.5">
                        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-hairline font-mono text-[11px] text-accent">
                          {s.n}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-white">
                            {s.t}
                          </p>
                          <p className="mt-0.5 text-xs leading-relaxed text-muted">
                            {s.d}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2.5 rounded-xl border border-hairline bg-white/[0.02] px-4 py-3">
                  <MessageCircle size={16} className="text-accent" />
                  <span className="text-xs text-muted">
                    Al registrarte entras al grupo de WhatsApp
                  </span>
                </div>
              </aside>

              {/* Form / registered */}
              <div className="relative min-h-[560px] p-6 sm:p-8">
                {registered ? (
                  <RegisteredPanel
                    whatsappUrl={whatsappUrl}
                    onReopen={() => setModalOpen(true)}
                  />
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4"
                    noValidate
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field
                        label="Nombre"
                        value={form.firstName}
                        onChange={(v) => update("firstName", v)}
                        placeholder="Tu nombre"
                        required
                      />
                      <Field
                        label="Apellido"
                        value={form.lastName}
                        onChange={(v) => update("lastName", v)}
                        placeholder="Tu apellido"
                        required
                      />
                    </div>

                    <Field
                      label="Email"
                      type="email"
                      value={form.email}
                      onChange={(v) => update("email", v)}
                      placeholder="tu@email.com"
                      required
                    />

                    <div className="grid gap-4 sm:grid-cols-2">
                      <PhoneField
                        value={form.whatsapp}
                        onChange={(v) => update("whatsapp", v)}
                      />
                      <Field
                        label="Ciudad"
                        value={form.city}
                        onChange={(v) => update("city", v)}
                        placeholder="Cali, Bogotá…"
                        required
                      />
                    </div>

                    <GroupLabel>Nivel técnico</GroupLabel>
                    <Segmented
                      label="¿Cuál es tu experiencia programando?"
                      required
                      options={PROGRAMMING_EXP}
                      value={form.programmingExp}
                      onChange={(v) => update("programmingExp", v)}
                    />
                    <Segmented
                      label="¿Has usado herramientas de IA para programar?"
                      required
                      options={AI_TOOLS_EXP}
                      value={form.aiToolsExp}
                      onChange={(v) => update("aiToolsExp", v)}
                    />
                    <Segmented
                      label="¿Qué tanto conoces sobre blockchain?"
                      required
                      options={BLOCKCHAIN_EXP}
                      value={form.blockchainExp}
                      onChange={(v) => update("blockchainExp", v)}
                    />

                    <GroupLabel>Motivación</GroupLabel>
                    <Segmented
                      label="¿Qué te llama más la atención de esta hackathon?"
                      required
                      options={MOTIVATIONS}
                      value={form.motivation}
                      onChange={(v) => update("motivation", v)}
                    />
                    <Segmented
                      label="¿Cómo planeas participar?"
                      required
                      options={MODALITIES}
                      value={form.modality}
                      onChange={(v) => update("modality", v)}
                    />

                    {status === "error" && (
                      <p className="rounded-lg border border-red-500/25 bg-red-500/10 px-3.5 py-2.5 text-xs text-red-300">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="btn-primary mt-1 w-full disabled:opacity-60"
                    >
                      Asegurar mi cupo
                      <ArrowRight size={17} />
                    </button>
                    <p className="text-center text-[11px] leading-relaxed text-white/35">
                      Al enviar aceptas recibir información de la hackathon por
                      WhatsApp y email.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Modal: carga + paso de unirse al grupo */}
      <JoinModal
        open={modalOpen}
        status={status}
        whatsappUrl={whatsappUrl}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
}

/* ---------- Field ---------- */

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
        {label}
        {required && <span className="text-accent"> *</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="rounded-lg border border-hairline bg-surface px-3.5 py-2.5 text-sm text-white placeholder:text-white/25 outline-none transition-all duration-200 focus:border-accent/45 focus:ring-2 focus:ring-accent/15"
      />
    </label>
  );
}

/* ---------- WhatsApp field (indicativo +57 fijo) ---------- */

function PhoneField({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
        WhatsApp<span className="text-accent"> *</span>
      </span>
      <div className="flex items-stretch overflow-hidden rounded-lg border border-hairline bg-surface transition-all duration-200 focus-within:border-accent/45 focus-within:ring-2 focus-within:ring-accent/15">
        <span className="flex select-none items-center gap-1.5 border-r border-hairline bg-white/[0.03] px-3 text-sm text-white/70">
          <span className="text-base leading-none">🇨🇴</span>
          +57
        </span>
        <input
          type="tel"
          inputMode="numeric"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="300 000 0000"
          required
          className="w-full bg-transparent px-3.5 py-2.5 text-sm text-white placeholder:text-white/25 outline-none"
        />
      </div>
    </label>
  );
}

/* ---------- Group label ---------- */

function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 pt-3">
      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
        {children}
      </span>
      <span className="h-px flex-1 bg-hairline" />
    </div>
  );
}

/* ---------- Segmented selector ---------- */

function Segmented({
  label,
  options,
  value,
  onChange,
  required,
}: {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
        {label}
        {required && <span className="text-accent"> *</span>}
      </span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = value === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className={`relative rounded-lg border px-3.5 py-2 text-xs font-medium transition-all duration-200 ${
                active
                  ? "border-accent/50 bg-accent/10 text-accent"
                  : "border-hairline bg-white/[0.015] text-muted hover:border-white/20 hover:text-white"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Botón copiar link ---------- */

function CopyLink({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // Algunos navegadores bloquean el portapapeles; se ignora en silencio.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="flex w-full items-center justify-center gap-2 rounded-lg border border-hairline bg-white/[0.02] px-4 py-2.5 text-xs font-medium transition-colors hover:border-white/20"
    >
      {copied ? (
        <>
          <Check size={14} className="text-accent" />
          <span className="text-white">Link copiado</span>
        </>
      ) : (
        <>
          <Copy size={14} className="text-muted" />
          <span className="text-muted">Copiar link del grupo</span>
        </>
      )}
    </button>
  );
}

/* ---------- Modal: carga + unirse al grupo ---------- */

function JoinModal({
  open,
  status,
  whatsappUrl,
  onClose,
}: {
  open: boolean;
  status: Status;
  whatsappUrl: string;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={status === "success" ? onClose : undefined}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/85 p-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[92vh] w-full max-w-md overflow-y-auto rounded-3xl border border-hairline bg-surface p-7 shadow-[0_0_90px_-20px_rgba(252,255,82,0.35)] sm:p-8"
          >
            {status === "success" ? (
              <JoinStep whatsappUrl={whatsappUrl} onClose={onClose} />
            ) : (
              <LoadingPanel />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function LoadingPanel() {
  return (
    <div className="flex flex-col items-center gap-5 py-8 text-center">
      <div className="relative grid h-20 w-20 place-items-center">
        <motion.span
          className="absolute inset-0 rounded-full border border-accent/20"
          animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />
        <Loader2 size={34} className="animate-spin text-accent" />
      </div>
      <div>
        <p className="text-lg font-semibold text-white">
          Guardando tu registro…
        </p>
        <p className="mt-1 text-sm text-muted">
          Un momento — no cierres esta ventana.
        </p>
      </div>
    </div>
  );
}

function JoinStep({
  whatsappUrl,
  onClose,
}: {
  whatsappUrl: string;
  onClose: () => void;
}) {
  return (
    <div>
      {/* Cerrar */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar"
        className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-lg text-white/40 transition-colors hover:bg-white/[0.05] hover:text-white"
      >
        <X size={16} />
      </button>

      {/* Confirmación */}
      <div className="flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 16 }}
          className="grid h-14 w-14 place-items-center rounded-full bg-accent text-ink"
        >
          <Check size={28} strokeWidth={3} />
        </motion.div>
        <span className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
          Registro guardado
        </span>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">
          Falta 1 paso: únete al grupo
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Ahí enviamos las fechas, los recursos y los retos. Tu cupo se
          confirma cuando entras al grupo de WhatsApp.
        </p>
      </div>

      {/* Acción para celular */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary mt-6 w-full"
      >
        <MessageCircle size={17} />
        Entrar al grupo de WhatsApp
      </a>
      <p className="mt-2 text-center text-[11px] text-white/40">
        Si estás en tu celular, toca el botón.
      </p>

      {/* Separador */}
      <div className="my-5 flex items-center gap-3">
        <span className="h-px flex-1 bg-hairline" />
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
          o escanea con tu celular
        </span>
        <span className="h-px flex-1 bg-hairline" />
      </div>

      {/* QR para computador */}
      <div className="flex flex-col items-center">
        <div className="rounded-2xl bg-white p-3">
          <QRCodeSVG
            value={whatsappUrl}
            size={148}
            bgColor="#ffffff"
            fgColor="#050505"
            level="M"
          />
        </div>
        <p className="mt-3 max-w-[15rem] text-center text-[11px] leading-relaxed text-white/40">
          ¿Estás en el computador? Apunta la cámara de tu teléfono al código
          para abrir el grupo.
        </p>
      </div>

      <div className="mt-5">
        <CopyLink url={whatsappUrl} />
      </div>
    </div>
  );
}

/* ---------- Panel de "ya registrado" (queda bajo el modal) ---------- */

function RegisteredPanel({
  whatsappUrl,
  onReopen,
}: {
  whatsappUrl: string;
  onReopen: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex min-h-[500px] flex-col items-center justify-center gap-5 text-center"
    >
      <div className="grid h-16 w-16 place-items-center rounded-full bg-accent text-ink">
        <Check size={32} strokeWidth={3} />
      </div>
      <div>
        <h3 className="text-xl font-semibold text-white">
          Quedaste registrado 🎉
        </h3>
        <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted">
          Solo falta un paso: entra al grupo de WhatsApp para confirmar tu
          cupo.
        </p>
      </div>
      <div className="flex w-full max-w-xs flex-col items-center gap-2.5">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary w-full"
        >
          <MessageCircle size={16} />
          Entrar al grupo de WhatsApp
        </a>
        <CopyLink url={whatsappUrl} />
        <button
          type="button"
          onClick={onReopen}
          className="mt-1 text-xs font-medium text-muted transition-colors hover:text-white"
        >
          Ver el código QR
        </button>
      </div>
    </motion.div>
  );
}
