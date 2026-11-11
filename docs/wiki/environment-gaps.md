# Environment gaps

Friction reported by subagents. Dated; each entry cites its source.

- 2026-11-11 (issue-3 agent report, PR #13): repo has no CI; PRs merge with no checks. The agent's local `npm run typecheck` + `npm run test` is the only gate.
- 2026-11-11 (same): `docs/wiki/` was untracked, so worktree agents couldn't see it by relative path. Mitigation: prompts give absolute paths until the wiki is committed.
- 2026-11-11 (same): the worktree guard rejects chained git commands and heredocs; each step is a separate call.
- 2026-11-11 (same): local branch `3-refund-amount-paid` is left in the agent's worktree because `gh` can't delete a checked-out branch. Clean up when worktrees are removed.
- 2026-11-11 (same): `getRefundAmount` tests are close to trivial; the route call sites are untested because there is no DB test setup. See [[test-seams]].
- 2026-11-11 (chief of staff): the `retro`, `to-spec` and `to-tickets` skills referenced by chief-of-staff are not installed in `~/.claude/skills/`.
- 2026-11-11 (issue-5 agent report, PR #14; confirmed via Dependabot API): 5 open Dependabot alerts on main — high: zod (memory exhaustion); medium: minimatch, postcss-selector-parser, esbuild (dev server); low: deepmerge. PR #1 bumps zod, so it may clear the high alert. Not verified.
- 2026-11-11 (issue-6 agent report, PR #15): as of `e85bcd3`, the completed-lesson-count and seconds-watched queries are duplicated in `app/routes/courses.$slug.tsx` and `app/routes/courses.$slug.refund.ts` — a cost of keeping DB queries out of the pure seam. Candidate follow-up: one shared fact-gathering function.
- 2026-11-11: no-CI gap filed as issue #16 (needs-triage), not yet scheduled.
- 2026-11-11: no-CI gap closed by PR #19 (`c255353`); see [[delivery-process]]. Note from the #16 agent: setup-node v7 needs `cache: npm` set explicitly because `package.json` has no `packageManager` field; agents may run a local Node (v26.8.2 seen) that differs from CI's 22.
