import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

interface MoviesFiltersProps {
  yearFilter: number | null;
  winnerFilter: boolean | null;
  onYearChange: (year: number | null) => void;
  onWinnerChange: (winner: boolean | null) => void;
}

/**
 * Movies filters component for year and winner filtering
 */
const MoviesFilters: React.FC<MoviesFiltersProps> = ({
  yearFilter,
  winnerFilter,
  onYearChange,
  onWinnerChange,
}) => {
  const [yearInput, setYearInput] = useState<string>("");

  // Update local state when prop changes
  useEffect(() => {
    setYearInput(yearFilter?.toString() || "");
  }, [yearFilter]);

  const handleYearChange = (value: string) => {
    setYearInput(value);

    // Only trigger API call if we have a complete 4-digit year or empty
    if (value === "") {
      onYearChange(null);
    } else if (value.length === 4 && /^\d{4}$/.test(value)) {
      const year = parseInt(value);
      // Validate year range (reasonable movie years)
      if (year >= 1900 && year <= new Date().getFullYear() + 1) {
        onYearChange(year);
      }
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
      <TextField
        label="Filter by year"
        type="number"
        variant="outlined"
        size="small"
        value={yearInput}
        onChange={(e) => handleYearChange(e.target.value)}
        inputProps={{
          min: 1900,
          max: new Date().getFullYear() + 1,
          maxLength: 4,
        }}
        placeholder="YYYY"
      />
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel id="winner-select-label">Winner</InputLabel>
        <Select
          labelId="winner-select-label"
          id="winner-select"
          value={winnerFilter === null ? "" : winnerFilter ? "true" : "false"}
          label="Winner"
          onChange={(e) => {
            const value = e.target.value as string;
            onWinnerChange(value === "" ? null : value === "true");
          }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="true">Yes</MenuItem>
          <MenuItem value="false">No</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default React.memo(MoviesFilters);
