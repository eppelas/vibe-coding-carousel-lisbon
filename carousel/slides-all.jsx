// 14 slides — full-bleed pattern + white-card overlay
// Order matches the canonical text:
// 00 cover · 01 question · 02 definition · 03 processes · 04 fog · 05 partner ·
// 06 retreat · 07 meta-carousel · 08 toolmap · 09 your task · 10 PRD · 11 day-2 ·
// 12 visual block · 13 Anka

// 00 — COVER
const Slide00 = ({ index = 0 }) => (
  <SlideFrame index={index}>
    <div style={{ position: 'absolute', inset: 0 }}><Waterfall/></div>
    <LiveGrain opacity={0.10}/>

    <div style={{
      position: 'absolute', top: 110, left: 60, right: 60,
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: 22,
      letterSpacing: '0.18em',
      color: '#B8D83A',
      opacity: 0.95
    }}>
      ЛИССАБОН · 16–17 МАЯ · ОФЛАЙН
    </div>

    <Card position="center" style={{ background: '#0E0E12', color: '#FFFFFF' }}>
      <div style={{
        fontFamily: '"Unbounded", "Inter", sans-serif',
        fontWeight: 800,
        fontSize: 66,
        lineHeight: 1,
        letterSpacing: '-0.02em'
      }}>
        Лиссабон. два дня
      </div>
      <span style={{ fontFamily: '"Ruslan Display", "UnifrakturCook", serif', fontSize: 66, lineHeight: 1, display: 'block', marginTop: 4 }}>
        вайбкодинга.
      </span>
      <div style={{ marginTop: 22, fontSize: 29, lineHeight: 1.4 }}>
        Для тех, кто пока не считает себя техническим человеком.
        Будем разбираться в AI-инструментах, искать свои задачи и собирать первые
        прототипы и финальный проект.
      </div>
    </Card>
  </SlideFrame>
);

const SelfInkField = () => {
  const logs = [
    '[01] → мысль появилась { seed: "я", mode: "first-person" }',
    '[02] → не процесс, а ощущение { pressure: "0.55" }',
    '[03] → собрать задачу { particles: "24000" }',
    '[04] → вопрос: где это применить к жизни?',
    '[05] → inkField composite { word: "я", velocity: "7.59" }',
    '[06] → начать с себя, не с инструмента'
  ];
  const points = Array.from({ length: 72 }, (_, i) => {
    const col = i % 12;
    const row = Math.floor(i / 12);
    const x = 230 + col * 48 + Math.sin(i * 1.7) * 26;
    const y = 270 + row * 62 + Math.cos(i * 1.1) * 28;
    const rotate = -28 + ((i * 17) % 64);
    const delay = (i % 18) * 0.08;
    const scale = 0.7 + ((i * 7) % 10) / 18;
    return { x, y, rotate, delay, scale };
  });
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      background: 'linear-gradient(180deg, #F4F1EA 0%, #E9E8DF 48%, #0D0E0E 100%)'
    }}>
      <style>{`
        @keyframes selfWordPulse {
          0%, 100% { opacity: .58; filter: blur(12px); transform: translate(-50%, -50%) scale(.94); }
          50% { opacity: .96; filter: blur(2px); transform: translate(-50%, -50%) scale(1.02); }
        }
        @keyframes selfParticleDrift {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(var(--r)) scale(var(--s)); opacity: .42; }
          50% { transform: translate3d(18px, -22px, 0) rotate(calc(var(--r) + 18deg)) scale(calc(var(--s) + .18)); opacity: .86; }
        }
        @keyframes selfLogSlide {
          0% { transform: translateY(0); opacity: .46; }
          50% { transform: translateY(-10px); opacity: .74; }
          100% { transform: translateY(0); opacity: .46; }
        }
      `}</style>
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.22,
        backgroundImage: 'linear-gradient(rgba(5,5,5,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(5,5,5,0.05) 1px, transparent 1px)',
        backgroundSize: '52px 52px'
      }}/>
      <div style={{
        position: 'absolute',
        top: 36,
        left: 28,
        right: 28,
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 22,
        lineHeight: 1.58,
        color: '#063F32',
        opacity: 0.72,
        animation: 'selfLogSlide 6s ease-in-out infinite'
      }}>
        {logs.map((line, i) => <div key={i}>› {line}</div>)}
      </div>
      <div style={{
        position: 'absolute',
        top: '36%',
        left: '52%',
        width: 760,
        height: 520,
        transform: 'translate(-50%, -50%)',
        borderRadius: '52% 48% 46% 54%',
        background: 'radial-gradient(circle at 42% 46%, rgba(0,104,78,0.92), rgba(0,104,78,0.48) 42%, rgba(0,104,78,0.04) 72%)',
        filter: 'blur(20px)',
        opacity: 0.78
      }}/>
      <div style={{
        position: 'absolute',
        top: '36%',
        left: '52%',
        fontFamily: '"Unbounded", "Inter", sans-serif',
        fontSize: 420,
        fontWeight: 800,
        lineHeight: 1,
        color: '#00684E',
        opacity: 0.8,
        animation: 'selfWordPulse 7s ease-in-out infinite',
        textShadow: '0 18px 42px rgba(0,104,78,0.26)'
      }}>
        я
      </div>
      {points.map((p, i) => (
        <span key={i} style={{
          position: 'absolute',
          left: p.x,
          top: p.y,
          width: 48,
          height: 7,
          borderRadius: 20,
          background: i % 3 === 0 ? '#004F3F' : '#08765E',
          opacity: 0.62,
          '--r': `${p.rotate}deg`,
          '--s': p.scale,
          animation: `selfParticleDrift ${4.8 + (i % 6) * 0.35}s ease-in-out ${p.delay}s infinite`
        }}/>
      ))}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(8,9,9,0.08) 46%, rgba(8,9,9,0.92) 100%)'
      }}/>
    </div>
  );
};

