// Shared class strings so every button and focus ring looks the same.

export const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-teal";

// Shape, motion and focus only. Size is added by each variant so classes never conflict.
const shell = `inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition duration-150 active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100 disabled:cursor-not-allowed disabled:opacity-50 ${focusRing}`;

const medium = "px-6 py-3 text-sm";
const large = "px-8 py-4 text-base";
const small = "px-4 py-2 text-sm";

const primaryColors = "bg-brand text-on-brand hover:bg-brand-hover";
const secondaryColors =
  "border border-edge text-fg hover:border-edge-strong hover:bg-wash";
const tealColors =
  "border border-accent-teal/40 text-accent-teal hover:border-accent-teal hover:bg-accent-teal/10";

export const buttonPrimary = `${shell} ${medium} ${primaryColors}`;
export const buttonPrimaryLarge = `${shell} ${large} ${primaryColors} shadow-lg shadow-shade`;
export const buttonSecondary = `${shell} ${medium} ${secondaryColors}`;
export const buttonSecondarySmall = `${shell} ${small} ${secondaryColors}`;
export const buttonTealSmall = `${shell} ${small} ${tealColors}`;

/** Standard card surface. */
export const card = "rounded-2xl border border-line bg-surface";
