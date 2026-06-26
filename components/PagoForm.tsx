"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, Wallet } from "lucide-react";

type Project = { id: string; name: string };
type Status = "idle" | "loading" | "success" | "error";

export function PagoForm() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectId, setProjectId] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/pago", { cache: "no-store" });
        const json = await res.json();
        if (json.ok) setProjects(json.projects ?? []);
      } catch {
        /* el form sigue usable; el envío valida igual */
      }
    })();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const data = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/pago", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          phone: data.get("phone"),
          wallet: data.get("wallet"),
          email: data.get("email"),
        }),
      });
      const json = await res.json();
      if (!json.ok) {
        setError(json.error ?? "No pudimos guardar tu billetera.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="mx-auto mt-10 max-w-xl rounded-3xl border border-hairline bg-white/[0.015] p-8 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-accent/15 text-accent">
          <CheckCircle2 size={24} strokeWidth={2.2} />
        </div>
        <h3 className="mt-5 text-xl font-semibold tracking-tight text-white">
          ¡Billetera registrada!
        </h3>
        <p className="mt-2 text-sm text-muted">
          Quedó guardada para coordinar tu pago. Si te equivocaste, vuelve a
          enviarla y la actualizamos.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setProjectId("");
          }}
          className="btn-ghost mt-7"
        >
          Registrar otra
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-10 flex max-w-xl flex-col gap-5 rounded-3xl border border-hairline bg-white/[0.015] p-7 sm:p-9"
    >
      <div>
        <Label>Tu proyecto *</Label>
        <select
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          required
          className="mt-2.5 w-full rounded-lg border border-hairline bg-surface px-3.5 py-2.5 text-sm text-white transition-all focus:border-accent/45 focus:outline-none focus:ring-2 focus:ring-accent/15"
        >
          <option value="" disabled>
            Selecciona tu proyecto
          </option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <Label>Teléfono / WhatsApp (el de la entrega) *</Label>
        <input
          name="phone"
          type="tel"
          required
          placeholder="300 000 0000"
          className="mt-2.5 w-full rounded-lg border border-hairline bg-surface px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 transition-all focus:border-accent/45 focus:outline-none focus:ring-2 focus:ring-accent/15"
        />
        <p className="mt-1.5 text-xs text-white/40">
          Lo usamos solo para confirmar que eres del equipo (debe coincidir con
          el WhatsApp con el que entregaron).
        </p>
      </div>

      <div>
        <Label>Email de contacto *</Label>
        <input
          name="email"
          type="email"
          required
          placeholder="equipo@correo.com"
          className="mt-2.5 w-full rounded-lg border border-hairline bg-surface px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 transition-all focus:border-accent/45 focus:outline-none focus:ring-2 focus:ring-accent/15"
        />
        <p className="mt-1.5 text-xs text-white/40">
          Para coordinar el pago y avisarte cualquier novedad.
        </p>
      </div>

      <div>
        <Label>Dirección de billetera (0x…) *</Label>
        <input
          name="wallet"
          type="text"
          required
          placeholder="0x..."
          className="mt-2.5 w-full rounded-lg border border-hairline bg-surface px-3.5 py-2.5 font-mono text-sm text-white placeholder:text-white/30 transition-all focus:border-accent/45 focus:outline-none focus:ring-2 focus:ring-accent/15"
        />
        <p className="mt-1.5 text-xs text-white/40">
          Dirección EVM que recibe en la red Celo. Verifícala bien: los pagos no
          se pueden revertir.
        </p>
      </div>

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
          <>
            <Loader2 size={15} className="animate-spin" />
            Guardando…
          </>
        ) : (
          <>
            <Wallet size={16} />
            Registrar billetera
          </>
        )}
      </button>
    </form>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
      {children}
    </label>
  );
}
