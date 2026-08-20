export default function StatisticsIllustration({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Axis */}
      <line x1="10" y1="52" x2="58" y2="52" stroke="#555" strokeWidth="1" />
      <line x1="10" y1="52" x2="10" y2="10" stroke="#555" strokeWidth="0.8" />
      {/* Bars with gradients */}
      {/* Bar 1 */}
      <rect x="14" y="38" width="7" height="14" rx="1" fill="#2E7D6E" />
      <rect x="14" y="38" width="7" height="3" rx="1" fill="rgba(255,255,255,0.2)" />
      {/* Bar 2 */}
      <rect x="23" y="28" width="7" height="24" rx="1" fill="#3D9A7E" />
      <rect x="23" y="28" width="7" height="3" rx="1" fill="rgba(255,255,255,0.2)" />
      {/* Bar 3 */}
      <rect x="32" y="16" width="7" height="36" rx="1" fill="#2E7D6E" />
      <rect x="32" y="16" width="7" height="3" rx="1" fill="rgba(255,255,255,0.2)" />
      {/* Bar 4 */}
      <rect x="41" y="24" width="7" height="28" rx="1" fill="#3D9A7E" />
      <rect x="41" y="24" width="7" height="3" rx="1" fill="rgba(255,255,255,0.2)" />
      {/* Bar 5 */}
      <rect x="50" y="34" width="7" height="18" rx="1" fill="#2E7D6E" />
      <rect x="50" y="34" width="7" height="3" rx="1" fill="rgba(255,255,255,0.2)" />
      {/* Trend line */}
      <path d="M 17 40 L 26 30 L 35 18 L 44 26 L 53 36" stroke="#E5B83F" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Trend line dots */}
      <circle cx="17" cy="40" r="2" fill="#E5B83F" stroke="#c49830" strokeWidth="0.5" />
      <circle cx="26" cy="30" r="2" fill="#E5B83F" stroke="#c49830" strokeWidth="0.5" />
      <circle cx="35" cy="18" r="2" fill="#E5B83F" stroke="#c49830" strokeWidth="0.5" />
      <circle cx="44" cy="26" r="2" fill="#E5B83F" stroke="#c49830" strokeWidth="0.5" />
      <circle cx="53" cy="36" r="2" fill="#E5B83F" stroke="#c49830" strokeWidth="0.5" />
      {/* Y-axis marks */}
      <line x1="9" y1="20" x2="11" y2="20" stroke="#555" strokeWidth="0.6" />
      <line x1="9" y1="35" x2="11" y2="35" stroke="#555" strokeWidth="0.6" />
    </svg>
  );
}
