# Test seams

The repo has no database test setup (as of `virtualian/cohort-005-project@b683a45`). Tests go only at seams the owner approves.

- 2026-11-11 (earlier, #4 / PR #11): owner chose a pure function in `app/lib/` with tests beside it.
- 2026-11-11: owner approved the triage-proposed seams:
  - #3 — `getRefundAmount(purchase)` in `app/lib/refunds.ts`.
  - #6 — refund-eligibility pure function in `app/lib/refunds.ts` returning `{ eligible: true } | { eligible: false, reason }`.
  - #5 — `shouldRecordCourseCompletion(...)` in `app/lib/`, and the analytics completed count moved into `app/lib/analytics.ts` as a pure function.

DB call sites stay untested. Related: [[issue-order]].
