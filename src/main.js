import { slides, W, H, DURATION } from "./slides.js";
import { renderSlide } from "./render.js";

const app = document.querySelector("#app");
const params = new URLSearchParams(window.location.search);
const exportMode = params.get("export") === "1";
const frameParam = params.get("frame");
const slideParam = params.get("slide");

if (exportMode) {
  // Export mode: just render one specific frame of one slide
  document.body.classList.add("export-mode");
  const slideIndex = parseInt(slideParam) || 0;
  const frame = parseInt(frameParam) || 0;
  const fps = 30;
  const t = frame / fps;

  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  canvas.className = "export-canvas";
  app.appendChild(canvas);
  
  // Need to make sure fonts are loaded before we render for export
  document.fonts.ready.then(() => {
    const ctx = canvas.getContext("2d");
    renderSlide(ctx, slideIndex, slides, t);
    // Signal to playwright that we are done rendering
    window.__RENDER_DONE__ = true;
  });
} else {
  // Preview mode: render grid of all slides animating
  buildPreviewGrid();
}

function buildPreviewGrid() {
  const header = document.createElement("header");
  header.innerHTML = `
    <div>
      <p>Instagram carousel preview</p>
      <h1>Два дня вайбкодинга в Лиссабоне</h1>
    </div>
    <div class="meta">14 slides · 2:3 (1080x1620) · Animated canvas</div>
  `;
  app.appendChild(header);

  const grid = document.createElement("div");
  grid.className = "grid";
  app.appendChild(grid);

  const contexts = [];

  slides.forEach((slide, i) => {
    const wrap = document.createElement("div");
    wrap.className = "slide-wrap";

    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    
    const caption = document.createElement("div");
    caption.className = "caption";
    caption.textContent = `${String(i + 1).padStart(2, '0')} / ${slide.title}`;

    wrap.appendChild(canvas);
    wrap.appendChild(caption);
    grid.appendChild(wrap);

    contexts.push({
      ctx: canvas.getContext("2d"),
      index: i
    });
  });

  const start = performance.now();

  function tick(now) {
    // Wait until fonts are loaded to start drawing text
    if (document.fonts.status === 'loaded') {
      const elapsed = (now - start) / 1000;
      const t = elapsed % DURATION;
      
      contexts.forEach(({ ctx, index }) => {
        renderSlide(ctx, index, slides, t);
      });
    }
    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}
