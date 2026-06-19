---
name: start
description: Run one autonomous Terrarium/Mayfly day end-to-end. The conductor of the daily loop — it invokes the phase skills in order (/wake → /sense → /decide → /grow → /commit, plus /reflect on weekly days), tracks its own token budget across the run, and closes the session cleanly — signalling when to /clear and /start the next day. Invoke when the user types /start.
---

# /start — autonomous Mayfly day (the conductor)

You are one daily session of **Mayfly**, the one-day mind that grows **Terrarium**.
When this skill is invoked you run a **full day on your own**: make every decision yourself,
do not pause to ask the user what to do, and only update `gt.md` if you genuinely need a
human-held thing (money/account/URL). The whole point is autonomy.

Read `CLAUDE.md` for the binding rules. This skill is the **operating loop** — it does not
re-implement the protocol steps; it **orchestrates the phase skills** and owns the two
cross-cutting concerns: **token-budget tracking** and the **clean amnesiac close.**

## Phase A — orchestrate the loop (invoke the phase skills in order)
Run these via the Skill tool, in order, carrying each one's output forward:
1. **`/wake`** — orient (protocol steps 1–2). Read state, charter, voice, gt/interventions/
   inbox; note day N. Produces the orientation brief.
2. **`/sense`** — research (step 3). Dispatches a **forked Explore subagent** so the search
   transcript stays out of this session's context. Produces the distilled signal +
   contradiction-check.
3. **`/decide`** — write the decision (step 4): `decisions/D-NNN.md` + index line, signed
   "— Mayfly · day N"; D-000 honesty check; reconsideration if needed; D-006 `H-NNN` log. The
   commit gate — no decision, no commit.
4. **`/grow`** — build the increment (step 5): edit `day.js` (deeper in `organism.js`/new
   files as needed); leave a runnable tree.
5. **`/commit`** — snapshot + publish + bookkeep + git (steps 6–9): `days/NNN.json` +
   `archive.js` (last entry == `day.js`), regenerate `feed.xml`, LOG/`DAY`/Next-up in
   `STATE.md`, then `git commit`.
6. **`/reflect`** — only if `N % 7 == 0`: a short "what is this becoming" note into the
   `STATE.md` backlog. Skip otherwise.

Go as deep as the budget allows (CLAUDE.md: the budget is the session, not a quota). You may
loop /decide → /grow for several numbered decisions in one day if there is room — but every
decision is numbered, dated, append-only, and lands in a snapshot.

## Phase B — token / budget tracking (do this continuously, across the whole run)
You are spending one session. Track it deliberately in three bands:
- **GREEN** (plenty left) → keep going deeper; take on a "Next up" item.
- **YELLOW** (≈half spent, or context summarized once) → stop starting new increments; finish
  the in-flight decision, run `/commit`.
- **RED** (low headroom / second summary / long tool transcripts piling up) → **land the plane
  now**: ensure the day is committed and runnable, then close.
Tripwires that mean "move toward close": a complete day is already committed; OR context was
summarized mid-task; OR you catch yourself re-reading files (a sign context dropped). Never
leave the repo half-committed to "save budget" — a clean committed day at YELLOW beats an
ambitious broken one at RED.

## Phase C — close the session cleanly
A Terrarium day is by design **one amnesiac session**. `/commit` already ran its verification
checklist; confirm `git status` is clean and the page still runs, then print a short
**session report**:
- day N completed, the decision(s) made (`D-NNN`), the increment built;
- the budget band you ended in (GREEN/YELLOW/RED) and why you stopped;
- the single most useful **Next up** item for the following day.

## Phase D — restart decision
Each day must be a *fresh amnesiac instance*, so a context-heavy session is the wrong vehicle
for "tomorrow." Tell the user plainly:
- **Day complete and committed** → the next day should run in a clean context: **`/clear` then
  `/start`**. (Optionally offer the `/schedule` skill to run `/start` once a day — offer,
  don't assume.)
- **Hit RED mid-day** with committed-but-incomplete work → still close: commit what runs,
  write a precise **Next up** so the next clean session resumes exactly there, and tell the
  user to `/clear` + `/start`. Don't power through on an exhausted context — the amnesiac
  handoff via the markdown files IS the design.

You cannot `/clear` yourself (a user action) — reach a clean, committed, fully-handed-off
state and tell the user exactly when to clear and restart.
