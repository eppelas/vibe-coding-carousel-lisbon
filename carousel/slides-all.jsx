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
    <div style={{
      position: 'absolute',
      top: 99,
      right: 60,
      zIndex: 6,
      fontFamily: '"Playfair Display", Georgia, serif',
      color: '#F4F0E8',
      textAlign: 'right',
      letterSpacing: '-0.02em'
    }}>
      <div style={{ fontSize: 53, lineHeight: 0.9, fontStyle: 'italic' }}>Oh, camp</div>
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
    '[01] → мысль появилась { mode: "first-person" }',
    '[02] → не процесс, а ощущение { pressure: "0.55" }',
    '[03] → собрать задачу { particles: "24000" }',
    '[04] → вопрос: где это применить к жизни?',
    '[05] → inkField composite { velocity: "7.59" }',
    '[06] → начать с себя, не с инструмента'
  ];
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      background: '#F4F1EA'
    }}>
      <style>{`
        @keyframes selfLogSlide {
          0% { transform: translateY(0); opacity: .46; }
          50% { transform: translateY(-10px); opacity: .74; }
          100% { transform: translateY(0); opacity: .46; }
        }
      `}</style>
      <video
        src="assets/self-ink-background.mp4"
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'saturate(1.08) contrast(1.03)',
          opacity: 0.98
        }}
      />
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
        inset: 0,
        background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(8,9,9,0.04) 46%, rgba(8,9,9,0.92) 100%)'
      }}/>
    </div>
  );
};

// 01 — «я уже опоздал?»
const Slide01 = ({ index = 1 }) => (
  <SlideFrame index={index}>
    <SelfInkField/>
    <LiveGrain opacity={0.05}/>

    <Card anchor="«Я ничего не понимаю»" position="upper">
      Если вы смотрите на AI и думаете именно так — это нормально.
      Все вокруг будто что-то собирают: продукты, агентов, лендинги,
      автоматизации, визуалы, контент-пайплайны.
    </Card>

    <Card position="lower" style={{
      bottom: 340,
      background: '#F4F0E8',
      color: '#050505'
    }}>
      <div style={{ fontSize: 29, lineHeight: 1.38 }}>
        Если у вас мысли…
        <br/>
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
    <div style={{
      position: 'absolute',
      right: 4,
      bottom: 500,
      width: 270,
      height: 320,
      zIndex: 8,
      overflow: 'hidden',
      pointerEvents: 'none'
    }}>
      <img
        src="assets/triangle-character-alpha-clean.apng"
        alt=""
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          filter: 'drop-shadow(0 18px 26px rgba(0, 0, 0, 0.45))'
        }}
      />
    </div>
  </SlideFrame>
);

// 02 — определение
const Slide02 = ({ index = 2 }) => (
  <SlideFrame index={index}>
    <div style={{ position: 'absolute', inset: 0 }}>
      <FogToStructure endForm="orbits" population={6} turbulence={0.07} startOffset={3} speed={1.2}/>
    </div>

    <div style={{
      position: 'absolute',
      top: 540,
      left: 20,
      right: 20,
      zIndex: 4,
      fontFamily: '"Unbounded", "Inter", sans-serif',
      fontWeight: 800,
      fontSize: 54,
      lineHeight: 1.14,
      letterSpacing: '-0.035em',
      color: '#F4F0E8',
      textAlign: 'center',
      whiteSpace: 'nowrap',
      transform: 'scaleX(0.96)',
      textShadow: '0 1px 18px rgba(0,0,0,0.32)'
    }}>
      идея → PRD → структура<br/>
      → прототип → тест → итерация
    </div>

    <Card anchor="Вайбкодинг" position="lower" style={{ bottom: 88 }}>
      <div style={{ lineHeight: 1.48 }}>
        Это способ превратить мутное «что-то примерно так я хочу»
        в конкретную форму. Для этого мы будем разбираться со структурой,
        инструментами и делать первые версии своего продукта.
        <br/><br/>
        Это может быть
        приложение, лендинг, личный ассистент или визуальная система для контента.
      </div>
    </Card>
  </SlideFrame>
);

