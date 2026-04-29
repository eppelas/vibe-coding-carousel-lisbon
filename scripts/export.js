import { chromium } from 'playwright';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const W = 1080;
const H = 1620;
const FPS = 30;
const DURATION = 8; // seconds
const TOTAL_SLIDES = 14;
const TOTAL_FRAMES = FPS * DURATION;

const EXPORT_DIR = path.resolve(__dirname, '../exports');

if (!fs.existsSync(EXPORT_DIR)) {
  fs.mkdirSync(EXPORT_DIR);
}

async function exportSlide(browser, slideIndex) {
  const page = await browser.newPage({
    viewport: { width: W, height: H },
    deviceScaleFactor: 1
  });

  const outputPath = path.join(EXPORT_DIR, `slide_${String(slideIndex + 1).padStart(2, '0')}.mp4`);
  
  console.log(`Starting export for slide ${slideIndex + 1}...`);

  // Start FFmpeg process
  const ffmpeg = spawn('ffmpeg', [
    '-y',
    '-f', 'image2pipe',
    '-vcodec', 'png',
    '-r', `${FPS}`,
    '-i', '-',
    '-c:v', 'libx264',
    '-pix_fmt', 'yuv420p',
    '-crf', '18',
    outputPath
  ]);

  ffmpeg.stderr.on('data', (data) => {
    // Only log errors, ffmpeg output is verbose
    const msg = data.toString();
    if (msg.toLowerCase().includes('error')) {
      console.error(`ffmpeg stderr: ${msg}`);
    }
  });

  for (let f = 0; f < TOTAL_FRAMES; f++) {
    const url = `http://localhost:3000/?export=1&slide=${slideIndex}&frame=${f}`;
    await page.goto(url, { waitUntil: 'load' });
    
    // Wait for the render to complete
    await page.waitForFunction('window.__RENDER_DONE__ === true', { timeout: 5000 });
    
    const screenshot = await page.screenshot({ type: 'png', omitBackground: true });
    ffmpeg.stdin.write(screenshot);
    
    if (f % 30 === 0) {
      console.log(`Slide ${slideIndex + 1}: Rendered frame ${f}/${TOTAL_FRAMES}`);
    }
  }

  ffmpeg.stdin.end();

  await new Promise((resolve) => {
    ffmpeg.on('close', resolve);
  });

  console.log(`Finished export for slide ${slideIndex + 1}. Saved to ${outputPath}\n`);
  await page.close();
}

async function runExport() {
  console.log('Ensure the dev server is running on port 3000 before running this script!\n');
  const browser = await chromium.launch();

  for (let i = 0; i < TOTAL_SLIDES; i++) {
    await exportSlide(browser, i);
  }

  await browser.close();
  console.log('All exports completed!');
}

runExport().catch(console.error);
