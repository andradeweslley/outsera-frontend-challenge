import React, { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import { useDashboardData } from "../../hooks/useDashboardData";
import { useWinnersByYear } from "../../hooks/useWinnersByYear";
import MultiWinnerYears from "./MultiWinnerYears";
import ProducersIntervals from "./ProducersIntervals";
import StudiosWins from "./StudiosWins";
import WinnersByYear from "./WinnersByYear";
import LoadingSpinner from "../common/LoadingSpinner";
import ErrorMessage from "../common/ErrorMessage";

const Dashboard: React.FC = () => {
  const {
    yearsWithMultipleWinners,
    studiosWithWinCount,
    producersIntervals,
    loading: dashboardLoading,
    error: dashboardError,
    fetchYearsWithMultipleWinners,
    fetchStudiosWithWinCount,
    fetchProducersIntervals,
  } = useDashboardData();

  const {
    winnersByYear,
    loading: winnersLoading,
    error: winnersError,
    fetchWinnersByYear,
  } = useWinnersByYear();

  useEffect(() => {
    fetchYearsWithMultipleWinners();
    fetchStudiosWithWinCount();
    fetchProducersIntervals();
  }, [
    fetchYearsWithMultipleWinners,
    fetchStudiosWithWinCount,
    fetchProducersIntervals,
  ]);

  if (dashboardLoading) {
    return <LoadingSpinner message="Loading dashboard data..." />;
  }

  if (dashboardError) {
    return (
      <ErrorMessage
        message={dashboardError}
        onRetry={() => {
          fetchYearsWithMultipleWinners();
          fetchStudiosWithWinCount();
          fetchProducersIntervals();
        }}
      />
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={2}>
        <Grid size={6}>
          <MultiWinnerYears data={yearsWithMultipleWinners} />
        </Grid>
        <Grid size={6}>
          <StudiosWins data={studiosWithWinCount} />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid size={6}>
          <ProducersIntervals data={producersIntervals || undefined} />
        </Grid>
        <Grid size={6}>
          <WinnersByYear
            data={winnersByYear}
            onSearch={fetchWinnersByYear}
            loading={winnersLoading}
            error={winnersError}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
