// Additional unique full-bleed patterns — every slide gets its own
// All animate. Black & white with occasional restraint.

const { useEffect: peUseEffect, useRef: peUseRef } = React;

const useExCanvas = (drawFn, deps = []) => {
  const ref = peUseRef(null);
  peUseEffect(() => {
    const c = ref.current;
    if (!c) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    c.width = c.clientWidth * dpr;
    c.height = c.clientHeight * dpr;
    const ctx = c.getContext('2d');
    ctx.scale(dpr, dpr);
    let raf, t = 0;
    const loop = () => { t += 0.016; drawFn(ctx, c.clientWidth, c.clientHeight, t); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, deps);
  return ref;
};

// ───────────────────────────────────────────
// INK BLOOM — slow ink-in-water blots, organic
// ───────────────────────────────────────────
const InkBloom = ({ inverted = false, structured = false }) => {
  const blobsRef = peUseRef(null);
  if (!blobsRef.current) {
    const arr = [];
    for (let i = 0; i < 7; i++) {
      arr.push({
        cx: Math.random(), cy: Math.random(),
        r: 0.18 + Math.random() * 0.22,
        phase: Math.random() * 6,
        speed: 0.05 + Math.random() * 0.1,
        verts: Array.from({ length: 14 }, () => 0.7 + Math.random() * 0.5)
      });
    }
    blobsRef.current = arr;
  }
  const ref = useExCanvas((ctx, W, H, t) => {
    ctx.fillStyle = inverted ? '#FFFFFF' : '#0E0E12';
    ctx.fillRect(0, 0, W, H);
    const fg = inverted ? '#0E0E12' : '#FFFFFF';
    const minD = Math.min(W, H);
    const clarity = structured ? Math.min(t / 7, 1) : 0;
    const softness = structured ? (1 - clarity) : 1;
    blobsRef.current.forEach(b => {
      const cx = b.cx * W + Math.cos(t * b.speed + b.phase) * 30;
      const cy = b.cy * H + Math.sin(t * b.speed * 0.8 + b.phase) * 30;
      const baseR = b.r * minD;
      // multi-layer bloom
      for (let layer = 0; layer < 8; layer++) {
        const f = 1 - layer / 8;
        ctx.fillStyle = fg;
        ctx.globalAlpha = (0.05 + 0.04 * f) * (structured ? 0.95 - clarity * 0.55 : 1);
        ctx.filter = structured ? `blur(${Math.max(0, softness * 18 - layer * 1.4)}px)` : 'none';
        ctx.beginPath();
        const segs = 80;
        for (let i = 0; i <= segs; i++) {
          const a = (i / segs) * Math.PI * 2;
          const vi = Math.floor((i / segs) * b.verts.length) % b.verts.length;
          const wob = b.verts[vi] + Math.sin(a * 5 + t * 0.6 + b.phase) * 0.06;
          const r = baseR * (0.7 + 0.3 * f) * wob;
          const x = cx + Math.cos(a) * r;
          const y = cy + Math.sin(a) * r;
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
      }
    });
    ctx.filter = 'none';

    if (structured) {
      const cx = W * 0.5;
      const cy = H * 0.43;
      const radius = minD * (0.23 + clarity * 0.05);
      const steps = 10;
      const alpha = 0.08 + clarity * 0.42;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-0.08 + Math.sin(t * 0.16) * 0.015);

      for (let i = 0; i < steps; i++) {
        const p = i / (steps - 1);
        const r = radius * (0.35 + p * 0.9);
        ctx.strokeStyle = fg;
        ctx.globalAlpha = alpha * (0.25 + p * 0.75);
        ctx.lineWidth = 1 + clarity * 2;
        ctx.beginPath();
        const segs = 6;
        for (let j = 0; j <= segs; j++) {
          const a = (j / segs) * Math.PI * 2 - Math.PI / 2;
          const snap = 1 - clarity;
          const wob = Math.sin(j * 1.7 + t * 0.35) * radius * 0.08 * snap;
          const x = Math.cos(a) * (r + wob);
          const y = Math.sin(a) * (r * 0.62 + wob * 0.6);
          if (j === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      ctx.globalAlpha = 0.18 + clarity * 0.38;
      ctx.lineWidth = 1;
      for (let x = -radius * 1.25; x <= radius * 1.25; x += 34) {
        ctx.beginPath();
        ctx.moveTo(x, -radius * 0.82);
        ctx.lineTo(x + clarity * 18, radius * 0.82);
        ctx.stroke();
      }
      for (let y = -radius * 0.82; y <= radius * 0.82; y += 34) {
        ctx.beginPath();
        ctx.moveTo(-radius * 1.25, y);
        ctx.lineTo(radius * 1.25, y - clarity * 12);
        ctx.stroke();
      }

      ctx.globalAlpha = 0.55 + clarity * 0.25;
      ctx.lineWidth = 3;
      ctx.strokeRect(-radius * 1.18, -radius * 0.75, radius * 2.36, radius * 1.5);
      ctx.restore();
    }

    ctx.globalAlpha = 1;
  });
  return <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }}/>;
};

// ───────────────────────────────────────────
// DOT TUNNEL — perspective dot field, infinite zoom
// ───────────────────────────────────────────
const DotTunnel = () => {
  const ref = useExCanvas((ctx, W, H, t) => {
    ctx.fillStyle = '#0E0E12';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#FFFFFF';
    const cx = W / 2, cy = H / 2;
    const layers = 60;
    for (let l = 0; l < layers; l++) {
      const z = ((l + (t * 8) % 1) / layers);
      const radius = z * Math.max(W, H) * 1.1;
      const ringDots = 24 + l * 2;
      const opacity = Math.min(1, z * 1.6) * (1 - z) * 1.6;
      ctx.globalAlpha = Math.max(0, opacity);
      const dotSize = 0.5 + z * 5;
      for (let i = 0; i < ringDots; i++) {
        const a = (i / ringDots) * Math.PI * 2 + l * 0.07;
        const x = cx + Math.cos(a) * radius;
        const y = cy + Math.sin(a) * radius;
        ctx.beginPath();
        ctx.arc(x, y, dotSize, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
  });
  return <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }}/>;
};

// ───────────────────────────────────────────
// CONTOUR VALLEY — topographic line map
// ───────────────────────────────────────────
const ContourValley = ({ inverted = false }) => {
  const ref = useExCanvas((ctx, W, H, t) => {
    ctx.fillStyle = inverted ? '#FFFFFF' : '#0E0E12';
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = inverted ? '#0E0E12' : '#FFFFFF';
    ctx.lineWidth = 0.6;
    const rows = 120;
    for (let r = 0; r < rows; r++) {
      const y = (r / rows) * H;
      ctx.beginPath();
      ctx.globalAlpha = 0.15 + 0.6 * Math.abs(Math.sin(r * 0.2 + t * 0.4));
      for (let x = 0; x <= W; x += 6) {
        const wave1 = Math.sin(x * 0.012 + r * 0.13 + t * 0.5) * 18;
        const wave2 = Math.cos(x * 0.005 - r * 0.08 + t * 0.3) * 14;
        const yy = y + wave1 + wave2;
        if (x === 0) ctx.moveTo(x, yy); else ctx.lineTo(x, yy);
      }
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  });
  return <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }}/>;
};

// ───────────────────────────────────────────
// PIXEL DRIFT — coarse pixel grid, Perlin-ish noise
// ───────────────────────────────────────────
const PixelDrift = () => {
  const ref = useExCanvas((ctx, W, H, t) => {
    const cell = 12;
    for (let y = 0; y < H; y += cell) {
      for (let x = 0; x < W; x += cell) {
        const n = Math.sin(x * 0.02 + t) * Math.cos(y * 0.02 - t * 0.7)
                + Math.sin((x + y) * 0.01 + t * 0.4);
        const v = (n + 2) / 4;
        const dark = v < 0.55;
        ctx.fillStyle = dark ? '#0E0E12' : '#FFFFFF';
        ctx.fillRect(x, y, cell, cell);
      }
    }
  });
  return <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }}/>;
};

// ───────────────────────────────────────────
// RIBBON LATTICE — orthogonal flowing bands
// ───────────────────────────────────────────
const RibbonLattice = () => {
  const ref = useExCanvas((ctx, W, H, t) => {
    ctx.fillStyle = '#0E0E12';
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1;
    // horizontal ribbons
    for (let i = 0; i < 14; i++) {
      const y = (i / 14) * H + H * 0.04;
      ctx.globalAlpha = 0.3 + 0.5 * (i % 2);
      ctx.beginPath();
      for (let x = 0; x <= W; x += 6) {
        const yy = y + Math.sin(x * 0.008 + t + i) * 18;
        if (x === 0) ctx.moveTo(x, yy); else ctx.lineTo(x, yy);
      }
      ctx.stroke();
    }
    // vertical ribbons
    for (let i = 0; i < 10; i++) {
      const x = (i / 10) * W + W * 0.05;
      ctx.globalAlpha = 0.15 + 0.4 * ((i + 1) % 2);
      ctx.beginPath();
      for (let y = 0; y <= H; y += 6) {
        const xx = x + Math.cos(y * 0.006 - t * 0.7 + i) * 22;
        if (y === 0) ctx.moveTo(xx, y); else ctx.lineTo(xx, y);
      }
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  });
  return <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }}/>;
};

