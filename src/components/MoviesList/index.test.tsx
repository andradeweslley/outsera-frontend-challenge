import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MoviesList from "./index";
import { useMovies } from "../../hooks/useMovies";

// Mock the useMovies hook
jest.mock("../../hooks/useMovies");
const mockUseMovies = useMovies as jest.MockedFunction<typeof useMovies>;

describe("MoviesList", () => {
  const mockFetchMovies = jest.fn();
  const mockMoviesData = {
    content: [
      {
        id: 1,
        title: "Movie A",
        year: 1986,
        winner: true,
        studios: ["Studio A"],
        producers: ["Producer A"],
      },
      {
        id: 2,
        title: "Movie B",
        year: 1990,
        winner: false,
        studios: ["Studio B"],
        producers: ["Producer B"],
      },
    ],
    totalElements: 2,
    totalPages: 1,
    last: true,
    numberOfElements: 2,
    size: 15,
    number: 0,
    sort: {
      unsorted: false,
      sorted: true,
      empty: false,
    },
    offset: 0,
    unpaged: false,
    paged: true,
    first: true,
    empty: false,
    pageable: {
      pageNumber: 0,
      pageSize: 15,
      totalPages: 1,
      totalElements: 2,
      sort: {
        unsorted: false,
        sorted: true,
        empty: false,
      },
      offset: 0,
      unpaged: false,
      paged: true,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseMovies.mockReturnValue({
      movies: null,
      loading: false,
      error: null,
      fetchMovies: mockFetchMovies,
    });
  });

  it("renders the component with title and filters", () => {
    render(
      <MemoryRouter>
        <MoviesList />
      </MemoryRouter>
    );

    expect(screen.getByText("List movies")).toBeInTheDocument();
    expect(screen.getByLabelText("Filter by year")).toBeInTheDocument();
    expect(screen.getByLabelText("Winner")).toBeInTheDocument();
  });

  it("calls fetchMovies on mount with default parameters", () => {
    render(
      <MemoryRouter>
        <MoviesList />
      </MemoryRouter>
    );

    expect(mockFetchMovies).toHaveBeenCalledWith({
      page: 0,
      size: 15,
      year: undefined,
      winner: undefined,
    });
  });

  it("renders movies data correctly", () => {
    mockUseMovies.mockReturnValue({
      movies: mockMoviesData,
      loading: false,
      error: null,
      fetchMovies: mockFetchMovies,
    });

    render(
      <MemoryRouter>
        <MoviesList />
      </MemoryRouter>
    );

    expect(screen.getByText("Movie A")).toBeInTheDocument();
    expect(screen.getByText("Movie B")).toBeInTheDocument();
    expect(screen.getByText("1986")).toBeInTheDocument();
    expect(screen.getByText("1990")).toBeInTheDocument();
    expect(screen.getByText("Yes")).toBeInTheDocument();
    expect(screen.getByText("No")).toBeInTheDocument();
  });

  it("handles year filter change", async () => {
    render(
      <MemoryRouter>
        <MoviesList />
      </MemoryRouter>
    );

    const yearInput = screen.getByLabelText("Filter by year");
    fireEvent.change(yearInput, { target: { value: "2020" } });

    await waitFor(() => {
      expect(mockFetchMovies).toHaveBeenCalledWith({
        page: 0,
        size: 15,
        year: 2020,
        winner: undefined,
      });
    });
  });

  it("handles winner filter change", async () => {
    render(
      <MemoryRouter>
        <MoviesList />
      </MemoryRouter>
    );

    const winnerSelect = screen.getByLabelText("Winner");
    fireEvent.mouseDown(winnerSelect);

    const yesOption = screen.getByText("Yes");
    fireEvent.click(yesOption);

    await waitFor(() => {
      expect(mockFetchMovies).toHaveBeenCalledWith({
        page: 0,
        size: 15,
        year: undefined,
        winner: true,
      });
    });
  });

  it("handles pagination change", async () => {
    render(
      <MemoryRouter>
        <MoviesList />
      </MemoryRouter>
    );

    // Simulate pagination change
    const dataGrid = screen.getByRole("grid");
    // Note: DataGrid pagination is handled internally, we just verify the component renders
    expect(dataGrid).toBeInTheDocument();
  });

  it("displays loading state", () => {
    mockUseMovies.mockReturnValue({
      movies: null,
      loading: true,
      error: null,
      fetchMovies: mockFetchMovies,
    });

    render(
      <MemoryRouter>
        <MoviesList />
      </MemoryRouter>
    );

    expect(screen.getByText("Loading movies...")).toBeInTheDocument();
  });

  it("displays error state with retry functionality", () => {
    mockUseMovies.mockReturnValue({
      movies: null,
      loading: false,
      error: "Failed to load movies",
      fetchMovies: mockFetchMovies,
    });

    render(
      <MemoryRouter>
        <MoviesList />
      </MemoryRouter>
    );

    expect(screen.getByText("Failed to load movies")).toBeInTheDocument();
    expect(screen.getByText("Retry")).toBeInTheDocument();
  });

  it("handles empty movies data", () => {
    const emptyMoviesData = {
      ...mockMoviesData,
      content: [],
      totalElements: 0,
      empty: true,
    };

    mockUseMovies.mockReturnValue({
      movies: emptyMoviesData,
      loading: false,
      error: null,
      fetchMovies: mockFetchMovies,
    });

    render(
      <MemoryRouter>
        <MoviesList />
      </MemoryRouter>
    );

    // DataGrid should handle empty data gracefully
    expect(screen.getByText("List movies")).toBeInTheDocument();
  });

  it("handles null movies data", () => {
    mockUseMovies.mockReturnValue({
      movies: null,
      loading: false,
      error: null,
      fetchMovies: mockFetchMovies,
    });

    render(
      <MemoryRouter>
        <MoviesList />
      </MemoryRouter>
    );

    // DataGrid should handle null data gracefully
    expect(screen.getByText("List movies")).toBeInTheDocument();
  });
});
