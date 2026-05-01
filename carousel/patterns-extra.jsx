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
const InkBloom = ({ inverted = false }) => {
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
    blobsRef.current.forEach(b => {
      const cx = b.cx * W + Math.cos(t * b.speed + b.phase) * 30;
      const cy = b.cy * H + Math.sin(t * b.speed * 0.8 + b.phase) * 30;
      const baseR = b.r * minD;
      // multi-layer bloom
      for (let layer = 0; layer < 8; layer++) {
        const f = 1 - layer / 8;
        ctx.fillStyle = fg;
        ctx.globalAlpha = 0.05 + 0.04 * f;
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
    ctx.globalAlpha = 1;
  });
  return <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }}/>;
};

// ───────────────────────────────────────────
// FOG TO STRUCTURE — imported from Fog to Structure Slide.html
// ───────────────────────────────────────────
const FogToStructure = ({
  endForm = 'orbits',
  population = 6,
  turbulence = 0.07,
  startOffset = 0,
  speed = 1
}) => {
  const blobsRef = peUseRef(null);
  const seed = peUseRef(84321);
  const rand = () => {
    seed.current = (seed.current * 1664525 + 1013904223) >>> 0;
    return seed.current / 4294967296;
  };
  if (!blobsRef.current) {
    blobsRef.current = Array.from({ length: population }, () => ({
      cx: 0.15 + rand() * 0.7,
      cy: 0.15 + rand() * 0.7,
      r: 0.18 + rand() * 0.22,
      phase: rand() * 6,
      speed: 0.05 + rand() * 0.1,
      verts: Array.from({ length: 14 }, () => 0.7 + rand() * 0.5),
      teeth: 8 + Math.floor(rand() * 7),
      spin: (rand() < 0.5 ? -1 : 1) * (0.4 + rand() * 0.4)
    }));
  }

  const easeInOut = (x) => x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
  const smoothstep = (e0, e1, x) => {
    const v = Math.max(0, Math.min(1, (x - e0) / (e1 - e0)));
    return v * v * (3 - 2 * v);
  };

  const ref = useExCanvas((ctx, W, H, elapsedRaw) => {
    const elapsed = elapsedRaw * speed + startOffset;
    const duration = 15;
    const tRaw = (elapsed % duration) / duration;
    const p = easeInOut(tRaw);
    const t = elapsed * 1.6;
    const minD = Math.min(W, H);

    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = '#0E0E12';
    ctx.fillRect(0, 0, W, H);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const driftAmp = (20 + 50 * p) * (0.4 + turbulence * 1.2);
    const layers = Math.round(10 + 10 * p);
    const segs = 160;
    const wobFreq = 5 + 7 * p;
    const wobAmp = (0.06 + 0.16 * p) * (0.5 + turbulence);
    const layerSpread = 0.07 * p * (0.4 + turbulence * 1.2);
    const stretch = 1 + 0.9 * p;
    const crystAlpha = smoothstep(0.55, 1.0, p);
    const formMix = smoothstep(0.55, 1.0, p);

    blobsRef.current.forEach((b, idx) => {
      const cx = b.cx * W + Math.cos(t * b.speed + b.phase) * driftAmp;
      const cy = b.cy * H + Math.sin(t * b.speed * 0.8 + b.phase) * driftAmp;
      const baseR = b.r * minD * (0.85 + 0.15 * Math.sin(t * 0.4 + idx));
      const stretchAng = b.phase + t * 0.04 * p;
      const gearSpin = b.spin * t;
      const cloudOpa = 1 - 0.45 * p;

      for (let layer = 0; layer < layers; layer++) {
        const f = 1 - layer / layers;
        const layerRot = layerSpread * layer * (idx % 2 === 0 ? 1 : -1)
          + Math.sin(t * 0.05 + idx + layer) * 0.15 * p;
        ctx.fillStyle = '#FFFFFF';
        ctx.globalAlpha = (0.05 + 0.04 * f) * cloudOpa;
        ctx.beginPath();
        for (let i = 0; i <= segs; i++) {
          const a = (i / segs) * Math.PI * 2 + layerRot;
          const vi = Math.floor((i / segs) * b.verts.length) % b.verts.length;
          const wob = b.verts[vi] + Math.sin(a * wobFreq + t * 0.6 + b.phase) * wobAmp;
          const r = baseR * (0.7 + 0.3 * f) * wob;
          const lx = Math.cos(a) * r * stretch;
          const ly = Math.sin(a) * r;
          const x = cx + Math.cos(stretchAng) * lx - Math.sin(stretchAng) * ly;
          const y = cy + Math.sin(stretchAng) * lx + Math.cos(stretchAng) * ly;
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
      }

      if (crystAlpha <= 0.001) return;
      ctx.globalAlpha = crystAlpha;
      ctx.strokeStyle = '#FFFFFF';
      ctx.fillStyle = '#FFFFFF';
      ctx.lineWidth = 0.8;

      if (endForm === 'orbits') {
        for (let layer = 0; layer < 4; layer++) {
          ctx.globalAlpha = crystAlpha * (0.9 - layer * 0.18);
          ctx.beginPath();
          const ra = baseR * (0.4 + 0.18 * layer) * stretch;
          const rb = baseR * (0.4 + 0.18 * layer) * 0.78;
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(stretchAng + layer * 0.15);
          ctx.ellipse(0, 0, ra, rb, 0, 0, Math.PI * 2);
          ctx.restore();
          ctx.stroke();
          const sa = gearSpin * (1 + layer * 0.4);
          const rot = stretchAng + layer * 0.15;
          const sx = cx + Math.cos(rot) * Math.cos(sa) * ra - Math.sin(rot) * Math.sin(sa) * rb;
          const sy = cy + Math.sin(rot) * Math.cos(sa) * ra + Math.cos(rot) * Math.sin(sa) * rb;
          ctx.beginPath();
          ctx.arc(sx, sy, 3, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = crystAlpha;
        ctx.beginPath();
        ctx.arc(cx, cy, 4, 0, Math.PI * 2);
        ctx.fill();
      } else if (endForm === 'cogs') {
        const teeth = b.teeth;
        const N = teeth * 32;
        const sharp = 6 + 14 * formMix;
        const toothDepth = 0.11 * formMix;
        ctx.beginPath();
        for (let i = 0; i <= N; i++) {
          const a = (i / N) * Math.PI * 2 + gearSpin;
          const tooth = Math.tanh(Math.sin(a * teeth) * sharp) * 0.5 + 0.5;
          const r = baseR * (0.85 - toothDepth + toothDepth * 2 * tooth);
          const x = cx + Math.cos(a) * r;
          const y = cy + Math.sin(a) * r;
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(cx, cy, baseR * 0.32, 0, Math.PI * 2);
        ctx.stroke();
      }
    });
    ctx.globalAlpha = 1;
  }, [endForm, population, turbulence, startOffset, speed]);

  return <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }}/>;
};

// ───────────────────────────────────────────
// DOT TUNNEL — slow dot field, points drift out and softly respawn
// ───────────────────────────────────────────
const DotTunnel = ({ duration = 15 }) => {
  const ref = useExCanvas((ctx, W, H, t) => {
    ctx.fillStyle = '#0E0E12';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#FFFFFF';
    const cx = W / 2, cy = H / 2;
    const count = 520;
    const maxR = Math.max(W, H) * 0.82;
    const phase = (t % duration) / duration;
    for (let i = 0; i < count; i++) {
      const seed = (Math.sin(i * 127.1) * 43758.5453) % 1;
      const seed2 = (Math.sin(i * 311.7) * 24634.6345) % 1;
      const base = (seed + phase) % 1;
      const eased = base * base * (3 - 2 * base);
      const a = i * 2.399963 + Math.sin(i * 0.17) * 0.35;
      const wobble = Math.sin(t * 0.22 + i * 0.41) * 8;
      const r = 28 + eased * maxR + wobble;
      const x = cx + Math.cos(a) * r;
      const y = cy + Math.sin(a) * r * 1.14;
      const fadeIn = Math.min(1, base / 0.16);
      const fadeOut = Math.min(1, (1 - base) / 0.22);
      ctx.globalAlpha = 0.06 + Math.max(0, Math.min(fadeIn, fadeOut)) * 0.8;
      const dotSize = 1.1 + eased * 4.6 + seed2 * 0.8;
      ctx.beginPath();
      ctx.arc(x, y, dotSize, 0, Math.PI * 2);
      ctx.fill();
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

const LisbonMistBackground = ({
  background = '#0b0b0d',
  stroke = '#ffffff',
  showOrbs = true
} = {}) => {
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
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, W, H);
    drawWireMountains(ctx, -120, -30, W + 240, H * 0.9, t * 0.8, stroke, 0.35);
    if (showOrbs) {
      ctx.save();
      for (let i = 0; i < 18; i++) {
        ctx.globalAlpha = 0.045;
        ctx.fillStyle = i % 2 ? '#11b5c9' : '#ffffff';
        mistCircle(ctx, mistNoise(i) * W, 330 + mistNoise(i + 4) * 610, 110 + i * 12 + Math.sin(t + i) * 20);
      }
      ctx.restore();
    }
  });
  return <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }}/>;
};

const FogGridVeil = () => {
  const ref = useExCanvas((ctx, W, H, t) => {
    ctx.clearRect(0, 0, W, H);
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1;
    for (let i = 0; i < 38; i++) {
      const baseX = -80 + i * (W + 160) / 37;
      ctx.globalAlpha = 0.035 + (i % 5) * 0.01;
      ctx.beginPath();
      ctx.moveTo(baseX + Math.sin(t * 0.2 + i) * 28, -20);
      ctx.lineTo(baseX + Math.cos(t * 0.17 + i) * 72, H + 40);
      ctx.stroke();
    }
    for (let i = 0; i < 22; i++) {
      const y = i * H / 21;
      ctx.globalAlpha = 0.03 + (i % 4) * 0.012;
      ctx.beginPath();
      ctx.moveTo(-30, y + Math.sin(t * 0.2 + i) * 22);
      ctx.bezierCurveTo(W * 0.25, y - 38, W * 0.65, y + 34, W + 30, y + Math.cos(t * 0.16 + i) * 28);
      ctx.stroke();
    }
  });
  return <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }}/>;
};

