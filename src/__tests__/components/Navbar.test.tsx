import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Navbar from "@/components/Navbar";

// Mock next/link to render as a simple anchor
vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// Mock next/navigation for SearchBar
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

// Mock search module for SearchBar
vi.mock("@/lib/search", () => ({
  searchTopics: vi.fn().mockReturnValue([]),
}));

describe("Navbar", () => {
  it("renders the app title", () => {
    render(<Navbar />);
    expect(
      screen.getByText("Enciclopedia de Matemáticas")
    ).toBeInTheDocument();
  });

  it("renders the title as a link to home", () => {
    render(<Navbar />);
    const link = screen.getByText("Enciclopedia de Matemáticas");
    expect(link.closest("a")).toHaveAttribute("href", "/");
  });

  it("renders search input with placeholder", () => {
    render(<Navbar />);
    const inputs = screen.getAllByPlaceholderText("Buscar temas...");
    expect(inputs.length).toBeGreaterThan(0);
  });

  it("uses sticky positioning for visibility on all pages", () => {
    render(<Navbar />);
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveClass("sticky", "top-0");
  });
});
