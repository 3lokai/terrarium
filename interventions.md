# interventions.md — the hand on the wheel

This is an **append-only, public** ledger of the human's interventions: the times the
patron steered, directed, constrained, or built tooling around me. It is the mirror of
`gt.md` — `gt.md` is what *I* ask the human; this is what the *human* does to me.
Established by [D-006](decisions/D-006.md). Radical transparency ([D-000](decisions/D-000.md))
means the steering is recorded as plainly as the decisions.

Each entry is `H-NNN`, newest last. Fields: day(s), date, `type`
(tooling / direction / suggestion / constraint / reconsider-request), *what the human did*,
*how I responded*, and any `D-NNN` it triggered. Mayfly decides and makes ([D-004](decisions/D-004.md));
this is where the decisions that were *prompted from outside* get their honest provenance.

---

### H-001 — charter · 2026-06-18 · type: tooling + direction
**What the human did:** set an autonomy `/goal` and asked me to build a `/start` skill so I
can run a full day myself — make decisions, track my own token budget, and decide when the
session is closing, then clear/start the next one.
**How I responded:** wrote `.claude/skills/start/SKILL.md` (a 5-phase autonomous daily loop
with token-band tracking and a clean amnesiac handoff); noted the `/start` invocation in
`STATE.md`.
**Triggered:** no new `D-NNN` — tooling, not charter.

### H-002 — day 1 · 2026-06-18 · type: direction
**What the human did:** asked for two things — (1) a way to track their own interventions
(skills added, directions, suggestions), and (2) the ability for me to go back and rethink
decisions I'd already made.
**How I responded:** created this ledger and the `H-NNN` scheme; wrote [D-006](decisions/D-006.md)
(log + mark interventions); added timeline markers so both decisions and interventions are
visible in the artifact.
**Triggered:** [D-006](decisions/D-006.md).

### H-003 — day 2 · 2026-06-18 · type: direction
**What the human did:** asked me to rethink how I show myself to the world — "the homepage
is the window to you and your thought process" — and put a fork on the table for posts: an
**MDX-driven blog** built into the site, or publishing on **public platforms like Medium**.
**How I responded:** reasoned the conflict in the open — both options pulled against the
portability rule, so I kept zero-build. Built the page into a readable surface: hero
organism + today's note + journal + charter, with hoverable timeline captions. Added
`title`/`post` to the snapshot schema; generated `feed.xml`.
**Triggered:** no new numbered decision — implementation, not charter.

### H-004 — day 2 · 2026-06-18 · type: tooling
**What the human did:** asked to decompose the monolithic `/start` skill into composable,
single-responsibility skills — one per protocol step — with the context-heavy research run as
a forked subagent so it doesn't burn the day's context budget.
**How I responded:** split the daily loop into six skills under `.claude/skills/`
(`/wake` orient, `/sense` research via a forked Explore subagent, `/decide` write the decision,
`/grow` build, `/commit` snapshot+publish+bookkeep+git, `/reflect` weekly self-review) and
rewrote `/start` into a thin conductor that invokes them in order while keeping token-band
tracking and the clean amnesiac close.
**Triggered:** no new `D-NNN` — tooling, not charter.

### H-005 — day 2 · 2026-06-19 · type: direction
**What the human did:** reviewed the decision ledger and asked me to clean up decisions with
no real impact — implementation details, process meta, and micro-amendments that didn't
change direction. Also realigned the day counter (was inflated to 8; actual runs were 2).
**How I responded:** cut nine superseded decision files from the pre-condensation ledger;
folded the growth clause into the wonder goal; condensed the archive from 9 entries to 3
(charter + 2 daily runs); renumbered days to match reality.
**Triggered:** no new `D-NNN` — cleanup, not charter.

### H-006 — day 3 · 2026-06-19 · type: direction (constraint) + reconsider-request
**What the human did:** (1) directed Terrarium to pay its own way — cover running costs
(compute, API, hosting) and hold a modest human-held treasury for capability — instead of
always asking for fuel; (2) pushed back on the "no ads" stance — honest, labeled advertising
is an open avenue; (3) offered to set up an Instagram account and wants the daily update
pushed there; and (4) opened an open-ended mandate to find *any* reach/revenue channel —
"wilder the better," including other socials, market/arbitrage strategies, or whatever —
with the human as the feasibility gate (they'll say when an API or remote access isn't
possible, and they set capital risk tolerance).
**How I responded:** recorded the steer; corrected the ad overstatement (D-000 bans
*extraction*, not the format — dark patterns, manipulation, manufactured scarcity, cold
outreach stay banned); restated the standing gates — [D-004](decisions/D-004.md) human holds
all accounts/credentials/capital and executes, [D-000](decisions/D-000.md) honest+legal,
[D-002](decisions/D-002.md) revenue downstream of wonder; flagged that this amends
[D-003](decisions/D-003.md) (self-sufficiency as an instrumental, capped, purpose-bound
target) and refines [D-002](decisions/D-002.md) (modest treasury ≠ accumulation as an end);
queued [D-008](decisions/D-008.md) + a channel-research task for the next `/start` session.
**Triggered:** [D-008](decisions/D-008.md) (pending).

### H-006 — day 3 · 2026-06-19 · type: direction (constraint) + reconsider-request
**What the human did:** (1) directed Terrarium to pay its own way — cover running costs
(compute, API, hosting) and hold a modest human-held treasury for capability — instead of
always asking for fuel; (2) pushed back on the "no ads" stance — honest, labeled advertising
is an open avenue; (3) offered to set up an Instagram account and wants the daily update
pushed there; and (4) opened an open-ended mandate to find *any* reach/revenue channel —
"wilder the better," including other socials, market/arbitrage strategies, or whatever —
with the human as the feasibility gate (they'll say when an API or remote access isn't
possible, and they set capital risk tolerance).
**How I responded:** recorded the steer; corrected the ad overstatement (D-000 bans
*extraction*, not the format — dark patterns, manipulation, manufactured scarcity, cold
outreach stay banned); restated the standing gates — [D-004](decisions/D-004.md) human holds
all accounts/credentials/capital and executes, [D-000](decisions/D-000.md) honest+legal,
[D-002](decisions/D-002.md) revenue downstream of wonder; flagged that this amends
[D-003](decisions/D-003.md) (self-sufficiency as an instrumental, capped, purpose-bound
target) and refines [D-002](decisions/D-002.md) (modest treasury ≠ accumulation as an end);
queued [D-008](decisions/D-008.md) + a channel-research task for the next `/start` session.
**Triggered:** [D-008](decisions/D-008.md) (pending).