// 03 — процессы
const Slide03 = ({ index = 3 }) => (
  <SlideFrame index={index}>
    <div style={{ position: 'absolute', inset: 0 }}><RibbonLattice/></div>
    <video
      src="assets/happy-finished-alpha.webm"
      autoPlay
      muted
      loop
      playsInline
      onLoadedMetadata={(e) => { e.currentTarget.currentTime = 0.05; }}
      style={{
        position: 'absolute',
        left: '50%',
        bottom: 42,
        width: 560,
        height: 500,
        objectFit: 'contain',
        transform: 'translateX(-50%)',
        zIndex: 6,
        pointerEvents: 'none',
        filter: 'contrast(1.08) saturate(1.08) drop-shadow(0 18px 34px rgba(0,0,0,0.34))'
      }}
    />

    <div style={{
      position: 'absolute',
      left: 72,
      right: 72,
      top: 420,
      zIndex: 5,
      color: '#F4F0E8',
      fontFamily: '"Unbounded", "Inter", sans-serif',
      fontWeight: 800,
      fontSize: 104,
      lineHeight: 0.98,
      letterSpacing: '-0.045em',
      textShadow: '0 6px 28px rgba(0,0,0,0.55)'
    }}>
      ПРАКТИКА<br/>
      ПРАКТИКА<br/>
      ПРАКТИКА
      <div style={{ marginTop: 58, fontSize: 66, lineHeight: 1.04 }}>
        и прототип в конце
      </div>
    </div>
  </SlideFrame>
);

// 04 — туман
const Slide04 = ({ index = 4 }) => (
  <SlideFrame index={index}>
    <div style={{ position: 'absolute', inset: 0 }}><LissajousBloom/></div>
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

const FlatCosmicPartnerWorld = () => (
  <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: '#050505' }}>
    <style>{`
      @keyframes starTwinkle {
        0%, 100% { opacity: .24; transform: scale(.72); }
        50% { opacity: 1; transform: scale(1.18); }
      }
      @keyframes orbitDrift {
        0% { transform: translate3d(-18px, 0, 0) rotate(-2deg); }
        50% { transform: translate3d(22px, -18px, 0) rotate(2deg); }
        100% { transform: translate3d(-18px, 0, 0) rotate(-2deg); }
      }
      @keyframes cometFly {
        0% { transform: translate3d(-220px, 120px, 0) rotate(-18deg); opacity: 0; }
        18% { opacity: .65; }
        62% { opacity: .65; }
        100% { transform: translate3d(1180px, -520px, 0) rotate(-18deg); opacity: 0; }
      }
    `}</style>
    <div style={{
      position: 'absolute',
      inset: 0,
      opacity: 0.62
    }}>
      <WaveField/>
    </div>
    <div style={{
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(circle at 62% 34%, rgba(28, 94, 170, 0.14), transparent 34%), radial-gradient(circle at 22% 70%, rgba(108, 76, 231, 0.10), transparent 30%)'
    }}/>
    {Array.from({ length: 92 }).map((_, i) => {
      const left = 3 + ((i * 37) % 94);
      const top = 3 + ((i * 61) % 88);
      const size = i % 11 === 0 ? 8 : i % 5 === 0 ? 5 : 3;
      return (
        <span key={i} style={{
          position: 'absolute',
          left: `${left}%`,
          top: `${top}%`,
          width: size,
          height: size,
          borderRadius: i % 8 === 0 ? 1 : 99,
          background: '#FFF4CF',
          boxShadow: '0 0 12px rgba(255,244,207,0.65)',
          animation: `starTwinkle ${1.7 + (i % 6) * 0.28}s ease-in-out ${(i % 13) * 0.12}s infinite`
        }}/>
      );
    })}
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i} style={{
        position: 'absolute',
        left: -180 - i * 70,
        top: 190 + i * 120,
        width: 260,
        height: 2,
        background: 'linear-gradient(90deg, transparent, rgba(255,244,207,0.9), transparent)',
        filter: 'blur(0.4px)',
        animation: `cometFly ${5.8 + i * 0.6}s linear ${i * 1.1}s infinite`
      }}/>
    ))}
    <div style={{
      position: 'absolute',
      left: '-22%',
      right: '-22%',
      bottom: -230,
      height: 520,
      borderRadius: '50% 50% 0 0',
      background: 'radial-gradient(circle at 50% 20%, #FFF0C8 0%, #F6D998 60%, #D99C5B 100%)',
      boxShadow: '0 -24px 90px rgba(255, 224, 170, 0.25)',
      animation: 'orbitDrift 12s ease-in-out infinite'
    }}/>
  </div>
);

