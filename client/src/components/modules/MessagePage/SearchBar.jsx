import { Box, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { APP_COLORS } from "../../../enums/Colors";

const SearchBar = () => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: APP_COLORS.common.white,
                padding: { xs: "4px 8px", md: "8px 16px" }, // Smaller padding on mobile
                borderRadius: 5,
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                width: "100%",
            }}
        >
            <SearchIcon sx={{ mr: { xs: 1, md: 2 }, color: "text.secondary", fontSize: { xs: 20, md: 24 } }} />
            <TextField
                fullWidth
                variant="standard"
                placeholder="Search"
                InputProps={{ disableUnderline: true }}
                sx={{
                    fontSize: { xs: "14px", md: "16px" }, // Smaller font on mobile
                }}
            />
        </Box>
    );
};

export default SearchBar;