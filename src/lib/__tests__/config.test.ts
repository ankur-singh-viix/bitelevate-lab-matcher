import { describe, expect, it } from "vitest";
import { enrollmentUrl } from "../config";

describe("enrollmentUrl", () => {
  it("builds the official URL with lab and source parameters", () => {
    expect(enrollmentUrl("python-backend")).toBe(
      "https://www.cynbit.in/bitelevate?lab=python-backend&source=lab-matcher",
    );
  });
});
