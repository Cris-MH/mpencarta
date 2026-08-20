export default function ProbabilityIllustration({ size = 72 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="probability-icon"
    >
      <style>{`
        .probability-icon .dice-group {
          transition: transform 200ms ease;
        }
        .probability-icon:hover .dice-group {
          transform: rotateY(5deg) rotateX(-3deg);
        }
      `}</style>

      <g className="dice-group">
        {/* Die 1 — left, tilted (showing 6) */}
        <g transform="rotate(-8, 24, 36)">
          {/* Die body */}
          <rect x="6" y="18" width="32" height="32" rx="5" fill="#FFFDE7" stroke="#C9A825" strokeWidth="1.5" />
          {/* Top edge highlight */}
          <rect x="6" y="18" width="32" height="6" rx="3" fill="rgba(255,255,255,0.3)" />
          {/* Side shadow */}
          <rect x="6" y="44" width="32" height="6" rx="3" fill="rgba(0,0,0,0.08)" />

          {/* 6 dots */}
          <circle cx="15" cy="28" r="3" fill="#B94A42" />
          <circle cx="15" cy="34" r="3" fill="#B94A42" />
          <circle cx="15" cy="40" r="3" fill="#B94A42" />
          <circle cx="29" cy="28" r="3" fill="#B94A42" />
          <circle cx="29" cy="34" r="3" fill="#B94A42" />
          <circle cx="29" cy="40" r="3" fill="#B94A42" />

          {/* Dot highlights */}
          <circle cx="14" cy="27" r="1" fill="rgba(255,255,255,0.3)" />
          <circle cx="28" cy="27" r="1" fill="rgba(255,255,255,0.3)" />
        </g>

        {/* Die 2 — right, tilted other way (showing 3) */}
        <g transform="rotate(6, 48, 34)">
          {/* Die body */}
          <rect x="34" y="16" width="30" height="30" rx="5" fill="#FFF8E1" stroke="#C9A825" strokeWidth="1.5" />
          {/* Top highlight */}
          <rect x="34" y="16" width="30" height="5" rx="3" fill="rgba(255,255,255,0.3)" />
          {/* Shadow edge */}
          <rect x="34" y="41" width="30" height="5" rx="3" fill="rgba(0,0,0,0.06)" />

          {/* 3 dots diagonal */}
          <circle cx="42" cy="24" r="2.8" fill="#1a4f7a" />
          <circle cx="49" cy="31" r="2.8" fill="#1a4f7a" />
          <circle cx="56" cy="38" r="2.8" fill="#1a4f7a" />

          {/* Dot highlights */}
          <circle cx="41" cy="23" r="0.9" fill="rgba(255,255,255,0.3)" />
          <circle cx="48" cy="30" r="0.9" fill="rgba(255,255,255,0.3)" />
        </g>
      </g>

      {/* Shadow */}
      <ellipse cx="36" cy="62" rx="22" ry="3.5" fill="rgba(0,0,0,0.25)" />

      {/* Sparkle/luck detail */}
      <path d="M 58 10 L 59.5 13 L 62 13 L 60 15 L 61 18 L 58 16 L 55 18 L 56 15 L 54 13 L 56.5 13 Z" fill="#E5B83F" opacity="0.7" />
      <path d="M 8 12 L 9 14 L 11 14 L 9.5 15.5 L 10 17.5 L 8 16 L 6 17.5 L 6.5 15.5 L 5 14 L 7 14 Z" fill="#E5B83F" opacity="0.4" />
    </svg>
  );
}
