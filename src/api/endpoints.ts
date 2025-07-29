import apiClient from "./client";

/**
 * Fetches years that had multiple winners
 * @returns Promise with years data containing multiple winners
 */
export const getYearsWithMultipleWinners = async () => {
  const response = await apiClient.get("/movies/yearsWithMultipleWinners");
  return response.data;
};

/**
 * Fetches studios with their win counts
 * @returns Promise with studios data and win counts
 */
export const getStudiosWithWinCount = async () => {
  const response = await apiClient.get("/movies/studiosWithWinCount");
  return response.data;
};

/**
 * Fetches producers with maximum and minimum intervals between wins
 * @returns Promise with producer intervals data
 */
export const getMaxMinWinIntervalForProducers = async () => {
  const response = await apiClient.get("/movies/maxMinWinIntervalForProducers");
  return response.data;
};

/**
 * Fetches winners for a specific year
 * @param year - The year to search for winners
 * @returns Promise with winners data for the specified year
 */
export const getWinnersByYear = async (year: number) => {
  const response = await apiClient.get(`/movies/winnersByYear?year=${year}`);
  return response.data;
};

/**
 * Fetches movies with pagination and filtering
 * @param params - Object containing pagination and filter parameters
 * @returns Promise with paginated movies data
 */
export const getMovies = async (params: {
  page?: number;
  size?: number;
  year?: number;
  winner?: boolean;
}) => {
  const response = await apiClient.get("/movies", { params });
  return response.data;
};
