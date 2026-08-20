export default function DiscreteIllustration({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Edges (connections) */}
      <line x1="18" y1="16" x2="46" y2="16" stroke="#5C6BC0" strokeWidth="1.5" opacity="0.7" />
      <line x1="18" y1="16" x2="12" y2="40" stroke="#5C6BC0" strokeWidth="1.5" opacity="0.7" />
      <line x1="18" y1="16" x2="52" y2="40" stroke="#5C6BC0" strokeWidth="1.5" opacity="0.7" />
      <line x1="46" y1="16" x2="52" y2="40" stroke="#5C6BC0" strokeWidth="1.5" opacity="0.7" />
      <line x1="46" y1="16" x2="12" y2="40" stroke="#5C6BC0" strokeWidth="1.5" opacity="0.5" />
      <line x1="12" y1="40" x2="32" y2="54" stroke="#5C6BC0" strokeWidth="1.5" opacity="0.7" />
      <line x1="52" y1="40" x2="32" y2="54" stroke="#5C6BC0" strokeWidth="1.5" opacity="0.7" />
      <line x1="12" y1="40" x2="52" y2="40" stroke="#5C6BC0" strokeWidth="1.5" opacity="0.5" />
      {/* Nodes */}
      <circle cx="18" cy="16" r="6" fill="#7986CB" stroke="#3F51B5" strokeWidth="1.5" />
      <circle cx="18" cy="16" r="3" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
      <circle cx="46" cy="16" r="6" fill="#7986CB" stroke="#3F51B5" strokeWidth="1.5" />
      <circle cx="46" cy="16" r="3" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
      <circle cx="12" cy="40" r="6" fill="#9FA8DA" stroke="#5C6BC0" strokeWidth="1.5" />
      <circle cx="12" cy="40" r="3" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
      <circle cx="52" cy="40" r="6" fill="#9FA8DA" stroke="#5C6BC0" strokeWidth="1.5" />
      <circle cx="52" cy="40" r="3" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
      <circle cx="32" cy="54" r="6" fill="#C5CAE9" stroke="#7986CB" strokeWidth="1.5" />
      <circle cx="32" cy="54" r="3" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
      {/* Node labels */}
      <text x="16" y="19" fontSize="7" fill="#fff" fontWeight="bold">A</text>
      <text x="44" y="19" fontSize="7" fill="#fff" fontWeight="bold">B</text>
      <text x="10" y="43" fontSize="7" fill="#fff" fontWeight="bold">C</text>
      <text x="50" y="43" fontSize="7" fill="#fff" fontWeight="bold">D</text>
      <text x="30" y="57" fontSize="7" fill="#5C6BC0" fontWeight="bold">E</text>
    </svg>
  );
}
