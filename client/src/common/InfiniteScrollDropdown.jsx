import { useEffect, useCallback } from "react";
import { CircularProgress, TextField } from "@mui/material";
import * as Components from "../components/Auth/common/userAuth.styles";

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
  label,  // Adding the label prop
}) => {
  // Ensure pagination model is initialized
  const { page = 1 } = paginationModel;

  // Trigger data fetch when page or search term changes
  const fetchDataCallback = useCallback(() => {
    if (fetchData) {
      fetchData();
    }
  }, [fetchData]);

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
      onChange(value._id); // Ensure _id is passed correctly
    } else {
      onChange(""); // In case of no selection
    }
  };

  return (
    <Components.StyledAutocomplete
      options={options}
      getOptionLabel={(option) => option.label}
      onChange={handleChange}
      onInputChange={(event, value) => setSearchTerm(value)}
      value={options.find((option) => option._id === selectedValue) || null}
      loading={loading}
      ListboxProps={{ onScroll: handleScroll }}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          label={label || "Select Country"}
          InputProps={{
            ...params.InputProps,
            endAdornment: loading ? (
              <CircularProgress color="inherit" size={20} />
            ) : (
              params.InputProps.endAdornment
            ),
          }}
        />
      )}
    />
  );
};

export default InfiniteScrollDropdown;
