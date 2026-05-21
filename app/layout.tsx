import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-inter-tight",
  display: "swap",
});

/**
 * URL base del sitio (para metadataBase, canonical y og:image).
 * Orden de prioridad:
 *  1. NEXT_PUBLIC_SITE_URL  — dominio final (defínelo cuando lo tengas).
 *  2. VERCEL_PROJECT_PRODUCTION_URL — dominio estable de producción en Vercel.
 *  3. VERCEL_URL — URL del deploy actual en Vercel (previews).
 *  4. localhost — desarrollo.
 */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Hackathon de Agentes Onchain Colombia | Celo Colombia",
  description:
    "Aprende Vibe Coding, construye agentes y mini apps, y compite por premios en la Hackathon de Agentes Onchain de Celo Colombia.",
  keywords: [
    "Hackathon",
    "Agentes Onchain",
    "Vibe Coding",
    "Celo",
    "Colombia",
    "Mini Apps",
    "Stablecoins",
    "Blockchain",
    "Cali",
  ],
  authors: [{ name: "Celo Colombia" }],
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: SITE_URL,
    siteName: "Hackathon de Agentes Onchain",
    title: "Hackathon de Agentes Onchain Colombia | Celo Colombia",
    description:
      "Aprende Vibe Coding, construye agentes y mini apps, y compite por premios en la Hackathon de Agentes Onchain de Celo Colombia.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hackathon de Agentes Onchain Colombia | Celo Colombia",
    description:
      "Aprende Vibe Coding, construye agentes y mini apps, y compite por premios en la Hackathon de Agentes Onchain de Celo Colombia.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${interTight.variable}`}>
      <body>{children}</body>
    </html>
  );
}