// ───────────────────────────────────────────
// LISSAJOUS BLOOM — shimmering parametric curves
// ───────────────────────────────────────────
const LissajousBloom = () => {
  const ref = useExCanvas((ctx, W, H, t) => {
    ctx.fillStyle = '#0E0E12';
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 0.5;
    const cx = W / 2, cy = H / 2;
    const Rx = W * 0.42, Ry = H * 0.42;
    for (let layer = 0; layer < 28; layer++) {
      ctx.globalAlpha = 0.15 + 0.3 * (layer / 28);
      const a = 3 + layer * 0.05;
      const b = 4 + Math.sin(t * 0.3 + layer * 0.2) * 0.5;
      const phase = t * 0.4 + layer * 0.3;
      ctx.beginPath();
      const N = 600;
      for (let i = 0; i <= N; i++) {
        const u = (i / N) * Math.PI * 2;
        const x = cx + Math.sin(a * u + phase) * Rx * (0.6 + 0.4 * (layer / 28));
        const y = cy + Math.sin(b * u) * Ry * (0.6 + 0.4 * (layer / 28));
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  });
  return <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }}/>;
};

// ───────────────────────────────────────────
// SCAN STATIC — glitchy horizontal bands, CRT vibe
// ───────────────────────────────────────────
const ScanStatic = () => {
  const ref = useExCanvas((ctx, W, H, t) => {
    ctx.fillStyle = '#0E0E12';
    ctx.fillRect(0, 0, W, H);
    // horizontal bands of varying density noise
    const bandH = 22;
    for (let y = 0; y < H; y += bandH) {
      const density = 0.3 + 0.7 * Math.abs(Math.sin(y * 0.04 + t * 0.6));
      const dots = Math.floor(W * density / 3);
      ctx.fillStyle = '#FFFFFF';
      for (let i = 0; i < dots; i++) {
        const x = Math.random() * W;
        const yy = y + Math.random() * bandH;
        ctx.globalAlpha = 0.3 + Math.random() * 0.7;
        ctx.fillRect(x, yy, 1 + Math.random() * 2, 1);
      }
    }
    // occasional bright slice
    ctx.globalAlpha = 0.9;
    const sliceY = (t * 240) % H;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, sliceY, W, 1.5);
    ctx.globalAlpha = 0.4;
    ctx.fillRect(0, sliceY + 6, W, 0.5);
    ctx.globalAlpha = 1;
  });
  return <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }}/>;
};