// 01 — «я уже опоздал?»
const Slide01 = ({ index = 1 }) => (
  <SlideFrame index={index}>
    <SelfInkField/>
    <LiveGrain opacity={0.05}/>

    <Card anchor="«Я уже опоздал?»" position="upper">
      Если вы смотрите на AI и думаете именно так — это нормально.
      Все вокруг будто что-то собирают: продукты, агентов, лендинги,
      автоматизации, визуалы, контент-пайплайны.
    </Card>

    <Card position="lower" style={{
      bottom: 340,
      background: '#9BFF18',
      color: '#050505'
    }}>
      <div style={{ fontSize: 29, lineHeight: 1.38 }}>
        Если у вас мысли…
        <br/><br/>
        «Я не программист. У меня нет процессов. Я не хочу строить IT-продукт.
        Мне просто надо понять, как это применить к моей жизни и работе».
      </div>
      <div style={{
        marginTop: 22,
        fontFamily: '"Unbounded", "Inter", sans-serif',
        fontWeight: 800,
        fontSize: 39,
        lineHeight: 1.08
      }}>
        С этого и начнём.
      </div>
    </Card>
    <img
      src="assets/triangle-character-alpha-small.apng"
      alt=""
      style={{
        position: 'absolute',
	        width: 250,
	        height: 'auto',
	        right: 18,
	        bottom: 500,
        zIndex: 8,
        pointerEvents: 'none',
        filter: 'drop-shadow(0 18px 26px rgba(0, 0, 0, 0.45))'
      }}
    />
  </SlideFrame>
);

// 02 — определение
const Slide02 = ({ index = 2 }) => (
  <SlideFrame index={index}>
    <div style={{ position: 'absolute', inset: 0 }}><InkBloom structured/></div>

    <div style={{
      position: 'absolute',
      top: 560,
      left: 20,
      right: 20,
      zIndex: 4,
      fontFamily: '"Unbounded", "Inter", sans-serif',
      fontWeight: 800,
      fontSize: 36,
      lineHeight: 1.45,
      letterSpacing: '-0.045em',
      color: '#FFFFFF',
      textAlign: 'center',
      whiteSpace: 'nowrap',
      transform: 'scaleX(0.92)',
      textShadow: '0 0 30px rgba(0,0,0,0.85), 0 4px 18px rgba(0,0,0,0.75)'
    }}>
      идея→Product Requirements→структура<br/>
      →прототип→тест→следующая итерация
    </div>

    <Card anchor="Вайбкодинг" position="lower" style={{ bottom: 88 }}>
      <div style={{ lineHeight: 1.48 }}>
        это не про код. Это способ быстро превратить мутное
        «что-то примерно такое» в форму.
      </div>
    </Card>
  </SlideFrame>
);

