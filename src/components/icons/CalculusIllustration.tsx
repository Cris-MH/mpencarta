export default function CalculusIllustration({ size = 72 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="calculus-icon"
    >
      <style>{`
        .calculus-icon .shaded-area {
          transition: opacity 250ms ease;
          opacity: 0.2;
        }
        .calculus-icon:hover .shaded-area {
          opacity: 0.4;
        }
        .calculus-icon .curve-main {
          transition: stroke-width 200ms ease;
        }
        .calculus-icon:hover .curve-main {
          stroke-width: 2.5;
        }
      `}</style>

      {/* Axes */}
      <line x1="10" y1="56" x2="66" y2="56" stroke="#aaa" strokeWidth="1" strokeLinecap="round" />
      <line x1="10" y1="56" x2="10" y2="6" stroke="#aaa" strokeWidth="1" strokeLinecap="round" />

      {/* Axis arrows */}
      <polygon points="66,56 62,54 62,58" fill="#aaa" />
      <polygon points="10,6 8,10 12,10" fill="#aaa" />

      {/* Grid lines faint */}
      <line x1="10" y1="36" x2="62" y2="36" stroke="#555" strokeWidth="0.3" strokeDasharray="2 3" />
      <line x1="10" y1="16" x2="62" y2="16" stroke="#555" strokeWidth="0.3" strokeDasharray="2 3" />
      <line x1="30" y1="8" x2="30" y2="56" stroke="#555" strokeWidth="0.3" strokeDasharray="2 3" />
      <line x1="50" y1="8" x2="50" y2="56" stroke="#555" strokeWidth="0.3" strokeDasharray="2 3" />

      {/* Shaded area (integral region) */}
      <path
        className="shaded-area"
        d="M 20 56 L 20 42 C 24 34 30 22 36 16 C 40 12 44 14 50 22 L 50 56 Z"
        fill="#176B3A"
      />

      {/* Main curve */}
      <path
        className="curve-main"
        d="M 12 50 C 16 44 20 36 26 28 C 30 22 34 16 38 14 C 42 12 48 16 52 26 C 56 34 60 40 64 42"
        stroke="#43A047"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />

      {/* Boundary lines */}
      <line x1="20" y1="42" x2="20" y2="56" stroke="#176B3A" strokeWidth="0.8" strokeDasharray="2 1.5" />
      <line x1="50" y1="22" x2="50" y2="56" stroke="#176B3A" strokeWidth="0.8" strokeDasharray="2 1.5" />

      {/* Labels */}
      <text x="18" y="62" fontSize="8" fill="#ccc">a</text>
      <text x="48" y="62" fontSize="8" fill="#ccc">b</text>
      <text x="63" y="62" fontSize="7" fill="#888">x</text>
      <text x="6" y="10" fontSize="7" fill="#888">y</text>

      {/* Integral symbol in the shaded area */}
      <text x="30" y="48" fontSize="14" fill="#43A047" fontFamily="serif" opacity="0.7">∫</text>

      {/* Tick marks */}
      <line x1="20" y1="55" x2="20" y2="57" stroke="#aaa" strokeWidth="0.8" />
      <line x1="50" y1="55" x2="50" y2="57" stroke="#aaa" strokeWidth="0.8" />

      {/* Small dx notation */}
      <text x="52" y="50" fontSize="7" fill="#888" fontStyle="italic">dx</text>
    </svg>
  );
}
