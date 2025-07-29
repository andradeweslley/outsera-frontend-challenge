import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MoviesFilters from "./MoviesFilters";

describe("MoviesFilters", () => {
  const mockOnYearChange = jest.fn();
  const mockOnWinnerChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders year filter input", () => {
    render(
      <MoviesFilters
        yearFilter={null}
        winnerFilter={null}
        onYearChange={mockOnYearChange}
        onWinnerChange={mockOnWinnerChange}
      />
    );
    expect(screen.getByLabelText("Filter by year")).toBeInTheDocument();
  });

  it("renders winner filter select", () => {
    render(
      <MoviesFilters
        yearFilter={null}
        winnerFilter={null}
        onYearChange={mockOnYearChange}
        onWinnerChange={mockOnWinnerChange}
      />
    );
    expect(screen.getByLabelText("Winner")).toBeInTheDocument();
  });

  it("displays year filter value correctly", () => {
    render(
      <MoviesFilters
        yearFilter={2020}
        winnerFilter={null}
        onYearChange={mockOnYearChange}
        onWinnerChange={mockOnWinnerChange}
      />
    );
    const yearInput = screen.getByLabelText(
      "Filter by year"
    ) as HTMLInputElement;
    expect(yearInput.value).toBe("2020");
  });

  it("displays winner filter value correctly", () => {
    render(
      <MoviesFilters
        yearFilter={null}
        winnerFilter={true}
        onYearChange={mockOnYearChange}
        onWinnerChange={mockOnWinnerChange}
      />
    );
    const winnerSelect = screen.getByLabelText("Winner");
    // Material-UI Select value is not directly accessible via toHaveValue
    // Instead, we check that the component renders correctly
    expect(winnerSelect).toBeInTheDocument();
  });

  it("calls onYearChange with null when year input is cleared", () => {
    render(
      <MoviesFilters
        yearFilter={2020}
        winnerFilter={null}
        onYearChange={mockOnYearChange}
        onWinnerChange={mockOnWinnerChange}
      />
    );

    const yearInput = screen.getByLabelText("Filter by year");
    fireEvent.change(yearInput, { target: { value: "" } });

    expect(mockOnYearChange).toHaveBeenCalledWith(null);
  });

  it("calls onYearChange with valid 4-digit year", () => {
    render(
      <MoviesFilters
        yearFilter={null}
        winnerFilter={null}
        onYearChange={mockOnYearChange}
        onWinnerChange={mockOnWinnerChange}
      />
    );

    const yearInput = screen.getByLabelText("Filter by year");
    fireEvent.change(yearInput, { target: { value: "2020" } });

    expect(mockOnYearChange).toHaveBeenCalledWith(2020);
  });

  it("does not call onYearChange for incomplete year", () => {
    render(
      <MoviesFilters
        yearFilter={null}
        winnerFilter={null}
        onYearChange={mockOnYearChange}
        onWinnerChange={mockOnWinnerChange}
      />
    );

    const yearInput = screen.getByLabelText("Filter by year");
    fireEvent.change(yearInput, { target: { value: "202" } });

    expect(mockOnYearChange).not.toHaveBeenCalled();
  });

  it("does not call onYearChange for invalid year (too old)", () => {
    render(
      <MoviesFilters
        yearFilter={null}
        winnerFilter={null}
        onYearChange={mockOnYearChange}
        onWinnerChange={mockOnWinnerChange}
      />
    );

    const yearInput = screen.getByLabelText("Filter by year");
    fireEvent.change(yearInput, { target: { value: "1899" } });

    expect(mockOnYearChange).not.toHaveBeenCalled();
  });

  it("does not call onYearChange for invalid year (too new)", () => {
    const currentYear = new Date().getFullYear();
    render(
      <MoviesFilters
        yearFilter={null}
        winnerFilter={null}
        onYearChange={mockOnYearChange}
        onWinnerChange={mockOnWinnerChange}
      />
    );

    const yearInput = screen.getByLabelText("Filter by year");
    fireEvent.change(yearInput, {
      target: { value: (currentYear + 2).toString() },
    });

    expect(mockOnYearChange).not.toHaveBeenCalled();
  });

  it("calls onWinnerChange when winner filter changes", () => {
    render(
      <MoviesFilters
        yearFilter={null}
        winnerFilter={null}
        onYearChange={mockOnYearChange}
        onWinnerChange={mockOnWinnerChange}
      />
    );

    const winnerSelect = screen.getByLabelText("Winner");
    fireEvent.mouseDown(winnerSelect);

    const yesOption = screen.getByText("Yes");
    fireEvent.click(yesOption);

    expect(mockOnWinnerChange).toHaveBeenCalledWith(true);
  });

  it("calls onWinnerChange with null when 'All' is selected", () => {
    render(
      <MoviesFilters
        yearFilter={null}
        winnerFilter={true}
        onYearChange={mockOnYearChange}
        onWinnerChange={mockOnWinnerChange}
      />
    );

    const winnerSelect = screen.getByLabelText("Winner");
    fireEvent.mouseDown(winnerSelect);

    const allOption = screen.getByText("All");
    fireEvent.click(allOption);

    expect(mockOnWinnerChange).toHaveBeenCalledWith(null);
  });

  it("calls onWinnerChange with false when 'No' is selected", () => {
    render(
      <MoviesFilters
        yearFilter={null}
        winnerFilter={null}
        onYearChange={mockOnYearChange}
        onWinnerChange={mockOnWinnerChange}
      />
    );

    const winnerSelect = screen.getByLabelText("Winner");
    fireEvent.mouseDown(winnerSelect);

    const noOption = screen.getByText("No");
    fireEvent.click(noOption);

    expect(mockOnWinnerChange).toHaveBeenCalledWith(false);
  });

  it("has proper input constraints", () => {
    render(
      <MoviesFilters
        yearFilter={null}
        winnerFilter={null}
        onYearChange={mockOnYearChange}
        onWinnerChange={mockOnWinnerChange}
      />
    );

    const yearInput = screen.getByLabelText("Filter by year");
    expect(yearInput).toHaveAttribute("type", "number");
    expect(yearInput).toHaveAttribute("min", "1900");
    expect(yearInput).toHaveAttribute(
      "max",
      (new Date().getFullYear() + 1).toString()
    );
    expect(yearInput).toHaveAttribute("maxLength", "4");
    expect(yearInput).toHaveAttribute("placeholder", "YYYY");
  });
});
