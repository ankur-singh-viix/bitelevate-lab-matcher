"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { focusRing } from "./ui";

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

/** Disclosure menu shown below the `sm` breakpoint. */
export function MobileMenu({ items }: { items: readonly NavItem[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const linkClass = `block rounded-lg px-4 py-3 text-base text-fg hover:bg-wash ${focusRing}`;

  return (
    <div className="sm:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex h-11 items-center gap-2 rounded-xl border border-edge px-4 text-sm font-medium text-fg ${focusRing}`}
      >
        {open ? "Close" : "Menu"}
      </button>
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="animate-fade-up absolute inset-x-4 top-full z-20 mt-2 rounded-2xl border border-line bg-surface p-2 shadow-xl shadow-shade"
        >
          <ul>
            {items.map((item) => (
              <li key={item.href}>
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    {item.label}
                    <span aria-hidden> ↗</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  <Link href={item.href} onClick={() => setOpen(false)} className={linkClass}>
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