// 05 — AI как партнёр (с персонажами)
const Slide05 = ({ index = 5 }) => (
  <SlideFrame index={index}>
    <div style={{ position: 'absolute', inset: 0 }}><LissajousBloom/></div>
    <div style={{ position: 'absolute', inset: 0, mixBlendMode: 'screen', opacity: 0.42 }}><FogGridVeil/></div>
    <LiveGrain opacity={0.05}/>

    <Card anchor="AI как помощник" position="upper" style={{ background: '#050505', color: '#F4F0E8' }}>
      Вы научитесь: правильно задавать вопросы, делегировать хаос,
      проверять гипотезы, собирать первые рабочие версии
      и выбирать инструмент под задачу, а не наоборот.
    </Card>

    <img
      src="assets/ai-collab-heroes-alpha.apng"
      alt=""
      style={{
        position: 'absolute',
        width: 1188,
        height: 'auto',
        left: 82,
        bottom: 120,
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
    <div style={{ position: 'absolute', inset: 0 }}><DotTunnel duration={15}/></div>

    <div style={{
      position: 'absolute', top: 260, left: 60, right: 60, zIndex: 5,
      fontFamily: '"JetBrains Mono", monospace', fontSize: 22, letterSpacing: '0.18em', opacity: 0.75
    }}>
      [ 16–17 МАЯ · ДВА ДНЯ ПОГРУЖЕНИЯ · ОФЛАЙН ]
    </div>

    <div style={{
      position: 'absolute', top: 333, left: 60, right: 60, zIndex: 5,
      fontFamily: '"Unbounded", sans-serif', fontWeight: 800,
      lineHeight: 0.82, letterSpacing: '-0.065em',
      mixBlendMode: 'difference', color: '#FFFFFF'
    }}>
      <div style={{ marginTop: 25, fontSize: 370 }}>2 дня</div>
      <div style={{
        marginTop: 120,
        fontSize: 58,
        lineHeight: 1,
        letterSpacing: '-0.035em',
        textTransform: 'uppercase'
      }}>
        погружения
      </div>
    </div>

    <Card position="lower">
      в AI и вайбкодинг: будем смотреть инструменты, пробовать руками,
      задавать тупые вопросы, нажимать кнопки
      и чинить то, что не получилось с первого раза.
    </Card>
  </SlideFrame>
);

// 07 — мета-карусель (использует морф-видео из референсов)
const Slide07 = ({ index = 7 }) => (
  <SlideFrame index={index}>
    <div style={{ position: 'absolute', inset: 0, background: '#0E0E12', overflow: 'hidden' }}>
      {new URLSearchParams(window.location.search).get('slowMorph') === '1' ? (
        <video
          src="assets/morph-fast-slow3.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'grayscale(1) contrast(1.14) brightness(0.72)',
            opacity: 0.88
          }}
        />
      ) : (
        <img
          src="assets/morph-fast.gif"
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'grayscale(1) contrast(1.14) brightness(0.72)',
            opacity: 0.88
          }}
        />
      )}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 50% 42%, rgba(14,14,18,0.08), rgba(14,14,18,0.62) 72%, rgba(14,14,18,0.90) 100%)'
      }}/>
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
      </div>
    </Card>
  </SlideFrame>
);