// ───────────────────────────────────────────
// DEFINITION SPLIT — fog/noise above, structured mist below
// ───────────────────────────────────────────
const DefinitionSplitBackground = () => {
  const ref = useExCanvas((ctx, W, H, t) => {
    ctx.fillStyle = '#0E0E12';
    ctx.fillRect(0, 0, W, H);

    const splitY = H * 0.52;
    const clarity = Math.min(t / 7, 1);

    // Upper half: scan noise, fog, and an unstable grid overlay.
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, W, splitY + 30);
    ctx.clip();
    ctx.fillStyle = '#07070A';
    ctx.fillRect(0, 0, W, splitY + 30);

    const bandH = 22;
    for (let y = 0; y < splitY + 30; y += bandH) {
      const density = 0.25 + 0.75 * Math.abs(Math.sin(y * 0.04 + t * 0.7));
      const dots = Math.floor(W * density / 2.6);
      ctx.fillStyle = '#FFFFFF';
      for (let i = 0; i < dots; i++) {
        ctx.globalAlpha = 0.08 + Math.random() * 0.4;
        ctx.fillRect(Math.random() * W, y + Math.random() * bandH, 1 + Math.random() * 2, 1);
      }
    }

    ctx.globalAlpha = 0.12;
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 0.8;
    const gridStep = 44;
    for (let x = -80; x < W + 80; x += gridStep) {
      ctx.beginPath();
      ctx.moveTo(x + Math.sin(t + x) * 18, 0);
      ctx.lineTo(x + Math.cos(t * 0.6 + x) * 26, splitY + 20);
      ctx.stroke();
    }
    for (let y = 20; y < splitY; y += gridStep) {
      ctx.beginPath();
      ctx.moveTo(0, y + Math.sin(t + y) * 16);
      ctx.lineTo(W, y + Math.cos(t * 0.7 + y) * 20);
      ctx.stroke();
    }

    ctx.globalCompositeOperation = 'screen';
    for (let i = 0; i < 18; i++) {
      ctx.globalAlpha = 0.045;
      ctx.fillStyle = i % 2 ? '#FFFFFF' : '#8B8B8B';
      ctx.beginPath();
      ctx.arc((Math.sin(i * 91.7) * 0.5 + 0.5) * W, (Math.sin(i * 43.2 + t * 0.2) * 0.5 + 0.5) * splitY, 80 + i * 12, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalCompositeOperation = 'source-over';
    ctx.restore();

    // The scan line descends and leaves structure behind.
    const lineY = 90 + clarity * (splitY + 90);
    const grad = ctx.createLinearGradient(0, lineY - 60, 0, lineY + 60);
    grad.addColorStop(0, 'rgba(255,255,255,0)');
    grad.addColorStop(0.45, 'rgba(255,255,255,0.16)');
    grad.addColorStop(0.5, 'rgba(255,255,255,0.78)');
    grad.addColorStop(0.55, 'rgba(255,255,255,0.16)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, lineY - 60, W, 120);

    // Lower half: cleaner, geometric, with the Lisbon-mist wire language.
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, splitY, W, H - splitY);
    ctx.clip();
    ctx.fillStyle = '#09090B';
    ctx.fillRect(0, splitY, W, H - splitY);
    ctx.globalAlpha = 0.18;
    ctx.fillStyle = '#11b5c9';
    for (let i = 0; i < 12; i++) {
      ctx.beginPath();
      ctx.arc((Math.sin(i * 127.1) * 0.5 + 0.5) * W, splitY + 80 + (Math.sin(i * 311.7) * 0.5 + 0.5) * (H - splitY - 60), 120 + i * 10, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 0.55;
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 26; i++) {
      const px = (Math.sin(i * 73.3) * 0.5 + 0.5) * W;
      const py = splitY + (Math.sin(i * 51.9) * 0.5 + 0.5) * (H - splitY);
      const sides = 3 + (i % 4);
      const r = 60 + (Math.sin(i * 17.2) * 0.5 + 0.5) * 150;
      ctx.beginPath();
      for (let k = 0; k <= sides; k++) {
        const a = (k / sides) * Math.PI * 2 + t * 0.08 + i;
        const x = px + Math.cos(a) * r;
        const y = py + Math.sin(a) * r;
        if (k === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.globalAlpha = 0.25;
      for (let l = 0; l < 8; l++) {
        ctx.beginPath();
        ctx.moveTo(px - 120, py - 90 + l * 22);
        ctx.lineTo(px + 120, py + 90 - l * 18);
        ctx.stroke();
      }
      ctx.globalAlpha = 0.55;
    }
    ctx.restore();

    ctx.globalAlpha = 1;
    ctx.fillStyle = '#0E0E12';
    ctx.fillRect(0, splitY - 4, W, 8);
    ctx.strokeStyle = 'rgba(255,255,255,0.26)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, splitY);
    ctx.lineTo(W, splitY);
    ctx.stroke();
  });
  return <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }}/>;
};

// ───────────────────────────────────────────
// CRYSTAL GRID — refracting square lattice
// ───────────────────────────────────────────
const CrystalGrid = ({ inverted = false }) => {
  const ref = useExCanvas((ctx, W, H, t) => {
    ctx.fillStyle = inverted ? '#FFFFFF' : '#0E0E12';
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = inverted ? '#0E0E12' : '#FFFFFF';
    ctx.lineWidth = 0.7;
    const step = 40;
    for (let y = 0; y < H + step; y += step) {
      for (let x = 0; x < W + step; x += step) {
        const phase = t + (x + y) * 0.005;
        const sz = step * (0.4 + 0.4 * Math.abs(Math.sin(phase)));
        const rot = phase * 0.3;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rot);
        ctx.beginPath();
        ctx.rect(-sz / 2, -sz / 2, sz, sz);
        ctx.stroke();
        // inner cross
        ctx.beginPath();
        ctx.moveTo(-sz/2, 0); ctx.lineTo(sz/2, 0);
        ctx.moveTo(0, -sz/2); ctx.lineTo(0, sz/2);
        ctx.stroke();
        ctx.restore();
      }
    }
  });
  return <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }}/>;
};

