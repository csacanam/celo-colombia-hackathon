import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Slides — Hackathon de Agentes Onchain",
  robots: { index: false, follow: false },
};

export default function SlidesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
