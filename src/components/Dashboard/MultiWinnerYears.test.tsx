import React from "react";

import { render, screen } from "@testing-library/react";
import MultiWinnerYears from "./MultiWinnerYears";
import { YearWithMultipleWinnersResponse } from "../../types";

describe("MultiWinnerYears", () => {
  const mockData: YearWithMultipleWinnersResponse = {
    years: [
      { year: 1986, winnerCount: 2 },
      { year: 1990, winnerCount: 3 },
    ],
  };

  it("renders the component with data", () => {
    render(<MultiWinnerYears data={mockData} />);

    expect(screen.getByText("Years with multiple winners")).toBeInTheDocument();
    expect(screen.getByText("1986")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("1990")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("renders the component with empty data", () => {
    render(<MultiWinnerYears data={null} />);

    expect(screen.getByText("Years with multiple winners")).toBeInTheDocument();
    expect(screen.queryByText("1986")).not.toBeInTheDocument();
  });
});
