export default function TrigonometryIllustration({ size = 120 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="trig-icon"
    >
      <style>{`
        .trig-icon .radius-line {
          transition: transform 250ms ease;
          transform-origin: 50px 60px;
        }
        .trig-icon:hover .radius-line {
          transform: rotate(-12deg);
        }
      `}</style>

      {/* Unit circle background fill */}
      <circle cx="50" cy="60" r="38" fill="rgba(185,74,66,0.05)" stroke="#B94A42" strokeWidth="1" opacity="0.5" />

      {/* Quadrant markers on circle */}
      <circle cx="88" cy="60" r="1.5" fill="#888" opacity="0.4" />
      <circle cx="12" cy="60" r="1.5" fill="#888" opacity="0.4" />
      <circle cx="50" cy="22" r="1.5" fill="#888" opacity="0.4" />
      <circle cx="50" cy="98" r="1.5" fill="#888" opacity="0.4" />

      {/* Axes */}
      <line x1="6" y1="60" x2="96" y2="60" stroke="#888" strokeWidth="0.8" />
      <line x1="50" y1="14" x2="50" y2="106" stroke="#888" strokeWidth="0.8" />

      {/* Axis arrows */}
      <polygon points="96,60 92,58 92,62" fill="#888" />
      <polygon points="50,14 48,18 52,18" fill="#888" />

      {/* Tick marks on axes */}
      <line x1="70" y1="58" x2="70" y2="62" stroke="#666" strokeWidth="0.5" />
      <line x1="30" y1="58" x2="30" y2="62" stroke="#666" strokeWidth="0.5" />
      <line x1="48" y1="40" x2="52" y2="40" stroke="#666" strokeWidth="0.5" />
      <line x1="48" y1="80" x2="52" y2="80" stroke="#666" strokeWidth="0.5" />

      {/* Angle arc */}
      <path d="M 58 60 A 8 8 0 0 0 55 53" stroke="#B94A42" strokeWidth="1.5" fill="none" />

      {/* Radius line group (animated) */}
      <g className="radius-line">
        {/* Main radius */}
        <line x1="50" y1="60" x2="80" y2="33" stroke="#B94A42" strokeWidth="2.5" strokeLinecap="round" />

        {/* Point on circle */}
        <circle cx="80" cy="33" r="4" fill="#B94A42" stroke="#7f3230" strokeWidth="1" />
        <circle cx="80" cy="33" r="1.5" fill="rgba(255,255,255,0.4)" />

        {/* Sin line (vertical — from point to x-axis) */}
        <line x1="80" y1="33" x2="80" y2="60" stroke="#E5B83F" strokeWidth="2.2" strokeDasharray="3 2" />

        {/* Cos line (horizontal — from y-axis to point projection) */}
        <line x1="50" y1="60" x2="80" y2="60" stroke="#3C79A8" strokeWidth="2.2" strokeDasharray="3 2" />

        {/* Sin label */}
        <text x="83" y="48" fontSize="10" fill="#E5B83F" fontWeight="bold">sin</text>

        {/* Cos label */}
        <text x="58" y="73" fontSize="10" fill="#3C79A8" fontWeight="bold">cos</text>
      </g>

      {/* Theta label */}
      <text x="56" y="56" fontSize="11" fill="#B94A42" fontFamily="serif" fontStyle="italic">θ</text>

      {/* Axis labels */}
      <text x="93" y="72" fontSize="8" fill="#888" fontStyle="italic">x</text>
      <text x="53" y="18" fontSize="8" fill="#888" fontStyle="italic">y</text>

      {/* 1 label on radius */}
      <text x="60" y="42" fontSize="8" fill="#B94A42" opacity="0.6">1</text>

      {/* Small sine wave emanating from circle (right side) */}
      <path
        d="M 92 60 C 96 50 100 50 104 60 C 108 70 112 70 116 60"
        stroke="#B94A42"
        strokeWidth="1.2"
        fill="none"
        opacity="0.4"
      />

      {/* Angle values on arc */}
      <text x="50" y="10" fontSize="7" fill="#666" textAnchor="middle">90°</text>
      <text x="93" y="63" fontSize="7" fill="#666">0°</text>
    </svg>
  );
}