// ───────────────────────────────────────────
// HALFTONE PORTAL — radial halftone dots forming a vortex
// ───────────────────────────────────────────
const HalftonePortal = () => {
  const ref = useExCanvas((ctx, W, H, t) => {
    ctx.fillStyle = '#0E0E12';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#FFFFFF';
    const cx = W / 2, cy = H / 2;
    const maxR = Math.hypot(W, H) * 0.6;
    const rings = 60;
    for (let r = 0; r < rings; r++) {
      const radius = (r / rings) * maxR;
      const ang = t * 0.3 + r * 0.05;
      const segs = Math.max(8, Math.floor(radius / 14));
      const dotSize = 0.5 + (1 - r / rings) * 6;
      for (let i = 0; i < segs; i++) {
        const a = (i / segs) * Math.PI * 2 + ang;
        const x = cx + Math.cos(a) * radius;
        const y = cy + Math.sin(a) * radius;
        ctx.beginPath();
        ctx.arc(x, y, dotSize, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  });
  return <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }}/>;
};

// ───────────────────────────────────────────
// DRAFTING DESK — hand-drawn-looking architectural plan
// ───────────────────────────────────────────
const DraftingDesk = () => {
  const linesRef = peUseRef(null);
  if (!linesRef.current) {
    const ls = [];
    for (let i = 0; i < 80; i++) {
      ls.push({
        x1: Math.random(), y1: Math.random(),
        x2: Math.random(), y2: Math.random(),
        wobble: Math.random() * 0.5
      });
    }
    // grid of small tick marks
    const ticks = [];
    for (let i = 0; i < 200; i++) {
      ticks.push({ x: Math.random(), y: Math.random(), rot: Math.random() * Math.PI });
    }
    // small rectangles
    const rects = [];
    for (let i = 0; i < 15; i++) {
      rects.push({
        x: Math.random(), y: Math.random(),
        w: 0.04 + Math.random() * 0.08,
        h: 0.04 + Math.random() * 0.08
      });
    }
    linesRef.current = { ls, ticks, rects };
  }
  const ref = useExCanvas((ctx, W, H, t) => {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = '#0E0E12';
    const breath = Math.sin(t * 0.4) * 0.5 + 1;
    // long axis lines
    ctx.lineWidth = 0.5;
    ctx.globalAlpha = 0.4;
    linesRef.current.ls.forEach(l => {
      ctx.beginPath();
      ctx.moveTo(l.x1 * W, l.y1 * H);
      ctx.lineTo(l.x2 * W, l.y2 * H);
      ctx.stroke();
    });
    // tick marks
    ctx.lineWidth = 0.7;
    ctx.globalAlpha = 0.6;
    linesRef.current.ticks.forEach(tk => {
      const x = tk.x * W, y = tk.y * H;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(tk.rot);
      ctx.beginPath();
      ctx.moveTo(-3, 0); ctx.lineTo(3, 0);
      ctx.stroke();
      ctx.restore();
    });
    // rectangles
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.8;
    linesRef.current.rects.forEach((r, i) => {
      const x = r.x * W, y = r.y * H, w = r.w * W * breath, h = r.h * H * breath;
      ctx.strokeRect(x, y, w, h);
      // diagonal
      ctx.beginPath();
      ctx.moveTo(x, y); ctx.lineTo(x + w, y + h);
      ctx.stroke();
    });
    ctx.globalAlpha = 1;
  });
  return <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }}/>;
};

