import { describe, it, expect } from "vitest";
import { getRefundAmount, getRefundEligibility } from "./refunds";

describe("getRefundAmount", () => {
  it("quotes the original Amount Paid after the List Price was raised", () => {
    // Bought at 4900; the Course's List Price is now higher. The current
    // List Price is not an input, so it cannot leak into the Refund Amount.
    expect(getRefundAmount({ amountPaid: 4900 })).toBe(4900);
  });

  it("refunds every Seat of a Team Purchase with no Claimed Seat", () => {
    // 5 Seats at a seat price of 4900.
    expect(getRefundAmount({ amountPaid: 5 * 4900 })).toBe(24500);
  });

  it("quotes the Amount Paid of a PPP-discounted Purchase", () => {
    expect(getRefundAmount({ amountPaid: 1960 })).toBe(1960);
  });
});

// The course page shows the refund offer exactly when this returns eligible,
// and the refund action rejects exactly when it does not, so each rule is
// tested once here for both.
describe("getRefundEligibility", () => {
  // Bought at 23:00 on 1 March 2026, local time. The Refund Window's last
  // day is 15 March.
  const purchasedAt = new Date(2026, 2, 1, 23, 0).toISOString();

  const eligibleFacts = {
    purchasedAt,
    today: new Date(2026, 2, 2, 9, 0),
    completedLessonCount: 0,
    totalLessonCount: 10,
    secondsWatched: 0,
    hasClaimedSeat: false,
    hasOpenRefundRequest: false,
  };

  it("allows a Refund Request when every rule passes", () => {
    expect(getRefundEligibility(eligibleFacts)).toEqual({ eligible: true });
  });

  it("Refund Window: allows the whole last day, rejects the day after", () => {
    expect(
      getRefundEligibility({
        ...eligibleFacts,
        today: new Date(2026, 2, 15, 23, 59),
      })
    ).toEqual({ eligible: true });

    const result = getRefundEligibility({
      ...eligibleFacts,
      today: new Date(2026, 2, 16, 0, 1),
    });
    expect(result.eligible).toBe(false);
    expect(!result.eligible && result.reason).toMatch(/Refund Window/);
  });

  it("Watch Limit: allows just under 2 hours watched, rejects 2 hours", () => {
    expect(
      getRefundEligibility({ ...eligibleFacts, secondsWatched: 2 * 3600 - 1 })
    ).toEqual({ eligible: true });

    const result = getRefundEligibility({
      ...eligibleFacts,
      secondsWatched: 2 * 3600,
    });
    expect(result.eligible).toBe(false);
    expect(!result.eligible && result.reason).toMatch(/Watch Limit/);
  });

  it("Completion Limit: allows under 50% of Lessons completed, rejects 50%", () => {
    expect(
      getRefundEligibility({ ...eligibleFacts, completedLessonCount: 4 })
    ).toEqual({ eligible: true });

    const result = getRefundEligibility({
      ...eligibleFacts,
      completedLessonCount: 5,
    });
    expect(result.eligible).toBe(false);
    expect(!result.eligible && result.reason).toMatch(/Completion Limit/);
  });

  it("Completion Limit: a Course with no Lessons does not trip it", () => {
    expect(
      getRefundEligibility({
        ...eligibleFacts,
        completedLessonCount: 0,
        totalLessonCount: 0,
      })
    ).toEqual({ eligible: true });
  });

  it("Claimed Seat: rejects a Purchase with a Claimed Seat", () => {
    const result = getRefundEligibility({
      ...eligibleFacts,
      hasClaimedSeat: true,
    });
    expect(result.eligible).toBe(false);
    expect(!result.eligible && result.reason).toMatch(/Claimed Seat/);
  });

  it("open Refund Request: rejects a Purchase that already has one", () => {
    const result = getRefundEligibility({
      ...eligibleFacts,
      hasOpenRefundRequest: true,
    });
    expect(result.eligible).toBe(false);
    expect(!result.eligible && result.reason).toMatch(/open Refund Request/);
  });
});
