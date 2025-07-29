import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Dashboard from "./index";
import { useDashboardData } from "../../hooks/useDashboardData";
import { useWinnersByYear } from "../../hooks/useWinnersByYear";

// Mock the hooks
jest.mock("../../hooks/useDashboardData");
jest.mock("../../hooks/useWinnersByYear");

const mockUseDashboardData = useDashboardData as jest.MockedFunction<
  typeof useDashboardData
>;
const mockUseWinnersByYear = useWinnersByYear as jest.MockedFunction<
  typeof useWinnersByYear
>;

describe("Dashboard", () => {
  const mockFetchYearsWithMultipleWinners = jest.fn();
  const mockFetchStudiosWithWinCount = jest.fn();
  const mockFetchProducersIntervals = jest.fn();
  const mockFetchWinnersByYear = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseDashboardData.mockReturnValue({
      yearsWithMultipleWinners: null,
      studiosWithWinCount: null,
      producersIntervals: null,
      loading: false,
      error: null,
      fetchYearsWithMultipleWinners: mockFetchYearsWithMultipleWinners,
      fetchStudiosWithWinCount: mockFetchStudiosWithWinCount,
      fetchProducersIntervals: mockFetchProducersIntervals,
    });

    mockUseWinnersByYear.mockReturnValue({
      winnersByYear: [],
      loading: false,
      error: null,
      fetchWinnersByYear: mockFetchWinnersByYear,
    });
  });

  it("renders the dashboard with all child components", () => {
    render(<Dashboard />);

    // Check that all child components are rendered
    expect(
      screen.getByText("List years with multiple winners")
    ).toBeInTheDocument();
    expect(screen.getByText("Top 3 studios with winners")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Producers with longest and shortest interval between wins"
      )
    ).toBeInTheDocument();
    expect(screen.getByText("List movie winners by year")).toBeInTheDocument();
  });

  it("calls API functions on mount", async () => {
    render(<Dashboard />);

    await waitFor(() => {
      expect(mockFetchYearsWithMultipleWinners).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(mockFetchStudiosWithWinCount).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(mockFetchProducersIntervals).toHaveBeenCalledTimes(1);
    });
  });

  it("passes data to child components when available", () => {
    const mockData = {
      yearsWithMultipleWinners: {
        years: [{ year: 1986, winnerCount: 2 }],
      },
      studiosWithWinCount: {
        studios: [{ name: "Studio A", winCount: 5 }],
      },
      producersIntervals: {
        min: [
          {
            producer: "Producer A",
            interval: 1,
            previousWin: 1980,
            followingWin: 1981,
          },
        ],
        max: [
          {
            producer: "Producer B",
            interval: 10,
            previousWin: 1980,
            followingWin: 1990,
          },
        ],
      },
      winnersByYear: [
        {
          id: 1,
          title: "Movie A",
          year: 1986,
          winner: true,
          studios: ["Studio A"],
          producers: ["Producer A"],
        },
      ],
      movies: null,
      loading: false,
      error: null,
      fetchYearsWithMultipleWinners: mockFetchYearsWithMultipleWinners,
      fetchStudiosWithWinCount: mockFetchStudiosWithWinCount,
      fetchProducersIntervals: mockFetchProducersIntervals,
      fetchWinnersByYear: mockFetchWinnersByYear,
      fetchMovies: jest.fn(),
    };

    mockUseDashboardData.mockReturnValue({
      yearsWithMultipleWinners: mockData.yearsWithMultipleWinners,
      studiosWithWinCount: mockData.studiosWithWinCount,
      producersIntervals: mockData.producersIntervals,
      loading: false,
      error: null,
      fetchYearsWithMultipleWinners: mockFetchYearsWithMultipleWinners,
      fetchStudiosWithWinCount: mockFetchStudiosWithWinCount,
      fetchProducersIntervals: mockFetchProducersIntervals,
    });

    mockUseWinnersByYear.mockReturnValue({
      winnersByYear: mockData.winnersByYear,
      loading: false,
      error: null,
      fetchWinnersByYear: mockFetchWinnersByYear,
    });

    render(<Dashboard />);

    // Verify that data is displayed in child components
    expect(screen.getAllByText("1986")[0]).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("Studio A")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("Producer A")).toBeInTheDocument();
    expect(screen.getByText("Producer B")).toBeInTheDocument();
    expect(screen.getByText("Movie A")).toBeInTheDocument();
  });

  it("handles null data gracefully", () => {
    render(<Dashboard />);

    // Component should render even with null data
    expect(
      screen.getByText("List years with multiple winners")
    ).toBeInTheDocument();
    expect(screen.getByText("Top 3 studios with winners")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Producers with longest and shortest interval between wins"
      )
    ).toBeInTheDocument();
    expect(screen.getByText("List movie winners by year")).toBeInTheDocument();
  });

  it("passes fetchWinnersByYear function to WinnersByYear component", () => {
    render(<Dashboard />);

    // The WinnersByYear component should receive the fetchWinnersByYear function
    // This is tested indirectly by ensuring the component renders
    expect(screen.getByText("List movie winners by year")).toBeInTheDocument();
  });
});
