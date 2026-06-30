import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { ProjectsDirectory } from "@/components/ProjectsDirectory";

export const metadata: Metadata = {
  title: "Projects · Onchain Agents Hackathon · Celo Colombia",
  description:
    "Directory of the projects built during the Onchain Agents Hackathon — GitHub repos, demo videos and live Mini Apps.",
  alternates: { canonical: "/projects" },
  openGraph: {
    type: "website",
    url: "/projects",
    siteName: "Onchain Agents Hackathon",
    title: "Projects · Onchain Agents Hackathon · Celo Colombia",
    description:
      "GitHub repos, demo videos and live Mini Apps from the hackathon.",
  },
};

export const dynamic = "force-dynamic";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen">
      <header className="border-b border-hairline">
        <div className="section flex h-16 items-center">
          <Link href="/" aria-label="Home">
            <Logo />
          </Link>
        </div>
      </header>
      <ProjectsDirectory />
    </main>
  );
}
