import React from "react";

import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { type ProducersIntervals as ProducersIntervalsType } from "../../types";

interface ProducersIntervalsProps {
  data?: ProducersIntervalsType;
}

const ProducersIntervals: React.FC<ProducersIntervalsProps> = ({ data }) => {
  return (
    <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Producers with longest and shortest interval between wins
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1">Maximum</Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Producer</TableCell>
                <TableCell align="right">Interval</TableCell>
                <TableCell align="right">Previous Year</TableCell>
                <TableCell align="right">Following Year</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.max.map((row, index) => (
                <TableRow key={`max-${index}`}>
                  <TableCell component="th" scope="row">
                    {row.producer}
                  </TableCell>
                  <TableCell align="right">{row.interval}</TableCell>
                  <TableCell align="right">{row.previousWin}</TableCell>
                  <TableCell align="right">{row.followingWin}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box>
        <Typography variant="subtitle1">Minimum</Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Producer</TableCell>
                <TableCell align="right">Interval</TableCell>
                <TableCell align="right">Previous Year</TableCell>
                <TableCell align="right">Following Year</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.min.map((row, index) => (
                <TableRow key={`min-${index}`}>
                  <TableCell component="th" scope="row">
                    {row.producer}
                  </TableCell>
                  <TableCell align="right">{row.interval}</TableCell>
                  <TableCell align="right">{row.previousWin}</TableCell>
                  <TableCell align="right">{row.followingWin}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Paper>
  );
};

export default ProducersIntervals;
