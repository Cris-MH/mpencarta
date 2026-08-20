export default function CentralEmblem() {
  return (
    <svg
      width="300"
      height="160"
      viewBox="0 0 300 160"
      fill="none"
      aria-label="Matemática Interactiva"
      role="img"
    >
      <defs>
        <filter id="emblemGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="goldFrame" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E5B83F" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#FFD54F" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#C9A825" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {/* Outer elliptical frame — golden arc */}
      <ellipse
        cx="150"
        cy="80"
        rx="135"
        ry="68"
        fill="none"
        stroke="url(#goldFrame)"
        strokeWidth="1.2"
        opacity="0.4"
      >
        <animate
          attributeName="opacity"
          values="0.3;0.6;0.3"
          dur="4s"
          repeatCount="indefinite"
        />
      </ellipse>

      {/* Inner decorative arc */}
      <ellipse
        cx="150"
        cy="80"
        rx="120"
        ry="55"
        fill="none"
        stroke="#E5B83F"
        strokeWidth="0.6"
        opacity="0.25"
        strokeDasharray="4 6"
      />

      {/* Mathematical symbols woven into the frame */}
      {/* Integral on left curve */}
      <text x="20" y="88" fontSize="18" fill="#7B4B9E" opacity="0.5" fontFamily="serif">∫</text>

      {/* Delta on right curve */}
      <text x="270" y="85" fontSize="16" fill="#D98236" opacity="0.5" fontFamily="serif">Δ</text>

      {/* Pi at top */}
      <text x="145" y="22" fontSize="14" fill="#E5B83F" opacity="0.6" fontFamily="serif">π</text>

      {/* Sigma at bottom */}
      <text x="142" y="150" fontSize="14" fill="#2E7D6E" opacity="0.4" fontFamily="serif">∑</text>

      {/* Infinity on left */}
      <text x="40" y="55" fontSize="12" fill="#3C79A8" opacity="0.35" fontFamily="serif">∞</text>

      {/* Sqrt on right */}
      <text x="250" y="55" fontSize="12" fill="#B94A42" opacity="0.35" fontFamily="serif">√</text>

      {/* Small golden dots at cardinal points */}
      <circle cx="150" cy="12" r="2" fill="#E5B83F" opacity="0.5" />
      <circle cx="15" cy="80" r="2" fill="#E5B83F" opacity="0.4" />
      <circle cx="285" cy="80" r="2" fill="#E5B83F" opacity="0.4" />
      <circle cx="150" cy="148" r="2" fill="#E5B83F" opacity="0.4" />

      {/* Decorative thin lines radiating from center */}
      <line x1="50" y1="80" x2="80" y2="80" stroke="#E5B83F" strokeWidth="0.4" opacity="0.2" />
      <line x1="220" y1="80" x2="250" y2="80" stroke="#E5B83F" strokeWidth="0.4" opacity="0.2" />

      {/* Main title */}
      <text
        x="150"
        y="75"
        textAnchor="middle"
        fontSize="26"
        fontWeight="700"
        fill="#F5EED7"
        letterSpacing="3"
        fontFamily="system-ui, Tahoma, sans-serif"
        filter="url(#emblemGlow)"
      >
        MATEMÁTICA
      </text>

      {/* Subtitle */}
      <text
        x="150"
        y="105"
        textAnchor="middle"
        fontSize="18"
        fontWeight="600"
        fill="#F5EED7"
        letterSpacing="6"
        fontFamily="system-ui, Tahoma, sans-serif"
        opacity="0.9"
      >
        INTERACTIVA
      </text>

      {/* Subtle underline decoration */}
      <line x1="90" y1="115" x2="210" y2="115" stroke="#E5B83F" strokeWidth="0.5" opacity="0.3" />
      <circle cx="90" cy="115" r="1.5" fill="#E5B83F" opacity="0.3" />
      <circle cx="210" cy="115" r="1.5" fill="#E5B83F" opacity="0.3" />
      <circle cx="150" cy="115" r="1" fill="#E5B83F" opacity="0.5" />
    </svg>
  );
}