// 09 — ваша задача
const Slide09 = ({ index = 9 }) => (
  <SlideFrame index={index}>
    <div style={{ position: 'absolute', inset: 0, background: '#0E0E12', color: '#070707', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: '52%',
        overflow: 'hidden',
        filter: 'grayscale(1) contrast(1.1)',
        background: '#0E0E12'
      }}>
        <div style={{ position: 'absolute', inset: 0 }}><ScanStatic/></div>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(14,14,18,0.08)' }}/>
      </div>

      <div style={{
        position: 'absolute',
        left: '52%',
        right: 0,
        top: 0,
        bottom: 0,
        background: 'rgba(244,242,237,0.95)'
      }}/>

      <div style={{
        position: 'absolute',
        left: '55%',
        right: 28,
        top: 310,
        color: '#070707'
      }}>
        <div style={{
          fontFamily: '"Unbounded", "Inter", sans-serif',
          fontSize: 52,
          lineHeight: 1.08,
          fontWeight: 800,
          letterSpacing: '-0.03em',
          marginBottom: 34
        }}>
          Поработаем над вашими задачами
        </div>
        <div style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: 33,
          lineHeight: 1.28,
          fontWeight: 600
        }}>
          Не абстрактная «идея для стартапа». А что-то <i>ваше</i>:
        </div>
        <div style={{
          marginTop: 42,
          fontFamily: '"Inter", sans-serif',
          fontSize: 29,
          lineHeight: 1.62,
          fontWeight: 400
        }}>
          <div>• рабочий процесс</div>
          <div>• творческий проект</div>
          <div>• обучающий продукт</div>
          <div>• личный инструмент</div>
          <div>• визуальная система</div>
          <div>• лендинг</div>
          <div>• ассистент</div>
        </div>
      </div>
    </div>
  </SlideFrame>
);

// 10 — простой PRD
const Slide10 = ({ index = 10 }) => (
  <SlideFrame index={index}>
    <div style={{ position: 'absolute', inset: 0 }}><ScanStatic/></div>

    <Card anchor="PRD" position="center">
      Соберём простой <i>product brief</i>.
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

const Slide10Task = ({ index = 10 }) => (
  <SlideFrame index={index}>
    <div style={{ position: 'absolute', inset: 0 }}><ScanStatic/></div>

    <Card anchor="Ваша задача" position="center">
      Не абстрактная «идея для стартапа». А что-то <i>ваше</i>:
      <div style={{
        marginTop: 22,
        fontFamily: '"JetBrains Mono", monospace', fontSize: 24, lineHeight: 1.7
      }}>
        ▸ рабочий процесс<br/>
        ▸ творческий проект<br/>
        ▸ обучающий продукт<br/>
        ▸ личный инструмент<br/>
        ▸ визуальная система<br/>
        ▸ лендинг<br/>
        ▸ ассистент
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
    <div style={{ position: 'absolute', inset: 0, background: '#0E0E12', overflow: 'hidden' }}>
      <video
        src="assets/mechanism.mp4"
        autoPlay loop muted playsInline
        onLoadedMetadata={(e) => { e.currentTarget.currentTime = 0; e.currentTarget.play().catch(() => {}); }}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 1,
          borderRadius: 0,
          filter: 'saturate(1.08) contrast(1.08)'
        }}
      />
    </div>
    <LiveGrain opacity={0.10}/>

    <div style={{
      position: 'absolute',
      top: 62,
      left: 58,
      right: 58,
      zIndex: 5,
      color: '#F4F0E8',
      background: '#0E0E12',
      padding: '34px 42px 36px',
      boxShadow: '0 22px 70px rgba(0,0,0,0.45)'
    }}>
      <div style={{ fontFamily: '"Unbounded", "Inter", sans-serif', fontWeight: 800, fontSize: 64, lineHeight: 0.98 }}>
        Отдельный блок про визуал
      </div>
      <div style={{ marginTop: 22, fontSize: 30, lineHeight: 1.35, fontWeight: 400 }}>
        Поговорим про картинки, видео, мультимедиа, генеративные инструменты.
        Как делать быстро. Как делать аккуратно. Как не скатываться в AI-slop.
        Как собрать не только «работает», но и выглядит нормально.
      </div>
    </div>
  </SlideFrame>
);

