import * as endpoints from "./endpoints";
import apiClient from "./client";

// Mock the apiClient module
jest.mock("./client", () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

const mockApiClient = apiClient as jest.Mocked<typeof apiClient>;

describe("API Endpoints", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getYearsWithMultipleWinners", () => {
    it("should call the correct endpoint and return data", async () => {
      const mockResponse = {
        data: {
          years: [
            { year: 1986, winnerCount: 2 },
            { year: 1990, winnerCount: 3 },
          ],
        },
      };
      mockApiClient.get.mockResolvedValue(mockResponse);

      const result = await endpoints.getYearsWithMultipleWinners();

      expect(mockApiClient.get).toHaveBeenCalledWith(
        "/movies/yearsWithMultipleWinners"
      );
      expect(result).toEqual(mockResponse.data);
    });

    it("should handle errors", async () => {
      const error = new Error("API Error");
      mockApiClient.get.mockRejectedValue(error);

      await expect(endpoints.getYearsWithMultipleWinners()).rejects.toThrow(
        "API Error"
      );
    });
  });

  describe("getStudiosWithWinCount", () => {
    it("should call the correct endpoint and return data", async () => {
      const mockResponse = {
        data: {
          studios: [
            { name: "Studio A", winCount: 5 },
            { name: "Studio B", winCount: 3 },
          ],
        },
      };
      mockApiClient.get.mockResolvedValue(mockResponse);

      const result = await endpoints.getStudiosWithWinCount();

      expect(mockApiClient.get).toHaveBeenCalledWith(
        "/movies/studiosWithWinCount"
      );
      expect(result).toEqual(mockResponse.data);
    });

    it("should handle errors", async () => {
      const error = new Error("API Error");
      mockApiClient.get.mockRejectedValue(error);

      await expect(endpoints.getStudiosWithWinCount()).rejects.toThrow(
        "API Error"
      );
    });
  });

  describe("getMaxMinWinIntervalForProducers", () => {
    it("should call the correct endpoint and return data", async () => {
      const mockResponse = {
        data: {
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
      };
      mockApiClient.get.mockResolvedValue(mockResponse);

      const result = await endpoints.getMaxMinWinIntervalForProducers();

      expect(mockApiClient.get).toHaveBeenCalledWith(
        "/movies/maxMinWinIntervalForProducers"
      );
      expect(result).toEqual(mockResponse.data);
    });

    it("should handle errors", async () => {
      const error = new Error("API Error");
      mockApiClient.get.mockRejectedValue(error);

      await expect(
        endpoints.getMaxMinWinIntervalForProducers()
      ).rejects.toThrow("API Error");
    });
  });

  describe("getWinnersByYear", () => {
    it("should call the correct endpoint with year parameter and return data", async () => {
      const mockResponse = {
        data: [
          {
            id: 1,
            title: "Movie A",
            year: 1986,
            winner: true,
            studios: ["Studio A"],
            producers: ["Producer A"],
          },
        ],
      };
      mockApiClient.get.mockResolvedValue(mockResponse);

      const result = await endpoints.getWinnersByYear(1986);

      expect(mockApiClient.get).toHaveBeenCalledWith(
        "/movies/winnersByYear?year=1986"
      );
      expect(result).toEqual(mockResponse.data);
    });

    it("should handle errors", async () => {
      const error = new Error("API Error");
      mockApiClient.get.mockRejectedValue(error);

      await expect(endpoints.getWinnersByYear(1986)).rejects.toThrow(
        "API Error"
      );
    });
  });

  describe("getMovies", () => {
    it("should call the correct endpoint with params and return data", async () => {
      const mockResponse = {
        data: {
          content: [
            {
              id: 1,
              title: "Movie A",
              year: 1986,
              winner: true,
              studios: ["Studio A"],
              producers: ["Producer A"],
            },
          ],
          totalElements: 1,
          totalPages: 1,
          pageable: {
            pageNumber: 0,
            pageSize: 15,
          },
        },
      };
      mockApiClient.get.mockResolvedValue(mockResponse);

      const params = {
        page: 0,
        size: 15,
        year: 1986,
        winner: true,
      };

      const result = await endpoints.getMovies(params);

      expect(mockApiClient.get).toHaveBeenCalledWith("/movies", { params });
      expect(result).toEqual(mockResponse.data);
    });

    it("should handle partial params", async () => {
      const mockResponse = { data: { content: [], totalElements: 0 } };
      mockApiClient.get.mockResolvedValue(mockResponse);

      const params = { page: 0 };

      await endpoints.getMovies(params);

      expect(mockApiClient.get).toHaveBeenCalledWith("/movies", { params });
    });

    it("should handle errors", async () => {
      const error = new Error("API Error");
      mockApiClient.get.mockRejectedValue(error);

      await expect(endpoints.getMovies({})).rejects.toThrow("API Error");
    });
  });
});
