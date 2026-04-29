import { W, H, TOTAL, DURATION } from "./slides.js";

const palette = {
  black: "#0b0b0d",
  white: "#f7f4ed",
  paper: "#fffaf0",
  accent1: "#11b5c9", // Cyan
  accent2: "#7c4dff", // Violet
  accent3: "#ff2a1f", // Red
  accent4: "#95ff2e", // Lime
  gray: "#8f8f8f",
  cream: "#f2dfb9",
};

export function renderSlide(ctx, index, slides, t) {
  const slide = slides[index];
  ctx.save();
  ctx.clearRect(0, 0, W, H);
  
  drawBackground(ctx, slide.theme, t);
  drawScene(ctx, slide.scene, t, index);
  drawTextLayout(ctx, slide, index);
  drawProgressBar(ctx, index, t);
  
  ctx.restore();
}

function drawBackground(ctx, theme, t) {
  let bg = palette.black;
  let noiseOpacity = 0.15;
  let noiseColor = "#ffffff";
  
  if (theme === "warm" || theme === "paper") {
    bg = palette.paper;
    noiseOpacity = 0.1;
    noiseColor = "#000000";
  } else if (theme === "mono") {
    bg = "#151515";
    noiseOpacity = 0.2;
  } else if (theme === "bright") {
    bg = "#0f172a";
  }

  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Grain/Noise simulation
  ctx.globalAlpha = noiseOpacity;
  ctx.fillStyle = noiseColor;
  for (let i = 0; i < 200; i++) {
    const x = ((Math.sin(i * 123.45) * 43758.5453) % 1) * W;
    const y = (((Math.cos(i * 67.89 + t * 5) * 43758.5453) % 1) + 1) % 1 * H;
    ctx.fillRect(x, y, i % 3 === 0 ? 2 : 1, i % 2 === 0 ? 2 : 1);
  }
  ctx.globalAlpha = 1;
}

function drawScene(ctx, scene, t, index) {
  if (scene === "cover") {
    drawTriangle(ctx, W/2 - 150, H/2 - 50, 120, t, palette.accent2);
    drawJinn(ctx, W/2 + 100, H/2 - 100, 1.2, t);
    drawWireframes(ctx, t, 0.2);
  }
  else if (scene === "noise") {
    drawFog(ctx, t, palette.accent1, palette.accent2);
  }
  else if (scene === "flow") {
    drawFlowField(ctx, t);
  }
  else if (scene === "particles") {
    drawParticles(ctx, t);
  }
  else if (scene === "fog") {
    drawFog(ctx, t * 0.5, palette.white, palette.gray);
    drawTriangle(ctx, 300, 400, 80, t, palette.black);
  }
  else if (scene === "partnership") {
    drawJinn(ctx, W/2 + 80, 500, 1.5, t);
    drawTriangle(ctx, W/2 - 120, 500, 140, t + 1, palette.accent4);
  }
  else if (scene === "geometry") {
    drawGeometry(ctx, t);
  }
  else if (scene === "wireframe") {
    drawWireframes(ctx, t, 0.4);
  }
  else if (scene === "map") {
    drawMap(ctx, t);
  }
  else if (scene === "target") {
    drawTarget(ctx, t);
  }
  else if (scene === "grid") {
    drawGrid(ctx, t);
  }
  else if (scene === "iterations") {
    drawIterations(ctx, t);
  }
  else if (scene === "glitch") {
    drawGlitch(ctx, t);
  }
  else if (scene === "final") {
    drawFinal(ctx, t);
  }
}

// Generative Primitives