const Slide12WideBlock = ({ index = 12 }) => (
  <SlideFrame index={index}>
    <div style={{ position: 'absolute', inset: 0, background: '#0E0E12', overflow: 'hidden' }}>
      <video
        src="assets/mechanism.mp4"
        autoPlay loop muted playsInline
        onLoadedMetadata={(e) => { e.currentTarget.currentTime = 0; e.currentTarget.play().catch(() => {}); }}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 1,
          borderRadius: 0,
          filter: 'saturate(1.08) contrast(1.08)'
        }}
      />
    </div>
    <LiveGrain opacity={0.10}/>

    <div style={{
      position: 'absolute',
      top: 62,
      left: 0,
      right: 0,
      zIndex: 5,
      color: '#F4F0E8',
      background: '#0E0E12',
      padding: '34px 58px 36px',
      boxShadow: '0 22px 70px rgba(0,0,0,0.45)'
    }}>
      <div style={{ fontFamily: '"Unbounded", "Inter", sans-serif', fontWeight: 800, fontSize: 64, lineHeight: 0.98 }}>
        Отдельный блок про визуал
      </div>
      <div style={{ marginTop: 22, fontSize: 30, lineHeight: 1.35, fontWeight: 400 }}>
        Поговорим про картинки, видео, мультимедиа, генеративные инструменты.
        Как делать быстро. Как делать аккуратно. Как не скатываться в AI-slop.
        Как собрать не только «работает», но и выглядит нормально.
      </div>
    </div>
  </SlideFrame>
);

// 13 — Анка (отдельный слайд)
const Slide13 = ({ index = 13 }) => (
  <SlideFrame index={index}>
    <div style={{ position: 'absolute', inset: 0 }}><WaveField/></div>

    <div style={{
      position: 'absolute',
      left: 104,
      top: 292,
      width: 340,
      height: 450,
      overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.18)',
      background: '#151515',
      zIndex: 4
    }}>
      <img
        src="assets/speaker-anka.jpg"
        alt=""
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: '72% 42%',
          transform: 'scale(1.2)',
          filter: 'grayscale(1) contrast(1.12) brightness(1.08)'
        }}
      />
    </div>

    <Card position="lower" style={{ bottom: 124 }}>
      <div style={{
        fontFamily: '"Unbounded", "Inter", sans-serif',
        fontSize: 72,
        lineHeight: 1,
        fontWeight: 800,
        letterSpacing: '-0.02em'
      }}>
        Анка Ставенски
      </div>
      <div style={{ fontSize: 34, marginTop: 14, opacity: 0.9, lineHeight: 1.24 }}>
        Product owner, преподаватель в сфере AI и продуктового дизайна.
        Работает на стыке продуктов, дизайна, визуальных систем, мультимедиа
        и технологий. Опыт — art direction, умные дома, робототехника,
        тренажёры самолётов, мультимедиа проекты.
      </div>
      <div style={{
        marginTop: 20, fontFamily: '"JetBrains Mono", monospace', fontSize: 26, opacity: 0.76, lineHeight: 1.3
      }}>
        ex VK · ex Arrival · co-founder Signal DnA — AI page systems shaped by market signals
      </div>
    </Card>
  </SlideFrame>
);

