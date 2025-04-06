import { Box, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { APP_COLORS } from "../../../enums/Colors";

const SearchBar = ({ sx: parentSx = {} }) => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: APP_COLORS.common.white,
                padding: { xs: "4px 8px", sm: "6px 12px", md: "8px 16px" }, // Progressive padding
                borderRadius: 5,
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                width: "100%", // Full width by default
                maxWidth: { xs: "100%", sm: "90%", md: "500px" }, // Constrain on larger screens
                // Remove fixed maxHeight, let it adjust to content
                ...parentSx, // Merge parent sx props
            }}
        >
            <SearchIcon
                sx={{
                    mr: { xs: 1, sm: 1.5, md: 2 },
                    color: "text.secondary",
                    fontSize: { xs: 20, sm: 22, md: 24, lg: 26 }, // Progressive scaling
                }}
            />
            <TextField
                fullWidth
                variant="standard"
                placeholder="Search"
                InputProps={{ disableUnderline: true }}
                sx={{
                    "& .MuiInputBase-root": {
                        fontSize: { xs: "14px", sm: "15px", md: "16px", lg: "18px" }, // Progressive font size
                    },
                    "& .MuiInputBase-input": {
                        padding: 0, // Remove default padding to control with parent Box
                    },
                }}
            />
        </Box>
    );
};

export default SearchBar;