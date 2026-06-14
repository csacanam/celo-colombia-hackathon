"use client";

import { Calendar, Video } from "lucide-react";
import { OFFICE_HOURS } from "@/lib/site";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

export function OfficeHours() {
  return (
    <section
      id="office-hours"
      className="relative overflow-hidden py-24 sm:py-28"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-[700px] -translate-x-1/2 rounded-full bg-accent/[0.05] blur-[150px]" />

      <div className="section relative">
        <SectionHeading
          eyebrow="Office Hours · opcional"
          title={
            <>
              Sesiones diarias para{" "}
              <span className="gradient-text">
                ayuda extra durante la hackathon.
              </span>
            </>
          }
          description="Una hora cada día, lunes a viernes, por Google Meet. Vení a resolver dudas, debuggear con un mentor o pedir feedback sobre tu pitch."
        />

        <Reveal delay={0.12}>
          <ul className="mx-auto mt-12 flex max-w-3xl flex-col gap-3">
            {OFFICE_HOURS.map((s) => (
              <li
                key={s.url}
                className="flex flex-col items-start gap-4 rounded-2xl border border-hairline bg-white/[0.015] p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent">
                    <Calendar size={18} strokeWidth={2.2} />
                  </span>
                  <div>
                    <p className="text-base font-semibold tracking-tight text-white">
                      {s.day}
                    </p>
                    <p className="mt-0.5 text-sm text-muted">{s.time}</p>
                  </div>
                </div>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/[0.08] px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent/[0.15]"
                >
                  <Video size={14} />
                  Unirse en Meet
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