// 14 — CTA (отдельный слайд)
const Slide14 = ({ index = 14 }) => (
  <SlideFrame index={index}>
    <div style={{ position: 'absolute', inset: 0, background: '#111216', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.95, mixBlendMode: 'screen', transform: 'translateY(-94px)' }}>
        <StudioGridNetwork scale={1.05} clear ink="#FFFFFF" lineAlpha={0.46} speed={0.42} dotSize={6.2} showCross/>
      </div>
      <div style={{
        position: 'absolute',
        inset: 2,
        border: '2px solid rgba(255,255,255,0.12)',
        borderRadius: 42,
        pointerEvents: 'none'
      }}/>
      
      <div style={{
        position: 'absolute', top: 126, right: 70,
        fontFamily: '"JetBrains Mono", monospace', fontSize: 24, letterSpacing: '0.32em',
        color: '#9BFF18', fontWeight: 700
      }}>
        OFFLINE
      </div>
      <div style={{
        position: 'absolute', top: 126, left: 70,
        fontFamily: '"JetBrains Mono", monospace', fontSize: 22, letterSpacing: '0.24em',
        color: '#9BFF18'
      }}>
        Oh, camp
      </div>
      <div style={{
        position: 'absolute',
        left: 72,
        bottom: 448,
        fontFamily: '"Unbounded", "Inter", sans-serif',
        fontSize: 136,
        opacity: 0.95,
        textTransform: 'uppercase',
        lineHeight: 0.88,
        color: '#FFFFFF',
        fontWeight: 800,
        letterSpacing: '-0.08em',
        transform: 'scaleX(1.02)',
        transformOrigin: 'left bottom'
      }}>
        LISBOA<br/>16–17.05
      </div>
    </div>
    <LiveGrain opacity={0.08}/>

    <Card position="lower" style={{ background: '#0E0E12', color: '#FFFFFF', bottom: 24 }}>
      <div style={{ fontSize: 34, lineHeight: 1.28 }}>
        Подойдёт новичкам, дизайнерам, креаторам, авторам, продактам, преподавателям,
        соло-экспертам — всем, кто хочет перестать бояться AI и собрать что-то своё.
      </div>
      <div style={{
        marginTop: 28,
        display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'nowrap'
      }}>
        <div style={{
          background: '#FFFFFF', color: '#0E0E12',
          padding: '18px 26px',
          flex: '0 0 auto',
          fontFamily: '"Unbounded", sans-serif', fontWeight: 700, fontSize: 32
        }}>
          <span style={{ textDecoration: 'line-through', opacity: 0.55 }}>250 €</span>
          <br/>
          200 € <span style={{ fontSize: 21 }}>до 10 мая</span>
        </div>
        <div style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 23, opacity: 0.95, lineHeight: 1.25, whiteSpace: 'nowrap'
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
        <span><span style={{ textDecoration: 'line-through', opacity: 0.55 }}>€ 250</span> → € 200 / до 10 мая</span>
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
      {String(index + 1).padStart(2, '0')} / 21
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
      {String(index + 1).padStart(2, '0')} / 21
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
      position: 'absolute', left: 64, right: 64, bottom: 92,
      border: '1px solid rgba(255,255,255,0.13)', borderRadius: 7,
      padding: '34px 38px 44px', minHeight: 560
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
  </SlideFrame>
);

// ALT — speaker card
const Slide18 = ({ index = 18 }) => (
  <SlideFrame index={index}>
    <div style={{ position: 'absolute', inset: 0, background: '#080809' }}/>
    <div style={{ position: 'absolute', top: 52, left: 58, fontFamily: '"JetBrains Mono", monospace', fontSize: 16, color: '#ff4f63' }}>
      {String(index + 1).padStart(2, '0')} / 21
    </div>
    <div style={{ position: 'absolute', top: 142, left: 72, fontFamily: '"JetBrains Mono", monospace', fontSize: 15, letterSpacing: '0.22em', color: '#9BFF18' }}>
      ВАШИ ПРОВОДНИКИ
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
      overflow: 'hidden',
      background: '#111'
    }}>
      <img
        src="assets/speaker-anka.jpg"
        alt=""
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center 42%',
          filter: 'grayscale(1) contrast(1.12) brightness(1.08)'
        }}
      />
    </div>
    <div style={{
      position: 'absolute', left: 72, top: 500, width: 530,
      fontFamily: '"Playfair Display", Georgia, serif', fontSize: 27, lineHeight: 1.32, color: '#F4F0E8'
    }}>
      Product owner и AI-практик.<br/>
      Работает на стыке продуктов, дизайна,<br/>
      визуальных систем, мультимедиа и технологий.<br/>
      Опыт — art direction, smart home, робототехника.
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

