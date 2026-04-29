// Full-bleed black-and-white generative patterns — the visual stars
// All render to canvas, animate continuously. Inspired by:
//   IMG_0066 (wireframe shards), IMG_0063 (dense scribble mandala),
//   IMG_0068 (face-blob ring), 0010x0010 reels (linear striations + voids)

const { useEffect: pUseEffect, useRef: pUseRef } = React;

const useCanvas = (drawFn, deps = []) => {
  const ref = pUseRef(null);
  pUseEffect(() => {
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
// 1) WIREFRAME SHARDS — like IMG_0066 «Доступ»
// dense triangulated polyhedra with line-fill, slowly rotating cluster
// ───────────────────────────────────────────
const ShardField = ({ inverted = false }) => {
  // pre-generate shards once
  const shardsRef = pUseRef(null);
  if (!shardsRef.current) {
    const N = 28;
    const shards = [];
    for (let i = 0; i < N; i++) {
      const cx = Math.random(), cy = Math.random();
      const size = 0.15 + Math.random() * 0.25;
      const rot = Math.random() * Math.PI * 2;
      // 3-5 vertex polygon
      const vCount = 3 + (Math.random() < 0.5 ? 0 : 1);
      const verts = [];
      for (let j = 0; j < vCount; j++) {
        const a = (j / vCount) * Math.PI * 2 + Math.random() * 0.5;
        const r = size * (0.6 + Math.random() * 0.5);
        verts.push([Math.cos(a) * r, Math.sin(a) * r]);
      }
      const lineDir = Math.random() * Math.PI;
      const lineGap = 0.005 + Math.random() * 0.01;
      const phase = Math.random() * Math.PI * 2;
      const driftSpeed = 0.05 + Math.random() * 0.1;
      shards.push({ cx, cy, rot, verts, lineDir, lineGap, phase, driftSpeed });
    }
    shardsRef.current = shards;
  }

  const ref = useCanvas((ctx, W, H, t) => {
    ctx.fillStyle = inverted ? '#FFFFFF' : '#0E0E12';
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = inverted ? '#0E0E12' : '#FFFFFF';
    ctx.lineWidth = 0.7;
    const minD = Math.min(W, H);

    shardsRef.current.forEach((s, idx) => {
      const cx = (s.cx + Math.cos(t * s.driftSpeed + s.phase) * 0.04) * W;
      const cy = (s.cy + Math.sin(t * s.driftSpeed * 0.7 + s.phase) * 0.04) * H;
      const rot = s.rot + t * s.driftSpeed * 0.3;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);

      // outline
      ctx.beginPath();
      s.verts.forEach((v, i) => {
        const x = v[0] * minD, y = v[1] * minD;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.stroke();

      // line-fill (parallel hatching, clipped)
      ctx.save();
      ctx.clip();
      ctx.rotate(s.lineDir);
      const span = minD;
      const gap = s.lineGap * minD;
      ctx.beginPath();
      for (let y = -span; y < span; y += gap) {
        ctx.moveTo(-span, y);
        ctx.lineTo(span, y);
      }
      ctx.stroke();
      ctx.restore();

      ctx.restore();
    });
  });

  return <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }}/>;
};

// ───────────────────────────────────────────
// 2) SCRIBBLE MANDALA — like IMG_0063 «Механика»
// concentric scribble rings, breathing
// ───────────────────────────────────────────
const ScribbleMandala = ({ inverted = false }) => {
  const ref = useCanvas((ctx, W, H, t) => {
    ctx.fillStyle = inverted ? '#0E0E12' : '#ECE6D6';
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = inverted ? '#ECE6D6' : '#0E0E12';
    ctx.lineWidth = 0.9;
    const cx = W / 2, cy = H / 2;
    const maxR = Math.min(W, H) * 0.42;
    const breath = 1 + Math.sin(t * 0.5) * 0.04;

    const rings = 14;
    for (let r = 0; r < rings; r++) {
      const radius = ((r + 1) / rings) * maxR * breath;
      const segments = 80 + r * 12;
      ctx.beginPath();
      for (let i = 0; i <= segments; i++) {
        const a = (i / segments) * Math.PI * 2;
        const wobble = Math.sin(a * (8 + r) + t * 0.3 + r) * (3 + r * 0.6);
        const wobble2 = Math.cos(a * (12 - r * 0.4) - t * 0.2) * (2 + r * 0.3);
        const rr = radius + wobble + wobble2;
        const x = cx + Math.cos(a) * rr;
        const y = cy + Math.sin(a) * rr;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  });
  return <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }}/>;
};

// ───────────────────────────────────────────
// 3) FACE-BLOB RING — like IMG_0068 «Дальше»
// ring of abstract sleeping/cocooned faces, slowly orbiting
// ───────────────────────────────────────────
const FaceRing = () => {
  const ref = useCanvas((ctx, W, H, t) => {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, W, H);
    const cx = W / 2, cy = H / 2;
    const maxR = Math.min(W, H) * 0.46;
    // black ring with hole
    ctx.fillStyle = '#0E0E12';
    ctx.beginPath();
    ctx.arc(cx, cy, maxR, 0, Math.PI * 2);
    ctx.arc(cx, cy, maxR * 0.32, 0, Math.PI * 2, true);
    ctx.fill('evenodd');

    // faces in 2 orbits
    const drawFace = (x, y, scale, rot, mood) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.scale(scale, scale);
      // blob outline (white)
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      // C-shape blob
      ctx.moveTo(-15, -22);
      ctx.bezierCurveTo(20, -28, 28, 0, 18, 18);
      ctx.bezierCurveTo(10, 28, -8, 26, -16, 16);
      ctx.bezierCurveTo(-10, 8, -8, 4, -10, 0);
      ctx.bezierCurveTo(-12, -4, -8, -10, -4, -8);
      ctx.bezierCurveTo(0, -6, -2, -2, 2, -4);
      ctx.bezierCurveTo(8, -8, 8, -16, -2, -18);
      ctx.bezierCurveTo(-10, -19, -16, -20, -15, -22);
      ctx.closePath();
      ctx.fill();
      // tiny eyes (closed = small line)
      ctx.strokeStyle = '#0E0E12';
      ctx.lineWidth = 1.4;
      ctx.lineCap = 'round';
      ctx.beginPath();
      if (mood < 0.5) {
        ctx.moveTo(-2, -10); ctx.lineTo(4, -10);
        ctx.moveTo(8, -8); ctx.lineTo(14, -8);
      } else {
        ctx.arc(2, -10, 1.4, 0, Math.PI * 2);
        ctx.moveTo(11, -8); ctx.arc(11, -8, 1.4, 0, Math.PI * 2);
      }
      ctx.stroke();
      // mouth
      ctx.beginPath();
      ctx.moveTo(2, -2); ctx.lineTo(8, -2);
      ctx.stroke();
      ctx.restore();
    };

    // outer ring
    const outerN = 16;
    for (let i = 0; i < outerN; i++) {
      const a = (i / outerN) * Math.PI * 2 + t * 0.05;
      const r = maxR * 0.78;
      const x = cx + Math.cos(a) * r;
      const y = cy + Math.sin(a) * r;
      drawFace(x, y, 1.6 + Math.sin(t + i) * 0.08, a + Math.PI/2, (i % 3) / 3);
    }
    // inner ring
    const innerN = 11;
    for (let i = 0; i < innerN; i++) {
      const a = (i / innerN) * Math.PI * 2 - t * 0.07 + 0.3;
      const r = maxR * 0.5;
      const x = cx + Math.cos(a) * r;
      const y = cy + Math.sin(a) * r;
      drawFace(x, y, 1.2 + Math.sin(t * 1.2 + i) * 0.08, a + Math.PI/2, ((i + 1) % 2));
    }
  });
  return <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }}/>;
};

