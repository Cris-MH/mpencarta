export default function ProbabilityIllustration({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Die 1 (left, slightly tilted) */}
      <g transform="rotate(-8, 22, 34)">
        <rect x="8" y="20" width="28" height="28" rx="4" fill="#FFFDE7" stroke="#C9A825" strokeWidth="1.5" />
        <rect x="8" y="20" width="28" height="5" rx="2" fill="rgba(255,255,255,0.4)" />
        {/* Dots for 6 face */}
        <circle cx="16" cy="30" r="2.5" fill="#B94A42" />
        <circle cx="16" cy="38" r="2.5" fill="#B94A42" />
        <circle cx="22" cy="30" r="2.5" fill="#B94A42" />
        <circle cx="22" cy="38" r="2.5" fill="#B94A42" />
        <circle cx="28" cy="30" r="2.5" fill="#B94A42" />
        <circle cx="28" cy="38" r="2.5" fill="#B94A42" />
      </g>
      {/* Die 2 (right, slight tilt other way) */}
      <g transform="rotate(5, 42, 32)">
        <rect x="30" y="18" width="26" height="26" rx="4" fill="#FFF8E1" stroke="#C9A825" strokeWidth="1.5" />
        <rect x="30" y="18" width="26" height="4" rx="2" fill="rgba(255,255,255,0.4)" />
        {/* Dots for 3 face */}
        <circle cx="37" cy="26" r="2.2" fill="#1a4f7a" />
        <circle cx="43" cy="32" r="2.2" fill="#1a4f7a" />
        <circle cx="49" cy="38" r="2.2" fill="#1a4f7a" />
      </g>
      {/* Shadow */}
      <ellipse cx="32" cy="56" rx="20" ry="3" fill="rgba(0,0,0,0.12)" />
      {/* Sparkle detail */}
      <path d="M 52 12 L 53 14 L 55 14 L 53.5 15.5 L 54 18 L 52 16.5 L 50 18 L 50.5 15.5 L 49 14 L 51 14 Z" fill="#E5B83F" opacity="0.6" />
    </svg>
  );
}