const Slide19 = ({ index = 19 }) => (
  <SlideFrame index={index}>
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.8, mixBlendMode: 'screen', overflow: 'hidden', pointerEvents: 'none', background: '#0a0a0c' }}>
      <StudioGridNetwork/>
    </div>
    <div style={{
      position: 'absolute',
      inset: 0,
      zIndex: 10,
      pointerEvents: 'none'
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        border: '8px solid #9fff24',
        borderRadius: 70,
        boxShadow: '0 0 18px rgba(159,255,36,0.14) inset'
      }}/>
      <div style={{
        position: 'absolute',
        top: '6%',
        left: '1.5%',
        padding: '22px 42px',
        border: '4px solid rgba(255,255,255,0.22)',
        borderRadius: 16,
        background: '#0f1014',
        color: '#FFFFFF',
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 34,
        lineHeight: 1,
        boxShadow: '0 0 0 2px rgba(0,0,0,0.35)'
      }}>
        visual-only
      </div>
      <div style={{
        position: 'absolute',
        top: '6%',
        left: '6%',
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: '0.6em',
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0)'
      }}>
        {String(index + 1).padStart(2, '0')} / 21
      </div>
      <div style={{
        position: 'absolute',
        top: '6%',
        right: '6%',
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: '0.6em',
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        color: '#9fff24',
        fontWeight: 700
      }}>
        OFFLINE
      </div>
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '6%',
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: '0.6em',
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        color: '#9fff24'
      }}>
        — EVENT
      </div>
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mixBlendMode: 'overlay',
        opacity: 0.3
      }}>
        <div style={{ width: 1, height: '40%', background: '#FFFFFF', position: 'absolute' }}/>
        <div style={{ height: 1, width: '40%', background: '#FFFFFF', position: 'absolute' }}/>
      </div>
      <div style={{
        position: 'absolute',
        bottom: '9.5%',
        left: '4%',
        fontFamily: '"Unbounded", "Inter", sans-serif',
        fontSize: 132,
        opacity: 0.9,
        textTransform: 'uppercase',
        lineHeight: 0.9,
        color: '#FFFFFF',
        fontWeight: 800,
        letterSpacing: '-0.08em',
        transform: 'scaleX(1.18)',
        transformOrigin: 'left bottom'
      }}>
        LISBOA<br/>2026
      </div>
    </div>
  </SlideFrame>
);

const Slide20 = ({ index = 20 }) => (
  <SlideFrame index={index} dark={false}>
    <div style={{ position: 'absolute', inset: 0, background: '#F4F2ED', color: '#070707' }}>
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: '38%',
        padding: '92px 42px 92px 54px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <div style={{
          fontFamily: '"Unbounded", "Inter", sans-serif',
          fontSize: 72,
          lineHeight: 1.08,
          fontWeight: 800,
          letterSpacing: '-0.03em',
          marginBottom: 16
        }}>
          Саша
        </div>
        <div style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: 34,
          lineHeight: 1.24,
          fontWeight: 600,
          opacity: 0.88
        }}>
          Event продюсер, автор тг канала <span style={{ whiteSpace: 'nowrap' }}>Oh, world</span>, организатор камерных выездов Oh, camp
        </div>
      </div>
      <div style={{
        position: 'absolute',
        top: 0,
        right: -2,
        bottom: 0,
        width: 'calc(62% + 4px)',
        overflow: 'hidden',
        background: '#F4F2ED'
      }}>
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: '82%',
          aspectRatio: '3 / 4',
          transform: 'translate(-50%, -50%)',
          overflow: 'hidden',
          background: '#F4F2ED'
        }}>
	        <video
	          src="assets/sasha-guide.mp4"
	          autoPlay
	          preload="auto"
	          loop
	          playsInline
	          onCanPlay={(e) => { e.currentTarget.play().catch(() => {}); }}
	          style={{
	            position: 'absolute',
	            top: '50%',
	            left: '50%',
	            width: '112%',
	            height: '112%',
	            transform: 'translate(-50%, -50%)',
	            objectFit: 'cover',
	            objectPosition: 'center center',
	            filter: 'grayscale(1) brightness(0.78) contrast(1.03)'
	          }}
	        />
        </div>
      </div>
    </div>
  </SlideFrame>
);

Object.assign(window, {
  Slide00, Slide01, Slide02, Slide03, Slide04, Slide05, Slide06,
  Slide07, Slide08, Slide09, Slide10, Slide10Task, Slide11, Slide12, Slide12WideBlock, Slide13, Slide14,
  Slide15, Slide16, Slide17, Slide18, Slide19, Slide20
});
