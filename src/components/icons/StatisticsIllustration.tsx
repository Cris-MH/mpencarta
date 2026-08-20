export default function StatisticsIllustration({ size = 72 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="stats-icon"
    >
      <style>{`
        .stats-icon .bar {
          transition: transform 200ms ease;
          transform-origin: bottom;
        }
        .stats-icon:hover .bar-1 { transform: scaleY(1.08); }
        .stats-icon:hover .bar-2 { transform: scaleY(1.05); }
        .stats-icon:hover .bar-3 { transform: scaleY(1.1); }
        .stats-icon:hover .bar-4 { transform: scaleY(1.06); }
        .stats-icon:hover .bar-5 { transform: scaleY(1.04); }
      `}</style>

      {/* Axes */}
      <line x1="10" y1="58" x2="66" y2="58" stroke="#aaa" strokeWidth="1" />
      <line x1="10" y1="58" x2="10" y2="8" stroke="#aaa" strokeWidth="0.8" />

      {/* Y-axis marks */}
      <line x1="8" y1="20" x2="11" y2="20" stroke="#888" strokeWidth="0.5" />
      <line x1="8" y1="35" x2="11" y2="35" stroke="#888" strokeWidth="0.5" />
      <line x1="8" y1="50" x2="11" y2="50" stroke="#888" strokeWidth="0.5" />

      {/* Bar 1 — blue */}
      <g className="bar bar-1">
        <rect x="14" y="40" width="8" height="18" rx="1" fill="#1E88E5" />
        <rect x="14" y="40" width="8" height="3" rx="1" fill="rgba(255,255,255,0.2)" />
      </g>

      {/* Bar 2 — green */}
      <g className="bar bar-2">
        <rect x="24" y="28" width="8" height="30" rx="1" fill="#43A047" />
        <rect x="24" y="28" width="8" height="3" rx="1" fill="rgba(255,255,255,0.2)" />
      </g>

      {/* Bar 3 — orange */}
      <g className="bar bar-3">
        <rect x="34" y="16" width="8" height="42" rx="1" fill="#D98236" />
        <rect x="34" y="16" width="8" height="3" rx="1" fill="rgba(255,255,255,0.2)" />
      </g>

      {/* Bar 4 — purple */}
      <g className="bar bar-4">
        <rect x="44" y="24" width="8" height="34" rx="1" fill="#7B4B9E" />
        <rect x="44" y="24" width="8" height="3" rx="1" fill="rgba(255,255,255,0.2)" />
      </g>

      {/* Bar 5 — red */}
      <g className="bar bar-5">
        <rect x="54" y="34" width="8" height="24" rx="1" fill="#B94A42" />
        <rect x="54" y="34" width="8" height="3" rx="1" fill="rgba(255,255,255,0.2)" />
      </g>

      {/* Trend line (dashed diagonal) */}
      <path
        d="M 18 42 L 28 30 L 38 18 L 48 26 L 58 36"
        stroke="#E5B83F"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="4 2"
      />

      {/* Dots at bar tops on trend line */}
      <circle cx="18" cy="42" r="2.5" fill="#E5B83F" stroke="rgba(0,0,0,0.3)" strokeWidth="0.5" />
      <circle cx="28" cy="30" r="2.5" fill="#E5B83F" stroke="rgba(0,0,0,0.3)" strokeWidth="0.5" />
      <circle cx="38" cy="18" r="2.5" fill="#E5B83F" stroke="rgba(0,0,0,0.3)" strokeWidth="0.5" />
      <circle cx="48" cy="26" r="2.5" fill="#E5B83F" stroke="rgba(0,0,0,0.3)" strokeWidth="0.5" />
      <circle cx="58" cy="36" r="2.5" fill="#E5B83F" stroke="rgba(0,0,0,0.3)" strokeWidth="0.5" />

      {/* X-axis labels */}
      <text x="16" y="66" fontSize="5" fill="#888" textAnchor="middle">A</text>
      <text x="28" y="66" fontSize="5" fill="#888" textAnchor="middle">B</text>
      <text x="38" y="66" fontSize="5" fill="#888" textAnchor="middle">C</text>
      <text x="48" y="66" fontSize="5" fill="#888" textAnchor="middle">D</text>
      <text x="58" y="66" fontSize="5" fill="#888" textAnchor="middle">E</text>
    </svg>
  );
}
