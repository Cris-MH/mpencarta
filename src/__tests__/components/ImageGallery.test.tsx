import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ImageGallery from "@/components/ImageGallery";
import type { Imagen } from "@/lib/types";

describe("ImageGallery", () => {
  const sampleImages: Imagen[] = [
    {
      src: "/images/temas/6/numeros-naturales-recta.png",
      alt: "Recta numérica mostrando los números naturales del 0 al 10",
      caption: "Representación de números naturales en la recta numérica",
    },
    {
      src: "/images/temas/6/operaciones-basicas.png",
      alt: "Diagrama de operaciones básicas",
    },
  ];

  it("renders nothing when imagenes array is empty", () => {
    const { container } = render(<ImageGallery imagenes={[]} />);
    expect(container.innerHTML).toBe("");
  });

  it("renders a figure for each image", () => {
    render(<ImageGallery imagenes={sampleImages} />);
    const figures = screen.getAllByRole("figure");
    expect(figures).toHaveLength(2);
  });

  it("renders images with correct alt text", () => {
    render(<ImageGallery imagenes={sampleImages} />);
    expect(
      screen.getByAltText("Recta numérica mostrando los números naturales del 0 al 10")
    ).toBeInTheDocument();
    expect(
      screen.getByAltText("Diagrama de operaciones básicas")
    ).toBeInTheDocument();
  });

  it("renders caption when provided", () => {
    render(<ImageGallery imagenes={sampleImages} />);
    expect(
      screen.getByText("Representación de números naturales en la recta numérica")
    ).toBeInTheDocument();
  });

  it("does not render figcaption when caption is not provided", () => {
    render(<ImageGallery imagenes={[sampleImages[1]]} />);
    const figure = screen.getByRole("figure");
    const figcaption = figure.querySelector("figcaption");
    expect(figcaption).toBeNull();
  });

  it("applies responsive classes to images for no horizontal overflow", () => {
    render(<ImageGallery imagenes={[sampleImages[0]]} />);
    const img = screen.getByAltText(sampleImages[0].alt);
    expect(img).toHaveClass("w-full", "max-w-full", "h-auto", "rounded-lg");
  });

  it("uses correct src attribute for images", () => {
    render(<ImageGallery imagenes={[sampleImages[0]]} />);
    const img = screen.getByAltText(sampleImages[0].alt);
    expect(img).toHaveAttribute("src", "/images/temas/6/numeros-naturales-recta.png");
  });

  it("applies lazy loading to images", () => {
    render(<ImageGallery imagenes={[sampleImages[0]]} />);
    const img = screen.getByAltText(sampleImages[0].alt);
    expect(img).toHaveAttribute("loading", "lazy");
  });

  it("has an accessible section label", () => {
    render(<ImageGallery imagenes={sampleImages} />);
    expect(
      screen.getByLabelText("Galería de imágenes")
    ).toBeInTheDocument();
  });
});
