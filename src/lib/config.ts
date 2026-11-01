import type { LabId } from "../data/labs";

/**
 * Official BitElevate enrollment link settings, kept in one place.
 *
 * NOTE: `lab` and `source` are query parameters this prototype appends. The
 * current Cynbit page is NOT known to read them. For the student's chosen lab
 * to be pre-selected in the form, Cynbit would need to read the `lab`
 * parameter and map it to the "Preferred Domain Lab" dropdown. Until then the
 * link simply opens the official page.
 */
export const ENROLLMENT = {
  baseUrl: "https://www.cynbit.in/bitelevate",
  labParam: "lab",
  sourceParam: "source",
  source: "lab-matcher",
} as const;

/** Builds https://www.cynbit.in/bitelevate?lab=<lab-id>&source=lab-matcher */
export function enrollmentUrl(labId: LabId): string {
  const url = new URL(ENROLLMENT.baseUrl);
  url.searchParams.set(ENROLLMENT.labParam, labId);
  url.searchParams.set(ENROLLMENT.sourceParam, ENROLLMENT.source);
  return url.toString();
}
