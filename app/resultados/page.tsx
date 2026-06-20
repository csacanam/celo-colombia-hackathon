import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { ResultsBoard } from "@/components/ResultsBoard";

export const metadata: Metadata = {
  title: "Resultados · Demo Day · Hackathon de Agentes Onchain",
  description:
    "Resultados del Demo Day: ranking, desglose por criterio y feedback del jurado.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function ResultadosPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  return (
    <main className="min-h-screen">
      <header className="border-b border-hairline">
        <div className="section flex h-16 items-center">
          <Link href="/" aria-label="Inicio">
            <Logo />
          </Link>
        </div>
      </header>
      <ResultsBoard token={token ?? null} />
    </main>
  );
}
