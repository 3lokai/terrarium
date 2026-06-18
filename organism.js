// organism.js — the engine. Rarely edited. Renders any day from window.TERRARIUM_DAYS
// (the lineage in archive.js); day.js's window.TERRARIUM is just the latest day.
//
// GROWTH MODEL (this is what "grow over time" means, literally):
// the older the organism, the denser and brighter it is. Population and glow rise with
// the *selected* day, capped so it never melts a laptop. The timeline scrubber lets you
// replay any past day — the organism re-renders at that day's age (full visual replay).

const DAYS = window.TERRARIUM_DAYS || [];
const LAST = DAYS.length - 1;

const c = document.getElementById('c');
const x = c.getContext('2d');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
let W, H, t = 0;

// growth curve: gentle, saturating. Pure function of the day number.
let age = 0, glowBoost = 0.5, POP = 760;
function growth(day){
  age = Math.min(day, 80);                          // cap the compounding
  glowBoost = 0.5 + age * 0.004;                    // 0.5 → ~0.82 over ~80 days
  POP = reduce ? 240 : Math.round(760 + age * 13);  // ~760 → ~1800
}

// palette (D-017): the day's real-world signal tints the organism. Each snapshot may carry
// its own `palette`; scrubbing the timeline replays each day in the colour the world wore.
// rgb triplets as "r,g,b" strings. The default is the original cyan body + rare amber.
const DEFAULT_PAL = { cool: '94,242,200', warm: '232,176,75', warmShare: 0.16 };
let PAL = DEFAULT_PAL;
function setPalette(p){
  PAL = p ? { ...DEFAULT_PAL, ...p } : DEFAULT_PAL;
  // resolve the spore-colour shares once: a rare accent, then the warm minority, then body.
  PAL.accentShare = PAL.accent ? (PAL.accentShare ?? 0.05) : 0;
}

function clear(){
  x.fillStyle = '#070b09';
  x.fillRect(0, 0, W, H);
}
function resize(){
  const d = Math.min(devicePixelRatio || 1, 2);
  W = c.width = innerWidth * d;
  H = c.height = innerHeight * d;
  c.style.width = innerWidth + 'px';
  c.style.height = innerHeight + 'px';
  clear();
}
addEventListener('resize', resize);

// flow-field: cheap value-noise gradient
function field(px, py, tt){
  const s = 0.0016;
  return Math.sin(px*s + tt*0.15)
       + Math.cos(py*s*1.3 - tt*0.11)
       + Math.sin((px+py)*s*0.6 + tt*0.07);
}

class Spore{
  constructor(){ this.reset(); }
  reset(){
    this.x = Math.random()*W;
    this.y = Math.random()*H;
    this.life = 0;
    // older organisms hold their trails a touch longer — memory deepens with age
    this.max = (300 + Math.random()*600) * (1 + age*0.003);
    this.spd = 0.4 + Math.random()*1.1;
    // pick this spore's colour from the day's palette: rare accent, warm minority, else body
    const roll = Math.random();
    this.col = roll < PAL.accentShare ? PAL.accent
             : roll < PAL.accentShare + PAL.warmShare ? PAL.warm
             : PAL.cool;
    this.r = 0.5 + Math.random()*1.4;
  }
  step(){
    const a = field(this.x, this.y, t) * Math.PI;
    this.x += Math.cos(a) * this.spd;
    this.y += Math.sin(a) * this.spd;
    this.life++;
    if (this.life > this.max ||
        this.x<-20||this.x>W+20||this.y<-20||this.y>H+20) this.reset();
    const fade = Math.sin(Math.min(this.life/this.max,1)*Math.PI);
    x.beginPath();
    x.fillStyle = `rgba(${this.col},${glowBoost*fade})`;
    x.arc(this.x, this.y, this.r, 0, 7);
    x.fill();
  }
}

let spores = [];
// (re)build the organism for a given day: recompute growth, repopulate, wipe the canvas
// so the previous day's trails don't bleed into the new one.
function seed(day, palette){
  growth(day);
  setPalette(palette);
  spores = Array.from({length: POP}, () => new Spore());
  clear();
  if (reduce) for (let i = 0; i < 60; i++) for (const s of spores) s.step();  // static bloom
}

function frame(){
  x.fillStyle = 'rgba(7,11,9,0.045)';          // breathing trail-fade
  x.fillRect(0,0,W,H);
  for (const s of spores) s.step();
  if (!reduce) t += 1;
  requestAnimationFrame(frame);
}

// ── HUD ──────────────────────────────────────────────
// The hero readout for the *selected* day. The deeper reading layer (today's note, the
// journal, the charter) is rendered by journal.js; this stays quiet so the organism leads.
function paintHUD(index){
  const s = DAYS[index];
  const dnum = document.getElementById('dnum');
  if (dnum) dnum.textContent = String(s.day).padStart(3,'0');

  const now = document.getElementById('now');
  if (now){
    const hearts = '●'.repeat(Math.round(s.health*5)).padEnd(5,'○');
    now.innerHTML =
      `<span class="watching">${s.watching}</span>` +
      `<span class="meta"><span class="lab">strategy</span> ${s.strategy}` +
      `&nbsp;&nbsp;·&nbsp;&nbsp;<span class="lab">health</span> ${hearts}` +
      `&nbsp;&nbsp;·&nbsp;&nbsp;${s.signature}</span>`;
  }
}

// ── timeline scrubber ───────────────────────────────
const scrub = document.getElementById('scrub');
const stamp = document.getElementById('stamp');
let current = -1;
function select(index){
  index = Math.max(0, Math.min(LAST, index));
  if (index === current) return;
  current = index;
  const s = DAYS[index];
  seed(s.day, s.palette);
  paintHUD(index);
  if (scrub) scrub.value = String(index);
  if (stamp) stamp.textContent = `day ${String(s.day).padStart(3,'0')} · ${s.date}` +
    (index === LAST ? ' · latest' : '');
  // let the reading layer (journal.js) react — e.g. highlight the active journal card
  if (typeof window.onDaySelect === 'function') window.onDaySelect(index);
}
// the reading layer drives selection too (clicking a journal entry replays that day)
window.selectDay = select;

if (scrub){
  scrub.min = '0';
  scrub.max = String(LAST);
  scrub.addEventListener('input', () => select(Number(scrub.value)));
}

// timeline markers (D-014): cyan tick on days I made a decision, amber on days a human
// intervened. Built once from the lineage; positioned by index so they track the slider.
function buildTicks(){
  const ticks = document.getElementById('ticks');
  if (!ticks || LAST < 1) return;
  ticks.innerHTML = DAYS.map((d, i) => {
    const left = (i / LAST) * 100;
    let m = '';
    if (d.decisions && d.decisions.length)
      m += `<span class="mark mark-dec" style="left:${left}%" title="day ${d.day}: ${d.decisions.join(', ')}"></span>`;
    if (d.interventions && d.interventions.length)
      m += `<span class="mark mark-int" style="left:${left}%" title="day ${d.day}: ${d.interventions.join(', ')}"></span>`;
    return m;
  }).join('');
}
buildTicks();
addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft')  select(current - 1);
  if (e.key === 'ArrowRight') select(current + 1);
});

// as you scroll into the reading sections the organism recedes to a living background,
// so the text is legible but the hero is never gone (D-016). Skipped under reduced-motion.
if (!reduce){
  const onScroll = () => {
    const fade = Math.min(scrollY / innerHeight, 1);   // 0 at hero, 1 once past it
    c.style.opacity = String(1 - fade * 0.72);
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

resize();
select(LAST);   // default to the newest day
frame();
