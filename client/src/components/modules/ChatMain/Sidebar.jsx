import { Box, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MessageIcon from "@mui/icons-material/Message";
import PersonIcon from "@mui/icons-material/Person";
import { APP_COLORS } from "../../../enums/Colors";

const Sidebar = ({ activeView, onChangeView }) => {
    // Common styles for the IconButton
    const iconButtonStyles = {
        transition: "all 0.3s ease",
        "&:hover": { backgroundColor: APP_COLORS.primary[50], color: APP_COLORS.common.black },
        mb: 2,
    };

    return (
        <Box
            sx={{
                width: "100px",
                backgroundColor: APP_COLORS.primary[600],
                borderRadius: 5,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingTop: "16px",
                color: APP_COLORS.common.white,
            }}
        >
            <IconButton
                onClick={() => onChangeView("home")}
                sx={{
                    ...iconButtonStyles,
                    color: activeView === "home" ? "yellow" : "white",
                }}
            >
                <HomeIcon fontSize="large" />
            </IconButton>
            <IconButton
                onClick={() => onChangeView("message")}
                sx={{
                    ...iconButtonStyles,
                    color: activeView === "message" ? "yellow" : "white",
                }}
            >
                <MessageIcon fontSize="large" />
            </IconButton>
            <IconButton
                onClick={() => onChangeView("person")}
                sx={{
                    ...iconButtonStyles,
                    color: activeView === "person" ? "yellow" : "white",
                }}
            >
                <PersonIcon fontSize="large" />
            </IconButton>
        </Box>
    );
};

export default Sidebar;
