export default function AlgebraIllustration({ size = 130 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 130 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="algebra-icon"
    >
      <style>{`
        .algebra-icon .x-var {
          transition: fill 200ms ease, opacity 200ms ease;
        }
        .algebra-icon:hover .x-var {
          fill: #FFD54F;
          opacity: 1;
        }
      `}</style>

      {/* Shadow beneath chalkboard */}
      <rect x="14" y="18" width="105" height="84" rx="4" fill="rgba(0,0,0,0.3)" />

      {/* Chalkboard main body */}
      <rect x="10" y="14" width="105" height="84" rx="4" fill="#1a4a24" stroke="#0d2e14" strokeWidth="2.5" />
      <rect x="14" y="18" width="97" height="76" rx="2" fill="#2a5a34" />

      {/* Board subtle texture lines */}
      <line x1="14" y1="35" x2="111" y2="35" stroke="rgba(255,255,255,0.02)" strokeWidth="0.3" />
      <line x1="14" y1="55" x2="111" y2="55" stroke="rgba(255,255,255,0.02)" strokeWidth="0.3" />
      <line x1="14" y1="75" x2="111" y2="75" stroke="rgba(255,255,255,0.02)" strokeWidth="0.3" />

      {/* Main equation: x² + 2x + 1 = 0 */}
      <text className="x-var" x="22" y="50" fontFamily="serif" fontSize="22" fontWeight="bold" fontStyle="italic" fill="#e8e8d8" opacity="0.95">x</text>
      <text x="38" y="42" fontFamily="serif" fontSize="12" fill="#e8e8d8" opacity="0.85">²</text>
      <text x="46" y="50" fontFamily="sans-serif" fontSize="18" fill="#e8e8d8" opacity="0.9">+ 2</text>
      <text className="x-var" x="72" y="50" fontFamily="serif" fontSize="22" fontWeight="bold" fontStyle="italic" fill="#e8e8d8" opacity="0.95">x</text>
      <text x="88" y="50" fontFamily="sans-serif" fontSize="18" fill="#e8e8d8" opacity="0.9">+ 1 = 0</text>

      {/* Chalk underline on x variables */}
      <line x1="20" y1="54" x2="36" y2="54" stroke="#FFD54F" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <line x1="70" y1="54" x2="86" y2="54" stroke="#FFD54F" strokeWidth="2" strokeLinecap="round" opacity="0.5" />

      {/* Solution line below */}
      <text x="22" y="72" fontFamily="sans-serif" fontSize="13" fill="#c8d8c8" opacity="0.6">∴ x = −1 (doble)</text>

      {/* Small factored form */}
      <text x="22" y="86" fontFamily="serif" fontSize="10" fill="#a8c8a8" opacity="0.4">(x + 1)² = 0</text>

      {/* Chalk dust particles at bottom of board */}
      <circle cx="88" cy="82" r="1" fill="#e8e8d8" opacity="0.4" />
      <circle cx="92" cy="85" r="0.7" fill="#e8e8d8" opacity="0.3" />
      <circle cx="95" cy="83" r="0.8" fill="#e8e8d8" opacity="0.3" />
      <circle cx="85" cy="86" r="0.5" fill="#e8e8d8" opacity="0.25" />
      <circle cx="100" cy="84" r="0.6" fill="#e8e8d8" opacity="0.2" />

      {/* Chalk piece on tray */}
      <rect x="78" y="92" width="20" height="4" rx="2" fill="#f0f0e0" stroke="#c0c0a0" strokeWidth="0.5" />

      {/* Eraser on tray */}
      <rect x="30" y="91" width="24" height="6" rx="1.5" fill="#d4b896" stroke="#a08060" strokeWidth="0.5" />
      <rect x="30" y="91" width="24" height="3" rx="1" fill="#e0caa8" opacity="0.7" />

      {/* Wood frame tray */}
      <rect x="8" y="98" width="112" height="8" rx="2" fill="#8B5E3C" stroke="#5C3A1E" strokeWidth="1" />
      <rect x="8" y="98" width="112" height="3" rx="1.5" fill="#A0724D" opacity="0.5" />

      {/* Legs of the board */}
      <rect x="20" y="106" width="4" height="18" rx="1" fill="#6B4226" stroke="#3d2210" strokeWidth="0.5" />
      <rect x="100" y="106" width="4" height="18" rx="1" fill="#6B4226" stroke="#3d2210" strokeWidth="0.5" />

      {/* Cross brace */}
      <line x1="22" y1="118" x2="102" y2="118" stroke="#5C3A1E" strokeWidth="2" strokeLinecap="round" />

      {/* Floor shadow */}
      <ellipse cx="62" cy="128" rx="40" ry="4" fill="rgba(0,0,0,0.2)" />
    </svg>
  );
}
