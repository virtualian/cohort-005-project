import { describe, it, expect } from "vitest";
import { isPassingScore } from "./quiz";

describe("isPassingScore", () => {
  it("passes a Score above a Passing Score lower than 70%", () => {
    // A hard-coded 70% pass mark would fail this Attempt.
    expect(isPassingScore(0.6, 0.5)).toBe(true);
  });

  it("fails a Score just below the Passing Score", () => {
    // A hard-coded 70% pass mark would pass this Attempt.
    expect(isPassingScore(0.75, 0.8)).toBe(false);
  });

  it("passes a Score exactly equal to the Passing Score", () => {
    // Built the way the app builds them: the Score is correct / total, and
    // the editor stores the Passing Score as percent / 100.
    expect(isPassingScore(7 / 10, 70 / 100)).toBe(true);
  });

  it("passes a Score just above the Passing Score", () => {
    expect(isPassingScore(0.81, 0.8)).toBe(true);
  });
});
