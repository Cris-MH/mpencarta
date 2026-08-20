export default function ArithmeticIllustration({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Abacus frame */}
      <rect x="10" y="8" width="44" height="48" rx="3" fill="#8B5E3C" stroke="#5C3A1E" strokeWidth="1.5" />
      <rect x="12" y="10" width="40" height="44" rx="2" fill="#A0724D" />
      {/* Rods */}
      <line x1="20" y1="14" x2="20" y2="50" stroke="#6B4226" strokeWidth="1.5" />
      <line x1="32" y1="14" x2="32" y2="50" stroke="#6B4226" strokeWidth="1.5" />
      <line x1="44" y1="14" x2="44" y2="50" stroke="#6B4226" strokeWidth="1.5" />
      {/* Beads - rod 1 */}
      <circle cx="20" cy="18" r="4" fill="#E53935" stroke="#B71C1C" strokeWidth="0.8" />
      <circle cx="20" cy="18" r="2" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
      <circle cx="20" cy="27" r="4" fill="#E53935" stroke="#B71C1C" strokeWidth="0.8" />
      <circle cx="20" cy="36" r="4" fill="#FFB300" stroke="#F57F17" strokeWidth="0.8" />
      <circle cx="20" cy="36" r="2" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
      <circle cx="20" cy="45" r="4" fill="#FFB300" stroke="#F57F17" strokeWidth="0.8" />
      {/* Beads - rod 2 */}
      <circle cx="32" cy="18" r="4" fill="#1E88E5" stroke="#0D47A1" strokeWidth="0.8" />
      <circle cx="32" cy="18" r="2" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
      <circle cx="32" cy="27" r="4" fill="#1E88E5" stroke="#0D47A1" strokeWidth="0.8" />
      <circle cx="32" cy="36" r="4" fill="#43A047" stroke="#1B5E20" strokeWidth="0.8" />
      <circle cx="32" cy="36" r="2" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
      <circle cx="32" cy="45" r="4" fill="#43A047" stroke="#1B5E20" strokeWidth="0.8" />
      {/* Beads - rod 3 */}
      <circle cx="44" cy="18" r="4" fill="#8E24AA" stroke="#4A148C" strokeWidth="0.8" />
      <circle cx="44" cy="18" r="2" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
      <circle cx="44" cy="27" r="4" fill="#FFB300" stroke="#F57F17" strokeWidth="0.8" />
      <circle cx="44" cy="36" r="4" fill="#E53935" stroke="#B71C1C" strokeWidth="0.8" />
      <circle cx="44" cy="45" r="4" fill="#1E88E5" stroke="#0D47A1" strokeWidth="0.8" />
      {/* Shadow */}
      <ellipse cx="32" cy="60" rx="18" ry="2" fill="rgba(0,0,0,0.15)" />
    </svg>
  );
}
