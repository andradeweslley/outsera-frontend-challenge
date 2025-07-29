import { renderHook, act } from "@testing-library/react";
import { useWinnersByYear } from "./useWinnersByYear";
import * as api from "../api/endpoints";

jest.mock("../api/endpoints");
const mockApi = api as jest.Mocked<typeof api>;

describe("useWinnersByYear", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with default state", () => {
    const { result } = renderHook(() => useWinnersByYear());

    expect(result.current.winnersByYear).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should fetch winners by year successfully", async () => {
    const mockData = [
      { id: 1, year: 2020, title: "Winner Movie 1", winner: true },
      { id: 2, year: 2020, title: "Winner Movie 2", winner: true },
    ];

    mockApi.getWinnersByYear.mockResolvedValue(mockData);

    const { result } = renderHook(() => useWinnersByYear());

    await act(async () => {
      await result.current.fetchWinnersByYear(2020);
    });

    expect(result.current.winnersByYear).toEqual(mockData);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(mockApi.getWinnersByYear).toHaveBeenCalledWith(2020);
  });

  it("should handle API errors", async () => {
    const error = new Error("API Error");
    mockApi.getWinnersByYear.mockRejectedValue(error);

    const { result } = renderHook(() => useWinnersByYear());

    await act(async () => {
      await result.current.fetchWinnersByYear(2020);
    });

    expect(result.current.winnersByYear).toEqual([]);
    expect(result.current.error).toBe("API Error");
    expect(result.current.loading).toBe(false);
  });

  it("should handle non-Error objects", async () => {
    mockApi.getWinnersByYear.mockRejectedValue("String error");

    const { result } = renderHook(() => useWinnersByYear());

    await act(async () => {
      await result.current.fetchWinnersByYear(2020);
    });

    expect(result.current.error).toBe("An error occurred");
  });

  it("should set loading state during fetch", async () => {
    let resolvePromise: (value: any) => void;
    const promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });

    mockApi.getWinnersByYear.mockReturnValue(promise);

    const { result } = renderHook(() => useWinnersByYear());

    act(() => {
      result.current.fetchWinnersByYear(2020);
    });

    expect(result.current.loading).toBe(true);

    await act(async () => {
      resolvePromise!([{ id: 1, year: 2020, title: "Test", winner: true }]);
    });

    expect(result.current.loading).toBe(false);
  });

  it("should handle different years", async () => {
    const mockData = [{ id: 1, year: 2019, title: "Test", winner: true }];
    mockApi.getWinnersByYear.mockResolvedValue(mockData);

    const { result } = renderHook(() => useWinnersByYear());

    await act(async () => {
      await result.current.fetchWinnersByYear(2019);
    });

    expect(mockApi.getWinnersByYear).toHaveBeenCalledWith(2019);
  });
});
