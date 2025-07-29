import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import WinnersByYear from "./WinnersByYear";
import { Movie } from "../../types";

describe("WinnersByYear", () => {
  const mockOnSearch = jest.fn();
  const mockData: Movie[] = [
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
      year: 1986,
      winner: true,
      studios: ["Studio B"],
      producers: ["Producer B"],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the component with title", () => {
    render(<WinnersByYear data={mockData} onSearch={mockOnSearch} />);
    expect(screen.getByText("List movie winners by year")).toBeInTheDocument();
  });

  it("renders search input and button", () => {
    render(<WinnersByYear data={mockData} onSearch={mockOnSearch} />);
    expect(screen.getByLabelText("Search by year")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renders table headers correctly", () => {
    render(<WinnersByYear data={mockData} onSearch={mockOnSearch} />);
    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Year")).toBeInTheDocument();
    expect(screen.getByText("Title")).toBeInTheDocument();
  });

  it("renders movie data correctly", () => {
    render(<WinnersByYear data={mockData} onSearch={mockOnSearch} />);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("Movie A")).toBeInTheDocument();
    expect(screen.getAllByText("1986")).toHaveLength(2);
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("Movie B")).toBeInTheDocument();
  });

  it("calls onSearch when search button is clicked with valid year", () => {
    render(<WinnersByYear data={mockData} onSearch={mockOnSearch} />);

    const searchInput = screen.getByLabelText("Search by year");
    const searchButton = screen.getByRole("button");

    fireEvent.change(searchInput, { target: { value: "1986" } });
    fireEvent.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith(1986);
  });

  it("does not call onSearch when search button is clicked with empty input", () => {
    render(<WinnersByYear data={mockData} onSearch={mockOnSearch} />);

    const searchButton = screen.getByRole("button");
    fireEvent.click(searchButton);

    expect(mockOnSearch).not.toHaveBeenCalled();
  });

  it("handles empty data correctly", () => {
    render(<WinnersByYear data={[]} onSearch={mockOnSearch} />);
    expect(screen.getByText("No data available")).toBeInTheDocument();
  });

  it("handles null data correctly", () => {
    render(<WinnersByYear data={null} onSearch={mockOnSearch} />);
    // Should not show "No data available" when data is null
    expect(screen.queryByText("No data available")).not.toBeInTheDocument();
  });

  it("updates input value when typing", () => {
    render(<WinnersByYear data={mockData} onSearch={mockOnSearch} />);

    const searchInput = screen.getByLabelText("Search by year");
    fireEvent.change(searchInput, { target: { value: "2000" } });

    expect(searchInput).toHaveValue(2000);
  });

  it("handles decimal input correctly", () => {
    render(<WinnersByYear data={mockData} onSearch={mockOnSearch} />);

    const searchInput = screen.getByLabelText("Search by year");
    const searchButton = screen.getByRole("button");

    fireEvent.change(searchInput, { target: { value: "1986.5" } });
    fireEvent.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith(1986.5);
  });

  it("handles zero as input", () => {
    render(<WinnersByYear data={mockData} onSearch={mockOnSearch} />);

    const searchInput = screen.getByLabelText("Search by year");
    const searchButton = screen.getByRole("button");

    fireEvent.change(searchInput, { target: { value: "0" } });
    fireEvent.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith(0);
  });
});
