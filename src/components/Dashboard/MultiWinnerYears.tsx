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
import { YearWithMultipleWinnersResponse } from "../../types";

interface MultiWinnerYearsProps {
  data: YearWithMultipleWinnersResponse | null;
}

const MultiWinnerYears: React.FC<MultiWinnerYearsProps> = ({ data }) => {
  return (
    <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        List years with multiple winners
      </Typography>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Year</TableCell>
              <TableCell align="right">Win Count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.years && data.years.length > 0 ? (
              data.years.map((row) => (
                <TableRow key={row.year}>
                  <TableCell component="th" scope="row">
                    {row.year}
                  </TableCell>
                  <TableCell align="right">{row.winnerCount}</TableCell>
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

export default React.memo(MultiWinnerYears);
