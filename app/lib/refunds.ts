/**
 * The Refund Amount of a Purchase: always its Amount Paid. That covers every
 * Seat of a Team Purchase, any PPP Discount the Purchase got, and a List
 * Price that has changed since. It never depends on today's List Price or
 * PPP tiers.
 */
export function getRefundAmount(purchase: { amountPaid: number }): number {
  return purchase.amountPaid;
}
