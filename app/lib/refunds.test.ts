import { describe, it, expect } from "vitest";
import { getRefundAmount } from "./refunds";

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
