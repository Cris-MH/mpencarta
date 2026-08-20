export default function AlgebraIllustration({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Chalkboard */}
      <rect x="6" y="10" width="52" height="40" rx="2" fill="#2E5A34" stroke="#1a3a1e" strokeWidth="2" />
      <rect x="8" y="12" width="48" height="36" rx="1" fill="#3B6B40" />
      {/* Board inner shadow */}
      <rect x="8" y="12" width="48" height="36" rx="1" fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
      {/* Chalk writing: x + 2 = 5 */}
      <text x="14" y="30" fontFamily="serif" fontSize="11" fontWeight="bold" fontStyle="italic" fill="#e8e8d8" opacity="0.95">x</text>
      <text x="23" y="30" fontFamily="sans-serif" fontSize="11" fill="#e8e8d8" opacity="0.9">+ 2 = 5</text>
      {/* Underline highlight on x */}
      <line x1="13" y1="33" x2="21" y2="33" stroke="#FFD54F" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      {/* Additional formula */}
      <text x="16" y="42" fontFamily="sans-serif" fontSize="9" fill="#c8d8c8" opacity="0.7">x = 3</text>
      {/* Chalk dust particles */}
      <circle cx="45" cy="40" r="0.8" fill="#e8e8d8" opacity="0.4" />
      <circle cx="42" cy="43" r="0.5" fill="#e8e8d8" opacity="0.3" />
      <circle cx="48" cy="41" r="0.6" fill="#e8e8d8" opacity="0.35" />
      {/* Chalk piece at bottom */}
      <rect x="40" y="46" width="12" height="3" rx="1.5" fill="#f0f0e0" stroke="#c0c0a0" strokeWidth="0.5" />
      {/* Frame wood trim */}
      <rect x="4" y="50" width="56" height="4" rx="1" fill="#8B5E3C" stroke="#5C3A1E" strokeWidth="0.8" />
      {/* Shadow */}
      <ellipse cx="32" cy="58" rx="20" ry="2" fill="rgba(0,0,0,0.12)" />
    </svg>
  );
}
