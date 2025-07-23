import React from "react";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { StudiosWithWinCountResponse } from "../../types";

interface StudiosWinsProps {
  data: StudiosWithWinCountResponse | null;
}

const StudiosWins: React.FC<StudiosWinsProps> = ({ data }) => {
  // Get top 3 studios
  const top3Studios = data
    ? [...data.studios].sort((a, b) => b.winCount - a.winCount).slice(0, 3)
    : [];

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Top 3 studios with winners
      </Typography>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Win Count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {top3Studios.length > 0 ? (
              top3Studios.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.winCount}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default StudiosWins;
