export default function NumberTheoryIllustration({ size = 90 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 90 90"
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
          opacity: 0.3;
        }
      `}</style>

      {/* Spiral path (Archimedes spiral — square approximation) */}
      <path
        d="M 45 45 L 48 45 L 48 42 L 42 42 L 42 48 L 51 48 L 51 39 L 39 39 L 39 51 L 54 51 L 54 36 L 36 36 L 36 54 L 57 54 L 57 33 L 33 33 L 33 57 L 60 57 L 60 30 L 30 30 L 30 60 L 63 60 L 63 27 L 27 27 L 27 63 L 66 63 L 66 24 L 24 24 L 24 66 L 69 66 L 69 21 L 21 21 L 21 69 L 72 69 L 72 18 L 18 18 L 18 72 L 75 72 L 75 15"
        stroke="#8D6E63"
        strokeWidth="0.5"
        fill="none"
        opacity="0.25"
      />

      {/* Glow circles behind prime positions */}
      <circle className="prime-glow" cx="47" cy="44" r="6" fill="#E5B83F" opacity="0.1" />
      <circle className="prime-glow" cx="48" cy="40" r="6" fill="#E5B83F" opacity="0.08" />
      <circle className="prime-glow" cx="40" cy="40" r="6" fill="#E5B83F" opacity="0.08" />
      <circle className="prime-glow" cx="40" cy="48" r="6" fill="#E5B83F" opacity="0.08" />
      <circle className="prime-glow" cx="52" cy="50" r="6" fill="#E5B83F" opacity="0.07" />

      {/* Prime numbers — highlighted (golden, larger) */}
      <text className="prime-num" x="44" y="48" fontSize="8" fill="#E5B83F" fontWeight="bold" opacity="0.9">2</text>
      <text className="prime-num" x="47" y="43" fontSize="8" fill="#E5B83F" fontWeight="bold" opacity="0.9">3</text>
      <text className="prime-num" x="40" y="41" fontSize="8" fill="#E5B83F" fontWeight="bold" opacity="0.9">5</text>
      <text className="prime-num" x="39" y="49" fontSize="8" fill="#E5B83F" fontWeight="bold" opacity="0.9">7</text>
      <text className="prime-num" x="51" y="52" fontSize="8" fill="#E5B83F" fontWeight="bold" opacity="0.85">11</text>
      <text className="prime-num" x="55" y="36" fontSize="8" fill="#E5B83F" fontWeight="bold" opacity="0.85">13</text>
      <text className="prime-num" x="32" y="55" fontSize="8" fill="#E5B83F" fontWeight="bold" opacity="0.8">17</text>
      <text className="prime-num" x="59" y="55" fontSize="8" fill="#E5B83F" fontWeight="bold" opacity="0.8">19</text>
      <text className="prime-num" x="26" y="30" fontSize="8" fill="#E5B83F" fontWeight="bold" opacity="0.75">23</text>
      <text className="prime-num" x="68" y="68" fontSize="7" fill="#E5B83F" fontWeight="bold" opacity="0.7">29</text>

      {/* Non-prime numbers — faded */}
      <text x="47" y="48" fontSize="6" fill="#888" opacity="0.3">4</text>
      <text x="42" y="43" fontSize="6" fill="#888" opacity="0.3">6</text>
      <text x="38" y="44" fontSize="6" fill="#888" opacity="0.3">8</text>
      <text x="40" y="52" fontSize="6" fill="#888" opacity="0.3">9</text>
      <text x="53" y="48" fontSize="6" fill="#888" opacity="0.3">10</text>
      <text x="54" y="40" fontSize="6" fill="#888" opacity="0.3">12</text>
      <text x="35" y="38" fontSize="6" fill="#888" opacity="0.25">14</text>
      <text x="34" y="50" fontSize="6" fill="#888" opacity="0.25">15</text>
      <text x="56" y="48" fontSize="6" fill="#888" opacity="0.25">16</text>
      <text x="36" y="57" fontSize="6" fill="#888" opacity="0.2">18</text>
      <text x="60" y="31" fontSize="6" fill="#888" opacity="0.2">20</text>
      <text x="28" y="60" fontSize="6" fill="#888" opacity="0.2">21</text>

      {/* Decorative elements */}
      <text x="64" y="82" fontSize="12" fill="#8D6E63" opacity="0.3" fontFamily="serif">∞</text>

      {/* Sieve pattern dots — represent eliminated numbers */}
      <circle cx="75" cy="25" r="1.5" fill="#8D6E63" opacity="0.15" />
      <circle cx="20" cy="75" r="1.5" fill="#8D6E63" opacity="0.15" />
      <circle cx="70" cy="40" r="1" fill="#8D6E63" opacity="0.12" />
      <circle cx="22" cy="45" r="1" fill="#8D6E63" opacity="0.12" />
    </svg>
  );
}
