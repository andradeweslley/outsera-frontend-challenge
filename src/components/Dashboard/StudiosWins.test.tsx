import React from "react";
import { render, screen } from "@testing-library/react";
import StudiosWins from "./StudiosWins";
import { StudiosWithWinCountResponse } from "../../types";

describe("StudiosWins", () => {
  const mockData: StudiosWithWinCountResponse = {
    studios: [
      { name: "Studio A", winCount: 5 },
      { name: "Studio B", winCount: 10 },
      { name: "Studio C", winCount: 3 },
      { name: "Studio D", winCount: 8 },
    ],
  };

  it("renders the component with title", () => {
    render(<StudiosWins data={mockData} />);
    expect(screen.getByText("Top 3 studios with winners")).toBeInTheDocument();
  });

  it("renders the component with data and shows top 3 studios sorted by win count", () => {
    render(<StudiosWins data={mockData} />);

    // Should show top 3 studios sorted by win count (descending)
    expect(screen.getByText("Studio B")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("Studio D")).toBeInTheDocument();
    expect(screen.getByText("8")).toBeInTheDocument();
    expect(screen.getByText("Studio A")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();

    // Should not show Studio C (4th place)
    expect(screen.queryByText("Studio C")).not.toBeInTheDocument();
    expect(screen.queryByText("3")).not.toBeInTheDocument();
  });

  it("renders table headers correctly", () => {
    render(<StudiosWins data={mockData} />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Win Count")).toBeInTheDocument();
  });

  it("renders the component with empty data", () => {
    render(<StudiosWins data={null} />);
    expect(screen.getByText("Top 3 studios with winners")).toBeInTheDocument();
    expect(screen.getByText("No data available")).toBeInTheDocument();
  });

  it("renders the component with empty studios array", () => {
    render(<StudiosWins data={{ studios: [] }} />);
    expect(screen.getByText("Top 3 studios with winners")).toBeInTheDocument();
    expect(screen.getByText("No data available")).toBeInTheDocument();
  });

  it("handles studios with same win count correctly", () => {
    const dataWithSameWinCount: StudiosWithWinCountResponse = {
      studios: [
        { name: "Studio A", winCount: 5 },
        { name: "Studio B", winCount: 5 },
        { name: "Studio C", winCount: 3 },
      ],
    };

    render(<StudiosWins data={dataWithSameWinCount} />);

    // Should show both studios with win count 5
    expect(screen.getByText("Studio A")).toBeInTheDocument();
    expect(screen.getByText("Studio B")).toBeInTheDocument();
    expect(screen.getAllByText("5")).toHaveLength(2);
  });

  it("handles less than 3 studios correctly", () => {
    const dataWithLessThan3: StudiosWithWinCountResponse = {
      studios: [
        { name: "Studio A", winCount: 5 },
        { name: "Studio B", winCount: 3 },
      ],
    };

    render(<StudiosWins data={dataWithLessThan3} />);

    expect(screen.getByText("Studio A")).toBeInTheDocument();
    expect(screen.getByText("Studio B")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });
});
