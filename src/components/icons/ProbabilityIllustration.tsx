export default function ProbabilityIllustration({ size = 100 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="probability-icon"
    >
      <style>{`
        .probability-icon .dice-group {
          transition: transform 200ms ease;
        }
        .probability-icon:hover .dice-group {
          transform: rotateX(-3deg) rotateY(5deg);
        }
      `}</style>

      {/* Shadow beneath dice */}
      <ellipse cx="50" cy="88" rx="30" ry="5" fill="rgba(0,0,0,0.2)" />

      <g className="dice-group">
        {/* Die 1 — left, slightly tilted, showing 6 */}
        <g transform="rotate(-6, 32, 50)">
          {/* Die body */}
          <rect x="8" y="26" width="42" height="42" rx="6" fill="#FFFDE7" stroke="#C9A825" strokeWidth="1.8" />
          {/* Top highlight */}
          <rect x="8" y="26" width="42" height="8" rx="4" fill="rgba(255,255,255,0.3)" />
          {/* Bottom shadow edge */}
          <rect x="8" y="60" width="42" height="8" rx="4" fill="rgba(0,0,0,0.06)" />

          {/* 6 dots — 3 columns × 2 rows */}
          <circle cx="20" cy="38" r="4" fill="#B94A42" />
          <circle cx="20" cy="50" r="4" fill="#B94A42" />
          <circle cx="20" cy="62" r="4" fill="#B94A42" />
          <circle cx="38" cy="38" r="4" fill="#B94A42" />
          <circle cx="38" cy="50" r="4" fill="#B94A42" />
          <circle cx="38" cy="62" r="4" fill="#B94A42" />

          {/* Dot highlights */}
          <circle cx="19" cy="37" r="1.3" fill="rgba(255,255,255,0.25)" />
          <circle cx="37" cy="37" r="1.3" fill="rgba(255,255,255,0.25)" />
        </g>

        {/* Die 2 — right, tilted other way, showing 4 */}
        <g transform="rotate(5, 65, 45)">
          {/* Die body */}
          <rect x="48" y="22" width="40" height="40" rx="6" fill="#FFF8E1" stroke="#C9A825" strokeWidth="1.8" />
          {/* Top highlight */}
          <rect x="48" y="22" width="40" height="7" rx="4" fill="rgba(255,255,255,0.3)" />
          {/* Shadow edge */}
          <rect x="48" y="55" width="40" height="7" rx="4" fill="rgba(0,0,0,0.05)" />

          {/* 4 dots — corners */}
          <circle cx="58" cy="33" r="3.5" fill="#1a4f7a" />
          <circle cx="78" cy="33" r="3.5" fill="#1a4f7a" />
          <circle cx="58" cy="53" r="3.5" fill="#1a4f7a" />
          <circle cx="78" cy="53" r="3.5" fill="#1a4f7a" />

          {/* Dot highlights */}
          <circle cx="57" cy="32" r="1.1" fill="rgba(255,255,255,0.25)" />
          <circle cx="77" cy="32" r="1.1" fill="rgba(255,255,255,0.25)" />
        </g>

        {/* Die 2 top face hint (3D) */}
        <g transform="rotate(5, 65, 45)">
          <path d="M 48 22 L 52 16 L 92 16 L 88 22" fill="rgba(255,248,225,0.4)" stroke="#C9A825" strokeWidth="0.6" />
          {/* 2 dots on top */}
          <circle cx="64" cy="18" r="2" fill="#1a4f7a" opacity="0.4" />
          <circle cx="80" cy="18" r="2" fill="#1a4f7a" opacity="0.4" />
        </g>
      </g>

      {/* Sparkle/luck details */}
      <path d="M 82 8 L 84 12 L 88 12 L 85 14.5 L 86 18 L 82 16 L 78 18 L 79 14.5 L 76 12 L 80 12 Z" fill="#E5B83F" opacity="0.7" />
      <path d="M 10 14 L 11.5 17 L 14 17 L 12 18.5 L 13 21 L 10 19 L 7 21 L 8 18.5 L 6 17 L 8.5 17 Z" fill="#E5B83F" opacity="0.4" />
      <path d="M 92 70 L 93 72 L 95 72 L 93.5 73.5 L 94 75.5 L 92 74 L 90 75.5 L 90.5 73.5 L 89 72 L 91 72 Z" fill="#E5B83F" opacity="0.3" />
    </svg>
  );
}
