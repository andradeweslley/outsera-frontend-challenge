import React, { useEffect, useState } from "react";

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { useApi } from "../../hooks/useApi";

const MoviesList: React.FC = () => {
  const { movies, fetchMovies } = useApi();
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 15,
  });
  const [yearFilter, setYearFilter] = useState<number | null>(null);
  const [winnerFilter, setWinnerFilter] = useState<boolean | null>(null);

  useEffect(() => {
    fetchMovies({
      page: paginationModel.page,
      size: paginationModel.pageSize,
      year: yearFilter || undefined,
      winner: winnerFilter !== null ? winnerFilter : undefined,
    });
  }, [paginationModel, yearFilter, winnerFilter, fetchMovies]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "year", headerName: "Year", width: 100 },
    { field: "title", headerName: "Title", flex: 1 },
    {
      field: "winner",
      headerName: "Winner",
      width: 100,
      renderCell: (params) => (params.value ? "Yes" : "No"),
    },
  ];

  return (
    <Box sx={{ p: 3, height: "100%" }}>
      <Typography variant="h4" gutterBottom>
        List movies
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          label="Filter by year"
          type="number"
          variant="outlined"
          size="small"
          value={yearFilter || ""}
          onChange={(e) =>
            setYearFilter(e.target.value ? parseInt(e.target.value) : null)
          }
        />
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Winner</InputLabel>
          <Select
            value={winnerFilter === null ? "" : winnerFilter ? "true" : "false"}
            label="Winner"
            onChange={(e) => {
              const value = e.target.value as string;
              setWinnerFilter(value === "" ? null : value === "true");
            }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="true">Yes</MenuItem>
            <MenuItem value="false">No</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ height: 600 }}>
        <DataGrid
          rows={movies?.content || []}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5, 10, 15, 20]}
          rowCount={movies?.totalElements || 0}
          paginationMode="server"
        />
      </Box>
    </Box>
  );
};

export default MoviesList;
