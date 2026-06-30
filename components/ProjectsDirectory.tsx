"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  Award,
  Download,
  FileCode2,
  Fuel,
  Github,
  Loader2,
  Users,
  Youtube,
} from "lucide-react";

type Metrics = {
  transactions: number;
  users: number;
  feesCelo: string;
  capped: boolean;
};

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
  metrics: Metrics | null;
};
type State = "loading" | "ready" | "error";

const EXPLORERS: Record<string, string> = {
  "Celo Mainnet": "https://celo.blockscout.com",
  "Celo Sepolia": "https://celo-sepolia.blockscout.com",
};

type CsvMode = "github" | "full";

function downloadCsv(projects: Project[], mode: CsvMode) {
  const esc = (s: string) => `"${(s ?? "").replace(/"/g, '""')}"`;
  let headers: string[];
  let rows: string[][];
  if (mode === "github") {
    headers = ["Project", "GitHub"];
    rows = projects.map((p) => [p.name, p.githubUrl]);
  } else {
    headers = [
      "Project",
      "One-liner",
      "Members",
      "GitHub",
      "Demo video",
      "Mini App",
      "Proof of Ship",
      "Contract",
      "Network",
      "Transactions",
      "Unique users",
      "Gas (CELO)",
    ];
    rows = projects.map((p) => [
      p.name,
      p.oneLiner,
      p.members.join(" / "),
      p.githubUrl,
      p.youtubeUrl,
      p.miniAppUrl,
      p.proofOfShipUrl,
      p.contractAddress,
      p.contractNetwork,
      p.metrics ? String(p.metrics.transactions) : "",
      p.metrics ? String(p.metrics.users) : "",
      p.metrics ? p.metrics.feesCelo : "",
    ]);
  }
  const csv =
    "﻿" +
    [headers.join(","), ...rows.map((r) => r.map(esc).join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = mode === "github" ? "hackathon-githubs.csv" : "hackathon-projects.csv";
  a.click();
  URL.revokeObjectURL(url);
}

export function ProjectsDirectory() {
  const [state, setState] = useState<State>("loading");
  const [projects, setProjects] = useState<Project[]>([]);
  const [csvMode, setCsvMode] = useState<CsvMode>("full");

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
          The {projects.length} projects built during the hackathon — with their
          GitHub repos, demo videos and live Mini Apps. Ranked by onchain
          transactions.
        </p>

        {/* Export */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div className="inline-flex rounded-full border border-hairline bg-surface p-1">
            {(
              [
                ["github", "GitHub only"],
                ["full", "All data"],
              ] as [CsvMode, string][]
            ).map(([mode, label]) => (
              <button
                key={mode}
                type="button"
                onClick={() => setCsvMode(mode)}
                className={`rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] transition ${
                  csvMode === mode
                    ? "bg-accent/[0.12] text-accent"
                    : "text-muted hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => downloadCsv(projects, csvMode)}
            className="btn-primary"
          >
            <Download size={16} />
            Download CSV
          </button>
        </div>

        <div className="mt-10 grid gap-4">
          {projects.map((p, i) => {
            const explorer = EXPLORERS[p.contractNetwork];
            return (
              <div
                key={p.id}
                className="rounded-2xl border border-hairline bg-white/[0.015] p-5 sm:p-6"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg font-semibold tracking-tight text-white">
                    <span className="mr-2 font-mono text-sm text-white/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
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

                {p.metrics && <OnchainMetrics m={p.metrics} />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function OnchainMetrics({ m }: { m: Metrics }) {
  const fmt = (n: number) => n.toLocaleString("en-US");
  return (
    <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 rounded-xl border border-hairline bg-surface/60 px-4 py-3">
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