// 03 — процессы
const Slide03 = ({ index = 3 }) => (
  <SlideFrame index={index}>
    <div style={{ position: 'absolute', inset: 0 }}><RibbonLattice/></div>

    <Card anchor="Процессы" position="center">
      ПРАКТИКА<br/>
      ПРАКТИКА<br/>
      ПРАКТИКА
      <div style={{ marginTop: 18, fontSize: 24, lineHeight: 1.45 }}>
        и прототип в конце
      </div>
    </Card>
  </SlideFrame>
);

// 04 — туман
const Slide04 = ({ index = 4 }) => (
  <SlideFrame index={index}>
    <div style={{ position: 'absolute', inset: 0 }}><DefinitionSplitBackground/></div>
    <LiveGrain opacity={0.08}/>

    <Card anchor="Туман" position="upper">
      Идеи застревают <i>не из-за лени</i>. А потому что между «что-то такое хочу»
      и «вот, можно показать» — слишком много тумана.
    </Card>

    <Card anchor="Структура" position="lower" style={{ background: '#0E0E12', color: '#FFFFFF', bottom: 84 }}>
      <div style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 22, lineHeight: 1.9
      }}>
        → надо сформулировать<br/>
        → собрать структуру<br/>
        → выбрать инструмент<br/>
        → не испугаться первой кривой версии
      </div>
      <div style={{ marginTop: 18, fontSize: 22, lineHeight: 1.45, opacity: 0.88 }}>
        Найти форму и структуру. Иногда это приложение. Иногда лендинг.
        Иногда генератор. Иногда личный ассистент. Иногда визуальная система
        или пайплайн для контента.
      </div>
    </Card>
  </SlideFrame>
);

// 05 — AI как партнёр (с персонажами)
const Slide05 = ({ index = 5 }) => (
  <SlideFrame index={index}>
    <div style={{ position: 'absolute', inset: 0 }}><LissajousBloom/></div>
    <LiveGrain opacity={0.08}/>

    <Card anchor="Партнёр" position="upper">
      AI может быть <b>не заменой</b>, а вторым участником процесса:
      задавать вопросы, собирать хаос, делать черновики, предлагать структуру,
      проверять гипотезы, помогать дотащить идею до формы.
    </Card>

    <img
      src="assets/ai-collab-heroes-alpha.apng"
      alt=""
      style={{
        position: 'absolute',
        width: 940,
        height: 'auto',
        left: 70,
        bottom: 190,
        zIndex: 5,
        pointerEvents: 'none',
        filter: 'brightness(1.18) contrast(1.08) drop-shadow(0 22px 36px rgba(0, 0, 0, 0.55))'
      }}
    />
  </SlideFrame>
);

// 06 — двухдневный кэмп (БЕЗ FaceRing — другой паттерн)
const Slide06 = ({ index = 6 }) => (
  <SlideFrame index={index}>
    <div style={{ position: 'absolute', inset: 0 }}><DotTunnel/></div>

    <div style={{
      position: 'absolute', top: 260, left: 60, right: 60, zIndex: 5,
      fontFamily: '"JetBrains Mono", monospace', fontSize: 22, letterSpacing: '0.3em', opacity: 0.75
    }}>
      [ T W O · D A Y · O F F L I N E ]
    </div>

    <div style={{
      position: 'absolute', top: 340, left: 50, right: 50, zIndex: 5,
      fontFamily: '"Unbounded", sans-serif', fontWeight: 800,
      fontSize: 360, lineHeight: 0.82, letterSpacing: '-0.05em',
      mixBlendMode: 'difference', color: '#FFFFFF'
    }}>
      2<br/>дня
    </div>

    <Card anchor="Кэмп" position="lower">
      Двухдневный оффлайн-кэмп для людей, которые <i>не считают себя техническими</i>.
      Будем разбираться в AI и вайбкодинге с нуля: смотреть инструменты, пробовать руками,
      задавать тупые вопросы, нажимать кнопки и чинить то, что не получилось с первого раза.
    </Card>
  </SlideFrame>
);

