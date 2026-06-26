import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { PagosBoard } from "@/components/PagosBoard";

export const metadata: Metadata = {
  title: "Pagos · Ganadores y COPm · Hackathon de Agentes Onchain",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function PagosPage({
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
      <PagosBoard token={token ?? null} />
    </main>
  );
}
