import Link from "next/link";
import SearchBar from "./SearchBar";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-primary-700 via-primary-600 to-primary-700 text-white shadow-lg border-b-2 border-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* App title / logo linking to home */}
          <Link
            href="/"
            className="flex items-center gap-2 text-lg sm:text-xl font-bold tracking-tight hover:text-primary-100 transition-colors min-h-[44px]"
          >
            <span className="text-2xl" aria-hidden="true">🧮</span>
            <span className="bg-gradient-to-r from-white to-primary-100 bg-clip-text text-transparent">
              Mi Primera Encarta
            </span>
          </Link>

          {/* SearchBar - hidden on mobile, shown on sm+ */}
          <div className="hidden sm:block flex-1 max-w-md ml-6">
            <SearchBar />
          </div>

          {/* Mobile menu hamburger */}
          <MobileMenu />
        </div>

        {/* Mobile search bar - below title row on small screens */}
        <div className="sm:hidden pb-3">
          <SearchBar />
        </div>
      </div>
    </nav>
  );
}
