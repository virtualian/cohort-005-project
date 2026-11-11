# Storage Name Renames

Database tables, columns, stored enum values and URLs keep their original
names. They are not renamed to match `GLOSSARY.md`. Code identifiers, UI copy,
emails and comments do use glossary terms (#2); only storage and URLs lag.

## Why this is out of scope

This repo tracks the course repo, `ai-hero-dev/cohort-005-project`.
`npm run cherry-pick` and `npm run reset` pull lesson code from it, and that
code edits `app/db/schema.ts`, the migrations in `drizzle/` and the route
files. Local renames in those places would make every later cherry-pick
conflict on exactly those files, and a reset would discard them.

The rename also buys nothing. The database is a local SQLite file with no real
users, so there is no data to protect and no `/redeem/:code` links in
circulation that would need a redirect. The mismatch is a naming annoyance,
and the "Storage names" section of `GLOSSARY.md` covers it.

| Stored name | Glossary term |
| --- | --- |
| table `coupons` | **Seat** / **Seat Code** |
| columns `redeemed_at`, `redeemed_by_user_id` | **Claim** |
| route `/redeem/:code` | **Claim** a **Seat Code** |
| table `refunds` | **Refund Request** (a row may be Declined) |
| `TeamMemberRole` value `admin` | **Team Manager** |

## Prior requests

- #8: "Consider renaming schema tables/columns and the /redeem URL to glossary terms"
