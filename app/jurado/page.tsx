import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { JuryPortal } from "@/components/JuryPortal";

export const metadata: Metadata = {
  title: "Portal del jurado · Hackathon de Agentes Onchain",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function JuradoPage({
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
      <JuryPortal token={token ?? null} />
    </main>
  );
}
