import React, { useEffect } from "react";

import { Box, Grid } from "@mui/material";
import { useApi } from "../../hooks/useApi";
import MultiWinnerYears from "./MultiWinnerYears";
import ProducersIntervals from "./ProducersIntervals";
import StudiosWins from "./StudiosWins";
import WinnersByYear from "./WinnersByYear";

const Dashboard: React.FC = () => {
  const {
    yearsWithMultipleWinners,
    studiosWithWinCount,
    producersIntervals,
    winnersByYear,
    fetchYearsWithMultipleWinners,
    fetchStudiosWithWinCount,
    fetchProducersIntervals,
    fetchWinnersByYear,
  } = useApi();

  useEffect(() => {
    fetchYearsWithMultipleWinners();
    fetchStudiosWithWinCount();
    fetchProducersIntervals();
  }, [
    fetchYearsWithMultipleWinners,
    fetchStudiosWithWinCount,
    fetchProducersIntervals,
  ]);

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
          <WinnersByYear data={winnersByYear} onSearch={fetchWinnersByYear} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
