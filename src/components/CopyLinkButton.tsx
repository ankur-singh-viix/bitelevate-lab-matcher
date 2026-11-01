"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "../lib/track";
import { buttonTealSmall } from "./ui";

type Status = "idle" | "copied" | "failed";

/** Last-resort copy for browsers or contexts where the Clipboard API fails. */
function legacyCopy(text: string): boolean {
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.select();
  try {
    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    document.body.removeChild(area);
  }
}

function Icon({ copied }: { copied: boolean }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden className="h-3.5 w-3.5">
      {copied ? (
        <path
          d="m4.5 10.5 3.5 3.5 7.5-8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <>
          <rect x="7" y="7" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.6" />
          <path d="M13 7V5.5A1.5 1.5 0 0 0 11.5 4h-6A1.5 1.5 0 0 0 4 5.5v6A1.5 1.5 0 0 0 5.5 13H7" stroke="currentColor" strokeWidth="1.6" />
        </>
      )}
    </svg>
  );
}

export function CopyLinkButton() {
  const [status, setStatus] = useState<Status>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    const url = window.location.href;
    let ok = false;
    try {
      await navigator.clipboard.writeText(url);
      ok = true;
    } catch {
      ok = legacyCopy(url);
    }

    setStatus(ok ? "copied" : "failed");
    if (ok) track("link_copied");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), 3000);
  }

  const copied = status === "copied";

  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={copy}
        className={`${buttonTealSmall} w-full sm:w-auto ${copied ? "bg-accent-teal/10 border-accent-teal!" : ""}`}
      >
        <Icon copied={copied} />
        {copied ? "Copied!" : "Copy result link"}
      </button>
      {/* Live region: announces the outcome to screen readers. */}
      <span role="status" className="mt-2 min-h-5 text-sm">
        {copied && <span className="sr-only">Link copied to your clipboard.</span>}
        {status === "failed" && (
          <span className="text-warn">
            Couldn&apos;t copy automatically. Copy the link from your address bar.
          </span>
        )}
      </span>
    </div>
  );
}
