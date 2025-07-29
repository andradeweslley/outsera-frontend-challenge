import { Search } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { type Movie } from "../../types";
import LoadingSpinner from "../common/LoadingSpinner";
import ErrorMessage from "../common/ErrorMessage";

interface WinnersByYearProps {
  data: Movie[] | null;
  onSearch: (year: number) => void;
  loading?: boolean;
  error?: string | null;
}

const WinnersByYear: React.FC<WinnersByYearProps> = ({
  data,
  onSearch,
  loading = false,
  error = null,
}) => {
  const [year, setYear] = useState("");

  const handleSearch = () => {
    if (year) {
      onSearch(Number(year));
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        List movie winners by year
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          label="Search by year"
          variant="outlined"
          size="small"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          type="number"
        />
        <IconButton color="primary" onClick={handleSearch} disabled={loading}>
          <Search />
        </IconButton>
      </Box>

      {loading && <LoadingSpinner message="Searching..." size={30} />}

      {error && (
        <ErrorMessage
          message={error}
          onRetry={() => year && onSearch(Number(year))}
          severity="warning"
        />
      )}

      {!loading && !error && (
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Year</TableCell>
                <TableCell>Title</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.year}</TableCell>
                  <TableCell>{row.title}</TableCell>
                </TableRow>
              ))}
              {data && data.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
};

export default React.memo(WinnersByYear);