// ───────────────────────────────────────────
// WAVE FIELD — ocean of sine ripples (good background for video slide)
// ───────────────────────────────────────────
const WaveField = () => {
  const ref = useExCanvas((ctx, W, H, t) => {
    ctx.fillStyle = '#0E0E12';
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 0.6;
    const rows = 60;
    for (let r = 0; r < rows; r++) {
      const y = (r / rows) * H;
      ctx.globalAlpha = 0.3 + 0.4 * Math.abs(Math.sin(r * 0.3 + t));
      ctx.beginPath();
      for (let x = 0; x <= W; x += 4) {
        const yy = y + Math.sin(x * 0.02 + r * 0.5 + t * 1.2) * 12
                     + Math.sin(x * 0.005 - r * 0.2 + t * 0.6) * 24;
        if (x === 0) ctx.moveTo(x, yy); else ctx.lineTo(x, yy);
      }
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  });
  return <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }}/>;
};

const LisbonMistBackground = () => {
  const mistNoise = (n) => {
    const v = Math.sin(n * 127.1 + 311.7) * 43758.5453123;
    return v - Math.floor(v);
  };
  const mistCircle = (ctx, x, y, r) => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  };
  const drawWireMountains = (ctx, x, y, w, h, t, color, alpha) => {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.2;
    for (let i = 0; i < 34; i++) {
      const px = x + mistNoise(i * 3.3) * w;
      const py = y + mistNoise(i * 4.9) * h;
      const sides = 3 + (i % 4);
      ctx.beginPath();
      for (let k = 0; k <= sides; k++) {
        const a = (k / sides) * Math.PI * 2 + t * 0.08 + i;
        const r = 80 + mistNoise(i + k) * 210;
        const vx = px + Math.cos(a) * r;
        const vy = py + Math.sin(a) * r;
        if (k === 0) ctx.moveTo(vx, vy);
        else ctx.lineTo(vx, vy);
      }
      ctx.stroke();
      for (let l = 0; l < 10; l++) {
        ctx.beginPath();
        ctx.moveTo(px - 140, py - 120 + l * 24);
        ctx.lineTo(px + 140, py + 120 - l * 20);
        ctx.stroke();
      }
    }
    ctx.restore();
  };
  const ref = useExCanvas((ctx, W, H, t) => {
    ctx.fillStyle = '#0b0b0d';
    ctx.fillRect(0, 0, W, H);
    drawWireMountains(ctx, -120, -30, W + 240, H * 0.9, t * 0.8, '#ffffff', 0.35);
    ctx.save();
    for (let i = 0; i < 18; i++) {
      ctx.globalAlpha = 0.045;
      ctx.fillStyle = i % 2 ? '#11b5c9' : '#ffffff';
      mistCircle(ctx, mistNoise(i) * W, 330 + mistNoise(i + 4) * 610, 110 + i * 12 + Math.sin(t + i) * 20);
    }
    ctx.restore();
  });
  return <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }}/>;
};

Object.assign(window, {
  InkBloom, DotTunnel, ContourValley, PixelDrift,
  RibbonLattice, LissajousBloom, ScanStatic, CrystalGrid,
  HalftonePortal, DraftingDesk, WaveField, LisbonMistBackground,
  DefinitionSplitBackground
});
