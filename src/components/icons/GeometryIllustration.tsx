export default function GeometryIllustration({ size = 72 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="geometry-icon"
    >
      <style>{`
        .geometry-icon .compass-group {
          transition: transform 250ms ease;
          transform-origin: 44px 12px;
        }
        .geometry-icon:hover .compass-group {
          transform: rotate(5deg);
        }
        .geometry-icon .arc-drawn {
          stroke-dashoffset: 0;
          transition: stroke-dashoffset 300ms ease;
        }
        .geometry-icon:hover .arc-drawn {
          stroke-dashoffset: -8;
        }
      `}</style>

      {/* Triangle with fill */}
      <polygon
        points="10,58 42,58 26,24"
        fill="rgba(217,130,54,0.12)"
        stroke="#D98236"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Right angle mark */}
      <polyline points="10,53 15,53 15,58" fill="none" stroke="#D98236" strokeWidth="0.8" opacity="0.7" />

      {/* Triangle height dashed */}
      <line x1="26" y1="24" x2="26" y2="58" stroke="#D98236" strokeWidth="0.5" strokeDasharray="2 1.5" opacity="0.4" />

      {/* Compass group */}
      <g className="compass-group">
        {/* Compass pivot point */}
        <circle cx="44" cy="12" r="3" fill="#C0C0C0" stroke="#808080" strokeWidth="1" />
        <circle cx="44" cy="12" r="1.2" fill="#606060" />

        {/* Compass hinge */}
        <rect x="42.5" y="14" width="3" height="6" rx="1" fill="#B0B0B0" stroke="#707070" strokeWidth="0.5" />

        {/* Left leg (point) */}
        <line x1="44" y1="19" x2="34" y2="52" stroke="#A0A0A0" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="34" cy="52" r="1.5" fill="#404040" />

        {/* Right leg (pencil) */}
        <line x1="44" y1="19" x2="54" y2="52" stroke="#A0A0A0" strokeWidth="2.5" strokeLinecap="round" />
        {/* Pencil tip */}
        <polygon points="53,50 55,50 54,55" fill="#333" />
        <rect x="52.5" y="46" width="3" height="4" fill="#FFD54F" stroke="#c9a825" strokeWidth="0.3" />
      </g>

      {/* Arc being drawn */}
      <path
        className="arc-drawn"
        d="M 54 52 A 18 18 0 0 1 62 36"
        stroke="#D98236"
        strokeWidth="1.2"
        strokeDasharray="3 2"
        fill="none"
        opacity="0.7"
      />

      {/* Additional small arc */}
      <path d="M 62 36 A 18 18 0 0 1 58 26" stroke="#D98236" strokeWidth="0.8" strokeDasharray="2 2" fill="none" opacity="0.4" />

      {/* Shadow */}
      <ellipse cx="36" cy="65" rx="18" ry="2.5" fill="rgba(0,0,0,0.2)" />
    </svg>
  );
}
