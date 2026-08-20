export default function StatisticsIllustration({ size = 100 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="stats-icon"
    >
      <style>{`
        .stats-icon .bar {
          transition: transform 200ms ease;
          transform-origin: center bottom;
        }
        .stats-icon:hover .bar-1 { transform: scaleY(1.08); }
        .stats-icon:hover .bar-2 { transform: scaleY(1.05); }
        .stats-icon:hover .bar-3 { transform: scaleY(1.1); }
        .stats-icon:hover .bar-4 { transform: scaleY(1.06); }
        .stats-icon:hover .bar-5 { transform: scaleY(1.04); }
      `}</style>

      {/* Axes */}
      <line x1="14" y1="82" x2="92" y2="82" stroke="#aaa" strokeWidth="1.2" />
      <line x1="14" y1="82" x2="14" y2="10" stroke="#aaa" strokeWidth="1" />

      {/* Y-axis marks */}
      <line x1="12" y1="28" x2="15" y2="28" stroke="#888" strokeWidth="0.5" />
      <line x1="12" y1="50" x2="15" y2="50" stroke="#888" strokeWidth="0.5" />
      <line x1="12" y1="68" x2="15" y2="68" stroke="#888" strokeWidth="0.5" />

      {/* Bar 1 — blue (bell shape: short) */}
      <g className="bar bar-1">
        <rect x="20" y="56" width="11" height="26" rx="1.5" fill="#1E88E5" />
        <rect x="20" y="56" width="11" height="4" rx="1.5" fill="rgba(255,255,255,0.2)" />
      </g>

      {/* Bar 2 — teal (medium) */}
      <g className="bar bar-2">
        <rect x="34" y="38" width="11" height="44" rx="1.5" fill="#26A69A" />
        <rect x="34" y="38" width="11" height="4" rx="1.5" fill="rgba(255,255,255,0.2)" />
      </g>

      {/* Bar 3 — green (tallest) */}
      <g className="bar bar-3">
        <rect x="48" y="20" width="11" height="62" rx="1.5" fill="#43A047" />
        <rect x="48" y="20" width="11" height="4" rx="1.5" fill="rgba(255,255,255,0.2)" />
      </g>

      {/* Bar 4 — orange (medium) */}
      <g className="bar bar-4">
        <rect x="62" y="34" width="11" height="48" rx="1.5" fill="#D98236" />
        <rect x="62" y="34" width="11" height="4" rx="1.5" fill="rgba(255,255,255,0.2)" />
      </g>

      {/* Bar 5 — red (short) */}
      <g className="bar bar-5">
        <rect x="76" y="50" width="11" height="32" rx="1.5" fill="#B94A42" />
        <rect x="76" y="50" width="11" height="4" rx="1.5" fill="rgba(255,255,255,0.2)" />
      </g>

      {/* Trend curve (dotted bell) over bars */}
      <path
        d="M 25 58 C 32 45 40 32 53 22 C 64 30 72 40 82 52"
        stroke="#E5B83F"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="4 2.5"
      />

      {/* Dots at bar tops on trend line */}
      <circle cx="25" cy="58" r="3" fill="#E5B83F" stroke="rgba(0,0,0,0.3)" strokeWidth="0.5" />
      <circle cx="39" cy="40" r="3" fill="#E5B83F" stroke="rgba(0,0,0,0.3)" strokeWidth="0.5" />
      <circle cx="53" cy="22" r="3" fill="#E5B83F" stroke="rgba(0,0,0,0.3)" strokeWidth="0.5" />
      <circle cx="67" cy="36" r="3" fill="#E5B83F" stroke="rgba(0,0,0,0.3)" strokeWidth="0.5" />
      <circle cx="82" cy="52" r="3" fill="#E5B83F" stroke="rgba(0,0,0,0.3)" strokeWidth="0.5" />

      {/* μ and σ labels */}
      <text x="50" y="94" fontSize="9" fill="#ccc" textAnchor="middle" fontFamily="serif">μ</text>
      <text x="72" y="94" fontSize="9" fill="#ccc" textAnchor="middle" fontFamily="serif">σ</text>

      {/* Arrow indicating σ spread */}
      <line x1="53" y1="88" x2="67" y2="88" stroke="#ccc" strokeWidth="0.5" opacity="0.5" />
      <polygon points="67,88 65,87 65,89" fill="#ccc" opacity="0.5" />
    </svg>
  );
}
