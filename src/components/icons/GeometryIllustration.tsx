export default function GeometryIllustration({ size = 140 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="geometry-icon"
    >
      <style>{`
        .geometry-icon .compass-group {
          transition: transform 250ms ease;
          transform-origin: 85px 20px;
        }
        .geometry-icon:hover .compass-group {
          transform: rotate(4deg);
        }
        .geometry-icon .arc-drawn {
          transition: stroke-dashoffset 400ms ease;
          stroke-dashoffset: 0;
        }
        .geometry-icon:hover .arc-drawn {
          stroke-dashoffset: -12;
        }
      `}</style>

      {/* Shadow beneath all objects */}
      <ellipse cx="70" cy="130" rx="40" ry="5" fill="rgba(0,0,0,0.2)" />

      {/* Ruler diagonal behind triangle */}
      <rect x="8" y="88" width="70" height="8" rx="2" fill="#5C4033" stroke="#3d2a1a" strokeWidth="0.8" transform="rotate(-15, 40, 92)" />
      {/* Ruler markings */}
      {Array.from({ length: 14 }, (_, i) => (
        <line
          key={`rm${i}`}
          x1={12 + i * 5}
          y1="89"
          x2={12 + i * 5}
          y2={i % 5 === 0 ? "93" : "91"}
          stroke="#A0724D"
          strokeWidth="0.4"
          opacity="0.6"
          transform="rotate(-15, 40, 92)"
        />
      ))}

      {/* Main triangle with fill */}
      <polygon
        points="15,115 80,115 48,45"
        fill="rgba(217,130,54,0.1)"
        stroke="#D98236"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Triangle height dashed line */}
      <line x1="48" y1="45" x2="48" y2="115" stroke="#D98236" strokeWidth="0.6" strokeDasharray="3 2" opacity="0.4" />

      {/* Right angle marker at base-left */}
      <polyline points="15,108 22,108 22,115" fill="none" stroke="#D98236" strokeWidth="1" opacity="0.6" />

      {/* Angle arc at top */}
      <path d="M 42 60 A 12 12 0 0 1 54 60" fill="none" stroke="#D98236" strokeWidth="0.8" opacity="0.6" />

      {/* Angle labels */}
      <text x="45" y="38" fontSize="9" fill="#D98236" opacity="0.7" fontFamily="serif" fontStyle="italic">α</text>
      <text x="70" y="112" fontSize="8" fill="#D98236" opacity="0.5" fontFamily="serif" fontStyle="italic">β</text>

      {/* Compass group */}
      <g className="compass-group">
        {/* Compass pivot/hinge */}
        <circle cx="85" cy="20" r="5" fill="#C8C8C8" stroke="#808080" strokeWidth="1.2" />
        <circle cx="85" cy="20" r="2" fill="#505050" />

        {/* Hinge body */}
        <rect x="82" y="24" width="6" height="10" rx="2" fill="#B8B8B8" stroke="#707070" strokeWidth="0.6" />

        {/* Left leg (point) */}
        <line x1="85" y1="33" x2="62" y2="100" stroke="#A8A8A8" strokeWidth="3.5" strokeLinecap="round" />
        {/* Point tip */}
        <circle cx="62" cy="100" r="2" fill="#404040" />
        <circle cx="62" cy="100" r="0.8" fill="#202020" />

        {/* Right leg (pencil) */}
        <line x1="85" y1="33" x2="108" y2="100" stroke="#A8A8A8" strokeWidth="3.5" strokeLinecap="round" />
        {/* Pencil body */}
        <rect x="105" y="90" width="5" height="10" rx="0.5" fill="#FFD54F" stroke="#c9a825" strokeWidth="0.4" />
        {/* Pencil tip */}
        <polygon points="105,100 110,100 107.5,107" fill="#333" />
        {/* Pencil top */}
        <rect x="105" y="87" width="5" height="4" rx="1" fill="#E8A0A0" stroke="#B06060" strokeWidth="0.3" />
      </g>

      {/* Arc being drawn by compass */}
      <path
        className="arc-drawn"
        d="M 108 100 A 30 30 0 0 1 125 72"
        stroke="#D98236"
        strokeWidth="1.5"
        strokeDasharray="4 3"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M 125 72 A 30 30 0 0 1 120 55"
        stroke="#D98236"
        strokeWidth="1"
        strokeDasharray="3 2"
        fill="none"
        opacity="0.4"
      />

      {/* Small protractor hint in corner */}
      <path d="M 110 120 A 20 20 0 0 1 130 120" fill="none" stroke="rgba(217,130,54,0.3)" strokeWidth="0.6" />
      <line x1="120" y1="120" x2="120" y2="108" stroke="rgba(217,130,54,0.2)" strokeWidth="0.4" />
    </svg>
  );
}
