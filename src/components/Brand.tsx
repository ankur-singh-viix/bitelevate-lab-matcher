import Link from "next/link";
import { focusRing } from "./ui";

/** Original mark: a rounded tile with two stacked rising chevrons. */
export function BrandMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" fill="none" aria-hidden className={className}>
      <rect width="36" height="36" rx="9" className="fill-brand" />
      <path
        d="M10 16.5 18 9l8 7.5"
        className="stroke-on-brand"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 26.5 18 19l8 7.5"
        className="stroke-on-brand"
        strokeOpacity=".55"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Brand lockup: "BitElevate" is the headline, "Lab Matcher" the descriptor. */
export function Brand() {
  return (
    <Link
      href="/"
      aria-label="BitElevate Lab Matcher, home"
      className={`flex items-center gap-3 rounded-lg ${focusRing}`}
    >
      <BrandMark />
      <span className="flex flex-col leading-none">
        <span className="font-display text-2xl font-extrabold tracking-tight text-fg">
          Bit<span className="text-accent-violet">Elevate</span>
        </span>
        <span className="mt-1 text-[11px] font-medium tracking-[0.2em] text-subtle uppercase">
          Lab Matcher
        </span>
      </span>
    </Link>
  );
}
