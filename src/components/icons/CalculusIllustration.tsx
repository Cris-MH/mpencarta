export default function CalculusIllustration({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Axes */}
      <line x1="10" y1="50" x2="58" y2="50" stroke="#555" strokeWidth="1" strokeLinecap="round" />
      <line x1="10" y1="50" x2="10" y2="8" stroke="#555" strokeWidth="1" strokeLinecap="round" />
      {/* Axis arrows */}
      <polygon points="58,50 55,48.5 55,51.5" fill="#555" />
      <polygon points="10,8 8.5,11 11.5,11" fill="#555" />
      {/* Shaded area (integral) */}
      <path d="M 18 50 L 18 38 C 22 30 28 20 34 16 C 38 13 42 14 46 20 L 46 50 Z"
            fill="rgba(23,107,58,0.2)" stroke="none" />
      {/* Curve */}
      <path d="M 12 44 C 16 38 20 32 26 24 C 30 18 34 14 38 14 C 42 14 46 18 50 26 C 52 30 54 36 56 38"
            stroke="#176B3A" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Area boundary lines */}
      <line x1="18" y1="38" x2="18" y2="50" stroke="#176B3A" strokeWidth="0.8" strokeDasharray="2 1.5" />
      <line x1="46" y1="20" x2="46" y2="50" stroke="#176B3A" strokeWidth="0.8" strokeDasharray="2 1.5" />
      {/* Labels */}
      <text x="16" y="56" fontSize="7" fill="#555">a</text>
      <text x="44" y="56" fontSize="7" fill="#555">b</text>
      {/* Integral symbol */}
      <text x="26" y="44" fontSize="12" fill="#176B3A" fontFamily="serif" opacity="0.6">∫</text>
      {/* Tick marks */}
      <line x1="18" y1="49" x2="18" y2="51" stroke="#555" strokeWidth="0.8" />
      <line x1="46" y1="49" x2="46" y2="51" stroke="#555" strokeWidth="0.8" />
    </svg>
  );
}
