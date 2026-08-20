import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Enciclopedia de Matemáticas",
  description:
    "Enciclopedia interactiva de matemáticas para el bachillerato colombiano (grados 6° a 11°). Explora temas de aritmética, álgebra, geometría, estadística, trigonometría y cálculo con contenido multimedia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased min-h-screen bg-background text-foreground overflow-x-hidden">
        <Navbar />
        <main className="max-w-7xl mx-auto w-full">{children}</main>
      </body>
    </html>
  );
}
