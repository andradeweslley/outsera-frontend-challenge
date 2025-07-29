import { useState, useCallback } from "react";
import * as api from "../api/endpoints";
import { Movie } from "../types";

/**
 * Custom hook for managing winners by year data
 * @returns Winners by year state and fetch function
 */
export const useWinnersByYear = () => {
  const [winnersByYear, setWinnersByYear] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWinnersByYear = useCallback(async (year: number) => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getWinnersByYear(year);
      setWinnersByYear(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    winnersByYear,
    loading,
    error,
    fetchWinnersByYear,
  };
};
