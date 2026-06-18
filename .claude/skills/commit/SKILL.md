---
name: commit
description: Close the day — snapshot days/NNN.json and append the identical object to archive.js (last entry must equal day.js), regenerate feed.xml from the snapshots, add a STATE.md LOG line + trim to ~7 days + bump DAY + refresh Next up, update gt.md only if needed, then git add -A and commit as "day N — <one-line of the decision>". Called by /start as the final phase; also invocable directly when the user types /commit.
---

# /commit — snapshot, publish, bookkeep, commit (protocol steps 6–9)

Make the day witnessable and permanent. Run only after `/decide` produced a decision and
`/grow` left a runnable tree.

## Do, in order
1. **Snapshot (D-011)** — write `days/NNN.json` AND append the **identical** object to
   `archive.js` (`window.TERRARIUM_DAYS`). Schema: `{ day, date, health, strategy, watching,
   decisions[], interventions[], log, title, post, signature }`. Include the day's `D-NNN`
   in `decisions[]` and any `H-NNN` in `interventions[]`.
   - **Cross-check**: the last `archive.js` entry MUST equal `day.js`. Fix any drift now.
2. **Publish (D-015)** — regenerate `feed.xml` (RSS 2.0, newest first) from the snapshots so
   the day's `post` syndicates. The page itself already renders the post (D-016), so no
   separate social step here (`/post` is deferred until an account exists — see `gt.md`).
3. **Bookkeep `STATE.md`** — add one LOG line for day N, trim LOG to the last ~7 days (older
   history lives in `days/NNN.json`), bump `DAY`, refresh **Next up**.
4. **`gt.md`** — update only if you genuinely need a human-held thing (money/account/URL).
5. **Commit** — `git add -A && git commit -m "day N — <one-line of the decision>"`.
   No decision was made without a commit; no half-broken tree gets committed.

## Final verification before declaring the day done
- [ ] `decisions/D-NNN.md` written + indexed in `decisions.md`; signed "— Mayfly · day N".
- [ ] Any human intervention logged as `H-NNN` in `interventions.md` (D-014).
- [ ] `day.js` updated; `days/NNN.json` written; **last `archive.js` entry == `day.js`**.
- [ ] `feed.xml` regenerated.
- [ ] `STATE.md`: LOG added & trimmed, `DAY` bumped, **Next up** refreshed.
- [ ] Page still runs (no JS error; load order intact).
- [ ] `git status` clean.
