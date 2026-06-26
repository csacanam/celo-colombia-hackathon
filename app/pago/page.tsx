import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { PagoForm } from "@/components/PagoForm";

export const metadata: Metadata = {
  title: "Registra tu billetera · Pagos · Hackathon de Agentes Onchain",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function PagoPage() {
  return (
    <main className="min-h-screen">
      <header className="border-b border-hairline">
        <div className="section flex h-16 items-center">
          <Link href="/" aria-label="Inicio">
            <Logo />
          </Link>
        </div>
      </header>
      <section className="section py-16 sm:py-20">
        <div className="mx-auto max-w-xl text-center">
          <span className="eyebrow">Pagos · Demo Day</span>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Registra tu <span className="gradient-text">billetera</span>
          </h1>
          <p className="mt-3 text-base leading-relaxed text-white/50">
            Para coordinar los pagos (premios y bonus COPm), registra la
            dirección donde tu equipo quiere recibir. Selecciona tu proyecto y
            confirma con tu teléfono.
          </p>
        </div>
        <PagoForm />
      </section>
    </main>
  );
}
