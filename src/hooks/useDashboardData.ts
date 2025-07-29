import { useState, useCallback } from "react";
import * as api from "../api/endpoints";
import {
  ProducersIntervals,
  StudiosWithWinCountResponse,
  YearWithMultipleWinnersResponse,
} from "../types";

/**
 * Custom hook for managing dashboard data
 * @returns Dashboard data state and fetch functions
 */
export const useDashboardData = () => {
  const [yearsWithMultipleWinners, setYearsWithMultipleWinners] =
    useState<YearWithMultipleWinnersResponse | null>(null);
  const [studiosWithWinCount, setStudiosWithWinCount] =
    useState<StudiosWithWinCountResponse | null>(null);
  const [producersIntervals, setProducersIntervals] =
    useState<ProducersIntervals | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchYearsWithMultipleWinners = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
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
      setError(null);
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
      setError(null);
      const data = await api.getMaxMinWinIntervalForProducers();
      setProducersIntervals(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    yearsWithMultipleWinners,
    studiosWithWinCount,
    producersIntervals,
    loading,
    error,
    fetchYearsWithMultipleWinners,
    fetchStudiosWithWinCount,
    fetchProducersIntervals,
  };
};
