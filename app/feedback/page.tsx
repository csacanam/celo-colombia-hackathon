import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { FeedbackBoard } from "@/components/FeedbackBoard";

export const metadata: Metadata = {
  title: "Feedback de los builders · Hackathon de Agentes Onchain",
  description:
    "Testimonios de los equipos que construyeron durante la Hackathon de Agentes Onchain · Celo Colombia. Español e inglés.",
  alternates: { canonical: "/feedback" },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "/feedback",
    siteName: "Hackathon de Agentes Onchain",
    title: "Feedback de los builders · Hackathon de Agentes Onchain",
    description:
      "Testimonios reales de los equipos. Disponible en español e inglés.",
  },
};

export const dynamic = "force-dynamic";

export default function FeedbackPage() {
  return (
    <main className="min-h-screen">
      <header className="border-b border-hairline">
        <div className="section flex h-16 items-center">
          <Link href="/" aria-label="Inicio">
            <Logo />
          </Link>
        </div>
      </header>
      <FeedbackBoard />
    </main>
  );
}
