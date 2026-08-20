export default function ArithmeticIllustration({ size = 72 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="arithmetic-icon"
    >
      <style>{`
        .arithmetic-icon .bead-row-2 {
          transition: transform 200ms ease;
        }
        .arithmetic-icon:hover .bead-row-2 {
          transform: translateX(3px);
        }
      `}</style>

      {/* Frame outer shadow */}
      <rect x="12" y="8" width="48" height="54" rx="4" fill="#3d2210" opacity="0.4" />

      {/* Wooden frame with gradient */}
      <rect x="10" y="6" width="48" height="54" rx="4" fill="#6B4226" stroke="#3d2210" strokeWidth="1.5" />
      <rect x="10" y="6" width="48" height="8" rx="4" fill="#8B5E3C" />
      <rect x="10" y="52" width="48" height="8" rx="4" fill="#5C3A1E" />

      {/* Inner frame */}
      <rect x="14" y="14" width="40" height="38" rx="2" fill="#A0724D" stroke="#5C3A1E" strokeWidth="0.5" />

      {/* Rod 1 */}
      <line x1="14" y1="23" x2="54" y2="23" stroke="#6B4226" strokeWidth="2" strokeLinecap="round" />
      {/* Beads rod 1 — red spheres with gradient */}
      <circle cx="22" cy="23" r="4.5" fill="#E53935" stroke="#B71C1C" strokeWidth="0.8" />
      <circle cx="22" cy="21" r="1.8" fill="rgba(255,255,255,0.25)" />
      <circle cx="31" cy="23" r="4.5" fill="#E53935" stroke="#B71C1C" strokeWidth="0.8" />
      <circle cx="31" cy="21" r="1.8" fill="rgba(255,255,255,0.25)" />
      <circle cx="40" cy="23" r="4.5" fill="#E53935" stroke="#B71C1C" strokeWidth="0.8" />
      <circle cx="40" cy="21" r="1.8" fill="rgba(255,255,255,0.25)" />

      {/* Rod 2 */}
      <line x1="14" y1="33" x2="54" y2="33" stroke="#6B4226" strokeWidth="2" strokeLinecap="round" />
      {/* Beads rod 2 — blue spheres, animated */}
      <g className="bead-row-2">
        <circle cx="20" cy="33" r="4.5" fill="#1E88E5" stroke="#0D47A1" strokeWidth="0.8" />
        <circle cx="20" cy="31" r="1.8" fill="rgba(255,255,255,0.25)" />
        <circle cx="29" cy="33" r="4.5" fill="#1E88E5" stroke="#0D47A1" strokeWidth="0.8" />
        <circle cx="29" cy="31" r="1.8" fill="rgba(255,255,255,0.25)" />
        <circle cx="38" cy="33" r="4.5" fill="#42A5F5" stroke="#1565C0" strokeWidth="0.8" />
        <circle cx="38" cy="31" r="1.8" fill="rgba(255,255,255,0.25)" />
        <circle cx="47" cy="33" r="4.5" fill="#42A5F5" stroke="#1565C0" strokeWidth="0.8" />
        <circle cx="47" cy="31" r="1.8" fill="rgba(255,255,255,0.25)" />
      </g>

      {/* Rod 3 */}
      <line x1="14" y1="43" x2="54" y2="43" stroke="#6B4226" strokeWidth="2" strokeLinecap="round" />
      {/* Beads rod 3 — green spheres */}
      <circle cx="24" cy="43" r="4.5" fill="#43A047" stroke="#1B5E20" strokeWidth="0.8" />
      <circle cx="24" cy="41" r="1.8" fill="rgba(255,255,255,0.25)" />
      <circle cx="33" cy="43" r="4.5" fill="#66BB6A" stroke="#2E7D32" strokeWidth="0.8" />
      <circle cx="33" cy="41" r="1.8" fill="rgba(255,255,255,0.25)" />
      <circle cx="42" cy="43" r="4.5" fill="#43A047" stroke="#1B5E20" strokeWidth="0.8" />
      <circle cx="42" cy="41" r="1.8" fill="rgba(255,255,255,0.25)" />

      {/* Shadow beneath */}
      <ellipse cx="34" cy="66" rx="20" ry="3" fill="rgba(0,0,0,0.3)" />
    </svg>
  );
}
