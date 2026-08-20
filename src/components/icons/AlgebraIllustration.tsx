export default function AlgebraIllustration({ size = 72 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="algebra-icon"
    >
      <style>{`
        .algebra-icon .x-var {
          transition: opacity 200ms ease, fill 200ms ease;
        }
        .algebra-icon:hover .x-var {
          fill: #FFD54F;
          opacity: 1;
        }
      `}</style>

      {/* Chalkboard shadow */}
      <rect x="9" y="12" width="56" height="44" rx="2" fill="rgba(0,0,0,0.3)" />

      {/* Chalkboard */}
      <rect x="6" y="9" width="56" height="44" rx="2" fill="#1a4a24" stroke="#0d2e14" strokeWidth="2" />
      <rect x="8" y="11" width="52" height="40" rx="1" fill="#2a5a34" />

      {/* Inner board texture */}
      <rect x="8" y="11" width="52" height="40" rx="1" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />

      {/* Chalk writing: x + 2 = 5 */}
      <text className="x-var" x="14" y="32" fontFamily="serif" fontSize="14" fontWeight="bold" fontStyle="italic" fill="#e8e8d8" opacity="0.95">x</text>
      <text x="26" y="32" fontFamily="sans-serif" fontSize="13" fill="#e8e8d8" opacity="0.9">+ 2 = 5</text>

      {/* Chalk underline on x */}
      <line x1="13" y1="35" x2="22" y2="35" stroke="#FFD54F" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />

      {/* Solution below */}
      <text x="14" y="44" fontFamily="sans-serif" fontSize="10" fill="#c8d8c8" opacity="0.6">∴ x = 3</text>

      {/* Chalk dust particles */}
      <circle cx="48" cy="42" r="0.8" fill="#e8e8d8" opacity="0.4" />
      <circle cx="44" cy="45" r="0.5" fill="#e8e8d8" opacity="0.3" />
      <circle cx="50" cy="44" r="0.6" fill="#e8e8d8" opacity="0.3" />
      <circle cx="46" cy="47" r="0.4" fill="#e8e8d8" opacity="0.25" />

      {/* Chalk piece at tray */}
      <rect x="42" y="49" width="14" height="3" rx="1.5" fill="#f0f0e0" stroke="#c0c0a0" strokeWidth="0.5" />

      {/* Wood frame tray */}
      <rect x="4" y="53" width="60" height="5" rx="1.5" fill="#8B5E3C" stroke="#5C3A1E" strokeWidth="0.8" />
      <rect x="4" y="53" width="60" height="2" rx="1" fill="#A0724D" opacity="0.5" />

      {/* Shadow */}
      <ellipse cx="34" cy="64" rx="22" ry="2.5" fill="rgba(0,0,0,0.25)" />
    </svg>
  );
}