function drawJinn(ctx, x, y, scale, t) {
  ctx.save();
  ctx.translate(x, y + Math.sin(t * 2) * 15);
  ctx.scale(scale, scale);
  
  // A glowing, abstract fluid shape representing the AI Jinn
  ctx.fillStyle = palette.accent1;
  ctx.beginPath();
  for(let i = 0; i < Math.PI * 2; i += 0.1) {
    const r = 80 + Math.sin(i * 3 + t * 4) * 15 + Math.cos(i * 2 - t * 2) * 20;
    const px = Math.cos(i) * r;
    const py = Math.sin(i) * r;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();

  // Core eye/dot
  ctx.fillStyle = palette.white;
  ctx.beginPath();
  ctx.arc(10, -10, 15, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = palette.black;
  ctx.beginPath();
  ctx.arc(12 + Math.cos(t)*3, -10 + Math.sin(t)*3, 6, 0, Math.PI * 2);
  ctx.fill();

  // Floating bits
  for(let i=0; i<5; i++) {
    ctx.fillStyle = palette.accent3;
    ctx.beginPath();
    ctx.arc(Math.cos(t*3+i)*60, Math.sin(t*2+i*2)*80 - 40, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

function drawTriangle(ctx, x, y, size, t, color) {
  ctx.save();
  ctx.translate(x, y + Math.cos(t * 1.5) * 10);
  ctx.rotate(Math.sin(t * 0.5) * 0.1);
  
  ctx.beginPath();
  ctx.moveTo(0, -size);
  ctx.lineTo(size * 0.866, size * 0.5);
  ctx.lineTo(-size * 0.866, size * 0.5);
  ctx.closePath();
  
  ctx.strokeStyle = color;
  ctx.lineWidth = 8;
  ctx.lineJoin = "round";
  ctx.stroke();

  // Triangle eye
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(0, 0, size * 0.15, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawWireframes(ctx, t, alpha) {
  ctx.save();
  ctx.strokeStyle = "rgba(255,255,255," + alpha + ")";
  ctx.lineWidth = 1;
  ctx.translate(W/2, 400);
  ctx.rotate(t * 0.2);
  for(let i=0; i<15; i++) {
    ctx.beginPath();
    ctx.ellipse(0, 0, 300 + Math.sin(t+i)*50, 100 + i*15, i * 0.1, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();
}

function drawFog(ctx, t, c1, c2) {
  ctx.save();
  ctx.globalAlpha = 0.3;
  for(let i=0; i<10; i++) {
    ctx.beginPath();
    ctx.strokeStyle = i % 2 === 0 ? c1 : c2;
    ctx.lineWidth = 3;
    const yOff = 300 + i * 50;
    for(let x=0; x<=W; x+=20) {
      const y = yOff + Math.sin(x * 0.01 + t * 2 + i) * 60;
      if (x===0) ctx.moveTo(x,y);
      else ctx.lineTo(x,y);
    }
    ctx.stroke();
  }
  ctx.restore();
}

function drawFlowField(ctx, t) {
  ctx.save();
  ctx.strokeStyle = palette.accent2;
  ctx.lineWidth = 2;
  ctx.globalAlpha = 0.5;
  for(let x=100; x<W-100; x+=60) {
    for(let y=200; y<600; y+=60) {
      const angle = Math.sin(x*0.01 + t) * Math.cos(y*0.01 + t) * Math.PI;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + Math.cos(angle)*40, y + Math.sin(angle)*40);
      ctx.stroke();
    }
  }
  ctx.restore();
}

function drawParticles(ctx, t) {
  ctx.save();
  for(let i=0; i<50; i++) {
    const x = ((Math.sin(i * 11) * 0.5 + 0.5) * W + t * 50) % W;
    const y = ((Math.cos(i * 13) * 0.5 + 0.5) * 600) + 100 + Math.sin(t*3+i)*20;
    ctx.fillStyle = i%2===0 ? palette.accent3 : palette.black;
    ctx.beginPath();
    ctx.arc(x, y, 4 + (i%5), 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawGeometry(ctx, t) {
  ctx.save();
  ctx.translate(W/2, 400);
  ctx.strokeStyle = palette.accent1;
  ctx.lineWidth = 3;
  for(let i=0; i<6; i++) {
    ctx.rotate(Math.PI / 3 + t * 0.1);
    ctx.strokeRect(-100, -100, 200, 200);
  }
  ctx.restore();
}

function drawMap(ctx, t) {
  ctx.save();
  ctx.strokeStyle = palette.accent3;
  ctx.lineWidth = 2;
  ctx.setLineDash([5, 10]);
  for(let i=0; i<5; i++) {
    ctx.beginPath();
    ctx.moveTo(100, 200 + i*80);
    ctx.bezierCurveTo(400, 200 + i*80 + Math.sin(t+i)*100, 600, 200 + i*80 - Math.cos(t+i)*100, W-100, 200 + i*80);
    ctx.stroke();
    ctx.fillStyle = palette.white;
    ctx.beginPath();
    ctx.arc(100 + ((t*50 + i*200) % (W-200)), 200 + i*80, 6, 0, Math.PI*2);
    ctx.fill();
  }
  ctx.restore();
}

function drawTarget(ctx, t) {
  ctx.save();
  ctx.translate(W/2, 400);
  ctx.strokeStyle = palette.black;
  ctx.lineWidth = 4;
  for(let i=1; i<=5; i++) {
    ctx.beginPath();
    ctx.arc(0, 0, i * 40 + Math.sin(t*2+i)*5, 0, Math.PI * 2);
    ctx.stroke();
  }
  drawTriangle(ctx, Math.sin(t)*50, Math.cos(t)*50, 30, t, palette.accent3);
  ctx.restore();
}

function drawGrid(ctx, t) {
  ctx.save();
  ctx.strokeStyle = "rgba(0,0,0,0.1)";
  ctx.lineWidth = 1;
  for(let x=50; x<W; x+=50) {
    ctx.beginPath(); ctx.moveTo(x, 100); ctx.lineTo(x, 700); ctx.stroke();
  }
  for(let y=100; y<700; y+=50) {
    ctx.beginPath(); ctx.moveTo(50, y); ctx.lineTo(W-50, y); ctx.stroke();
  }
  ctx.fillStyle = palette.accent2;
  ctx.fillRect(150, 200 + Math.sin(t)*20, 150, 100);
  ctx.fillStyle = palette.accent4;
  ctx.fillRect(400, 350 + Math.cos(t)*20, 200, 150);
  ctx.restore();
}

function drawIterations(ctx, t) {
  ctx.save();
  ctx.translate(W/2, 400);
  for(let i=0; i<8; i++) {
    ctx.rotate(Math.PI / 4 + t * 0.2);
    ctx.strokeStyle = i%2===0 ? palette.white : palette.accent1;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(150, 0, 40 + Math.sin(t*3+i)*10, 0, Math.PI * 2);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(40, 0);
    ctx.lineTo(100, 0);
    ctx.stroke();
  }
  ctx.restore();
}

function drawGlitch(ctx, t) {
  ctx.save();
  for(let i=0; i<20; i++) {
    ctx.fillStyle = i%2===0 ? palette.accent1 : palette.accent3;
    ctx.globalAlpha = Math.random() * 0.5 + 0.1;
    const w = Math.random() * 300 + 50;
    const h = Math.random() * 20 + 2;
    const x = W/2 - w/2 + (Math.random()-0.5)*100;
    const y = 300 + Math.random()*300;
    if(Math.sin(t*10 + i) > 0) {
      ctx.fillRect(x, y, w, h);
    }
  }
  ctx.restore();
}

function drawFinal(ctx, t) {
  ctx.save();
  ctx.fillStyle = palette.cream;
  ctx.fillRect(W/2 - 200, 150, 400, 450);
  
  ctx.fillStyle = palette.black;
  ctx.font = "italic 40px 'Space Mono'";
  ctx.textAlign = "center";
  ctx.fillText("ФОТО", W/2, 350);
  ctx.fillText("АНКИ", W/2, 400);
  
  drawJinn(ctx, W/2 - 250, 400, 0.8, t);
  drawTriangle(ctx, W/2 + 250, 400, 60, t, palette.accent2);
  ctx.restore();
}

// Text Layout

function drawTextLayout(ctx, slide, index) {
  const isDarkBg = slide.theme === "bright" || slide.theme === "mono" || slide.theme === "cold";
  const cardColor = isDarkBg ? "rgba(255,250,240,0.95)" : "rgba(11,11,13,0.95)";
  const textColor = isDarkBg ? palette.black : palette.white;
  
  const cw = W - 120;
  const ch = slide.title.length > 50 ? 800 : 700;
  const cx = 60;
  const cy = H - ch - 80;

  // Draw card panel
  ctx.fillStyle = cardColor;
  ctx.shadowColor = "rgba(0,0,0,0.2)";
  ctx.shadowBlur = 30;
  ctx.shadowOffsetY = 15;
  ctx.fillRect(cx, cy, cw, ch);
  ctx.shadowColor = "transparent";

  // Kicker
  ctx.fillStyle = isDarkBg ? "#666" : "#aaa";
  ctx.font = "bold 24px 'Space Mono'";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText(slide.kicker.toUpperCase(), cx + 60, cy + 60);

  // Title
  ctx.fillStyle = textColor;
  const useGothic = index === 0 || index === 2 || index === 7 || index === 12;
  const titleFont = useGothic ? "60px 'UnifrakturMaguntia'" : "bold 60px 'Inter'";
  const titleY = cy + 130;
  wrapText(ctx, slide.title, cx + 60, titleY, cw - 120, 70, titleFont);

  // Body
  const bodyY = cy + (slide.title.length > 40 ? 320 : 250);
  const bodyFontSize = slide.body.length > 300 ? 32 : 36;
  const bodyFont = "500 " + bodyFontSize + "px 'Inter'";
  wrapText(ctx, slide.body, cx + 60, bodyY, cw - 120, bodyFontSize * 1.4, bodyFont, textColor);

  // Slide Number
  ctx.fillStyle = isDarkBg ? palette.white : palette.black;
  ctx.font = "bold 32px 'Space Mono'";
  ctx.textAlign = "right";
  ctx.fillText(`${String(index + 1).padStart(2, '0')} / ${TOTAL}`, W - 60, 60);
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight, font, color) {
  ctx.font = font;
  if(color) ctx.fillStyle = color;
  const paras = text.split('\n');
  let currentY = y;

  for(const para of paras) {
    if(!para.trim()) {
      currentY += lineHeight * 0.5;
      continue;
    }
    const words = para.split(' ');
    let line = '';
    
    for(let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      
      if(testWidth > maxWidth && n > 0) {
        ctx.fillText(line, x, currentY);
        line = words[n] + ' ';
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, currentY);
    currentY += lineHeight;
  }
}

// Progress Bar Signature
function drawProgressBar(ctx, index, t) {
  const barHeight = 12;
  const y = H - barHeight;
  const segW = W / TOTAL;
  
  // Track background
  ctx.fillStyle = "rgba(255,255,255,0.1)";
  ctx.fillRect(0, y, W, barHeight);

  // Completed segments
  ctx.fillStyle = palette.white;
  ctx.fillRect(0, y, segW * index, barHeight);

  // Current animating segment
  ctx.fillStyle = palette.accent4;
  const progress = (t % DURATION) / DURATION;
  ctx.fillRect(segW * index, y, segW * progress, barHeight);
}
