import { renderHook, act } from "@testing-library/react";
import { useDashboardData } from "./useDashboardData";
import * as api from "../api/endpoints";

jest.mock("../api/endpoints");
const mockApi = api as jest.Mocked<typeof api>;

describe("useDashboardData", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with default state", () => {
    const { result } = renderHook(() => useDashboardData());

    expect(result.current.yearsWithMultipleWinners).toBeNull();
    expect(result.current.studiosWithWinCount).toBeNull();
    expect(result.current.producersIntervals).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should fetch dashboard data successfully", async () => {
    const mockData = {
      years: [{ year: 2020, winnerCount: 2 }],
      studios: [{ name: "Studio A", winCount: 10 }],
      producers: { max: [], min: [] },
    };

    mockApi.getYearsWithMultipleWinners.mockResolvedValue(mockData.years);
    mockApi.getStudiosWithWinCount.mockResolvedValue(mockData.studios);
    mockApi.getMaxMinWinIntervalForProducers.mockResolvedValue(
      mockData.producers
    );

    const { result } = renderHook(() => useDashboardData());

    // Test all fetch functions
    await act(async () => {
      await result.current.fetchYearsWithMultipleWinners();
    });

    await act(async () => {
      await result.current.fetchStudiosWithWinCount();
    });

    await act(async () => {
      await result.current.fetchProducersIntervals();
    });

    expect(result.current.yearsWithMultipleWinners).toEqual(mockData.years);
    expect(result.current.studiosWithWinCount).toEqual(mockData.studios);
    expect(result.current.producersIntervals).toEqual(mockData.producers);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should handle API errors", async () => {
    const error = new Error("API Error");
    mockApi.getYearsWithMultipleWinners.mockRejectedValue(error);

    const { result } = renderHook(() => useDashboardData());

    await act(async () => {
      await result.current.fetchYearsWithMultipleWinners();
    });

    expect(result.current.error).toBe("API Error");
    expect(result.current.loading).toBe(false);
  });

  it("should handle non-Error objects", async () => {
    mockApi.getStudiosWithWinCount.mockRejectedValue("String error");

    const { result } = renderHook(() => useDashboardData());

    await act(async () => {
      await result.current.fetchStudiosWithWinCount();
    });

    expect(result.current.error).toBe("An error occurred");
  });

  it("should set loading state during fetch", async () => {
    let resolvePromise: (value: any) => void;
    const promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });
    mockApi.getYearsWithMultipleWinners.mockReturnValue(promise);

    const { result } = renderHook(() => useDashboardData());

    act(() => {
      result.current.fetchYearsWithMultipleWinners();
    });

    expect(result.current.loading).toBe(true);

    await act(async () => {
      resolvePromise!([{ year: 2020, winnerCount: 2 }]);
    });

    expect(result.current.loading).toBe(false);
  });
});
