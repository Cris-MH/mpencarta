export default function GeometryIllustration({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Triangle */}
      <polygon points="20,50 44,50 32,22" fill="rgba(217,130,54,0.15)" stroke="#D98236" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Right angle mark */}
      <polyline points="20,46 24,46 24,50" fill="none" stroke="#D98236" strokeWidth="0.8" />
      {/* Compass */}
      {/* Compass top pivot */}
      <circle cx="42" cy="12" r="2.5" fill="#B0B0B0" stroke="#707070" strokeWidth="0.8" />
      <circle cx="42" cy="12" r="1" fill="#808080" />
      {/* Compass left leg */}
      <line x1="42" y1="14" x2="34" y2="44" stroke="#A0A0A0" strokeWidth="2" strokeLinecap="round" />
      {/* Compass right leg */}
      <line x1="42" y1="14" x2="50" y2="44" stroke="#A0A0A0" strokeWidth="2" strokeLinecap="round" />
      {/* Compass point (left) */}
      <circle cx="34" cy="44" r="1" fill="#505050" />
      {/* Compass pencil tip (right) */}
      <polygon points="49,44 51,44 50,48" fill="#333" />
      {/* Arc being drawn */}
      <path d="M 50 44 A 16 16 0 0 1 56 30" stroke="#D98236" strokeWidth="1.2" strokeDasharray="2 1.5" fill="none" opacity="0.7" />
      {/* Metallic hinge detail */}
      <rect x="40.5" y="14" width="3" height="5" rx="0.5" fill="#C0C0C0" stroke="#808080" strokeWidth="0.5" />
      {/* Shadow */}
      <ellipse cx="32" cy="56" rx="16" ry="2" fill="rgba(0,0,0,0.1)" />
    </svg>
  );
}