// ───────────────────────────────────────────
// 4) WATERFALL CHANNEL — like 0010x0010 reels
// vertical striations with a glowing void
// ───────────────────────────────────────────
const Waterfall = () => {
  const ref = useCanvas((ctx, W, H, t) => {
    ctx.fillStyle = '#0E0E12';
    ctx.fillRect(0, 0, W, H);
    const cx = W / 2;
    // halo ring
    const grad = ctx.createRadialGradient(cx, H * 0.3, 30, cx, H * 0.3, W * 0.55);
    grad.addColorStop(0, '#000');
    grad.addColorStop(0.4, 'rgba(220,220,220,0.05)');
    grad.addColorStop(0.6, 'rgba(255,255,255,0.4)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.beginPath(); ctx.arc(cx, H * 0.3, W * 0.55, 0, Math.PI * 2); ctx.fill();

    // void
    ctx.fillStyle = '#0E0E12';
    ctx.beginPath(); ctx.arc(cx, H * 0.3, W * 0.13, 0, Math.PI * 2); ctx.fill();

    // vertical fall lines
    ctx.strokeStyle = 'rgba(255,255,255,0.7)';
    ctx.lineWidth = 0.6;
    const fallTop = H * 0.4;
    for (let i = 0; i < 180; i++) {
      const x = cx - W * 0.13 + (i / 180) * W * 0.26 + Math.sin(t * 2 + i) * 1;
      const len = H * (0.55 + Math.sin(i * 0.3 + t) * 0.04);
      const offset = ((t * 60 + i * 7) % 30) - 15;
      ctx.globalAlpha = 0.3 + Math.random() * 0.4;
      ctx.beginPath();
      ctx.moveTo(x, fallTop + offset);
      ctx.lineTo(x, fallTop + len);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // ground silhouette (peaks)
    ctx.fillStyle = '#0E0E12';
    ctx.beginPath();
    ctx.moveTo(0, H);
    ctx.lineTo(0, H * 0.78);
    for (let i = 0; i < 40; i++) {
      const x = (i / 40) * W;
      const peak = H * 0.78 + Math.sin(i * 1.7) * 30 - Math.abs(i - 20) * 2;
      ctx.lineTo(x, peak);
    }
    ctx.lineTo(W, H * 0.78);
    ctx.lineTo(W, H);
    ctx.closePath();
    ctx.fill();

    // peak strokes
    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    ctx.lineWidth = 0.4;
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * W;
      const y = H * 0.78 + Math.random() * H * 0.22;
      ctx.beginPath();
      ctx.moveTo(x, y); ctx.lineTo(x, y + 4 + Math.random() * 8);
      ctx.stroke();
    }
  });
  return <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }}/>;
};

