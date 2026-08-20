export default function CalculusIllustration({ size = 140 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="calculus-icon"
    >
      <style>{`
        .calculus-icon .shaded-area {
          transition: opacity 250ms ease;
          opacity: 0.25;
        }
        .calculus-icon:hover .shaded-area {
          opacity: 0.5;
        }
        .calculus-icon .curve-main {
          transition: stroke-width 200ms ease;
        }
        .calculus-icon:hover .curve-main {
          stroke-width: 3;
        }
      `}</style>

      {/* Axes */}
      <line x1="20" y1="110" x2="130" y2="110" stroke="#aaa" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="20" y1="110" x2="20" y2="10" stroke="#aaa" strokeWidth="1.2" strokeLinecap="round" />

      {/* Axis arrows */}
      <polygon points="130,110 125,107 125,113" fill="#aaa" />
      <polygon points="20,10 17,15 23,15" fill="#aaa" />

      {/* Grid lines — very faint */}
      <line x1="20" y1="70" x2="125" y2="70" stroke="#555" strokeWidth="0.3" strokeDasharray="3 4" />
      <line x1="20" y1="30" x2="125" y2="30" stroke="#555" strokeWidth="0.3" strokeDasharray="3 4" />
      <line x1="50" y1="15" x2="50" y2="110" stroke="#555" strokeWidth="0.3" strokeDasharray="3 4" />
      <line x1="80" y1="15" x2="80" y2="110" stroke="#555" strokeWidth="0.3" strokeDasharray="3 4" />
      <line x1="110" y1="15" x2="110" y2="110" stroke="#555" strokeWidth="0.3" strokeDasharray="3 4" />

      {/* Shaded integral region */}
      <path
        className="shaded-area"
        d="M 40 110 L 40 82 C 48 65 56 42 65 30 C 72 22 80 25 90 40 C 95 48 98 55 100 62 L 100 110 Z"
        fill="#176B3A"
      />

      {/* Main curve — cubic function */}
      <path
        className="curve-main"
        d="M 24 98 C 30 90 36 78 44 65 C 50 55 56 40 64 28 C 70 20 78 22 86 35 C 92 45 98 58 104 68 C 110 78 116 84 125 88"
        stroke="#43A047"
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
      />

      {/* Tangent line at a point */}
      <line x1="55" y1="60" x2="85" y2="20" stroke="#E5B83F" strokeWidth="1" opacity="0.5" strokeDasharray="4 2" />
      <circle cx="65" cy="44" r="3" fill="#E5B83F" opacity="0.6" />

      {/* Boundary lines a and b */}
      <line x1="40" y1="82" x2="40" y2="110" stroke="#176B3A" strokeWidth="1" strokeDasharray="2.5 2" />
      <line x1="100" y1="62" x2="100" y2="110" stroke="#176B3A" strokeWidth="1" strokeDasharray="2.5 2" />

      {/* Labels */}
      <text x="36" y="122" fontSize="10" fill="#ccc" fontFamily="serif">a</text>
      <text x="96" y="122" fontSize="10" fill="#ccc" fontFamily="serif">b</text>
      <text x="127" y="122" fontSize="9" fill="#888" fontStyle="italic">x</text>
      <text x="10" y="15" fontSize="9" fill="#888" fontStyle="italic">y</text>

      {/* Large integral symbol */}
      <text x="5" y="80" fontSize="28" fill="#43A047" fontFamily="serif" opacity="0.7">∫</text>

      {/* dx notation */}
      <text x="105" y="95" fontSize="10" fill="#888" fontStyle="italic" fontFamily="serif">dx</text>

      {/* f(x) label on curve */}
      <text x="108" y="82" fontSize="9" fill="#43A047" fontStyle="italic" opacity="0.7">f(x)</text>

      {/* Tick marks on axes */}
      <line x1="40" y1="108" x2="40" y2="112" stroke="#aaa" strokeWidth="0.8" />
      <line x1="80" y1="108" x2="80" y2="112" stroke="#aaa" strokeWidth="0.8" />
      <line x1="100" y1="108" x2="100" y2="112" stroke="#aaa" strokeWidth="0.8" />
      <line x1="18" y1="70" x2="22" y2="70" stroke="#aaa" strokeWidth="0.8" />
      <line x1="18" y1="30" x2="22" y2="30" stroke="#aaa" strokeWidth="0.8" />

      {/* Small derivative notation */}
      <text x="55" y="18" fontSize="8" fill="#E5B83F" opacity="0.5" fontFamily="serif">f&apos;(x₀)</text>
    </svg>
  );
}
