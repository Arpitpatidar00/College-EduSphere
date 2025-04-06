import { useEffect, useCallback } from "react";
import {
  CircularProgress,
  TextField,
  Autocomplete,
  styled,
} from "@mui/material";

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  "& .MuiInputBase-root": {
    borderRadius: 24, // More rounded, consistent across sizes
    backgroundColor: "#f8f8f8", // Soft background
    paddingLeft: 16,
    paddingRight: 16,
    fontSize: 14,
    color: "#424242",
    height: 48, // Default height for desktop
    boxShadow: "inset 0 0 0 1px #e0e0e0", // Subtle inset border
    "&:hover": {
      boxShadow: "inset 0 0 0 1px #bdbdbd",
    },
    "&.Mui-focused": {
      boxShadow: "inset 0 0 0 1px #9e9e9e",
    },
    // Responsive adjustments
    [theme.breakpoints.down("sm")]: {
      // Small screens (e.g., mobile, < 600px)
      height: 40, // Slightly smaller height for mobile
      paddingLeft: 12,
      paddingRight: 12,
      fontSize: 12,
    },
    [theme.breakpoints.between("sm", "md")]: {
      // Medium screens (e.g., tablets, 600px - 960px)
      height: 44,
      paddingLeft: 14,
      paddingRight: 14,
      fontSize: 13,
    },
  },
  "& .MuiInputLabel-root": {
    color: "#757575",
    fontSize: 14,
    top: -6, // Adjust vertical position
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
      top: -4,
    },
    [theme.breakpoints.between("sm", "md")]: {
      fontSize: 13,
      top: -5,
    },
  },
  "& .MuiInputLabel-shrink": {
    top: 4, // Label when focused
    [theme.breakpoints.down("sm")]: {
      top: 3,
    },
    [theme.breakpoints.between("sm", "md")]: {
      top: 3.5,
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none", // Remove default outline
  },
  marginBottom: theme.spacing(2), // Default margin for desktop
  // Responsive margin
  [theme.breakpoints.down("sm")]: {
    marginBottom: theme.spacing(1.5), // Slightly less margin on mobile
  },
  [theme.breakpoints.between("sm", "md")]: {
    marginBottom: theme.spacing(1.75), // Adjusted margin for tablets
  },
}));

const InfiniteScrollDropdown = ({
  fetchData,
  options,
  selectedValue,
  onChange,
  searchTerm,
  setSearchTerm,
  loading,
  paginationModel,
  setPaginationModel,
  label = "Pin Code",
}) => {
  const { page = 1 } = paginationModel;

  const fetchDataCallback = useCallback(() => {
    if (fetchData) {
      fetchData({ searchTerm, page });
    }
  }, [fetchData, searchTerm, page]);

  useEffect(() => {
    fetchDataCallback();
  }, [page, searchTerm, fetchDataCallback]);

  const handleScroll = (event) => {
    const listboxNode = event.currentTarget;
    if (
      listboxNode.scrollTop + listboxNode.clientHeight >=
      listboxNode.scrollHeight * 0.99 &&
      !loading
    ) {
      setPaginationModel((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  };

  const handleChange = (event, value) => {
    if (value) {
      onChange(value._id);
      setSearchTerm(value.label);
    } else {
      onChange("");
      setSearchTerm("");
    }
  };

  const handleInputChange = (event, value) => {
    setSearchTerm(value);
    if (fetchData) {
      fetchData({ searchTerm: value, page: 1 });
    }
  };

  return (
    <StyledAutocomplete
      options={options}
      getOptionLabel={(option) => option.label || ""}
      onChange={handleChange}
      onInputChange={handleInputChange}
      value={options.find((option) => option._id === selectedValue) || null}
      loading={loading}
      ListboxProps={{ onScroll: handleScroll }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          fullWidth
          InputProps={{
            ...params.InputProps,
            endAdornment: loading ? (
              <CircularProgress color="inherit" size={18} />
            ) : null,
          }}
        />
      )}
      filterOptions={(options) => options}
      autoComplete
      disableClearable
    />
  );
};

export default InfiniteScrollDropdown;
