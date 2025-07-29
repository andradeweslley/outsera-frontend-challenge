import { useState, useCallback } from "react";
import * as api from "../api/endpoints";
import { MoviesResponse } from "../types";

/**
 * Custom hook for managing movies data
 * @returns Movies data state and fetch functions
 */
export const useMovies = () => {
  const [movies, setMovies] = useState<MoviesResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = useCallback(
    async (params: {
      page?: number;
      size?: number;
      year?: number;
      winner?: boolean;
    }) => {
      try {
        setLoading(true);
        setError(null);
        const data = await api.getMovies(params);
        setMovies(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    movies,
    loading,
    error,
    fetchMovies,
  };
};
