"use client";

import { ArrowUpRight, Globe, MapPin } from "lucide-react";
import { Reveal } from "./ui/Reveal";

const MAP_EMBED =
  "https://www.google.com/maps?q=Universidad+Icesi,+Cali,+Colombia&output=embed";
const MAP_DIRECTIONS =
  "https://www.google.com/maps/dir/?api=1&destination=Universidad+Icesi+Cali+Colombia";

export function Venue() {
  return (
    <section id="sede" className="section py-24 sm:py-28">
      <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        {/* Info */}
        <div>
          <Reveal>
            <span className="eyebrow">Sede</span>
          </Reveal>
          <Reveal delay={0.08} blur>
            <h2 className="mt-5 text-balance text-3xl font-semibold leading-[1.12] sm:text-4xl">
              Presencial en Cali.{" "}
              <span className="gradient-text">
                Virtual desde donde estés.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-4 text-base leading-relaxed text-muted">
              La parte presencial sucede en la Universidad Icesi, en Cali. Si
              estás en otra ciudad, participas en modalidad virtual — misma
              hackathon, mismos premios.
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="mt-7 flex flex-col gap-3">
              <div className="flex items-start gap-3 rounded-xl border border-hairline bg-white/[0.015] p-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent/15 text-accent">
                  <MapPin size={17} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">
                    Universidad Icesi
                  </p>
                  <p className="mt-0.5 text-sm text-muted">
                    Calle 18 #122-135, Pance · Cali, Colombia
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-hairline bg-white/[0.015] p-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent/15 text-accent">
                  <Globe size={17} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">
                    Modalidad virtual
                  </p>
                  <p className="mt-0.5 text-sm text-muted">
                    Para builders de toda Colombia, desde cualquier lugar.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.28}>
            <a
              href={MAP_DIRECTIONS}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost mt-6 inline-flex"
            >
              Cómo llegar
              <ArrowUpRight size={16} />
            </a>
          </Reveal>
        </div>

        {/* Mapa */}
        <Reveal delay={0.12} blur>
          <div className="relative overflow-hidden rounded-2xl border border-hairline">
            <div className="pointer-events-none absolute inset-0 z-10 rounded-2xl ring-1 ring-inset ring-white/[0.04]" />
            <iframe
              title="Mapa — Universidad Icesi, Cali"
              src={MAP_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[300px] w-full sm:h-[380px]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
