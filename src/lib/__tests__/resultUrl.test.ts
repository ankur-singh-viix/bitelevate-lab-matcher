import { describe, expect, it } from "vitest";
import { decodeAnswers, encodeAnswers } from "../resultUrl";
import type { Answers } from "../scoring";

const SAMPLE: Answers = {
  year: "final",
  skill: "comfortable",
  interest: "ai",
  goal: "portfolio",
  time: "2h+",
};

const paramsFor = (entries: Record<string, string>) =>
  new URLSearchParams(entries);

describe("result URL helpers", () => {
  it("round-trips answers, including special characters in option IDs", () => {
    expect(decodeAnswers(new URLSearchParams(encodeAnswers(SAMPLE)))).toEqual(SAMPLE);

    const dotted: Answers = { ...SAMPLE, time: "1.5-2h" };
    expect(decodeAnswers(new URLSearchParams(encodeAnswers(dotted)))).toEqual(dotted);
  });

  it("encodes all five parameters", () => {
    const params = new URLSearchParams(encodeAnswers(SAMPLE));
    expect([...params.keys()].sort()).toEqual(["goal", "interest", "skill", "time", "year"]);
  });

  it("returns null when a parameter is missing", () => {
    const params = new URLSearchParams(encodeAnswers(SAMPLE));
    params.delete("goal");
    expect(decodeAnswers(params)).toBeNull();
    expect(decodeAnswers(new URLSearchParams())).toBeNull();
  });

  it("returns null for invalid values", () => {
    const valid = Object.fromEntries(new URLSearchParams(encodeAnswers(SAMPLE)));
    const bad = ["", "FINAL", "unknown", "<script>", "__proto__", "final "];
    for (const key of Object.keys(valid)) {
      for (const value of bad) {
        expect(decodeAnswers(paramsFor({ ...valid, [key]: value }))).toBeNull();
      }
    }
  });

  it("rejects a valid ID used for the wrong question", () => {
    const valid = Object.fromEntries(new URLSearchParams(encodeAnswers(SAMPLE)));
    expect(decodeAnswers(paramsFor({ ...valid, year: "ai" }))).toBeNull();
  });

  it("ignores unrelated extra parameters", () => {
    const params = new URLSearchParams(encodeAnswers(SAMPLE));
    params.set("utm_source", "x");
    expect(decodeAnswers(params)).toEqual(SAMPLE);
  });
});