// 07 — мета-карусель (использует морф-видео из референсов)
const Slide07 = ({ index = 7 }) => (
  <SlideFrame index={index}>
    <div style={{ position: 'absolute', inset: 0, background: '#0E0E12' }}>
      <img
        src="assets/morph.gif"
        alt=""
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          filter: 'grayscale(1) contrast(1.1)',
          opacity: 0.85
        }}
      />
    </div>
    <LiveGrain opacity={0.08}/>

    <Card anchor="Эта карусель" position="center">
      — тоже кейс. Её структура, сценарий и визуальная логика собраны
      <i> с помощью AI</i>. Не «AI написал и нарисовал за нас» —
      мы использовали его как партнёра.
    </Card>
  </SlideFrame>
);

// 08 — карта инструментов (день 1)
const Slide08 = ({ index = 8 }) => (
  <SlideFrame index={index}>
    <div style={{ position: 'absolute', inset: 0 }}><CrystalGrid/></div>

    <div style={{
      position: 'absolute', top: 130, left: 60, zIndex: 5,
      fontFamily: '"JetBrains Mono", monospace', fontSize: 18, letterSpacing: '0.2em', color: '#FFFFFF'
    }}>
      ● DAY_01 / ИНСТРУМЕНТЫ
    </div>

    <Card anchor="Карта" position="center">
      В первый день разберёмся, <b>что для чего</b>:
      <div style={{
        marginTop: 18,
        fontFamily: '"JetBrains Mono", monospace', fontSize: 22, lineHeight: 1.7
      }}>
        ▸ что лучше для текста<br/>
        ▸ что лучше для прототипов<br/>
        ▸ что лучше для визуала<br/>
        ▸ где AI просто помогает<br/>
        ▸ а где уже строит вместе с вами
      </div>
      <div style={{ marginTop: 20, fontSize: 24, opacity: 0.85 }}>
        Покажем Codex и несколько других подходов.
        Один и тот же кейс можно решать разными путями.
      </div>
    </Card>
  </SlideFrame>
);

// 09 — ваша задача
const Slide09 = ({ index = 9 }) => (
  <SlideFrame index={index} dark={false}>
    <div style={{ position: 'absolute', inset: 0 }}><DraftingDesk/></div>

    <Card anchor="Будем работать над вашими задачами" position="lower" style={{ paddingBottom: 44 }}>
      Не абстрактная «идея для стартапа». А что-то <i>ваше</i>:
      <div style={{
        marginTop: 18,
        fontFamily: '"JetBrains Mono", monospace', fontSize: 20, lineHeight: 1.7
      }}>
        — рабочий процесс<br/>
        — творческий проект<br/>
        — обучающий продукт<br/>
        — личный инструмент<br/>
        — визуальная система или генератор<br/>
        — лендинг, ассистент, исследовательский пайплайн
      </div>
    </Card>
  </SlideFrame>
);

// 10 — простой PRD
const Slide10 = ({ index = 10 }) => (
  <SlideFrame index={index}>
    <div style={{ position: 'absolute', inset: 0 }}><ScanStatic/></div>

    <Card anchor="PRD" position="center">
      Соберём простой <i>product brief</i>. Это не корпоративная бумажка —
      это способ объяснить себе и AI, что вы хотите собрать.
      <div style={{
        marginTop: 22,
        fontFamily: '"JetBrains Mono", monospace', fontSize: 24, lineHeight: 1.7
      }}>
        ▸ для кого это?<br/>
        ▸ какую боль решаем?<br/>
        ▸ что должно получиться в первой версии?<br/>
        ▸ что точно <b>не</b> делаем сейчас?<br/>
        ▸ как понять, что результат работает?
      </div>
    </Card>
  </SlideFrame>
);

