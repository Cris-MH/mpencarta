import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import SearchBar from "@/components/SearchBar";

// Mock next/navigation
const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

// Mock the search module
vi.mock("@/lib/search", () => ({
  searchTopics: vi.fn(),
}));

import { searchTopics } from "@/lib/search";
const mockSearchTopics = vi.mocked(searchTopics);

describe("SearchBar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSearchTopics.mockReturnValue([]);
  });

  it("renders input with correct placeholder", () => {
    render(<SearchBar />);
    expect(
      screen.getByPlaceholderText("Buscar temas...")
    ).toBeInTheDocument();
  });

  it("hides results when query has fewer than 2 characters", async () => {
    const user = userEvent.setup();
    render(<SearchBar />);

    const input = screen.getByPlaceholderText("Buscar temas...");
    await user.type(input, "a");

    expect(mockSearchTopics).not.toHaveBeenCalled();
    expect(
      screen.queryByText("No se encontraron temas relacionados")
    ).not.toBeInTheDocument();
  });

  it("calls searchTopics when query has 2+ characters", async () => {
    mockSearchTopics.mockReturnValue([
      {
        temaSlug: "numeros-naturales",
        temaTitulo: "Números Naturales",
        gradoId: "6",
        gradoNombre: "Grado 6°",
      },
    ]);

    const user = userEvent.setup();
    render(<SearchBar />);

    const input = screen.getByPlaceholderText("Buscar temas...");
    await user.type(input, "nu");

    expect(mockSearchTopics).toHaveBeenCalledWith("nu");
  });

  it("shows dropdown with max 10 results displaying topic name and grade", async () => {
    mockSearchTopics.mockReturnValue([
      {
        temaSlug: "numeros-naturales",
        temaTitulo: "Números Naturales",
        gradoId: "6",
        gradoNombre: "Grado 6°",
      },
      {
        temaSlug: "numeros-enteros",
        temaTitulo: "Números Enteros",
        gradoId: "7",
        gradoNombre: "Grado 7°",
      },
    ]);

    const user = userEvent.setup();
    render(<SearchBar />);

    const input = screen.getByPlaceholderText("Buscar temas...");
    await user.type(input, "num");

    expect(screen.getByText("Números Naturales")).toBeInTheDocument();
    expect(screen.getByText("Grado 6°")).toBeInTheDocument();
    expect(screen.getByText("Números Enteros")).toBeInTheDocument();
    expect(screen.getByText("Grado 7°")).toBeInTheDocument();
  });

  it("shows 'no results' message when search returns 0 results", async () => {
    mockSearchTopics.mockReturnValue([]);

    const user = userEvent.setup();
    render(<SearchBar />);

    const input = screen.getByPlaceholderText("Buscar temas...");
    await user.type(input, "xyznoexiste");

    expect(
      screen.getByText("No se encontraron temas relacionados")
    ).toBeInTheDocument();
  });

  it("navigates to topic page on result click", async () => {
    mockSearchTopics.mockReturnValue([
      {
        temaSlug: "numeros-naturales",
        temaTitulo: "Números Naturales",
        gradoId: "6",
        gradoNombre: "Grado 6°",
      },
    ]);

    const user = userEvent.setup();
    render(<SearchBar />);

    const input = screen.getByPlaceholderText("Buscar temas...");
    await user.type(input, "num");

    const resultButton = screen.getByText("Números Naturales");
    await user.click(resultButton);

    expect(mockPush).toHaveBeenCalledWith("/grado/6/numeros-naturales");
  });

  it("shows error message with retry option if search fails", async () => {
    mockSearchTopics.mockImplementation(() => {
      throw new Error("Search failed");
    });

    const user = userEvent.setup();
    render(<SearchBar />);

    const input = screen.getByPlaceholderText("Buscar temas...");
    await user.type(input, "test");

    expect(
      screen.getByText("Búsqueda no disponible temporalmente")
    ).toBeInTheDocument();
    expect(screen.getByText("Reintentar")).toBeInTheDocument();
  });

  it("retries search when clicking Reintentar button", async () => {
    // First make all calls fail
    mockSearchTopics.mockImplementation(() => {
      throw new Error("Search failed");
    });

    const user = userEvent.setup();
    render(<SearchBar />);

    const input = screen.getByPlaceholderText("Buscar temas...");
    await user.type(input, "test");

    // Verify error state
    expect(
      screen.getByText("Búsqueda no disponible temporalmente")
    ).toBeInTheDocument();

    // Now make the next call succeed
    mockSearchTopics.mockReturnValue([
      {
        temaSlug: "derivadas",
        temaTitulo: "Derivadas",
        gradoId: "11",
        gradoNombre: "Grado 11°",
      },
    ]);

    // Click retry
    const retryBtn = screen.getByText("Reintentar");
    await user.click(retryBtn);

    expect(screen.getByText("Derivadas")).toBeInTheDocument();
  });

  it("closes dropdown when clicking outside", async () => {
    mockSearchTopics.mockReturnValue([
      {
        temaSlug: "numeros-naturales",
        temaTitulo: "Números Naturales",
        gradoId: "6",
        gradoNombre: "Grado 6°",
      },
    ]);

    const user = userEvent.setup();
    render(
      <div>
        <SearchBar />
        <div data-testid="outside">Outside</div>
      </div>
    );

    const input = screen.getByPlaceholderText("Buscar temas...");
    await user.type(input, "num");

    expect(screen.getByText("Números Naturales")).toBeInTheDocument();

    // Click outside
    fireEvent.mouseDown(screen.getByTestId("outside"));

    expect(screen.queryByText("Números Naturales")).not.toBeInTheDocument();
  });

  it("hides results when input is cleared below 2 chars", async () => {
    mockSearchTopics.mockReturnValue([
      {
        temaSlug: "numeros-naturales",
        temaTitulo: "Números Naturales",
        gradoId: "6",
        gradoNombre: "Grado 6°",
      },
    ]);

    const user = userEvent.setup();
    render(<SearchBar />);

    const input = screen.getByPlaceholderText("Buscar temas...");
    await user.type(input, "num");
    expect(screen.getByText("Números Naturales")).toBeInTheDocument();

    // Clear the input
    await user.clear(input);
    expect(screen.queryByText("Números Naturales")).not.toBeInTheDocument();
  });
});
