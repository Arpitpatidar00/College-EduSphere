import { Box, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { APP_COLORS } from '../../../enums/Colors';

const SearchBar = () => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: APP_COLORS.common.white,
                padding: "8px 16px",
                borderRadius: 5,
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
        >
            <SearchIcon sx={{ mr: 2, color: "text.secondary" }} />
            <TextField
                fullWidth
                variant="standard"
                placeholder="Search"
                InputProps={{ disableUnderline: true }}
                sx={{
                    fontSize: "16px",
                }}
            />
        </Box>
    );
};

export default SearchBar;
