export default function NumberTheoryIllustration({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Spiral background pattern */}
      <path d="M 32 32 L 34 32 L 34 30 L 30 30 L 30 34 L 36 34 L 36 28 L 28 28 L 28 36 L 38 36 L 38 26 L 26 26 L 26 38 L 40 38 L 40 24 L 24 24 L 24 40 L 42 40 L 42 22 L 22 22 L 22 42 L 44 42 L 44 20 L 20 20 L 20 44 L 46 44 L 46 18 L 18 18 L 18 46 L 48 46 L 48 16 L 16 16 L 16 48 L 50 48 L 50 14"
        stroke="#8D6E63" strokeWidth="0.6" fill="none" opacity="0.4" />
      {/* Number grid (highlights primes) */}
      {/* Row 1 */}
      <text x="8" y="14" fontSize="6.5" fill="#aaa">1</text>
      <text x="18" y="14" fontSize="6.5" fill="#8D6E63" fontWeight="bold">2</text>
      <text x="28" y="14" fontSize="6.5" fill="#8D6E63" fontWeight="bold">3</text>
      <text x="38" y="14" fontSize="6.5" fill="#aaa">4</text>
      <text x="48" y="14" fontSize="6.5" fill="#8D6E63" fontWeight="bold">5</text>
      {/* Row 2 */}
      <text x="8" y="24" fontSize="6.5" fill="#aaa">6</text>
      <text x="18" y="24" fontSize="6.5" fill="#8D6E63" fontWeight="bold">7</text>
      <text x="28" y="24" fontSize="6.5" fill="#aaa">8</text>
      <text x="38" y="24" fontSize="6.5" fill="#aaa">9</text>
      <text x="48" y="24" fontSize="6.5" fill="#aaa">10</text>
      {/* Row 3 */}
      <text x="8" y="34" fontSize="6.5" fill="#8D6E63" fontWeight="bold">11</text>
      <text x="18" y="34" fontSize="6.5" fill="#aaa">12</text>
      <text x="28" y="34" fontSize="6.5" fill="#8D6E63" fontWeight="bold">13</text>
      <text x="38" y="34" fontSize="6.5" fill="#aaa">14</text>
      <text x="48" y="34" fontSize="6.5" fill="#aaa">15</text>
      {/* Row 4 */}
      <text x="8" y="44" fontSize="6.5" fill="#aaa">16</text>
      <text x="18" y="44" fontSize="6.5" fill="#8D6E63" fontWeight="bold">17</text>
      <text x="28" y="44" fontSize="6.5" fill="#aaa">18</text>
      <text x="38" y="44" fontSize="6.5" fill="#8D6E63" fontWeight="bold">19</text>
      <text x="48" y="44" fontSize="6.5" fill="#aaa">20</text>
      {/* Row 5 */}
      <text x="8" y="54" fontSize="6.5" fill="#aaa">21</text>
      <text x="18" y="54" fontSize="6.5" fill="#aaa">22</text>
      <text x="28" y="54" fontSize="6.5" fill="#8D6E63" fontWeight="bold">23</text>
      <text x="38" y="54" fontSize="6.5" fill="#aaa">24</text>
      <text x="48" y="54" fontSize="6.5" fill="#aaa">25</text>
      {/* Highlight circles around primes */}
      <circle cx="20" cy="11" r="5.5" fill="rgba(141,110,99,0.12)" stroke="#8D6E63" strokeWidth="0.6" />
      <circle cx="30" cy="11" r="5.5" fill="rgba(141,110,99,0.12)" stroke="#8D6E63" strokeWidth="0.6" />
      <circle cx="50" cy="11" r="5.5" fill="rgba(141,110,99,0.12)" stroke="#8D6E63" strokeWidth="0.6" />
      <circle cx="20" cy="21" r="5.5" fill="rgba(141,110,99,0.12)" stroke="#8D6E63" strokeWidth="0.6" />
    </svg>
  );
}
