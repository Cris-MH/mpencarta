export default function BackgroundScene() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      aria-hidden="true"
    >
      {/* Large coordinate grid — very faint */}
      <g opacity="0.06" stroke="#4a9fbf" strokeWidth="0.4">
        {Array.from({ length: 12 }, (_, i) => (
          <line key={`v${i}`} x1={(i + 1) * 100} y1="0" x2={(i + 1) * 100} y2="800" />
        ))}
        {Array.from({ length: 8 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={(i + 1) * 100} x2="1200" y2={(i + 1) * 100} />
        ))}
      </g>

      {/* Main axes */}
      <line x1="600" y1="50" x2="600" y2="750" stroke="#4a9fbf" strokeWidth="0.6" opacity="0.08" />
      <line x1="50" y1="400" x2="1150" y2="400" stroke="#4a9fbf" strokeWidth="0.6" opacity="0.08" />

      {/* Large planet/sphere in upper-right */}
      <circle cx="950" cy="180" r="140" fill="none" stroke="#3a7faa" strokeWidth="0.8" opacity="0.06" />
      <circle cx="950" cy="180" r="120" fill="none" stroke="#3a7faa" strokeWidth="0.4" opacity="0.04" />
      <circle cx="950" cy="180" r="95" fill="radial-gradient(#1a4f7a, transparent)" opacity="0.03" />

      {/* Multiple parabola curves at different scales */}
      <path d="M 100 700 Q 400 100 700 700" fill="none" stroke="#2a8fa8" strokeWidth="1.2" opacity="0.1" />
      <path d="M 400 650 Q 600 300 800 650" fill="none" stroke="#3C79A8" strokeWidth="0.8" opacity="0.08" />
      <path d="M 800 750 Q 1000 400 1200 750" fill="none" stroke="#2E7D6E" strokeWidth="0.7" opacity="0.07" />

      {/* Sine wave flowing across middle */}
      <path
        d="M 0 400 C 50 340 100 340 150 400 C 200 460 250 460 300 400 C 350 340 400 340 450 400 C 500 460 550 460 600 400 C 650 340 700 340 750 400 C 800 460 850 460 900 400 C 950 340 1000 340 1050 400 C 1100 460 1150 460 1200 400"
        fill="none"
        stroke="#2E7D6E"
        strokeWidth="1"
        opacity="0.09"
      />

      {/* Second smaller sine wave */}
      <path
        d="M 0 420 C 40 395 80 395 120 420 C 160 445 200 445 240 420 C 280 395 320 395 360 420 C 400 445 440 445 480 420 C 520 395 560 395 600 420 C 640 445 680 445 720 420 C 760 395 800 395 840 420 C 880 445 920 445 960 420 C 1000 395 1040 395 1080 420 C 1120 445 1160 445 1200 420"
        fill="none"
        stroke="#4a9fbf"
        strokeWidth="0.6"
        opacity="0.06"
      />

      {/* Triangle outlines at different angles */}
      <polygon points="150,620 280,620 215,520" fill="none" stroke="#D98236" strokeWidth="0.8" opacity="0.08" />
      <polygon points="900,550 1000,650 820,650" fill="none" stroke="#7B4B9E" strokeWidth="0.6" opacity="0.06" />
      <polygon points="100,200 160,200 130,150" fill="none" stroke="#B94A42" strokeWidth="0.5" opacity="0.05" />

      {/* Scattered math symbols at various sizes */}
      <text x="80" y="120" fontSize="36" fill="#4a9fbf" opacity="0.07" fontFamily="serif">∑</text>
      <text x="1050" y="150" fontSize="40" fill="#2a8fa8" opacity="0.06" fontFamily="serif">∫</text>
      <text x="150" y="680" fontSize="28" fill="#2E7D6E" opacity="0.08" fontFamily="serif">π</text>
      <text x="980" y="620" fontSize="32" fill="#7B4B9E" opacity="0.06" fontFamily="serif">∞</text>
      <text x="520" y="720" fontSize="24" fill="#D98236" opacity="0.07" fontFamily="serif">√</text>
      <text x="750" y="100" fontSize="26" fill="#2E7D6E" opacity="0.05" fontFamily="serif">Δ</text>
      <text x="1100" y="450" fontSize="20" fill="#5C6BC0" opacity="0.06" fontFamily="serif">θ</text>
      <text x="60" y="400" fontSize="22" fill="#8D6E63" opacity="0.06" fontFamily="serif">φ</text>
      <text x="300" y="150" fontSize="18" fill="#E5B83F" opacity="0.05" fontFamily="serif">∂</text>
      <text x="850" y="380" fontSize="30" fill="#B94A42" opacity="0.05" fontFamily="serif">∑</text>
      <text x="450" y="200" fontSize="14" fill="#4a9fbf" opacity="0.08" fontFamily="serif">∇</text>
      <text x="680" y="680" fontSize="16" fill="#3C79A8" opacity="0.06" fontFamily="serif">∈</text>
      <text x="200" y="350" fontSize="12" fill="#E5B83F" opacity="0.04" fontFamily="serif">λ</text>
      <text x="1000" y="300" fontSize="14" fill="#2E7D6E" opacity="0.05" fontFamily="serif">ε</text>

      {/* Scattered dots/stars — mathematical universe */}
      <circle cx="120" cy="80" r="1.5" fill="#4a9fbf" opacity="0.15" />
      <circle cx="350" cy="150" r="2" fill="#3C79A8" opacity="0.12" />
      <circle cx="780" cy="120" r="1.8" fill="#2E7D6E" opacity="0.1" />
      <circle cx="200" cy="500" r="1.2" fill="#D98236" opacity="0.14" />
      <circle cx="900" cy="450" r="2" fill="#7B4B9E" opacity="0.1" />
      <circle cx="500" cy="600" r="1.5" fill="#E5B83F" opacity="0.13" />
      <circle cx="1100" cy="550" r="1.8" fill="#B94A42" opacity="0.09" />
      <circle cx="650" cy="200" r="1" fill="#5C6BC0" opacity="0.15" />
      <circle cx="400" cy="450" r="1.3" fill="#4a9fbf" opacity="0.11" />
      <circle cx="50" cy="600" r="2" fill="#2a8fa8" opacity="0.12" />
      <circle cx="1050" cy="700" r="1.5" fill="#E5B83F" opacity="0.1" />
      <circle cx="300" cy="700" r="1" fill="#3C79A8" opacity="0.13" />
      <circle cx="750" cy="500" r="1.8" fill="#176B3A" opacity="0.09" />
      <circle cx="550" cy="100" r="1.2" fill="#D98236" opacity="0.11" />
      <circle cx="850" cy="250" r="1.5" fill="#5C6BC0" opacity="0.12" />
      <circle cx="150" cy="300" r="1" fill="#7B4B9E" opacity="0.14" />
      <circle cx="1000" cy="500" r="2.2" fill="#2E7D6E" opacity="0.08" />
      <circle cx="450" cy="350" r="1.3" fill="#E5B83F" opacity="0.1" />
      <circle cx="680" cy="400" r="1" fill="#B94A42" opacity="0.12" />
      <circle cx="250" cy="250" r="1.8" fill="#4a9fbf" opacity="0.09" />

      {/* Additional larger faint circles — like distant mathematical objects */}
      <circle cx="200" cy="150" r="30" fill="none" stroke="#3a7faa" strokeWidth="0.3" opacity="0.05" />
      <circle cx="800" cy="650" r="45" fill="none" stroke="#2E7D6E" strokeWidth="0.4" opacity="0.04" />
      <circle cx="400" cy="550" r="25" fill="none" stroke="#7B4B9E" strokeWidth="0.3" opacity="0.04" />
    </svg>
  );
}
