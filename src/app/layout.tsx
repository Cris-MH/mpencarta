import type { Metadata } from "next";
import AppFrame from "@/components/shell/AppFrame";
import "./globals.css";

export const metadata: Metadata = {
  title: "Matemática Interactiva",
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
      <body>
        <AppFrame>{children}</AppFrame>
      </body>
    </html>
  );
}
