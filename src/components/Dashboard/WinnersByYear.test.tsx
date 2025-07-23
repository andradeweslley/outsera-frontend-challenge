import React from "react";
import { render } from "@testing-library/react";
import WinnersByYear from "./WinnersByYear";
import { Movie } from "../../types";

describe("WinnersByYear", () => {
  it("renders without crashing", () => {
    const mockData: Movie[] = [];
    const mockOnSearch = jest.fn();
    render(<WinnersByYear data={mockData} onSearch={mockOnSearch} />);
  });
});
