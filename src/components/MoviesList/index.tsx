import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { useMovies } from "../../hooks/useMovies";
import LoadingSpinner from "../common/LoadingSpinner";
import ErrorMessage from "../common/ErrorMessage";
import MoviesFilters from "./MoviesFilters";

const MoviesList: React.FC = () => {
  const { movies, loading, error, fetchMovies } = useMovies();
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

  if (loading) {
    return <LoadingSpinner message="Loading movies..." />;
  }

  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={() =>
          fetchMovies({
            page: paginationModel.page,
            size: paginationModel.pageSize,
            year: yearFilter || undefined,
            winner: winnerFilter !== null ? winnerFilter : undefined,
          })
        }
      />
    );
  }

  return (
    <Box sx={{ p: 3, height: "100%" }}>
      <Typography variant="h4" gutterBottom>
        List movies
      </Typography>
      <MoviesFilters
        yearFilter={yearFilter}
        winnerFilter={winnerFilter}
        onYearChange={setYearFilter}
        onWinnerChange={setWinnerFilter}
      />
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
