export default function NumberTheoryIllustration({ size = 72 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="numtheory-icon"
    >
      <style>{`
        .numtheory-icon .prime-num {
          transition: opacity 200ms ease, fill 200ms ease;
        }
        .numtheory-icon:hover .prime-num {
          opacity: 1;
          fill: #FFD54F;
        }
        .numtheory-icon .prime-glow {
          transition: opacity 200ms ease;
        }
        .numtheory-icon:hover .prime-glow {
          opacity: 0.25;
        }
      `}</style>

      {/* Spiral path (Archimedes spiral approximation) */}
      <path
        d="M 36 36 L 38 36 L 38 34 L 34 34 L 34 38 L 40 38 L 40 32 L 32 32 L 32 40 L 42 40 L 42 30 L 30 30 L 30 42 L 44 42 L 44 28 L 28 28 L 28 44 L 46 44 L 46 26 L 26 26 L 26 46 L 48 46 L 48 24 L 24 24 L 24 48 L 50 48 L 50 22 L 22 22 L 22 50 L 52 50 L 52 20 L 20 20 L 20 52 L 54 52 L 54 18 L 18 18 L 18 54 L 56 54 L 56 16 L 16 16 L 16 56 L 58 56 L 58 14"
        stroke="#8D6E63"
        strokeWidth="0.5"
        fill="none"
        opacity="0.3"
      />

      {/* Numbers along spiral — primes are highlighted */}
      {/* Primes: bold and brighter */}
      <text className="prime-num" x="34" y="39" fontSize="7" fill="#E5B83F" fontWeight="bold" opacity="0.9">2</text>
      <text className="prime-num" x="38" y="35" fontSize="7" fill="#E5B83F" fontWeight="bold" opacity="0.9">3</text>
      <text className="prime-num" x="33" y="31" fontSize="7" fill="#E5B83F" fontWeight="bold" opacity="0.9">5</text>
      <text className="prime-num" x="28" y="37" fontSize="7" fill="#E5B83F" fontWeight="bold" opacity="0.9">7</text>
      <text className="prime-num" x="40" y="44" fontSize="7" fill="#E5B83F" fontWeight="bold" opacity="0.9">11</text>
      <text className="prime-num" x="44" y="28" fontSize="7" fill="#E5B83F" fontWeight="bold" opacity="0.9">13</text>
      <text className="prime-num" x="24" y="44" fontSize="7" fill="#E5B83F" fontWeight="bold" opacity="0.9">17</text>
      <text className="prime-num" x="48" y="46" fontSize="7" fill="#E5B83F" fontWeight="bold" opacity="0.9">19</text>
      <text className="prime-num" x="20" y="26" fontSize="7" fill="#E5B83F" fontWeight="bold" opacity="0.9">23</text>

      {/* Non-primes: dimmer */}
      <text x="38" y="39" fontSize="6" fill="#888" opacity="0.4">4</text>
      <text x="33" y="35" fontSize="6" fill="#888" opacity="0.4">6</text>
      <text x="28" y="33" fontSize="6" fill="#888" opacity="0.4">8</text>
      <text x="30" y="41" fontSize="6" fill="#888" opacity="0.4">9</text>
      <text x="42" y="40" fontSize="6" fill="#888" opacity="0.4">10</text>
      <text x="42" y="32" fontSize="6" fill="#888" opacity="0.4">12</text>
      <text x="26" y="30" fontSize="6" fill="#888" opacity="0.4">14</text>
      <text x="26" y="42" fontSize="6" fill="#888" opacity="0.4">15</text>
      <text x="44" y="40" fontSize="6" fill="#888" opacity="0.4">16</text>

      {/* Glow circles behind primes */}
      <circle className="prime-glow" cx="36" cy="37" r="5" fill="#E5B83F" opacity="0.1" />
      <circle className="prime-glow" cx="40" cy="33" r="5" fill="#E5B83F" opacity="0.08" />
      <circle className="prime-glow" cx="35" cy="29" r="5" fill="#E5B83F" opacity="0.08" />
      <circle className="prime-glow" cx="30" cy="35" r="5" fill="#E5B83F" opacity="0.08" />

      {/* Decorative: infinity symbol */}
      <text x="50" y="60" fontSize="10" fill="#8D6E63" opacity="0.3" fontFamily="serif">∞</text>
    </svg>
  );
}
