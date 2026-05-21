import { Logo } from "./Logo";
import { NAV_LINKS } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="section flex flex-col items-center justify-between gap-6 py-12 sm:flex-row">
        <Logo />

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/30">
          © {new Date().getFullYear()} Celo Colombia
        </p>
      </div>
    </footer>
  );
}
