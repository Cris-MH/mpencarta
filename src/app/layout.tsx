import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mi Primera Encarta - Matemáticas",
  description:
    "Mi Primera Encarta: enciclopedia interactiva de matemáticas para el bachillerato colombiano (grados 6° a 11°). Explora temas de aritmética, álgebra, geometría, estadística, trigonometría y cálculo con contenido multimedia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased h-screen flex flex-col overflow-hidden">
        {/* Application Frame - Desktop app feel */}
        <div className="flex flex-col h-full border-2 border-[#0D4A28] encarta-bevel">
          {/* App Header Bar */}
          <Navbar />

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto overflow-x-hidden encarta-scroll bg-[var(--color-encarta-cream)]">
            {children}
          </main>

          {/* Status Bar */}
          <footer className="encarta-statusbar flex items-center justify-between shrink-0">
            <span>Mi Primera Encarta • Matemáticas • Bachillerato Colombiano</span>
            <span className="text-[10px] opacity-70">v1.0 • Grados 6° – 11°</span>
          </footer>
        </div>
      </body>
    </html>
  );
}
