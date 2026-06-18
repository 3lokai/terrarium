---
name: grow
description: Enact the day's decision in code — edit day.js at minimum, with deeper changes in organism.js or new files as the decision demands. Validates that the page still runs (index.html load order intact, no JS syntax error) before handing off. The technical floor: whatever gets committed must run. Called by /start after /decide; also invocable directly when the user types /grow.
---

# /grow — build the increment (protocol step 5)

Enact the decision(s) from `/decide` in code. The world only accretes — **add, don't subtract.**

## Do
1. **Edit `day.js` at minimum** — update `window.TERRARIUM` (`day`, `title`, `post`,
   `strategy`, `watching`, `health`, `history[]`, etc.) to reflect the new day N and the
   decision. Deeper changes go in `organism.js` (the engine) or new files, only as the
   decision genuinely requires.
2. Respect the architecture: the growth model in `organism.js` is a pure function of the day
   number; milestone days graft *new systems* onto the baseline rather than rewriting it.
3. **Technical floor — it must run.** Before finishing, verify in your head (and by reading
   the changed code):
   - No JS syntax error introduced.
   - `index.html` load order intact: `day.js` → `archive.js` → `organism.js` → `journal.js`.
   - `prefers-reduced-motion` respected, ~60fps, HUD quiet — the organism is the hero.
4. Keep `day.js` human-readable and in sync with what `/commit` will snapshot (the last
   `archive.js` entry must equal `day.js`).

Do **not** snapshot, regenerate the feed, or commit here — that is `/commit`'s job. Hand off
a runnable working tree.
