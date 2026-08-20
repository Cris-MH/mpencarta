export default function BackgroundScene() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1000 700"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a4f7a" stopOpacity="0.08" />
          <stop offset="40%" stopColor="#2a8fa8" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#D98236" stopOpacity="0.03" />
        </linearGradient>
      </defs>

      {/* Full background gradient wash */}
      <rect width="1000" height="700" fill="url(#bgGrad)" />

      {/* Coordinate grid */}
      <g opacity="0.05" stroke="#1a4f7a" strokeWidth="0.5">
        {/* Vertical lines */}
        <line x1="100" y1="0" x2="100" y2="700" />
        <line x1="200" y1="0" x2="200" y2="700" />
        <line x1="300" y1="0" x2="300" y2="700" />
        <line x1="400" y1="0" x2="400" y2="700" />
        <line x1="500" y1="0" x2="500" y2="700" />
        <line x1="600" y1="0" x2="600" y2="700" />
        <line x1="700" y1="0" x2="700" y2="700" />
        <line x1="800" y1="0" x2="800" y2="700" />
        <line x1="900" y1="0" x2="900" y2="700" />
        {/* Horizontal lines */}
        <line x1="0" y1="100" x2="1000" y2="100" />
        <line x1="0" y1="200" x2="1000" y2="200" />
        <line x1="0" y1="300" x2="1000" y2="300" />
        <line x1="0" y1="400" x2="1000" y2="400" />
        <line x1="0" y1="500" x2="1000" y2="500" />
        <line x1="0" y1="600" x2="1000" y2="600" />
      </g>

      {/* Axes */}
      <line x1="500" y1="50" x2="500" y2="650" stroke="#1a4f7a" strokeWidth="0.8" opacity="0.08" />
      <line x1="50" y1="350" x2="950" y2="350" stroke="#1a4f7a" strokeWidth="0.8" opacity="0.08" />

      {/* Parabola */}
      <path
        d="M 300 550 Q 500 50 700 550"
        fill="none"
        stroke="#2a8fa8"
        strokeWidth="1.5"
        opacity="0.08"
      />

      {/* Unit circle */}
      <circle cx="500" cy="350" r="120" fill="none" stroke="#3C79A8" strokeWidth="1" opacity="0.07" />

      {/* Sine wave */}
      <path
        d="M 50 350 C 100 250 150 250 200 350 C 250 450 300 450 350 350 C 400 250 450 250 500 350 C 550 450 600 450 650 350 C 700 250 750 250 800 350 C 850 450 900 450 950 350"
        fill="none"
        stroke="#2E7D6E"
        strokeWidth="1.2"
        opacity="0.07"
      />

      {/* Triangle outline */}
      <polygon
        points="150,520 300,520 225,400"
        fill="none"
        stroke="#D98236"
        strokeWidth="1"
        opacity="0.08"
      />

      {/* Scattered math symbols */}
      <text x="80" y="120" fontSize="28" fill="#1a4f7a" opacity="0.06" fontFamily="serif">∑</text>
      <text x="850" y="150" fontSize="32" fill="#2a8fa8" opacity="0.06" fontFamily="serif">∫</text>
      <text x="150" y="600" fontSize="24" fill="#176B3A" opacity="0.06" fontFamily="serif">π</text>
      <text x="780" y="550" fontSize="26" fill="#7B4B9E" opacity="0.05" fontFamily="serif">∞</text>
      <text x="420" y="620" fontSize="20" fill="#D98236" opacity="0.06" fontFamily="serif">√</text>
      <text x="650" y="100" fontSize="22" fill="#2E7D6E" opacity="0.05" fontFamily="serif">Δ</text>
      <text x="900" y="380" fontSize="18" fill="#5C6BC0" opacity="0.05" fontFamily="serif">θ</text>
      <text x="70" y="350" fontSize="20" fill="#8D6E63" opacity="0.05" fontFamily="serif">φ</text>

      {/* Scattered dots/points */}
      <circle cx="350" cy="200" r="3" fill="#3C79A8" opacity="0.08" />
      <circle cx="650" cy="450" r="2.5" fill="#2E7D6E" opacity="0.08" />
      <circle cx="200" cy="400" r="2" fill="#D98236" opacity="0.09" />
      <circle cx="800" cy="250" r="3" fill="#7B4B9E" opacity="0.07" />
      <circle cx="500" cy="500" r="2.5" fill="#176B3A" opacity="0.08" />
      <circle cx="100" cy="250" r="2" fill="#B94A42" opacity="0.07" />
      <circle cx="750" cy="600" r="2" fill="#E5B83F" opacity="0.08" />
    </svg>
  );
}