// 11 — день 2 (доводим)
const Slide11 = ({ index = 11 }) => (
  <SlideFrame index={index}>
    <div style={{ position: 'absolute', inset: 0 }}><HalftonePortal/></div>

    <div style={{
      position: 'absolute', top: 130, left: 60, zIndex: 5,
      fontFamily: '"JetBrains Mono", monospace', fontSize: 18, letterSpacing: '0.2em', color: '#FFFFFF'
    }}>
      ● DAY_02 / ДОВОДИМ
    </div>

    <Card anchor="Форма" position="center">
      Во второй день — <b>дотягиваем</b>:
      <div style={{
        marginTop: 18,
        fontFamily: '"JetBrains Mono", monospace', fontSize: 22, lineHeight: 1.7
      }}>
        уточним идею · уберём лишнее ·<br/>
        добавим недостающее ·<br/>
        протестируем друг на друге ·<br/>
        допилим · покажем
      </div>
      <div style={{ marginTop: 20, fontSize: 24, opacity: 0.85 }}>
        Разберём, где проект живой, а где пока просто красивая идея.
        Плюс поговорим про агентов, API и более сложные сценарии — без перегруза.
      </div>
    </Card>
  </SlideFrame>
);

// 12 — визуальный блок (использует видео-механизм из референсов)
const Slide12 = ({ index = 12 }) => (
  <SlideFrame index={index}>
    <div style={{ position: 'absolute', inset: 0, background: '#0E0E12' }}>
      <video
        src="assets/mechanism.mp4"
        autoPlay loop muted playsInline
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          opacity: 1
        }}
      />
    </div>
    <LiveGrain opacity={0.10}/>

    <Card anchor="Отдельный блок про визуал" position="upper">
      Поговорим про <i>картинки, видео, мультимедиа</i>,
      генеративные инструменты.
    </Card>

    <Card anchor="Как" position="lower" style={{
      background: 'rgba(14, 14, 18, 0.10)',
      color: '#FFFFFF',
      textShadow: '0 2px 12px rgba(0, 0, 0, 0.95)',
      boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.14)',
      backdropFilter: 'blur(1.5px)'
    }}>
      <div style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 32, lineHeight: 1.7
      }}>
        ▸ делать быстро.<br/>
        ▸ делать аккуратно.<br/>
        ▸ не скатываться в AI-slop.<br/>
        ▸ собрать не только “работает”, но и выглядит нормально.
      </div>
    </Card>
  </SlideFrame>
);

// 13 — Анка (отдельный слайд)
const Slide13 = ({ index = 13 }) => (
  <SlideFrame index={index}>
    <div style={{ position: 'absolute', inset: 0 }}><WaveField/></div>

    <Card anchor="Анка" position="center">
      <div style={{ fontSize: 32, fontWeight: 600, marginTop: -8 }}>
        Анка Ставенски
      </div>
      <div style={{ fontSize: 22, marginTop: 8, opacity: 0.85, lineHeight: 1.4 }}>
        Product owner и AI-практик. Работает на стыке продуктов, дизайна,
        визуальных систем, мультимедиа и технологий. Опыт — UX/UI,
        smart home, робототехника, тренажёры самолётов, Web3, генеративный визуал.
      </div>
      <div style={{
        marginTop: 14, fontFamily: '"JetBrains Mono", monospace', fontSize: 16, opacity: 0.7
      }}>
        ex VK · ex Arrival · co-founder · автоматические системы дизайна и тестов
      </div>
    </Card>
  </SlideFrame>
);

// 14 — CTA (отдельный слайд)
const Slide14 = ({ index = 14 }) => (
  <SlideFrame index={index}>
    <div style={{ position: 'absolute', inset: 0 }}><LisbonMistBackground/></div>
    <LiveGrain opacity={0.10}/>

    <Card anchor="Лиссабон · 2 дня" position="center" style={{ background: '#0E0E12', color: '#FFFFFF' }}>
      <div style={{ fontSize: 26, lineHeight: 1.4 }}>
        Подойдёт новичкам, дизайнерам, креаторам, авторам, продактам, преподавателям,
        соло-экспертам — всем, кто хочет перестать бояться AI и собрать что-то своё.
        Небольшая группа. Можно с нуля.
      </div>
      <div style={{
        marginTop: 28,
        display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap'
      }}>
        <div style={{
          background: '#FFFFFF', color: '#0E0E12',
          padding: '18px 26px',
          fontFamily: '"Unbounded", sans-serif', fontWeight: 700, fontSize: 28
        }}>
          250 € / человек
        </div>
        <div style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 18, opacity: 0.85
        }}>
          подробности — в&nbsp;личку или комментарии →
        </div>
      </div>
    </Card>
  </SlideFrame>
);

