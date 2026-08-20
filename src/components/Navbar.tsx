import Link from "next/link";
import SearchBar from "./SearchBar";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-primary-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* App title / logo linking to home */}
          <Link
            href="/"
            className="text-lg sm:text-xl font-bold tracking-tight hover:text-primary-100 transition-colors min-h-[44px] flex items-center"
          >
            Enciclopedia de Matemáticas
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