const StudioGridNetwork = ({
  scale = 1,
  background = '#0f1014',
  ink = '#fff',
  lineAlpha = 0.2,
  clear = false,
  speed = 1,
  dotSize = 4,
  showCross = false
}) => {
  const stroke = ink === '#fff' || ink === '#FFFFFF'
    ? `rgba(255,255,255,${lineAlpha})`
    : `rgba(0,0,0,${lineAlpha})`;
  const ref = useExCanvas((ctx, W, H, t) => {
    const frame = t * 60 * speed;
    const cx = W / 2;
    const cy = H / 2;
    const s = Math.min(W / 458, H / 714) * scale;

    if (clear) {
      ctx.clearRect(0, 0, W, H);
    } else {
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, W, H);
    }
    ctx.fillStyle = ink;
    ctx.strokeStyle = stroke;

    for (let i = 0; i < 40; i++) {
      const x = cx + Math.sin(i * 13 + frame * 0.01) * 300 * s;
      const y = cy + Math.cos(i * 17 - frame * 0.005) * 300 * s;

      ctx.beginPath();
      ctx.globalAlpha = 0.78;
      ctx.arc(x, y, dotSize * s, 0, Math.PI * 2);
      ctx.fill();

      if (i % 3 === 0) {
        ctx.beginPath();
        ctx.globalAlpha = lineAlpha;
        ctx.moveTo(x, y);
        ctx.lineTo(cx, cy);
        ctx.stroke();
      }
    }
    if (showCross) {
      ctx.globalAlpha = 0.72;
      ctx.lineWidth = 1.4 * s;
      ctx.beginPath();
      ctx.moveTo(cx - 170 * s, cy);
      ctx.lineTo(cx + 170 * s, cy);
      ctx.moveTo(cx, cy - 170 * s);
      ctx.lineTo(cx, cy + 170 * s);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }, [scale, background, ink, lineAlpha, clear, stroke, speed, dotSize, showCross]);
  return <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }}/>;
};

Object.assign(window, {
  InkBloom, FogToStructure, DotTunnel, ContourValley, PixelDrift,
  RibbonLattice, LissajousBloom, ScanStatic, CrystalGrid,
  HalftonePortal, DraftingDesk, WaveField, LisbonMistBackground,
  DefinitionSplitBackground, FogGridVeil, StudioGridNetwork
});
