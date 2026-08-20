import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ChalkApp",
  description:
    "Enciclopedia interactiva de matemáticas. Explora aritmética, álgebra, geometría, trigonometría, cálculo, estadística, probabilidad, matemática discreta y teoría de números.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <div className="desk-bg" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
