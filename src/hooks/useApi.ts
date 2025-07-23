import { useState, useCallback } from "react";
import * as api from "../api/endpoints";
import {
  Movie,
  MoviesResponse,
  ProducersIntervals,
  StudiosWithWinCountResponse,
  YearWithMultipleWinnersResponse,
} from "../types";

export const useApi = () => {
  const [yearsWithMultipleWinners, setYearsWithMultipleWinners] =
    useState<YearWithMultipleWinnersResponse | null>(null);
  const [studiosWithWinCount, setStudiosWithWinCount] =
    useState<StudiosWithWinCountResponse | null>(null);
  const [producersIntervals, setProducersIntervals] =
    useState<ProducersIntervals | null>(null);
  const [winnersByYear, setWinnersByYear] = useState<Movie[]>([]);
  const [movies, setMovies] = useState<MoviesResponse | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchYearsWithMultipleWinners = useCallback(async () => {
    try {
      setLoading(true);

      const data = await api.getYearsWithMultipleWinners();
      setYearsWithMultipleWinners(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchStudiosWithWinCount = useCallback(async () => {
    try {
      setLoading(true);

      const data = await api.getStudiosWithWinCount();
      setStudiosWithWinCount(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProducersIntervals = useCallback(async () => {
    try {
      setLoading(true);

      const data = await api.getMaxMinWinIntervalForProducers();
      setProducersIntervals(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchWinnersByYear = async (year: number) => {
    try {
      setLoading(true);

      const data = await api.getWinnersByYear(year);
      setWinnersByYear(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const fetchMovies = useCallback(
    async (params: {
      page?: number;
      size?: number;
      year?: number;
      winner?: boolean;
    }) => {
      try {
        setLoading(true);

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
    yearsWithMultipleWinners,
    studiosWithWinCount,
    producersIntervals,
    winnersByYear,
    movies,
    loading,
    error,
    fetchYearsWithMultipleWinners,
    fetchStudiosWithWinCount,
    fetchProducersIntervals,
    fetchWinnersByYear,
    fetchMovies,
  };
};
