import apiClient from "./client";

export const getYearsWithMultipleWinners = async () => {
  const response = await apiClient.get("/movies/yearsWithMultipleWinners");
  return response.data;
};

export const getStudiosWithWinCount = async () => {
  const response = await apiClient.get("/movies/studiosWithWinCount");
  return response.data;
};

export const getMaxMinWinIntervalForProducers = async () => {
  const response = await apiClient.get("/movies/maxMinWinIntervalForProducers");
  return response.data;
};

export const getWinnersByYear = async (year: number) => {
  const response = await apiClient.get(`/movies/winnersByYear?year=${year}`);
  return response.data;
};

export const getMovies = async (params: {
  page?: number;
  size?: number;
  year?: number;
  winner?: boolean;
}) => {
  const response = await apiClient.get("/movies", { params });
  return response.data;
};
