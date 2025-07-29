import { renderHook, act } from "@testing-library/react";
import { useMovies } from "./useMovies";
import * as api from "../api/endpoints";

jest.mock("../api/endpoints");
const mockApi = api as jest.Mocked<typeof api>;

describe("useMovies", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with default state", () => {
    const { result } = renderHook(() => useMovies());

    expect(result.current.movies).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should fetch movies successfully", async () => {
    const mockData = {
      content: [{ id: 1, year: 2020, title: "Test Movie", winner: true }],
      totalElements: 1,
      totalPages: 1,
      pageable: { pageNumber: 0, pageSize: 15 },
    };

    mockApi.getMovies.mockResolvedValue(mockData);

    const { result } = renderHook(() => useMovies());

    await act(async () => {
      await result.current.fetchMovies({ page: 0, size: 15 });
    });

    expect(result.current.movies).toEqual(mockData);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(mockApi.getMovies).toHaveBeenCalledWith({ page: 0, size: 15 });
  });

  it("should handle API errors", async () => {
    const error = new Error("API Error");
    mockApi.getMovies.mockRejectedValue(error);

    const { result } = renderHook(() => useMovies());

    await act(async () => {
      await result.current.fetchMovies({ page: 0, size: 15 });
    });

    expect(result.current.movies).toBeNull();
    expect(result.current.error).toBe("API Error");
    expect(result.current.loading).toBe(false);
  });

  it("should handle non-Error objects", async () => {
    mockApi.getMovies.mockRejectedValue("String error");

    const { result } = renderHook(() => useMovies());

    await act(async () => {
      await result.current.fetchMovies({ page: 0, size: 15 });
    });

    expect(result.current.error).toBe("An error occurred");
  });

  it("should set loading state during fetch", async () => {
    let resolvePromise: (value: any) => void;
    const promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });

    mockApi.getMovies.mockReturnValue(promise);

    const { result } = renderHook(() => useMovies());

    act(() => {
      result.current.fetchMovies({ page: 0, size: 15 });
    });

    expect(result.current.loading).toBe(true);

    await act(async () => {
      resolvePromise!({ content: [] });
    });

    expect(result.current.loading).toBe(false);
  });

  it("should handle fetch with filters", async () => {
    const mockData = { content: [] };
    mockApi.getMovies.mockResolvedValue(mockData);

    const { result } = renderHook(() => useMovies());

    await act(async () => {
      await result.current.fetchMovies({
        page: 1,
        size: 20,
        year: 2020,
        winner: true,
      });
    });

    expect(mockApi.getMovies).toHaveBeenCalledWith({
      page: 1,
      size: 20,
      year: 2020,
      winner: true,
    });
  });
});
