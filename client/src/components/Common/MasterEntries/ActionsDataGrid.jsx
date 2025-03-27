import { Box, TextField } from "@mui/material";
import { AddNewEntry } from "./AddNewEntry";
import { ExportData } from "./ExportData";
import { debounce } from "lodash";
import { useCallback } from "react";

const ActionsDataGrid = ({ entityType, rows, search, setSearch }) => {

    const handleSearchChange = useCallback(
        debounce((value) => {
            setSearch(value);
        }, 100),
        [setSearch] // Dependency array includes setSearch
    );

    const onSearchChange = (event) => {
        const value = event.target.value;
        handleSearchChange(value);
    };

    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
            mt={2}
            sx={{ gap: 2 }}
        >
            {/* Search Field */}
            <TextField
                variant="outlined"
                placeholder="Search..."
                size="small"
                value={search || ""} // Ensure controlled input; default to empty string if undefined
                onChange={onSearchChange} // Use the new handler
                sx={{
                    width: 250,
                    "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                    },
                }}
            />

            {/* Action Buttons */}
            <Box display="flex" sx={{ gap: 2 }}>
                <AddNewEntry entityType={entityType} />
                <ExportData entityType={entityType} rows={rows} />
            </Box>
        </Box>
    );
};

export default ActionsDataGrid;