// ───────────────────────────────────────────
// 5) RED GENIE — smoky figure (replaces octopus reference)
// ───────────────────────────────────────────
const RedGenie = ({ scale = 1 }) => {
  const ref = useCanvas((ctx, W, H, t) => {
    ctx.fillStyle = '#0E0E12';
    ctx.fillRect(0, 0, W, H);
    const cx = W / 2, cy = H * 0.55;
    const maxR = Math.min(W, H) * 0.4 * scale;

    // smoky red layered blobs
    ctx.globalCompositeOperation = 'lighter';
    for (let layer = 0; layer < 60; layer++) {
      const a = (layer / 60) * Math.PI * 2 + t * 0.3;
      const r = maxR * (0.5 + 0.5 * Math.sin(t * 0.5 + layer * 0.4));
      const x = cx + Math.cos(a) * maxR * 0.4 + Math.sin(t + layer) * 20;
      const y = cy + Math.sin(a) * maxR * 0.4 + Math.cos(t * 1.2 + layer) * 20;
      const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
      grad.addColorStop(0, 'rgba(180,40,40,0.18)');
      grad.addColorStop(0.4, 'rgba(120,30,40,0.10)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    }
    // bright core
    const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR * 0.3);
    core.addColorStop(0, 'rgba(255,180,140,0.8)');
    core.addColorStop(0.4, 'rgba(220,80,60,0.3)');
    core.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = core;
    ctx.beginPath(); ctx.arc(cx, cy, maxR * 0.3, 0, Math.PI * 2); ctx.fill();
    ctx.globalCompositeOperation = 'source-over';

    // figure silhouette inside the smoke (vertical pillar)
    ctx.fillStyle = 'rgba(20,5,5,0.55)';
    ctx.beginPath();
    ctx.ellipse(cx, cy + maxR * 0.05, maxR * 0.18, maxR * 0.5, 0, 0, Math.PI * 2);
    ctx.fill();
    // head suggestion
    ctx.beginPath();
    ctx.arc(cx, cy - maxR * 0.45, maxR * 0.13, 0, Math.PI * 2);
    ctx.fill();
  });
  return <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }}/>;
};