// ALT — green ticket / camp card
const Slide15 = ({ index = 15 }) => (
  <SlideFrame index={index}>
    <div style={{
      position: 'absolute', inset: 0,
      background: 'linear-gradient(180deg, rgba(0,0,0,0.25), #050505 58%), radial-gradient(circle at 50% 18%, #555, #080808 42%, #050505 100%)'
    }}/>
    <LiveGrain opacity={0.10}/>
    <div style={{
      position: 'absolute', top: 54, left: 56,
      fontFamily: '"JetBrains Mono", monospace', fontSize: 18, letterSpacing: '0.18em', color: '#9BFF18'
    }}>
      — EVENT
    </div>
    <div style={{
      position: 'absolute', top: 230, left: 62, width: 760,
      fontFamily: '"Playfair Display", Georgia, serif',
      fontSize: 86, lineHeight: 0.96, color: '#F4F0E8'
    }}>
      Двухдневный<br/>кэмп<br/>в Лиссабоне.
    </div>
    <div style={{
      position: 'absolute', left: 58, right: 58, bottom: 72,
      background: '#9BFF18', color: '#050505', borderRadius: 8,
      padding: '42px 42px 48px'
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        fontFamily: '"JetBrains Mono", monospace', fontSize: 14, letterSpacing: '0.22em', textTransform: 'uppercase'
      }}>
        <span>VIBECODING / CAMP</span>
        <span>01 — TICKET</span>
      </div>
      <div style={{ height: 1, background: '#050505', opacity: 0.55, margin: '28px 0 24px' }}/>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
        <div>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, letterSpacing: '0.22em', opacity: 0.55, textTransform: 'uppercase' }}>WHERE</div>
          <div style={{ marginTop: 12, fontFamily: '"Playfair Display", Georgia, serif', fontSize: 34, fontStyle: 'italic' }}>Лиссабон</div>
        </div>
        <div>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, letterSpacing: '0.22em', opacity: 0.55, textTransform: 'uppercase' }}>WHEN</div>
          <div style={{ marginTop: 12, fontFamily: '"Playfair Display", Georgia, serif', fontSize: 34, fontStyle: 'italic' }}>Два дня</div>
        </div>
      </div>
      <div style={{ height: 1, background: '#050505', opacity: 0.55, margin: '24px 0 28px' }}/>
      <div style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 58, lineHeight: 0.95, fontStyle: 'italic', fontWeight: 600 }}>
        Практика руками.<br/>Можно с нуля.
      </div>
      <div style={{
        marginTop: 28, display: 'flex', justifyContent: 'space-between',
        fontFamily: '"JetBrains Mono", monospace', fontSize: 14, letterSpacing: '0.12em', textTransform: 'uppercase'
      }}>
        <span>€ 250 / чел.</span>
        <span>NO LECTURE.</span>
      </div>
    </div>
  </SlideFrame>
);

