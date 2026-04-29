// Genie + Triangle — closer to the original reference
// Genie: 8-armed creature, teal body, white tangled-yarn brain on top, smiling face with red nose
// Triangle: purple, one big eye, stick legs + arm

const Genie = ({ size = 280, style = {} }) => {
  return (
    <svg viewBox="0 0 320 380" width={size} height={size * 380/320} style={{ overflow: 'visible', ...style }}>
      <defs>
        <radialGradient id="genBody" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#4FB3B0"/>
          <stop offset="100%" stopColor="#1F5F66"/>
        </radialGradient>
      </defs>

      {/* 8 wavy tentacles */}
      <g style={{ animation: 'gen-arms 4s ease-in-out infinite' }}>
        {[
          'M 80 220 Q 40 250 50 310',
          'M 100 240 Q 60 290 80 340',
          'M 130 250 Q 110 320 130 360',
          'M 160 250 Q 160 330 150 365',
          'M 190 250 Q 200 320 180 360',
          'M 220 240 Q 250 300 220 350',
          'M 240 220 Q 280 260 270 320',
          'M 60 200 Q 30 220 30 260'
        ].map((d, i) => (
          <path key={i} d={d} stroke="#1F5F66" strokeWidth="14" fill="none" strokeLinecap="round"/>
        ))}
      </g>

      {/* main body — pear shape */}
      <path d="M 160 90 Q 250 110 250 200 Q 250 250 200 260 Q 160 265 120 260 Q 70 250 70 200 Q 70 110 160 90 Z"
            fill="url(#genBody)"/>

      {/* tangled yarn brain on top */}
      <g style={{ animation: 'gen-brain 14s linear infinite', transformOrigin: '160px 70px' }}>
        <path d="M 100 80 Q 70 60 95 45 Q 120 35 130 60 Q 140 80 165 65 Q 190 45 215 60 Q 235 75 220 95 Q 200 105 175 90 Q 145 80 130 95 Q 110 110 90 95 Q 75 80 100 80 M 110 50 Q 130 30 160 35 Q 195 30 220 50 Q 240 70 225 90 Q 200 100 180 80 Q 155 65 130 75 Q 105 85 95 70 M 125 25 Q 155 15 190 25 Q 225 35 235 65 M 95 65 Q 80 80 100 100 Q 130 110 155 95"
              stroke="#F2EAD3" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </g>

      {/* face */}
      <ellipse cx="135" cy="170" rx="6" ry="6" fill="#0E0E12">
        <animate attributeName="ry" values="6;6;0.7;6;6" keyTimes="0;0.45;0.5;0.55;1" dur="4.5s" repeatCount="indefinite"/>
      </ellipse>
      <ellipse cx="185" cy="170" rx="6" ry="6" fill="#0E0E12">
        <animate attributeName="ry" values="6;6;0.7;6;6" keyTimes="0;0.45;0.5;0.55;1" dur="4.5s" repeatCount="indefinite"/>
      </ellipse>
      <circle cx="160" cy="190" r="7" fill="#E8553B"/>
      <path d="M 145 205 Q 160 215 175 205" stroke="#0E0E12" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
    </svg>
  );
};

const Triangle = ({ size = 160, style = {}, lookAt = null }) => {
  const px = lookAt ? Math.max(73, Math.min(87, 80 + lookAt.x * 4)) : 80;
  const py = lookAt ? Math.max(53, Math.min(67, 60 + lookAt.y * 4)) : 60;
  return (
    <svg viewBox="0 0 160 200" width={size} height={size * 200/160} style={{ overflow: 'visible', ...style }}>
      <defs>
        <linearGradient id="triBody2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6B5BEA"/>
          <stop offset="100%" stopColor="#4838B8"/>
        </linearGradient>
      </defs>
      <g style={{ animation: 'tri-walk 2.2s ease-in-out infinite' }}>
        <line x1="60" y1="140" x2="55" y2="180" stroke="#4838B8" strokeWidth="6" strokeLinecap="round"/>
        <line x1="100" y1="140" x2="105" y2="180" stroke="#4838B8" strokeWidth="6" strokeLinecap="round"/>
        <ellipse cx="50" cy="184" rx="10" ry="5" fill="#4838B8"/>
        <ellipse cx="110" cy="184" rx="10" ry="5" fill="#4838B8"/>
      </g>
      <path d="M 80 25 L 130 145 L 30 145 Z" fill="url(#triBody2)"/>
      <circle cx="80" cy="60" r="14" fill="#F2EAD3"/>
      <circle cx={px} cy={py} r="6" fill="#0E0E12"/>
      <circle cx={px-1.5} cy={py-1.5} r="1.5" fill="#FFFFFF"/>
      <path d="M 70 95 Q 80 102 90 95" stroke="#F2EAD3" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <g style={{ animation: 'tri-wave 3s ease-in-out infinite', transformOrigin: '120px 110px' }}>
        <line x1="120" y1="110" x2="155" y2="95" stroke="#4838B8" strokeWidth="6" strokeLinecap="round"/>
        <circle cx="158" cy="93" r="6" fill="#4838B8"/>
      </g>
    </svg>
  );
};

if (typeof document !== 'undefined' && !document.getElementById('character-keyframes-2')) {
  const s = document.createElement('style');
  s.id = 'character-keyframes-2';
  s.textContent = `
    @keyframes gen-arms { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-4px) rotate(-1deg); } }
    @keyframes gen-brain { 0% { transform: rotate(0deg) scale(1); } 50% { transform: rotate(180deg) scale(1.06); } 100% { transform: rotate(360deg) scale(1); } }
    @keyframes tri-walk { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
    @keyframes tri-wave { 0%,100% { transform: rotate(-5deg); } 50% { transform: rotate(15deg); } }
  `;
  document.head.appendChild(s);
}

Object.assign(window, { Genie, Triangle });
