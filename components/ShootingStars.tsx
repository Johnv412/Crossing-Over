import React, { useEffect, useRef } from 'react';

/**
 * LivingAtmosphere — 10x edition.
 * Denser wisps, richer energy pulses, more orbs, stronger glow.
 * Local-only preview. DO NOT PUSH until approved.
 */
const ShootingStars: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const mouse = useRef({ x: -999, y: -999, tx: -999, ty: -999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0, H = 0;
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e: MouseEvent) => { mouse.current.tx = e.clientX; mouse.current.ty = e.clientY; };
    const onTouch = (e: TouchEvent) => { mouse.current.tx = e.touches[0].clientX; mouse.current.ty = e.touches[0].clientY; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onTouch, { passive: true });

    /* ── Palette ─────────────────────────────────────────── */
    const pal = [
      [180, 130, 255], [168, 85, 247], [216, 180, 254],
      [147, 51, 234], [200, 155, 255], [190, 120, 240],
      [230, 160, 255], [160, 60, 255], [210, 100, 255],
    ];
    const rp = () => pal[Math.floor(Math.random() * pal.length)];

    /* ── LAYER 1 — Cloud wisps (30 instead of 9) ─────────── */
    interface Wisp { x: number; y: number; rx: number; ry: number; speed: number; phase: number; ps: number; ba: number; col: number[]; }
    const wisps: Wisp[] = Array.from({ length: 30 }, () => ({
      x: Math.random() * W * 1.5 - W * 0.25,
      y: H * 0.04 + Math.random() * H * 0.82,
      rx: 140 + Math.random() * 320,
      ry: 22 + Math.random() * 90,
      speed: 0.026 + Math.random() * 0.058,
      phase: Math.random() * Math.PI * 2,
      ps: 0.002 + Math.random() * 0.003,
      ba: 0.05 + Math.random() * 0.12,        // richer opacity
      col: rp(),
    }));

    const drawWisp = (w: Wisp) => {
      w.phase += w.ps;
      const a = w.ba * (0.6 + 0.4 * Math.sin(w.phase));
      ctx.save();
      ctx.translate(w.x, w.y);
      ctx.scale(1, w.ry / w.rx);
      const g = ctx.createRadialGradient(0, 0, 0, 0, 0, w.rx);
      g.addColorStop(0, `rgba(${w.col},${a})`);
      g.addColorStop(0.45, `rgba(${w.col},${a * 0.5})`);
      g.addColorStop(1, `rgba(${w.col},0)`);
      ctx.beginPath(); ctx.arc(0, 0, w.rx, 0, Math.PI * 2);
      ctx.fillStyle = g; ctx.fill(); ctx.restore();
      w.x -= w.speed; w.y -= w.speed * 0.15;
      if (w.x + w.rx < -100) { w.x = W + w.rx + 100; w.y = H * 0.04 + Math.random() * H * 0.82; }
    };

    /* ── LAYER 2 — Energy pulses (15 instead of 5) ───────── */
    interface Pulse { x: number; y: number; r: number; phase: number; spd: number; dp: number; col: number[]; }
    const pulses: Pulse[] = Array.from({ length: 15 }, (_, i) => ({
      x: (i % 5 + 0.5) * (W / 5) + (Math.random() - 0.5) * 120,
      y: H * (0.2 + Math.random() * 0.65),
      r: 100 + Math.random() * 220,
      phase: (i / 15) * Math.PI * 2,
      spd: 0.003 + Math.random() * 0.003,
      dp: Math.random() * Math.PI * 2,
      col: rp(),
    }));

    const drawPulse = (p: Pulse) => {
      p.phase += p.spd; p.dp += 0.003;
      const a = 0.06 + 0.12 * ((Math.sin(p.phase) + 1) / 2);   // richer
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
      g.addColorStop(0, `rgba(${p.col},${a})`);
      g.addColorStop(0.5, `rgba(${p.col},${a * 0.35})`);
      g.addColorStop(1, `rgba(${p.col},0)`);
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = g; ctx.fill();
      p.x += Math.sin(p.dp * 0.7) * 0.3; p.y += Math.cos(p.dp * 0.5) * 0.2;
      if (p.x < -p.r) p.x = W + p.r; if (p.x > W + p.r) p.x = -p.r;
    };

    /* ── LAYER 3 — Rising orbs (max 35, spawn every 80 frames) */
    interface Orb { x: number; y: number; vy: number; r: number; alpha: number; maxAlpha: number; phase: number; born: number; }
    const orbs: Orb[] = [];
    let frame = 0, lastOrb = 0;
    const ORB_INT = 40;   // doubled spawn rate

    const spawnOrb = () => orbs.push({
      x: W * (0.02 + Math.random() * 0.96),
      y: H * (0.45 + Math.random() * 0.40),
      vy: 0.077 + Math.random() * 0.173,
      r: 2 + Math.random() * 4,
      alpha: 0, maxAlpha: 0.45 + Math.random() * 0.50,
      phase: Math.random() * Math.PI * 2, born: frame,
    });

    for (let i = 0; i < 36; i++) { spawnOrb(); orbs[i].born = frame - Math.random() * 200; }

    const drawOrbs = () => {
      if (frame - lastOrb > ORB_INT && orbs.length < 70) { spawnOrb(); lastOrb = frame; }
      for (let i = orbs.length - 1; i >= 0; i--) {
        const o = orbs[i];
        o.y -= o.vy; o.phase += 0.02; o.x += Math.sin(o.phase) * 0.4;
        const age = frame - o.born;
        if (age < 80) o.alpha = (age / 80) * o.maxAlpha;
        if (o.y < H * 0.08) o.alpha -= 0.008;
        if (o.alpha <= 0 || o.y < 0) { orbs.splice(i, 1); continue; }
        const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r * 5);
        g.addColorStop(0, `rgba(235,210,255,${o.alpha})`);
        g.addColorStop(0.4, `rgba(200,150,255,${o.alpha * 0.5})`);
        g.addColorStop(1, 'rgba(200,150,255,0)');
        ctx.beginPath(); ctx.arc(o.x, o.y, o.r * 5, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();
        ctx.beginPath(); ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,245,255,${o.alpha})`; ctx.fill();
      }
    };

    /* ── LAYER 4 — Mouse glow (stronger, 160px) ──────────── */
    const drawMouseGlow = () => {
      const m = mouse.current;
      if (m.tx < 0) return;
      m.x += (m.tx - m.x) * 0.04;
      m.y += (m.ty - m.y) * 0.04;
      const g = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, 160);
      g.addColorStop(0, 'rgba(230,200,255,0.13)');
      g.addColorStop(0.5, 'rgba(168, 85,247,0.07)');
      g.addColorStop(1, 'rgba(168, 85,247,0)');
      ctx.beginPath(); ctx.arc(m.x, m.y, 160, 0, Math.PI * 2);
      ctx.fillStyle = g; ctx.fill();
    };

    /* ── LAYER 5 — Mist silhouette (angel wings) ─────────── */
    let mPhase = 0, mTimer = 0, mAlpha = 0, mX = 0, mY = 0;
    const MW = 2700, MI = 300, MH = 240, MO = 300;

    const drawWings = (x: number, y: number, a: number) => {
      ctx.save(); ctx.globalAlpha = a;
      ctx.strokeStyle = 'rgba(255,255,255,1)';
      ctx.lineWidth = 1.4; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      ctx.shadowColor = 'rgba(200,160,255,0.7)'; ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.moveTo(x, y); ctx.bezierCurveTo(x - 55, y - 35, x - 120, y - 12, x - 155, y + 18); ctx.bezierCurveTo(x - 120, y + 5, x - 55, y + 22, x, y);
      ctx.moveTo(x - 80, y - 15); ctx.bezierCurveTo(x - 90, y - 5, x - 85, y + 8, x - 75, y + 14);
      ctx.moveTo(x, y); ctx.bezierCurveTo(x + 55, y - 35, x + 120, y - 12, x + 155, y + 18); ctx.bezierCurveTo(x + 120, y + 5, x + 55, y + 22, x, y);
      ctx.moveTo(x + 80, y - 15); ctx.bezierCurveTo(x + 90, y - 5, x + 85, y + 8, x + 75, y + 14);
      ctx.stroke(); ctx.restore();
    };

    const drawMist = () => {
      mTimer++;
      if (mPhase === 0 && mTimer >= MW) { mPhase = 1; mTimer = 0; mX = W * (0.2 + Math.random() * 0.6); mY = H * (0.15 + Math.random() * 0.40); }
      if (mPhase === 1) { mAlpha = (mTimer / MI) * 0.05; if (mTimer >= MI) { mPhase = 2; mTimer = 0; } drawWings(mX, mY, mAlpha); }
      else if (mPhase === 2) { mAlpha = 0.05; if (mTimer >= MH) { mPhase = 3; mTimer = 0; } drawWings(mX, mY, mAlpha); }
      else if (mPhase === 3) { mAlpha = 0.05 * (1 - mTimer / MO); if (mTimer >= MO) { mPhase = 0; mTimer = 0; } if (mAlpha > 0) drawWings(mX, mY, mAlpha); }
    };

    /* ── Main loop ───────────────────────────────────────── */
    let running = true;

    const tick = () => {
      if (!running) return;
      frame++;
      ctx.clearRect(0, 0, W, H);
      wisps.forEach(drawWisp);
      pulses.forEach(drawPulse);
      drawMouseGlow();
      drawOrbs();
      drawMist();
      rafRef.current = requestAnimationFrame(tick);
    };
    tick();

    // Restart the loop if the browser paused it (tab switch, phone sleep, etc.)
    const onVisibility = () => {
      if (document.visibilityState === 'visible') {
        cancelAnimationFrame(rafRef.current);
        tick();
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onTouch);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }} />
  );
};

export default ShootingStars;
