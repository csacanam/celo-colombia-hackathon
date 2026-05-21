"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, Trophy, type LucideIcon } from "lucide-react";
import { MENTOR } from "@/lib/site";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

const ICONS: Record<string, LucideIcon> = { Trophy, Star };

/** Foto del mentor con fallback a iniciales si el archivo no existe. */
function MentorAvatar() {
  const [photoFailed, setPhotoFailed] = useState(false);
  const showPhoto = Boolean(MENTOR.photo) && !photoFailed;

  return (
    <span className="relative h-24 w-24 shrink-0">
      {showPhoto ? (
        <Image
          src={MENTOR.photo}
          alt={MENTOR.name}
          width={96}
          height={96}
          onError={() => setPhotoFailed(true)}
          className="h-24 w-24 rounded-2xl object-cover ring-1 ring-white/10"
        />
      ) : (
        <span className="grid h-24 w-24 place-items-center rounded-2xl bg-gradient-to-br from-white/[0.1] to-white/[0.02] text-2xl font-semibold text-white ring-1 ring-white/10">
          {MENTOR.initials}
        </span>
      )}
      <span className="absolute -bottom-2 -right-2 grid h-7 w-7 place-items-center rounded-lg bg-accent text-ink">
        <Star size={14} strokeWidth={2.4} fill="currentColor" />
      </span>
    </span>
  );
}

export function Mentors() {
  return (
    <section id="mentores" className="section py-24 sm:py-28">
      <SectionHeading
        eyebrow="Mentor"
        title={
          <>
            Aprende de quien ya está{" "}
            <span className="gradient-text">construyendo onchain.</span>
          </>
        }
        description="Acompañamiento directo durante el bootcamp y toda la hackathon."
      />

      <Reveal delay={0.1} blur>
        <div className="glass mx-auto mt-12 max-w-2xl rounded-3xl p-7 sm:p-9">
          {/* Identidad */}
          <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:gap-6 sm:text-left">
            <MentorAvatar />

            <div className="flex flex-col items-center sm:items-start">
              <h3 className="text-xl font-semibold tracking-tight text-white">
                {MENTOR.name}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                Fundador de{" "}
                <a
                  href={MENTOR.links.peewah}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-accent transition-opacity hover:opacity-80"
                >
                  Peewah
                </a>{" "}
                · Embajador de{" "}
                <a
                  href={MENTOR.links.celoColombia}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-accent transition-opacity hover:opacity-80"
                >
                  Celo Colombia
                </a>
              </p>
            </div>
          </div>

          {/* Logros */}
          <div className="my-6 h-px bg-hairline" />
          <ul className="flex flex-col gap-3">
            {MENTOR.achievements.map((item) => {
              const Icon = ICONS[item.icon] ?? Trophy;
              return (
                <li key={item.linkText} className="flex items-start gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent/15 text-accent">
                    <Icon size={15} strokeWidth={2.2} />
                  </span>
                  <span className="pt-1.5 text-sm leading-snug text-white/80">
                    {item.pre}
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-accent transition-opacity hover:opacity-80"
                    >
                      {item.linkText}
                    </a>
                    {item.post}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