// ALT — code case card
const Slide16 = ({ index = 16 }) => (
  <SlideFrame index={index}>
    <div style={{ position: 'absolute', inset: 0, background: '#080809' }}/>
    <div style={{ position: 'absolute', top: 52, left: 58, fontFamily: '"JetBrains Mono", monospace', fontSize: 16, color: '#777' }}>
      {String(index + 1).padStart(2, '0')} / 19
    </div>
    <div style={{ position: 'absolute', top: 156, left: 64, fontFamily: '"JetBrains Mono", monospace', fontSize: 15, letterSpacing: '0.22em', color: '#9BFF18' }}>
      [ CASE_STUDY ]
    </div>
    <div style={{
      position: 'absolute', top: 260, left: 64, right: 76,
      fontFamily: '"Playfair Display", Georgia, serif',
      fontSize: 92, lineHeight: 0.98, color: '#F4F0E8'
    }}>
      Эта<br/>карусель —<br/>тоже кейс.
    </div>
    <div style={{
      position: 'absolute', left: 64, right: 64, bottom: 182,
      background: '#141414', border: '1px solid rgba(255,255,255,0.13)', borderRadius: 7,
      padding: '38px 40px 44px', minHeight: 330
    }}>
      <div style={{ position: 'absolute', top: 16, left: 18, display: 'flex', gap: 9 }}>
        <span style={{ width: 10, height: 10, borderRadius: 99, background: '#ff4f63', display: 'block' }}/>
        <span style={{ width: 10, height: 10, borderRadius: 99, background: '#9BFF18', display: 'block' }}/>
        <span style={{ width: 10, height: 10, borderRadius: 99, background: '#777', display: 'block' }}/>
      </div>
      <div style={{ position: 'absolute', top: 14, right: 22, fontFamily: '"JetBrains Mono", monospace', fontSize: 12, color: '#777' }}>
        ~/carousel-build
      </div>
      <div style={{ marginTop: 32, fontFamily: '"JetBrains Mono", monospace', fontSize: 18, lineHeight: 1.85, color: '#F4F0E8' }}>
        <span style={{ color: '#9BFF18' }}>$ ai --partner=true</span><br/>
        › structure: формулирование идеи ✓<br/>
        › narrative: разложить историю ✓<br/>
        › order: найти порядок слайдов ✓<br/>
        › copy: дотянуть текст и визуал ✓<br/>
        <span style={{ color: '#777' }}>// AI не написал и нарисовал за нас.</span><br/>
        <span style={{ color: '#777' }}>// мы использовали его как партнёра.</span>
      </div>
    </div>
    <div style={{
      position: 'absolute', left: 64, bottom: 84, width: 640,
      fontFamily: '"Playfair Display", Georgia, serif', fontSize: 28, lineHeight: 1.25, color: 'rgba(244,240,232,0.6)', fontStyle: 'italic'
    }}>
      На кэмпе покажем, как так же делать карусели,<br/>лендинги, презентации и первые прототипы.
    </div>
  </SlideFrame>
);

// ALT — PRD card
const Slide17 = ({ index = 17 }) => (
  <SlideFrame index={index}>
    <div style={{ position: 'absolute', inset: 0, background: '#080809' }}/>
    <div style={{ position: 'absolute', top: 52, left: 58, fontFamily: '"JetBrains Mono", monospace', fontSize: 16, color: '#777' }}>
      {String(index + 1).padStart(2, '0')} / 19
    </div>
    <div style={{ position: 'absolute', top: 154, left: 64, fontFamily: '"JetBrains Mono", monospace', fontSize: 15, letterSpacing: '0.22em', color: '#ff4f63' }}>
      DOC /// PRD
    </div>
    <div style={{
      position: 'absolute', top: 250, left: 64,
      fontFamily: '"Playfair Display", Georgia, serif',
      fontSize: 100, lineHeight: 0.92, color: '#F4F0E8'
    }}>
      Соберём<br/>простой<br/>PRD.
    </div>
    <div style={{
      position: 'absolute', left: 64, right: 64, bottom: 132,
      border: '1px solid rgba(255,255,255,0.13)', borderRadius: 7,
      padding: '34px 38px 44px', minHeight: 520
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: '"JetBrains Mono", monospace', fontSize: 14, color: '#777' }}>
        <span>// product-requirements</span>
        <span style={{ color: '#9BFF18' }}>v.0.1</span>
      </div>
      <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', margin: '18px 0 28px' }}/>
      <div style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 34, lineHeight: 1.55, color: '#F4F0E8' }}>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 16, color: '#ff4f63', marginRight: 20 }}>Q1.</span>Для кого это?<br/>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 16, color: '#ff4f63', marginRight: 20 }}>Q2.</span>Какую боль решаем?<br/>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 16, color: '#ff4f63', marginRight: 20 }}>Q3.</span><i>Что должно получиться<br/><span style={{ marginLeft: 70 }}>в первой версии?</span></i><br/>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 16, color: '#ff4f63', marginRight: 20 }}>Q4.</span><span style={{ color: '#777' }}>Что точно не делаем сейчас?</span><br/>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 16, color: '#9BFF18', marginRight: 20 }}>Q5.</span>Как понять, что работает?
      </div>
    </div>
    <div style={{
      position: 'absolute', left: 64, bottom: 48, width: 640,
      fontFamily: '"Playfair Display", Georgia, serif', fontSize: 25, lineHeight: 1.25, color: 'rgba(244,240,232,0.55)', fontStyle: 'italic'
    }}>
      Не корпоративная бумажка. Способ объяснить себе и AI,<br/>что вы хотите собрать.
    </div>
  </SlideFrame>
);

