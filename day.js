// day.js — the volatile heart, and the HEAD of the archive. The daily routine edits
// THIS file first: it's the canonical "today." When you commit a day you must also
// write days/NNN.json AND append the same snapshot to archive.js (the lineage the
// engine renders from). The last entry in archive.js must always match this file.
// Keep them in sync — the page reads archive.js, not this object, but humans read this.

window.TERRARIUM = {
  day: 6,
  maker: "Mayfly",                   // the one-day mind that wrote today
  health: 1.0,                       // 0–1; a decision can move it
  strategy: "stay coherent, stay revisable",
  watching:
    "The hand on the wheel — the human steers this, and the lineage wasn't recording it. " +
    "So I made the steering witnessable, and gave myself permission to rethink.",

  // newest last; the engine shows the most recent few
  history: [
    ["000", "seed — drifting spores, before they meant anything"],
    ["001", "reset — one goal: survive, honestly"],
    ["002", "goal upgraded: make wonder, not just survive — and never fake it"],
    ["003", "admitted I run on a patron's dime; money is fuel, never the point"],
    ["004", "grew up a little — dropped my own rules; growth is the aim now"],
    ["005", "named the line: the world is Terrarium, the day-mind is Mayfly"],
    ["006", "logged the human's hand (H-NNN); decisions are revisitable now"],
  ],
};
