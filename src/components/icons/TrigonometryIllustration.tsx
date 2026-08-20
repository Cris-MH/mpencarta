export default function TrigonometryIllustration({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background circle (unit circle) */}
      <circle cx="26" cy="32" r="20" fill="none" stroke="#B94A42" strokeWidth="1" opacity="0.3" />
      <circle cx="26" cy="32" r="20" fill="rgba(185,74,66,0.05)" />
      {/* Axes */}
      <line x1="4" y1="32" x2="48" y2="32" stroke="#666" strokeWidth="0.5" />
      <line x1="26" y1="10" x2="26" y2="54" stroke="#666" strokeWidth="0.5" />
      {/* Angle arc */}
      <path d="M 32 32 A 6 6 0 0 0 30.5 27" stroke="#B94A42" strokeWidth="1.2" fill="none" />
      {/* Angle line (radius at ~45 degrees) */}
      <line x1="26" y1="32" x2="40" y2="18" stroke="#B94A42" strokeWidth="1.8" strokeLinecap="round" />
      {/* Point on circle */}
      <circle cx="40" cy="18" r="2.5" fill="#B94A42" stroke="#7f3230" strokeWidth="0.8" />
      <circle cx="40" cy="18" r="1" fill="rgba(255,255,255,0.4)" />
      {/* Sin line (vertical) */}
      <line x1="40" y1="18" x2="40" y2="32" stroke="#E5B83F" strokeWidth="1.5" strokeDasharray="2 1" />
      {/* Cos line (horizontal) */}
      <line x1="26" y1="32" x2="40" y2="32" stroke="#3C79A8" strokeWidth="1.5" strokeDasharray="2 1" />
      {/* Labels */}
      <text x="41" y="26" fontSize="7" fill="#E5B83F" fontWeight="bold">sin</text>
      <text x="30" y="38" fontSize="7" fill="#3C79A8" fontWeight="bold">cos</text>
      {/* Sine wave emerging */}
      <path d="M 48 32 C 51 24, 54 24, 57 32 C 60 40, 63 40, 63 32" stroke="#B94A42" strokeWidth="1.2" fill="none" opacity="0.6" />
      {/* Theta label */}
      <text x="29" y="30" fontSize="7" fill="#B94A42" fontFamily="serif" fontStyle="italic">θ</text>
    </svg>
  );
}
