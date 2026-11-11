/**
 * The Refund Amount of a Purchase: always its Amount Paid. That covers every
 * Seat of a Team Purchase, any PPP Discount the Purchase got, and a List
 * Price that has changed since. It never depends on today's List Price or
 * PPP tiers.
 */
export function getRefundAmount(purchase: { amountPaid: number }): number {
  return purchase.amountPaid;
}

export const REFUND_WINDOW_DAYS = 14;
export const WATCH_LIMIT_SECONDS = 2 * 60 * 60;
export const COMPLETION_LIMIT = 0.5;

// The Refund Window is counted in whole calendar days, not hours: a Purchase
// made at 23:00 still gets the whole of its fourteenth day.
function calendarDay(when: Date): string {
  const year = when.getFullYear();
  const month = String(when.getMonth() + 1).padStart(2, "0");
  const day = String(when.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** The last calendar day (YYYY-MM-DD) of a Purchase's Refund Window. */
export function getLastDayOfRefundWindow(purchasedAt: string): string {
  const deadline = new Date(purchasedAt);
  deadline.setDate(deadline.getDate() + REFUND_WINDOW_DAYS);
  return calendarDay(deadline);
}

export type RefundEligibilityFacts = {
  purchasedAt: string;
  today: Date;
  completedLessonCount: number;
  totalLessonCount: number;
  secondsWatched: number;
  hasClaimedSeat: boolean;
  hasOpenRefundRequest: boolean;
};

export type RefundEligibility =
  | { eligible: true }
  | { eligible: false; reason: string };

/**
 * Refund Eligibility: whether a Purchase may receive a Refund Request. The
 * course page shows the refund offer only when this is eligible, and the
 * refund action rejects the Refund Request whenever it is not.
 */
export function getRefundEligibility(
  facts: RefundEligibilityFacts
): RefundEligibility {
  if (facts.hasOpenRefundRequest) {
    return {
      eligible: false,
      reason: "You already have an open Refund Request for this Purchase.",
    };
  }

  if (facts.hasClaimedSeat) {
    return {
      eligible: false,
      reason:
        "A Claimed Seat belongs to its Team, so this Purchase cannot get a Refund Request.",
    };
  }

  const today = calendarDay(facts.today);
  const purchasedDay = calendarDay(new Date(facts.purchasedAt));
  if (
    today < purchasedDay ||
    today > getLastDayOfRefundWindow(facts.purchasedAt)
  ) {
    return {
      eligible: false,
      reason: `The ${REFUND_WINDOW_DAYS}-day Refund Window for this Purchase has closed.`,
    };
  }

  if (facts.secondsWatched >= WATCH_LIMIT_SECONDS) {
    return {
      eligible: false,
      reason: `You have watched ${WATCH_LIMIT_SECONDS / 3600} hours or more of this Course, which reaches the Watch Limit.`,
    };
  }

  if (
    facts.totalLessonCount > 0 &&
    facts.completedLessonCount / facts.totalLessonCount >= COMPLETION_LIMIT
  ) {
    return {
      eligible: false,
      reason: `You have completed ${COMPLETION_LIMIT * 100}% or more of this Course's Lessons, which reaches the Completion Limit.`,
    };
  }

  return { eligible: true };
}
