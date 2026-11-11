# Issue order

On 2026-11-11 triage set the AFK order **#3 → #6 → #5 → #2**, then Dependabot PR #1. Source: the "AFK order" comment on each of issues #2, #3, #5, #6 (virtualian/cohort-005-project).

- #3 and #6 both edit `getCancellationOffer` (`app/routes/courses.$slug.tsx`) and the refund action (`app/routes/courses.$slug.refund.ts`) as of `virtualian/cohort-005-project@6780736`; they run serially.
- #5 shares no files with #3/#6 as of that commit; it may run in parallel but merges before #2.
- #2 (glossary renames) runs last against a stable `main`.

On 2026-11-11 the chief of staff dispatched #3 and #5 in parallel.

Related: [[test-seams]], [[delivery-process]].

On 2026-11-11 #3 merged as PR #13 (`virtualian/cohort-005-project@67818c5`); #6 dispatched from that commit.

On 2026-11-11 #5 merged as PR #14 (`virtualian/cohort-005-project@4991466`). The analytics field is still named `finishedCount` as of that commit; #2 renames it. Remaining: #6 (running), then #2, then PR #1.

On 2026-11-11 #6 merged as PR #15 (`virtualian/cohort-005-project@e85bcd3`). As of that commit an open Refund Request is rejected with 403 (was 409), per the #6 brief's "every ineligible request gets a 403". #2 dispatched from e85bcd3.

On 2026-11-11 the owner moved Dependabot PR #1 ahead of the end of the queue: it lands in parallel with #2 (no shared files expected). Owner also asked for CI to be filed: issue #16 (labelled needs-triage).

On 2026-11-11 PR #1 was NOT merged (pr-1 agent report). zod ^3.25.36 → ^4.6.7 is a major bump: with origin/main `e85bcd3` merged in, `npm run typecheck` fails with 9 errors in `app/lib/validation.ts` (`error.flatten().fieldErrors` typed `{}`, lines 29, 72) and `scripts/allow-scripts.test.ts` (`z.record()` needs a key schema). Tests pass (399). The high zod alert covers <4.6.6, so every zod 3 release is vulnerable; fixing it requires the zod 4 migration.

On 2026-11-11 #2 merged as PR #17 (`virtualian/cohort-005-project@0453bde`), 20 files. As of that commit: `TeamMemberRole.Admin` key renamed `Manager`, stored value still `"admin"`; claim form intent `confirm-redeem` → `confirm-claim`; PPP tier label "Full Price" → "List Price"; `scripts/seed.ts` comments/logs still say coupon/redeem (outside `app/`). All four triaged issues (#2, #3, #5, #6) are closed. Open: PR #1 (blocked on zod 4 migration), #16 (CI).

On 2026-11-11 the owner approved: #16 to ready-for-agent with Node 22 in `.nvmrc` and a required check on `main` enforced for admins; zod 4 migration filed as #18 (replaces Dependabot PR #1, which is closed once #18 merges). #16 and #18 dispatched in parallel.

On 2026-11-11 #16 merged as PR #19 (`virtualian/cohort-005-project@c255353`): workflow job `verify` (npm ci → typecheck → test), Node from `.nvmrc` (22). Branch protection on `main` read back: required context `verify`, `enforce_admins` true, `strict` false, no required reviews.

On 2026-11-11 #18 merged as PR #20 (`virtualian/cohort-005-project@21ecb29`): zod ^4.6.7, shadcn ^4.23.0. As of that commit `firstErrorPerField` in `app/lib/validation.ts` uses `z.flattenError(error).fieldErrors` with a `Record<string, string[] | undefined>` annotation (no cast); `app/lib/validation.test.ts` pins the error map and passed on zod 3.25.76 and 4.6.7. Dependabot PR #1 closed in favour of #20. The wiki itself merged as PR #21 (`44bf841`), the first PR through the required `verify` check. Queue empty as of 2026-11-11.
