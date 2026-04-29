// Slide chrome — true 2:3 (1080×1620), white card overlay, gothic anchor + body
// 14 slides: 00..13 — no story-strips, no progress bars (per direction)

const SLIDE_W = 1080;
const SLIDE_H = 1620;
const TOTAL = 15;

// Mood palettes — reshape the whole feel
const MOODS = {
  night: { slideBg: '#0E0E12', slideFg: '#FFFFFF', accent: '#ECE6D6' },
  day:   { slideBg: '#F2EEE3', slideFg: '#0E0E12', accent: '#0E0E12' },
  acid:  { slideBg: '#0A0A0A', slideFg: '#E8FF59', accent: '#FF2EC8' },
};

const SlideFrame = ({ index, children, dark = true, style = {} }) => {
  const t = (typeof window !== 'undefined' && window.__carouselTweaks) || { mood: 'night' };
  const mood = MOODS[t.mood] || MOODS.night;
  // dark prop preserved for slides that override (e.g. white slide in day-mood already inverts)
  const bg = dark ? mood.slideBg : (t.mood === 'day' ? '#FFFFFF' : mood.slideBg);
  const fg = dark ? mood.slideFg : (t.mood === 'day' ? '#0E0E12' : mood.slideFg);
  return (
  <div
    data-slide-index={index}
    data-screen-label={`${String(index).padStart(2, '0')} slide`}
    style={{
      position: 'relative',
      width: SLIDE_W, height: SLIDE_H,
      background: bg,
      color: fg,
      overflow: 'hidden',
      fontFamily: '"Inter", system-ui, sans-serif',
      ...style
    }}
  >
    {children}
  </div>
  );
};

// === White card overlay ===
// Anchor-voice → font + sizing
const ANCHOR_VOICES = {
  gothic: {
    fontFamily: '"Ruslan Display", "UnifrakturCook", serif',
    fontWeight: 700, fontSize: 72, letterSpacing: 0,
    textTransform: 'none',
  },
  serif: {
    fontFamily: '"Unbounded", "Inter", serif',
    fontWeight: 800, fontSize: 64, letterSpacing: '-0.02em',
    textTransform: 'none',
  },
  mono: {
    fontFamily: '"JetBrains Mono", monospace',
    fontWeight: 700, fontSize: 48, letterSpacing: '0.04em',
    textTransform: 'uppercase',
  },
};

// Card-tone → figure/ground treatment
const CARD_TONES = {
  paper:       { bg: '#FFFFFF', fg: '#0E0E12', border: 'none' },
  transparent: { bg: 'transparent', fg: null, border: 'none' }, // fg = inherit slide
  inverted:    { bg: '#0E0E12', fg: '#ECE6D6', border: 'none' },
};

const Card = ({ anchor, children, position = 'center', style = {} }) => {
  const t = (typeof window !== 'undefined' && window.__carouselTweaks) || {};
  const voice = ANCHOR_VOICES[t.anchorVoice] || ANCHOR_VOICES.gothic;
  const toneKey = t.cardTone || 'paper';
  const tone = CARD_TONES[toneKey];
  const mood = MOODS[t.mood] || MOODS.night;

  const positions = {
    'center':       { top: '50%', left: 60, right: 60, transform: 'translateY(-50%)' },
    'lower':        { bottom: 130, left: 60, right: 60 },
    'upper':        { top: 200, left: 60, right: 60 },
    'lower-left':   { bottom: 130, left: 60, width: 620 },
    'upper-right':  { top: 200, right: 60, width: 620 },
    'upper-left':   { top: 200, left: 60, width: 620 },
    'lower-right':  { bottom: 130, right: 60, width: 620 },
  };

  // For transparent tone: inherit slide foreground; for acid mood add neon glow halo
  const fg = style.color ?? tone.fg ?? mood.slideFg;
  const padding = toneKey === 'transparent' ? '0' : '38px 44px';

  return (
    <div style={{
      position: 'absolute',
      background: tone.bg,
      color: fg,
      padding,
      ...positions[position],
      ...(toneKey === 'transparent' && t.mood === 'acid' ? {
        textShadow: '0 0 24px rgba(232,255,89,0.6)'
      } : {}),
      ...style
    }}>
      {anchor && (
        <div style={{
          ...voice,
          lineHeight: 1,
          marginBottom: 20,
          color: fg
        }}>
          {anchor}
        </div>
      )}
      <div style={{
        fontFamily: '"Inter", sans-serif',
        fontSize: 30,
        lineHeight: 1.35,
        color: fg
      }}>
        {children}
      </div>
    </div>
  );
};

Object.assign(window, { SlideFrame, Card, SLIDE_W, SLIDE_H, TOTAL });
