export default function ArithmeticIllustration({ size = 120 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="arithmetic-icon"
    >
      <style>{`
        .arithmetic-icon .bead-row-2 {
          transition: transform 200ms ease;
        }
        .arithmetic-icon:hover .bead-row-2 {
          transform: translateX(4px);
        }
        .arithmetic-icon .bead-row-3 {
          transition: transform 200ms ease;
        }
        .arithmetic-icon:hover .bead-row-3 {
          transform: translateX(-3px);
        }
      `}</style>

      {/* Floor shadow */}
      <ellipse cx="60" cy="112" rx="35" ry="5" fill="rgba(0,0,0,0.25)" />

      {/* Frame outer shadow */}
      <rect x="18" y="10" width="84" height="95" rx="5" fill="#3d2210" opacity="0.4" />

      {/* Wooden frame with gradient */}
      <rect x="15" y="8" width="84" height="95" rx="5" fill="#6B4226" stroke="#3d2210" strokeWidth="2" />

      {/* Frame top piece */}
      <rect x="15" y="8" width="84" height="12" rx="5" fill="#8B5E3C" />
      {/* Frame bottom piece */}
      <rect x="15" y="91" width="84" height="12" rx="5" fill="#5C3A1E" />

      {/* Wood grain texture — subtle horizontal lines */}
      <line x1="17" y1="12" x2="97" y2="12" stroke="rgba(160,114,77,0.3)" strokeWidth="0.3" />
      <line x1="17" y1="14" x2="97" y2="14" stroke="rgba(160,114,77,0.2)" strokeWidth="0.3" />
      <line x1="17" y1="95" x2="97" y2="95" stroke="rgba(60,30,10,0.3)" strokeWidth="0.3" />
      <line x1="17" y1="97" x2="97" y2="97" stroke="rgba(60,30,10,0.2)" strokeWidth="0.3" />

      {/* Inner frame area */}
      <rect x="22" y="22" width="70" height="62" rx="2" fill="#A0724D" stroke="#5C3A1E" strokeWidth="0.6" />

      {/* Rod 1 */}
      <line x1="22" y1="35" x2="92" y2="35" stroke="#6B4226" strokeWidth="3" strokeLinecap="round" />
      {/* Beads rod 1 — red spheres */}
      <circle cx="34" cy="35" r="6" fill="#E53935" stroke="#B71C1C" strokeWidth="1" />
      <circle cx="34" cy="33" r="2.5" fill="rgba(255,255,255,0.2)" />
      <circle cx="46" cy="35" r="6" fill="#E53935" stroke="#B71C1C" strokeWidth="1" />
      <circle cx="46" cy="33" r="2.5" fill="rgba(255,255,255,0.2)" />
      <circle cx="58" cy="35" r="6" fill="#E53935" stroke="#B71C1C" strokeWidth="1" />
      <circle cx="58" cy="33" r="2.5" fill="rgba(255,255,255,0.2)" />
      <circle cx="70" cy="35" r="6" fill="#EF5350" stroke="#C62828" strokeWidth="1" />
      <circle cx="70" cy="33" r="2.5" fill="rgba(255,255,255,0.2)" />

      {/* Rod 2 */}
      <line x1="22" y1="52" x2="92" y2="52" stroke="#6B4226" strokeWidth="3" strokeLinecap="round" />
      {/* Beads rod 2 — blue spheres, animated */}
      <g className="bead-row-2">
        <circle cx="32" cy="52" r="6" fill="#1E88E5" stroke="#0D47A1" strokeWidth="1" />
        <circle cx="32" cy="50" r="2.5" fill="rgba(255,255,255,0.2)" />
        <circle cx="44" cy="52" r="6" fill="#1E88E5" stroke="#0D47A1" strokeWidth="1" />
        <circle cx="44" cy="50" r="2.5" fill="rgba(255,255,255,0.2)" />
        <circle cx="56" cy="52" r="6" fill="#42A5F5" stroke="#1565C0" strokeWidth="1" />
        <circle cx="56" cy="50" r="2.5" fill="rgba(255,255,255,0.2)" />
        <circle cx="68" cy="52" r="6" fill="#42A5F5" stroke="#1565C0" strokeWidth="1" />
        <circle cx="68" cy="50" r="2.5" fill="rgba(255,255,255,0.2)" />
        <circle cx="80" cy="52" r="6" fill="#64B5F6" stroke="#1976D2" strokeWidth="1" />
        <circle cx="80" cy="50" r="2.5" fill="rgba(255,255,255,0.2)" />
      </g>

      {/* Rod 3 */}
      <line x1="22" y1="69" x2="92" y2="69" stroke="#6B4226" strokeWidth="3" strokeLinecap="round" />
      {/* Beads rod 3 — green spheres, animated */}
      <g className="bead-row-3">
        <circle cx="36" cy="69" r="6" fill="#43A047" stroke="#1B5E20" strokeWidth="1" />
        <circle cx="36" cy="67" r="2.5" fill="rgba(255,255,255,0.2)" />
        <circle cx="48" cy="69" r="6" fill="#66BB6A" stroke="#2E7D32" strokeWidth="1" />
        <circle cx="48" cy="67" r="2.5" fill="rgba(255,255,255,0.2)" />
        <circle cx="60" cy="69" r="6" fill="#43A047" stroke="#1B5E20" strokeWidth="1" />
        <circle cx="60" cy="67" r="2.5" fill="rgba(255,255,255,0.2)" />
      </g>

      {/* Rod 4 */}
      <line x1="22" y1="82" x2="92" y2="82" stroke="#6B4226" strokeWidth="3" strokeLinecap="round" />
      {/* Beads rod 4 — yellow spheres */}
      <circle cx="38" cy="82" r="5.5" fill="#FDD835" stroke="#F9A825" strokeWidth="1" />
      <circle cx="38" cy="80" r="2.2" fill="rgba(255,255,255,0.25)" />
      <circle cx="50" cy="82" r="5.5" fill="#FFEE58" stroke="#FBC02D" strokeWidth="1" />
      <circle cx="50" cy="80" r="2.2" fill="rgba(255,255,255,0.25)" />
    </svg>
  );
}