// ALT — speaker card with photo placeholder on the right
const Slide18 = ({ index = 18 }) => (
  <SlideFrame index={index}>
    <div style={{ position: 'absolute', inset: 0, background: '#080809' }}/>
    <div style={{ position: 'absolute', top: 52, left: 58, fontFamily: '"JetBrains Mono", monospace', fontSize: 16, color: '#ff4f63' }}>
      {String(index + 1).padStart(2, '0')} / 19
    </div>
    <div style={{ position: 'absolute', top: 142, left: 72, fontFamily: '"JetBrains Mono", monospace', fontSize: 15, letterSpacing: '0.22em', color: '#9BFF18' }}>
      YOUR GUIDE
    </div>
    <div style={{
      position: 'absolute', top: 220, left: 72, width: 540,
      fontFamily: '"Playfair Display", Georgia, serif',
      fontSize: 76, lineHeight: 0.95, color: '#F4F0E8'
    }}>
      Анка<br/>Ставенски.
    </div>
    <div style={{
      position: 'absolute', top: 220, right: 72, width: 350, height: 520,
      border: '1px solid rgba(255,255,255,0.14)', borderRadius: 8,
      background: 'linear-gradient(135deg, rgba(155,255,24,0.12), rgba(255,255,255,0.04))',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: '"JetBrains Mono", monospace', color: '#9BFF18', letterSpacing: '0.18em', textAlign: 'center'
    }}>
      [ PHOTO ]<br/><span style={{ color: '#777', fontSize: 12, letterSpacing: '0.08em' }}>вставить позже</span>
    </div>
    <div style={{
      position: 'absolute', left: 72, top: 500, width: 530,
      fontFamily: '"Playfair Display", Georgia, serif', fontSize: 27, lineHeight: 1.32, color: '#F4F0E8'
    }}>
      Product owner и AI-практик.<br/>
      Работает на стыке продуктов, дизайна,<br/>
      визуальных систем, мультимедиа и технологий.
    </div>
    <div style={{ position: 'absolute', left: 72, right: 72, top: 735, height: 1, background: 'rgba(255,255,255,0.12)' }}/>
    <div style={{ position: 'absolute', left: 72, top: 800, fontFamily: '"JetBrains Mono", monospace', fontSize: 14, letterSpacing: '0.2em', color: '#ff4f63' }}>
      FOR WHOM /// 13.1
    </div>
    <div style={{
      position: 'absolute', left: 72, top: 852, width: 560,
      fontFamily: '"Playfair Display", Georgia, serif', fontSize: 34, lineHeight: 1.15, color: '#F4F0E8'
    }}>
      Новички. Дизайнеры.<br/>
      Креаторы. Продакты.<br/>
      Преподаватели. Соло-эксперты.
    </div>
    <div style={{ position: 'absolute', left: 72, right: 72, bottom: 250, height: 1, background: 'rgba(255,255,255,0.12)' }}/>
    <div style={{ position: 'absolute', left: 72, bottom: 195, fontFamily: '"JetBrains Mono", monospace', fontSize: 14, letterSpacing: '0.2em', color: '#ff4f63' }}>
      SIGNATURE / NOW
    </div>
    <div style={{
      position: 'absolute', left: 72, bottom: 94, width: 570,
      fontFamily: '"Playfair Display", Georgia, serif', fontSize: 31, lineHeight: 1.15, color: '#F4F0E8', fontStyle: 'italic'
    }}>
      Автоматические системы<br/>
      дизайна и тестов на основе<br/>
      анализа и работы агентов.
    </div>
  </SlideFrame>
);

Object.assign(window, {
  Slide00, Slide01, Slide02, Slide03, Slide04, Slide05, Slide06,
  Slide07, Slide08, Slide09, Slide10, Slide11, Slide12, Slide13, Slide14,
  Slide15, Slide16, Slide17, Slide18
});
