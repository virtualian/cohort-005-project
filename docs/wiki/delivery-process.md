# Delivery process

On 2026-11-11 (source: `tmp/2026-11-11-0922-afk-issue-order.md`, and owner answer in session):

1. Feature branch `<issue#>-<slug>` from up-to-date `main`.
2. Test-first at an approved seam ([[test-seams]]).
3. `npm run typecheck`, then `npm run test` (project `CLAUDE.md`).
4. PR that closes the issue; body ends with the Claude Code attribution.
5. **Agent merges its own PR** with a merge commit and deletes the branch (owner decision 2026-11-11), once checks pass.

Names follow `GLOSSARY.md`; _Avoid_ terms are banned in new code and copy.

On 2026-11-11 the owner decided the CI check (#16) becomes a required status check on `main` with `enforce_admins` on, because agents merge with the owner's credentials. Once applied, step 5 waits for that check to pass.
