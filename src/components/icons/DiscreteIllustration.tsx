export default function DiscreteIllustration({ size = 90 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 90 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="discrete-icon"
    >
      <style>{`
        .discrete-icon .highlight-edge {
          transition: stroke-width 200ms ease, opacity 200ms ease, stroke 200ms ease;
        }
        .discrete-icon:hover .highlight-edge {
          stroke-width: 3.5;
          opacity: 1;
          stroke: #FFD54F;
        }
        .discrete-icon .highlight-node {
          transition: filter 200ms ease;
        }
        .discrete-icon:hover .highlight-node {
          filter: brightness(1.3);
        }
      `}</style>

      {/* Background edges (connections between nodes) */}
      <line x1="25" y1="18" x2="65" y2="18" stroke="#5C6BC0" strokeWidth="1.8" opacity="0.5" />
      <line x1="25" y1="18" x2="12" y2="52" stroke="#5C6BC0" strokeWidth="1.8" opacity="0.5" />
      <line x1="25" y1="18" x2="72" y2="52" stroke="#5C6BC0" strokeWidth="1.2" opacity="0.3" />
      <line x1="65" y1="18" x2="72" y2="52" stroke="#5C6BC0" strokeWidth="1.8" opacity="0.5" />
      <line x1="65" y1="18" x2="12" y2="52" stroke="#5C6BC0" strokeWidth="1.2" opacity="0.3" />
      <line x1="12" y1="52" x2="45" y2="76" stroke="#5C6BC0" strokeWidth="1.8" opacity="0.5" />
      <line x1="72" y1="52" x2="45" y2="76" stroke="#5C6BC0" strokeWidth="1.8" opacity="0.5" />
      <line x1="12" y1="52" x2="72" y2="52" stroke="#5C6BC0" strokeWidth="1.2" opacity="0.3" />

      {/* Highlighted path — lights up on hover */}
      <line className="highlight-edge" x1="25" y1="18" x2="65" y2="18" stroke="#E5B83F" strokeWidth="2.2" opacity="0.5" />
      <line className="highlight-edge" x1="65" y1="18" x2="72" y2="52" stroke="#E5B83F" strokeWidth="2.2" opacity="0.5" />
      <line className="highlight-edge" x1="72" y1="52" x2="45" y2="76" stroke="#E5B83F" strokeWidth="2.2" opacity="0.5" />

      {/* Node A — red/indigo */}
      <circle cx="25" cy="18" r="9" fill="#7986CB" stroke="#3F51B5" strokeWidth="2" />
      <circle cx="25" cy="15" r="4" fill="rgba(255,255,255,0.12)" />

      {/* Node B — blue (highlighted) */}
      <circle className="highlight-node" cx="65" cy="18" r="9" fill="#64B5F6" stroke="#1E88E5" strokeWidth="2" />
      <circle cx="65" cy="15" r="4" fill="rgba(255,255,255,0.12)" />

      {/* Node C — green */}
      <circle cx="12" cy="52" r="9" fill="#81C784" stroke="#43A047" strokeWidth="2" />
      <circle cx="12" cy="49" r="4" fill="rgba(255,255,255,0.12)" />

      {/* Node D — orange (highlighted) */}
      <circle className="highlight-node" cx="72" cy="52" r="9" fill="#FFB74D" stroke="#F57C00" strokeWidth="2" />
      <circle cx="72" cy="49" r="4" fill="rgba(255,255,255,0.12)" />

      {/* Node E — purple (highlighted) */}
      <circle className="highlight-node" cx="45" cy="76" r="9" fill="#CE93D8" stroke="#8E24AA" strokeWidth="2" />
      <circle cx="45" cy="73" r="4" fill="rgba(255,255,255,0.12)" />

      {/* Node labels */}
      <text x="22" y="22" fontSize="9" fill="#fff" fontWeight="bold" textAnchor="middle">A</text>
      <text x="62" y="22" fontSize="9" fill="#fff" fontWeight="bold" textAnchor="middle">B</text>
      <text x="9" y="56" fontSize="9" fill="#fff" fontWeight="bold" textAnchor="middle">C</text>
      <text x="69" y="56" fontSize="9" fill="#fff" fontWeight="bold" textAnchor="middle">D</text>
      <text x="42" y="80" fontSize="9" fill="#fff" fontWeight="bold" textAnchor="middle">E</text>
    </svg>
  );
}
