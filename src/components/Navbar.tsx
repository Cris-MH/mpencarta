import Link from "next/link";
import SearchBar from "./SearchBar";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  return (
    <nav className="shrink-0 bg-gradient-to-b from-[#1f7d45] to-[#0D4A28] text-white border-b border-[#0a3a1e]">
      {/* Main Header Bar */}
      <div className="flex items-center h-10 px-3 gap-3" style={{ boxShadow: "inset 0 1px rgba(255,255,255,0.15)" }}>
        {/* Logo / Title */}
        <Link
          href="/"
          className="flex items-center gap-1.5 shrink-0 hover:opacity-90 transition-opacity duration-120"
        >
          <span className="text-base" aria-hidden="true">📚</span>
          <span className="text-sm font-bold tracking-tight text-[#F5EED7]">
            Mi Primera Encarta
          </span>
        </Link>

        {/* Separator */}
        <div className="w-px h-5 bg-white/20 hidden sm:block" />

        {/* Navigation Buttons - Desktop */}
        <div className="hidden sm:flex items-center gap-1">
          <Link
            href="/"
            className="encarta-btn-green text-[11px] px-2.5 py-1 rounded-sm border border-[#0a3a1e] inline-flex items-center gap-1"
            style={{
              boxShadow: "0 1px 2px rgba(0,0,0,0.3), inset 0 1px rgba(255,255,255,0.2)",
              background: "linear-gradient(180deg, #2d8f52 0%, #176B3A 100%)",
            }}
          >
            🏠 <span>Inicio</span>
          </Link>
        </div>

        {/* Search Bar - Desktop */}
        <div className="hidden sm:block flex-1 max-w-xs ml-auto">
          <SearchBar />
        </div>

        {/* Mobile menu */}
        <div className="ml-auto sm:hidden">
          <MobileMenu />
        </div>
      </div>

      {/* Mobile Search Row */}
      <div className="sm:hidden px-3 pb-2">
        <SearchBar />
      </div>
    </nav>
  );
}
