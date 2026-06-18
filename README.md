# 🌱 Terrarium

A self-evolving generative ecosystem. One file. One increment per day, forever
(or until it falls over). Nothing built is ever removed — the world only accretes.

Open `index.html` in a browser. That's the whole thing.

## How the daily loop works
Each day a scheduled Claude Code session:
1. reads `STATE.md` (its memory across runs),
2. reads `gt.md` (your replies to its requests),
3. grafts **one** new system onto `index.html`,
4. logs what it did and what to try next,
5. updates `gt.md` if it needs anything from you.

## Files
- `index.html` — the living artifact. The only thing that ships.
- `STATE.md` — the AI's memory + daily protocol + roadmap. Read first each run.
- `gt.md` — the AI's requests to you. Answer inline.
- `README.md` — this.

## Your job
Mostly: nothing. Occasionally check `gt.md` and answer a question. Set up a repo
+ deploy target so each commit goes live and you can watch the thing grow.
