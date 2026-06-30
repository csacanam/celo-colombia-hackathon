"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  Award,
  FileCode2,
  Fuel,
  Github,
  Loader2,
  Users,
  Youtube,
} from "lucide-react";

type Project = {
  id: string;
  name: string;
  oneLiner: string;
  members: string[];
  githubUrl: string;
  miniAppUrl: string;
  youtubeUrl: string;
  proofOfShipUrl: string;
  contractAddress: string;
  contractNetwork: string;
};
type State = "loading" | "ready" | "error";

const EXPLORERS: Record<string, string> = {
  "Celo Mainnet": "https://celo.blockscout.com",
  "Celo Sepolia": "https://celo-sepolia.blockscout.com",
};

export function ProjectsDirectory() {
  const [state, setState] = useState<State>("loading");
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/projects", { cache: "no-store" });
        const json = await res.json();
        if (cancelled) return;
        if (!json.ok) return setState("error");
        setProjects(json.projects ?? []);
        setState("ready");
      } catch {
        if (!cancelled) setState("error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (state === "loading")
    return (
      <Centered>
        <Loader2 className="animate-spin text-accent" size={28} />
        <p className="mt-4 text-sm text-muted">Loading…</p>
      </Centered>
    );

  if (state === "error")
    return (
      <Centered>
        <h1 className="text-2xl font-semibold text-white">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted">Please reload the page.</p>
      </Centered>
    );

  return (
    <div className="section py-16 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <span className="eyebrow">Onchain Agents Hackathon · Celo Colombia</span>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          Projects <span className="gradient-text">directory</span>
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/50">
          The {projects.length} projects built during the hackathon, with their
          GitHub repos, demo videos and live Mini Apps.
        </p>

        <div className="mt-10 grid gap-4">
          {projects.map((p) => {
            const explorer = EXPLORERS[p.contractNetwork];
            return (
              <div
                key={p.id}
                className="rounded-2xl border border-hairline bg-white/[0.015] p-5 sm:p-6"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg font-semibold tracking-tight text-white">
                    {p.name}
                  </h3>
                  {p.members.length > 0 && (
                    <span className="text-xs text-white/40">
                      {p.members.join(", ")}
                    </span>
                  )}
                </div>
                {p.oneLiner && (
                  <p className="mt-1 text-sm leading-relaxed text-white/55">
                    {p.oneLiner}
                  </p>
                )}
                <div className="mt-4 flex flex-wrap gap-2">
                  <Pill href={p.githubUrl} label="GitHub">
                    <Github size={13} />
                  </Pill>
                  <Pill href={p.youtubeUrl} label="Demo video">
                    <Youtube size={13} />
                  </Pill>
                  <Pill href={p.miniAppUrl} label="Mini App">
                    <ArrowUpRight size={13} />
                  </Pill>
                  <Pill href={p.proofOfShipUrl} label="Proof of Ship">
                    <Award size={13} />
                  </Pill>
                  {explorer && p.contractAddress && (
                    <Pill
                      href={`${explorer}/address/${p.contractAddress}`}
                      label={`Contract · ${p.contractNetwork.replace("Celo ", "")}`}
                    >
                      <FileCode2 size={13} />
                    </Pill>
                  )}
                </div>

                {p.contractAddress && (
                  <OnchainMetrics
                    network={p.contractNetwork}
                    address={p.contractAddress}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

type Metrics = {
  transactions: number;
  users: number;
  feesCelo: string;
  capped: boolean;
};

function OnchainMetrics({
  network,
  address,
}: {
  network: string;
  address: string;
}) {
  const [m, setM] = useState<Metrics | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const params = new URLSearchParams({ network, address });
        const res = await fetch(`/api/onchain?${params.toString()}`, {
          cache: "no-store",
        });
        const json = await res.json();
        if (cancelled) return;
        if (json.ok) setM(json.metrics);
        else setFailed(true);
      } catch {
        if (!cancelled) setFailed(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [network, address]);

  if (failed) return null;

  const fmt = (n: number) => n.toLocaleString("en-US");

  return (
    <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 rounded-xl border border-hairline bg-surface/60 px-4 py-3">
      {!m ? (
        <span className="flex items-center gap-2 text-xs text-muted">
          <Loader2 size={12} className="animate-spin" />
          Reading onchain activity…
        </span>
      ) : (
        <>
          <Metric icon={<Activity size={13} />} label="Transactions">
            {fmt(m.transactions)}
            {m.capped ? "+" : ""}
          </Metric>
          <Metric icon={<Users size={13} />} label="Users">
            {fmt(m.users)}
            {m.capped ? "+" : ""}
          </Metric>
          <Metric icon={<Fuel size={13} />} label="Gas (CELO)">
            {Number(m.feesCelo).toLocaleString("en-US", {
              maximumFractionDigits: 4,
            })}
          </Metric>
        </>
      )}
    </div>
  );
}

function Metric({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-accent">{icon}</span>
      <span className="font-mono text-sm text-white">{children}</span>
      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
        {label}
      </span>
    </div>
  );
}

function Pill({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-surface px-3 py-1.5 text-xs text-white/70 transition hover:border-accent/40 hover:text-accent"
    >
      {children}
      {label}
    </a>
  );
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="section flex min-h-[70vh] flex-col items-center justify-center text-center">
      {children}
    </div>
  );
}
