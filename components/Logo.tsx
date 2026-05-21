export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <span className="relative grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent">
        {/* Abstract onchain node mark */}
        <svg
          width="17"
          height="17"
          viewBox="0 0 17 17"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="8.5" cy="8.5" r="2.4" fill="#050505" />
          <circle cx="2.6" cy="2.6" r="1.7" fill="#050505" />
          <circle cx="14.4" cy="2.6" r="1.7" fill="#050505" />
          <circle cx="2.6" cy="14.4" r="1.7" fill="#050505" />
          <circle cx="14.4" cy="14.4" r="1.7" fill="#050505" />
          <path
            d="M8.5 8.5 2.6 2.6M8.5 8.5l5.9-5.9M8.5 8.5l-5.9 5.9M8.5 8.5l5.9 5.9"
            stroke="#050505"
            strokeWidth="1.1"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[12.5px] font-semibold tracking-tight text-white">
          Hackathon de Agentes Onchain
        </span>
        <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
          powered by Celo Colombia
        </span>
      </span>
    </span>
  );
}