// ───────────────────────────────────────────
// 6) DENSE LINES — vertical/diagonal stripe pattern, scrolling
// ───────────────────────────────────────────
const StripeFlow = ({ angle = 0.3 }) => {
  const ref = useCanvas((ctx, W, H, t) => {
    ctx.fillStyle = '#0E0E12';
    ctx.fillRect(0, 0, W, H);
    ctx.save();
    ctx.translate(W/2, H/2);
    ctx.rotate(angle);
    ctx.translate(-W/2, -H/2);
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 0.5;
    const span = Math.max(W, H) * 1.6;
    for (let i = -span; i < span; i += 6) {
      const off = Math.sin(t * 0.5 + i * 0.005) * 4;
      const alpha = 0.25 + 0.5 * Math.sin(i * 0.02 + t * 0.4) ** 2;
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.moveTo(i + off, -span);
      ctx.lineTo(i - off, span);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    ctx.restore();
  });
  return <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }}/>;
};

// ───────────────────────────────────────────
// 7) NOISE GRAIN overlay (animated)
// ───────────────────────────────────────────
const LiveGrain = ({ opacity = 0.12 }) => {
  const ref = pUseRef(null);
  pUseEffect(() => {
    const c = ref.current;
    const ctx = c.getContext('2d');
    const W = c.width = 240, H = c.height = 240;
    let raf;
    const tick = () => {
      const img = ctx.createImageData(W, H);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = Math.random() * 255;
        img.data[i] = v; img.data[i+1] = v; img.data[i+2] = v;
        img.data[i+3] = 255 * opacity;
      }
      ctx.putImageData(img, 0, 0);
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, [opacity]);
  return <canvas ref={ref} style={{
    position: 'absolute', inset: 0, width: '100%', height: '100%',
    pointerEvents: 'none', mixBlendMode: 'overlay'
  }}/>;
};

// ───────────────────────────────────────────
// 8) TUNNEL VOID — striated rings forming a black hole
// ───────────────────────────────────────────
const TunnelVoid = () => {
  const ref = useCanvas((ctx, W, H, t) => {
    ctx.fillStyle = '#0E0E12';
    ctx.fillRect(0, 0, W, H);
    const cx = W/2, cy = H/2;
    const maxR = Math.min(W, H) * 0.48;
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 0.5;
    for (let r = 6; r < maxR; r += 1.4) {
      const segs = Math.floor(r * 1.5);
      const wob = Math.sin(t + r * 0.05) * 3;
      ctx.globalAlpha = 0.2 + 0.7 * (r / maxR);
      ctx.beginPath();
      for (let i = 0; i <= segs; i++) {
        const a = (i / segs) * Math.PI * 2 + t * 0.05 * Math.sign(Math.sin(r * 0.3));
        const rr = r + Math.sin(a * 6 + t + r * 0.1) * (1 + r * 0.01) + wob;
        const x = cx + Math.cos(a) * rr;
        const y = cy + Math.sin(a) * rr;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    // central void
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#0E0E12';
    ctx.beginPath();
    ctx.arc(cx, cy, maxR * 0.18 + Math.sin(t) * 4, 0, Math.PI * 2);
    ctx.fill();
  });
  return <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }}/>;
};

Object.assign(window, {
  ShardField, ScribbleMandala, FaceRing, Waterfall,
  RedGenie, StripeFlow, LiveGrain, TunnelVoid
});
