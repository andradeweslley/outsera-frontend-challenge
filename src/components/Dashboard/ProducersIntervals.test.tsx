import React from "react";
import { render, screen } from "@testing-library/react";
import ProducersIntervals from "./ProducersIntervals";
import { ProducersIntervals as ProducersIntervalsType } from "../../types";

describe("ProducersIntervals", () => {
  const mockData: ProducersIntervalsType = {
    min: [
      {
        producer: "Producer A",
        interval: 1,
        previousWin: 1980,
        followingWin: 1981,
      },
      {
        producer: "Producer B",
        interval: 2,
        previousWin: 1985,
        followingWin: 1987,
      },
    ],
    max: [
      {
        producer: "Producer C",
        interval: 10,
        previousWin: 1980,
        followingWin: 1990,
      },
      {
        producer: "Producer D",
        interval: 8,
        previousWin: 1990,
        followingWin: 1998,
      },
    ],
  };

  it("renders the component with title", () => {
    render(<ProducersIntervals data={mockData} />);
    expect(
      screen.getByText(
        "Producers with longest and shortest interval between wins"
      )
    ).toBeInTheDocument();
  });

  it("renders maximum section with title", () => {
    render(<ProducersIntervals data={mockData} />);
    expect(screen.getByText("Maximum")).toBeInTheDocument();
  });

  it("renders minimum section with title", () => {
    render(<ProducersIntervals data={mockData} />);
    expect(screen.getByText("Minimum")).toBeInTheDocument();
  });

  it("renders table headers correctly", () => {
    render(<ProducersIntervals data={mockData} />);

    // Check for table headers (they appear multiple times for max and min sections)
    const producerHeaders = screen.getAllByText("Producer");
    const intervalHeaders = screen.getAllByText("Interval");
    const previousYearHeaders = screen.getAllByText("Previous Year");
    const followingYearHeaders = screen.getAllByText("Following Year");

    expect(producerHeaders).toHaveLength(2); // One for max, one for min
    expect(intervalHeaders).toHaveLength(2);
    expect(previousYearHeaders).toHaveLength(2);
    expect(followingYearHeaders).toHaveLength(2);
  });

  it("renders maximum interval data correctly", () => {
    render(<ProducersIntervals data={mockData} />);

    expect(screen.getByText("Producer C")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getAllByText("1980")).toHaveLength(2); // One in max, one in min
    expect(screen.getAllByText("1990")).toHaveLength(2); // One in max, one in min

    expect(screen.getByText("Producer D")).toBeInTheDocument();
    expect(screen.getByText("8")).toBeInTheDocument();
    expect(screen.getByText("1998")).toBeInTheDocument();
  });

  it("renders minimum interval data correctly", () => {
    render(<ProducersIntervals data={mockData} />);

    expect(screen.getByText("Producer A")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getAllByText("1980")).toHaveLength(2); // One in max, one in min
    expect(screen.getByText("1981")).toBeInTheDocument();

    expect(screen.getByText("Producer B")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("1985")).toBeInTheDocument();
    expect(screen.getByText("1987")).toBeInTheDocument();
  });

  it("handles empty data correctly", () => {
    const emptyData: ProducersIntervalsType = {
      min: [],
      max: [],
    };

    render(<ProducersIntervals data={emptyData} />);

    expect(
      screen.getByText(
        "Producers with longest and shortest interval between wins"
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Maximum")).toBeInTheDocument();
    expect(screen.getByText("Minimum")).toBeInTheDocument();

    // Should still show table headers but no data rows
    const producerHeaders = screen.getAllByText("Producer");
    expect(producerHeaders).toHaveLength(2);
  });

  it("handles undefined data correctly", () => {
    render(<ProducersIntervals data={undefined} />);

    expect(
      screen.getByText(
        "Producers with longest and shortest interval between wins"
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Maximum")).toBeInTheDocument();
    expect(screen.getByText("Minimum")).toBeInTheDocument();

    // Should still show table headers but no data rows
    const producerHeaders = screen.getAllByText("Producer");
    expect(producerHeaders).toHaveLength(2);
  });

  it("handles data with only maximum intervals", () => {
    const dataWithOnlyMax: ProducersIntervalsType = {
      min: [],
      max: [
        {
          producer: "Producer C",
          interval: 10,
          previousWin: 1980,
          followingWin: 1990,
        },
      ],
    };

    render(<ProducersIntervals data={dataWithOnlyMax} />);

    expect(screen.getByText("Producer C")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("1980")).toBeInTheDocument();
    expect(screen.getByText("1990")).toBeInTheDocument();
  });

  it("handles data with only minimum intervals", () => {
    const dataWithOnlyMin: ProducersIntervalsType = {
      min: [
        {
          producer: "Producer A",
          interval: 1,
          previousWin: 1980,
          followingWin: 1981,
        },
      ],
      max: [],
    };

    render(<ProducersIntervals data={dataWithOnlyMin} />);

    expect(screen.getByText("Producer A")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("1980")).toBeInTheDocument();
    expect(screen.getByText("1981")).toBeInTheDocument();
  });
});
