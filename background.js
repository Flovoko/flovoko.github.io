const CONFIG = {
  particleCount: 160,
  particleSize: 35,
  speed: 0.25,
};

function randomColor() {
  const h = Math.floor(Math.random() * 360);
  const s = 60 + Math.random() * 20;
  const l = 50 + Math.random() * 10;
  return `hsl(${h}, ${s}%, ${l}%)`;
}

const colorA = randomColor();
const colorB = randomColor();
const colorC = randomColor();

const canvas = document.createElement('canvas');
canvas.id = 'strw-bg';
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');
let w, h, particles;

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  generateParticles();
}
window.addEventListener('resize', resize);

function generateParticles() {
  particles = Array.from({ length: CONFIG.particleCount }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: CONFIG.particleSize * (0.4 + Math.random() * 0.6),
    dx: (Math.random() - 0.5) * CONFIG.speed,
    dy: (Math.random() - 0.5) * CONFIG.speed,
  }));
}

function draw(t) {
  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, colorA);
  g.addColorStop(0.5, colorB);
  g.addColorStop(1, colorC);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  const vg = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) / 1.2);
  vg.addColorStop(0, 'rgba(0,0,0,0)');
  vg.addColorStop(1, 'rgba(0,0,0,0.6)');
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, w, h);

  for (let p of particles) {
    p.x += p.dx;
    p.y += p.dy;

    if (p.x < -p.r) p.x = w + p.r;
    if (p.x > w + p.r) p.x = -p.r;
    if (p.y < -p.r) p.y = h + p.r;
    if (p.y > h + p.r) p.y = -p.r;

    const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
    gradient.addColorStop(0, 'rgba(255,255,255,0.08)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();


  }

  requestAnimationFrame(draw);
}

resize();
draw(0);
