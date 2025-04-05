import { Box, Typography } from "@mui/material";
import { APP_COLORS } from "../../../enums/Colors";

const Groups = ({ sx, onSelectConversation }) => {
    const groups = ["🔥 Friends Forever", "⚡ Mera Gang", "🌍 Hiking", "🔥 Friends Forever", "⚡ Mera Gang", "🌍 Hiking"];

    return (
        <Box
            sx={{
                mt: 2,
                p: { xs: 1, md: 2 }, // Smaller padding on mobile
                backgroundColor: APP_COLORS.common.white,
                borderRadius: 5,
                boxShadow: `0px 2px 5px ${APP_COLORS.primary[50]}`,
                ...sx,
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    fontWeight: "bold",
                    color: APP_COLORS.primary[600],
                    borderBottom: `2px solid ${APP_COLORS.common.white}`,
                    pb: 1,
                    mb: 1,
                    fontSize: { xs: "1rem", md: "1.25rem" }, // Smaller font on mobile
                }}
            >
                Groups
            </Typography>
            {groups.map((group, index) => (
                <Typography
                    key={index}
                    onClick={() => onSelectConversation(group)} // Add click handler
                    sx={{
                        padding: "8px",
                        borderRadius: "8px",
                        transition: "background 0.3s",
                        cursor: "pointer",
                        "&:hover": { backgroundColor: APP_COLORS.grey[100] },
                        fontSize: { xs: "0.9rem", md: "1rem" }, // Adjust font size
                    }}
                >
                    {group}
                </Typography>
            ))}
        </Box>
    );
};

export default Groups;