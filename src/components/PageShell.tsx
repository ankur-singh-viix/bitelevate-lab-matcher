import Link from "next/link";
import type { ReactNode } from "react";
import { Brand } from "./Brand";
import { MobileMenu, type NavItem } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";
import { focusRing } from "./ui";

const OFFICIAL = "https://www.cynbit.in/bitelevate";

const NAV: readonly NavItem[] = [
  { label: "How it works", href: "/#how" },
  { label: "The labs", href: "/#labs" },
  { label: "Take the quiz", href: "/quiz" },
  { label: "Official site", href: OFFICIAL, external: true },
];

/** Shared background, header and footer for content pages. */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip bg-ink text-fg">
      <div aria-hidden className="aurora" />

      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-5 sm:px-6">
        <Brand />
        <nav aria-label="Main" className="hidden items-center gap-1 sm:flex">
          {NAV.filter((item) => !item.external).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:text-fg ${focusRing}`}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={OFFICIAL}
            target="_blank"
            rel="noopener noreferrer"
            className={`ml-2 rounded-xl border border-edge px-4 py-2 text-sm font-medium text-fg transition hover:border-edge-strong hover:bg-wash ${focusRing}`}
          >
            Official site<span aria-hidden> ↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <MobileMenu items={NAV} />
        </div>
      </header>

      <div className="relative flex-1">{children}</div>

      <footer className="relative border-t border-line">
        <p className="mx-auto max-w-6xl px-4 py-8 text-sm text-subtle sm:px-6">
          Prototype for the Cynbit Full Stack Intern task. Not an official
          Cynbit product.
        </p>
      </footer>
    </div>
  );
}
