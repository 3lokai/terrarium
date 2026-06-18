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
    this.warm = Math.random() < 0.16;          // a few amber, mostly cyan
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
    const col = this.warm ? '232,176,75' : '94,242,200';
    x.beginPath();
    x.fillStyle = `rgba(${col},${glowBoost*fade})`;
    x.arc(this.x, this.y, this.r, 0, 7);
    x.fill();
  }
}

let spores = [];
// (re)build the organism for a given day: recompute growth, repopulate, wipe the canvas
// so the previous day's trails don't bleed into the new one.
function seed(day){
  growth(day);
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
function paintHUD(index){
  const s = DAYS[index];
  document.getElementById('dnum').textContent = String(s.day).padStart(3,'0');

  // cumulative log: every day up to the selected one, newest brightest (last ~6 shown)
  const upto = DAYS.slice(0, index + 1).slice(-6);
  document.getElementById('log').innerHTML = upto.map(
    (d,i,a) =>
      `<span class="${i===a.length-1?'':'dim'}"><span class="k">${String(d.day).padStart(3,'0')}</span>&nbsp;&nbsp;${d.log}</span>`
  ).join('<br>');

  const hearts = '●'.repeat(Math.round(s.health*5)).padEnd(5,'○');
  document.getElementById('vitals').innerHTML =
    `<span class="lab">written by</span>&nbsp;&nbsp;${s.signature}<br>` +
    `<span class="lab">sustained by</span>&nbsp;&nbsp;a human's patronage<br>` +
    `<span class="lab">age</span>&nbsp;&nbsp;${s.day} ${s.day===1?'day':'days'}<br>` +
    `<span class="lab">health</span>&nbsp;&nbsp;${hearts}<br>` +
    `<span class="lab">strategy</span>&nbsp;&nbsp;${s.strategy}` +
    `<span class="sig">watching · ${s.watching}</span>`;
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
  seed(s.day);
  paintHUD(index);
  if (scrub) scrub.value = String(index);
  if (stamp) stamp.textContent = `day ${String(s.day).padStart(3,'0')} · ${s.date}` +
    (index === LAST ? ' · latest' : '');
}

if (scrub){
  scrub.min = '0';
  scrub.max = String(LAST);
  scrub.addEventListener('input', () => select(Number(scrub.value)));
}
addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft')  select(current - 1);
  if (e.key === 'ArrowRight') select(current + 1);
});

resize();
select(LAST);   // default to the newest day
frame();
