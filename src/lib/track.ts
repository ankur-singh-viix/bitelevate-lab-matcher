export type EventName =
  | "quiz_started"
  | "quiz_completed"
  | "result_viewed"
  | "enroll_clicked"
  | "link_copied";

export type EventData = Record<string, string | number | boolean>;

/**
 * Analytics stub. Logs to the console in development only and sends nothing
 * anywhere. Swap the body for a real provider later without touching callers.
 */
export function track(eventName: EventName, data?: EventData): void {
  if (process.env.NODE_ENV !== "development") return;
  console.info(`[track] ${eventName}`, data ?? {});
}
