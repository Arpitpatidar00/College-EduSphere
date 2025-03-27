import { useState } from "react";
import { Box, TextField, Select, MenuItem, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { APP_COLORS } from "@/enums/Colors";

const TopSearchFilters = ({ searchPlaceholder, filters, buttons, onFilterChange, setSearchTerm, searchTerm, setSelectedFilters, selectedFilters }) => {



  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle filter selection
  const handleFilterChange = (name, value) => {
    const newFilters = { ...selectedFilters, [name]: value };
    setSelectedFilters(newFilters);
    if (onFilterChange) onFilterChange(newFilters);
  };

  return (
    <Box sx={{ display: "flex", gap: 2, mb: 4, ml: 4 }}>
      {/* Search Input */}
      {searchPlaceholder && (
        <TextField
          placeholder={searchPlaceholder}
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: <SearchIcon sx={{ color: APP_COLORS.grey[500] }} />,
            sx: {
              "& .MuiInputBase-input::placeholder": {
                color: APP_COLORS.grey[400],
                opacity: 1,
              },
            },
          }}
          sx={{
            width: "25%",
            backgroundColor: APP_COLORS.common.white,
            border: "none",
            borderRadius: 4,
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: APP_COLORS.grey[200] },
              "&:hover fieldset": { borderColor: APP_COLORS.grey[300] },
            },
          }}
        />
      )}

      {/* Dynamic Filters (Dropdowns) */}
      {filters.map((filter) => (
        <Select
          key={filter.name}
          value={selectedFilters[filter.name] || filter.label}
          onChange={(e) => handleFilterChange(filter.name, e.target.value)}
          sx={{
            width: "15%",
            backgroundColor: APP_COLORS.common.white,
            borderRadius: 4,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: APP_COLORS.grey[200],
            },
          }}
        >
          <MenuItem disabled value={filter.label}>
            {filter.label}
          </MenuItem>
          {filter.options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      ))}

      {/* Dynamic Buttons */}
      {buttons?.map((button) => (
        <Button
          key={button.label}
          variant={button.variant || "contained"}
          sx={{
            width: "10%",
            borderRadius: 4,
            textTransform: "none",
            backgroundColor: button.variant === "outlined" ? APP_COLORS.primary[600] : APP_COLORS.primary[600],
            color: button.variant === "outlined" ? APP_COLORS.secondary[900] : APP_COLORS.common.white,
            borderColor: button.variant === "outlined" ? APP_COLORS.grey[200] : "transparent",
            "&:hover": {
              backgroundColor: button.variant === "outlined" ? APP_COLORS.grey[100] : APP_COLORS.secondary[700],
            },
          }}
          onClick={button.onClick}
        >
          {button.label}
        </Button>
      ))}
    </Box>
  );
};

export default TopSearchFilters;
