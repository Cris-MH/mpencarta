import styles from "./HomeLayout.module.css";

export default function SceneConnectors() {
  return (
    <svg
      className={styles.connectors}
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {/* Large sweeping parabola — upper-left to lower-right */}
      <path
        d="M 50 100 Q 600 -50 1150 700"
        fill="none"
        stroke="#2a8fa8"
        strokeWidth="0.8"
        opacity="0.06"
      />

      {/* Secondary curve — right to left */}
      <path
        d="M 1100 150 Q 600 400 100 650"
        fill="none"
        stroke="#E5B83F"
        strokeWidth="0.6"
        opacity="0.05"
      />

      {/* Sine wave flowing horizontally across middle */}
      <path
        d="M 0 400 C 60 350 120 350 180 400 C 240 450 300 450 360 400 C 420 350 480 350 540 400 C 600 450 660 450 720 400 C 780 350 840 350 900 400 C 960 450 1020 450 1080 400 C 1140 350 1200 350 1200 400"
        fill="none"
        stroke="#2E7D6E"
        strokeWidth="0.7"
        opacity="0.05"
      />

      {/* Connecting curves between category positions */}
      {/* Geometry area → Algebra area */}
      <path
        d="M 150 120 C 300 80 600 60 820 80"
        fill="none"
        stroke="#4a9fbf"
        strokeWidth="0.5"
        opacity="0.1"
      />

      {/* Arithmetic → Trigonometry */}
      <path
        d="M 80 320 C 100 400 120 450 180 520"
        fill="none"
        stroke="#3C79A8"
        strokeWidth="0.5"
        opacity="0.08"
      />

      {/* Calculus → Statistics */}
      <path
        d="M 960 320 C 800 450 600 550 450 600"
        fill="none"
        stroke="#176B3A"
        strokeWidth="0.5"
        opacity="0.08"
      />

      {/* Central radial lines from emblem area */}
      <path
        d="M 600 180 C 550 250 400 300 200 350"
        fill="none"
        stroke="#E5B83F"
        strokeWidth="0.4"
        opacity="0.06"
      />
      <path
        d="M 600 180 C 650 250 800 320 950 350"
        fill="none"
        stroke="#E5B83F"
        strokeWidth="0.4"
        opacity="0.06"
      />

      {/* Coordinate axis fragments */}
      {/* Fragment 1 — upper area */}
      <line x1="300" y1="200" x2="420" y2="200" stroke="#4a9fbf" strokeWidth="0.4" opacity="0.08" strokeDasharray="4 8" />
      <line x1="360" y1="160" x2="360" y2="240" stroke="#4a9fbf" strokeWidth="0.4" opacity="0.08" strokeDasharray="4 8" />

      {/* Fragment 2 — lower-right */}
      <line x1="850" y1="550" x2="1000" y2="550" stroke="#4a9fbf" strokeWidth="0.3" opacity="0.06" strokeDasharray="3 6" />
      <line x1="920" y1="500" x2="920" y2="600" stroke="#4a9fbf" strokeWidth="0.3" opacity="0.06" strokeDasharray="3 6" />

      {/* Small golden dots at curve intersections */}
      <circle cx="360" cy="200" r="2.5" fill="#E5B83F" opacity="0.2" />
      <circle cx="600" cy="400" r="2" fill="#E5B83F" opacity="0.15" />
      <circle cx="920" cy="550" r="2" fill="#E5B83F" opacity="0.15" />
      <circle cx="150" cy="400" r="2" fill="#2a8fa8" opacity="0.15" />
      <circle cx="1050" cy="300" r="2" fill="#E5B83F" opacity="0.12" />
      <circle cx="300" cy="600" r="1.8" fill="#2E7D6E" opacity="0.15" />
      <circle cx="750" cy="150" r="2" fill="#D98236" opacity="0.12" />
      <circle cx="480" cy="500" r="1.5" fill="#7B4B9E" opacity="0.12" />

      {/* Scattered math symbols between categories */}
      <text x="250" y="280" fontSize="14" fill="#4a9fbf" opacity="0.08" fontFamily="serif">∑</text>
      <text x="720" y="250" fontSize="12" fill="#2a8fa8" opacity="0.07" fontFamily="serif">∞</text>
      <text x="450" y="350" fontSize="11" fill="#E5B83F" opacity="0.08" fontFamily="serif">≈</text>
      <text x="900" y="450" fontSize="13" fill="#2E7D6E" opacity="0.06" fontFamily="serif">±</text>
      <text x="350" y="500" fontSize="10" fill="#D98236" opacity="0.08" fontFamily="serif">∂</text>
      <text x="800" y="650" fontSize="12" fill="#7B4B9E" opacity="0.06" fontFamily="serif">∇</text>
      <text x="150" y="550" fontSize="11" fill="#B94A42" opacity="0.07" fontFamily="serif">θ</text>
      <text x="1050" y="500" fontSize="10" fill="#5C6BC0" opacity="0.07" fontFamily="serif">λ</text>
      <text x="550" y="650" fontSize="12" fill="#8D6E63" opacity="0.06" fontFamily="serif">φ</text>
      <text x="680" y="480" fontSize="10" fill="#3C79A8" opacity="0.08" fontFamily="serif">ε</text>

      {/* More scattered star-like dots */}
      <circle cx="100" cy="150" r="1.5" fill="#4a9fbf" opacity="0.12" />
      <circle cx="400" cy="100" r="1.2" fill="#E5B83F" opacity="0.1" />
      <circle cx="700" cy="80" r="1.8" fill="#2E7D6E" opacity="0.08" />
      <circle cx="1100" cy="200" r="1.5" fill="#D98236" opacity="0.1" />
      <circle cx="200" cy="700" r="2" fill="#7B4B9E" opacity="0.08" />
      <circle cx="500" cy="250" r="1" fill="#B94A42" opacity="0.12" />
      <circle cx="850" cy="100" r="1.3" fill="#5C6BC0" opacity="0.1" />
      <circle cx="50" cy="450" r="1.5" fill="#2a8fa8" opacity="0.1" />
      <circle cx="1000" cy="700" r="1.8" fill="#E5B83F" opacity="0.08" />
      <circle cx="650" cy="350" r="1" fill="#176B3A" opacity="0.1" />

      {/* Large faint circles — distant mathematical objects */}
      <circle cx="200" cy="200" r="60" fill="none" stroke="#3a7faa" strokeWidth="0.3" opacity="0.04" />
      <circle cx="1000" cy="600" r="80" fill="none" stroke="#2E7D6E" strokeWidth="0.3" opacity="0.03" />
      <circle cx="600" cy="700" r="50" fill="none" stroke="#7B4B9E" strokeWidth="0.3" opacity="0.03" />

      {/* Spiral fragment near center */}
      <path
        d="M 580 380 C 590 370 610 370 620 380 C 630 390 630 410 620 420 C 610 430 590 430 580 420"
        fill="none"
        stroke="#E5B83F"
        strokeWidth="0.4"
        opacity="0.08"
      />
    </svg>
  );
}
