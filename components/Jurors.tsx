"use client";

import { useState } from "react";
import Image from "next/image";
import { Coins, Mic, ShieldCheck, Star, type LucideIcon } from "lucide-react";
import { JURY } from "@/lib/site";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

const ICONS: Record<string, LucideIcon> = { Coins, Mic, ShieldCheck };

type Juror = (typeof JURY)[number];

function JurorAvatar({ juror }: { juror: Juror }) {
  const [photoFailed, setPhotoFailed] = useState(false);
  const showPhoto = Boolean(juror.photo) && !photoFailed;

  return (
    <span className="relative h-24 w-24 shrink-0">
      {showPhoto ? (
        <Image
          src={juror.photo}
          alt={juror.name}
          width={96}
          height={96}
          onError={() => setPhotoFailed(true)}
          className="h-24 w-24 rounded-2xl object-cover ring-1 ring-white/10"
        />
      ) : (
        <span className="grid h-24 w-24 place-items-center rounded-2xl bg-gradient-to-br from-white/[0.1] to-white/[0.02] text-2xl font-semibold text-white ring-1 ring-white/10">
          {juror.initials}
        </span>
      )}
      <span className="absolute -bottom-2 -right-2 grid h-7 w-7 place-items-center rounded-lg bg-accent text-ink">
        <Star size={14} strokeWidth={2.4} fill="currentColor" />
      </span>
    </span>
  );
}

function JurorCard({ juror }: { juror: Juror }) {
  return (
    <div className="glass w-full rounded-3xl p-7 sm:p-9">
      <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:gap-6 sm:text-left">
        <JurorAvatar juror={juror} />

        <div className="flex flex-col items-center sm:items-start">
          <h3 className="text-xl font-semibold tracking-tight text-white">
            {juror.name}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">
            {juror.roleText}
            {juror.roleLinks.map((link, i) => (
              <span key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-accent transition-opacity hover:opacity-80"
                >
                  {link.label}
                </a>
                {i < juror.roleLinks.length - 1 ? " y " : ""}
              </span>
            ))}
          </p>
        </div>
      </div>

      <div className="my-6 h-px bg-hairline" />
      <ul className="flex flex-col gap-3">
        {juror.achievements.map((item) => {
          const Icon = ICONS[item.icon] ?? ShieldCheck;
          return (
            <li key={item.linkText} className="flex items-start gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent/15 text-accent">
                <Icon size={15} strokeWidth={2.2} />
              </span>
              <span className="pt-1.5 text-sm leading-snug text-white/80">
                {item.pre}
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-accent transition-opacity hover:opacity-80"
                  >
                    {item.linkText}
                  </a>
                ) : (
                  <span className="font-medium text-white">{item.linkText}</span>
                )}
                {item.post}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function Jurors() {
  return (
    <section id="jurado" className="section py-24 sm:py-28">
      <SectionHeading
        eyebrow="Jurado"
        title={
          <>
            Quienes van a evaluar lo que{" "}
            <span className="gradient-text">construyas.</span>
          </>
        }
        description="Builders del ecosistema que también han construido onchain."
      />

      <Reveal delay={0.1} blur>
        <div className="mx-auto mt-12 grid max-w-2xl gap-6">
          {JURY.map((juror) => (
            <JurorCard key={juror.name} juror={juror} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
