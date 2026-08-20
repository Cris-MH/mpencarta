export default function TrigonometryIllustration({ size = 72 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="trig-icon"
    >
      <style>{`
        .trig-icon .radius-line {
          transition: transform 250ms ease;
          transform-origin: 30px 36px;
        }
        .trig-icon:hover .radius-line {
          transform: rotate(-15deg);
        }
      `}</style>

      {/* Unit circle background */}
      <circle cx="30" cy="36" r="24" fill="rgba(185,74,66,0.06)" stroke="#B94A42" strokeWidth="0.8" opacity="0.4" />

      {/* Tick marks on circle */}
      <line x1="54" y1="36" x2="56" y2="36" stroke="#666" strokeWidth="0.4" />
      <line x1="6" y1="36" x2="4" y2="36" stroke="#666" strokeWidth="0.4" />
      <line x1="30" y1="12" x2="30" y2="10" stroke="#666" strokeWidth="0.4" />
      <line x1="30" y1="60" x2="30" y2="62" stroke="#666" strokeWidth="0.4" />

      {/* Axes */}
      <line x1="4" y1="36" x2="58" y2="36" stroke="#888" strokeWidth="0.6" />
      <line x1="30" y1="8" x2="30" y2="64" stroke="#888" strokeWidth="0.6" />

      {/* Axis arrows */}
      <polygon points="58,36 55,34.5 55,37.5" fill="#888" />
      <polygon points="30,8 28.5,11 31.5,11" fill="#888" />

      {/* Angle arc */}
      <path d="M 36 36 A 6 6 0 0 0 34 31" stroke="#B94A42" strokeWidth="1.2" fill="none" />

      {/* Radius line (animated) */}
      <g className="radius-line">
        <line x1="30" y1="36" x2="48" y2="20" stroke="#B94A42" strokeWidth="2" strokeLinecap="round" />
        {/* Point on circle */}
        <circle cx="48" cy="20" r="3" fill="#B94A42" stroke="#7f3230" strokeWidth="0.8" />
        <circle cx="48" cy="20" r="1.2" fill="rgba(255,255,255,0.4)" />

        {/* Sin line (vertical dotted) */}
        <line x1="48" y1="20" x2="48" y2="36" stroke="#E5B83F" strokeWidth="1.8" strokeDasharray="2.5 1.5" />

        {/* Cos line (horizontal dotted) */}
        <line x1="30" y1="36" x2="48" y2="36" stroke="#3C79A8" strokeWidth="1.8" strokeDasharray="2.5 1.5" />
      </g>

      {/* Labels */}
      <text x="50" y="29" fontSize="8" fill="#E5B83F" fontWeight="bold">sin</text>
      <text x="35" y="44" fontSize="8" fill="#3C79A8" fontWeight="bold">cos</text>
      <text x="33" y="34" fontSize="8" fill="#B94A42" fontFamily="serif" fontStyle="italic">θ</text>

      {/* Small sine wave emanating from circle */}
      <path
        d="M 55 36 C 58 30 61 30 64 36 C 67 42 70 42 70 36"
        stroke="#B94A42"
        strokeWidth="1"
        fill="none"
        opacity="0.5"
      />

      {/* Axis labels */}
      <text x="56" y="44" fontSize="6" fill="#888">x</text>
      <text x="32" y="12" fontSize="6" fill="#888">y</text>
    </svg>
  );
}
