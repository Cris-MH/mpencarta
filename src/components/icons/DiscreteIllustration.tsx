export default function DiscreteIllustration({ size = 72 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="discrete-icon"
    >
      <style>{`
        .discrete-icon .highlight-edge {
          transition: stroke-width 200ms ease, opacity 200ms ease;
        }
        .discrete-icon:hover .highlight-edge {
          stroke-width: 3;
          opacity: 1;
        }
      `}</style>

      {/* Edges (connections) */}
      <line x1="20" y1="16" x2="52" y2="16" stroke="#5C6BC0" strokeWidth="1.5" opacity="0.6" />
      <line x1="20" y1="16" x2="10" y2="42" stroke="#5C6BC0" strokeWidth="1.5" opacity="0.6" />
      <line x1="20" y1="16" x2="58" y2="42" stroke="#5C6BC0" strokeWidth="1.2" opacity="0.4" />
      <line x1="52" y1="16" x2="58" y2="42" stroke="#5C6BC0" strokeWidth="1.5" opacity="0.6" />
      <line x1="52" y1="16" x2="10" y2="42" stroke="#5C6BC0" strokeWidth="1.2" opacity="0.4" />
      <line x1="10" y1="42" x2="36" y2="60" stroke="#5C6BC0" strokeWidth="1.5" opacity="0.6" />
      <line x1="58" y1="42" x2="36" y2="60" stroke="#5C6BC0" strokeWidth="1.5" opacity="0.6" />
      <line x1="10" y1="42" x2="58" y2="42" stroke="#5C6BC0" strokeWidth="1.2" opacity="0.4" />

      {/* Highlighted path edge */}
      <line className="highlight-edge" x1="20" y1="16" x2="52" y2="16" stroke="#E5B83F" strokeWidth="1.8" opacity="0.6" />
      <line className="highlight-edge" x1="52" y1="16" x2="58" y2="42" stroke="#E5B83F" strokeWidth="1.8" opacity="0.6" />
      <line className="highlight-edge" x1="58" y1="42" x2="36" y2="60" stroke="#E5B83F" strokeWidth="1.8" opacity="0.6" />

      {/* Nodes with gradient fills */}
      {/* Node A */}
      <circle cx="20" cy="16" r="7" fill="#7986CB" stroke="#3F51B5" strokeWidth="1.5" />
      <circle cx="20" cy="14" r="3" fill="rgba(255,255,255,0.15)" />

      {/* Node B */}
      <circle cx="52" cy="16" r="7" fill="#64B5F6" stroke="#1E88E5" strokeWidth="1.5" />
      <circle cx="52" cy="14" r="3" fill="rgba(255,255,255,0.15)" />

      {/* Node C */}
      <circle cx="10" cy="42" r="7" fill="#81C784" stroke="#43A047" strokeWidth="1.5" />
      <circle cx="10" cy="40" r="3" fill="rgba(255,255,255,0.15)" />

      {/* Node D */}
      <circle cx="58" cy="42" r="7" fill="#FFB74D" stroke="#F57C00" strokeWidth="1.5" />
      <circle cx="58" cy="40" r="3" fill="rgba(255,255,255,0.15)" />

      {/* Node E */}
      <circle cx="36" cy="60" r="7" fill="#CE93D8" stroke="#8E24AA" strokeWidth="1.5" />
      <circle cx="36" cy="58" r="3" fill="rgba(255,255,255,0.15)" />

      {/* Node labels */}
      <text x="18" y="19" fontSize="7" fill="#fff" fontWeight="bold">A</text>
      <text x="50" y="19" fontSize="7" fill="#fff" fontWeight="bold">B</text>
      <text x="8" y="45" fontSize="7" fill="#fff" fontWeight="bold">C</text>
      <text x="56" y="45" fontSize="7" fill="#fff" fontWeight="bold">D</text>
      <text x="34" y="63" fontSize="7" fill="#fff" fontWeight="bold">E</text>
    </svg>
  );
}
