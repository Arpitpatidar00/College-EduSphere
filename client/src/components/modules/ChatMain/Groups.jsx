import { Box, Typography } from "@mui/material";
import { APP_COLORS } from "../../../enums/Colors";

const Groups = () => {
    return (
        <Box
            sx={{
                mt: 2,
                p: 2,
                backgroundColor: APP_COLORS.common.white,
                borderRadius: 5,
                boxShadow: `0px 2px 5px ${APP_COLORS.primary[50]} `,

            }}
        >
            <Typography
                variant="h6"
                sx={{
                    fontWeight: "bold",
                    color: APP_COLORS.primary[600],
                    borderBottom: `2px solid${APP_COLORS.common.white} `,
                    pb: 1,
                    mb: 1
                }}
            >
                Groups
            </Typography>

            {/* Group List */}
            {["🔥 Friends Forever", "⚡ Mera Gang", "🌍 Hiking", "🔥 Friends Forever", "⚡ Mera Gang", "🌍 Hiking",].map((group, index) => (
                <Typography
                    key={index}
                    sx={{
                        padding: "8px",
                        borderRadius: "8px",
                        transition: "background 0.3s",
                        cursor: "pointer",
                        "&:hover": { backgroundColor: APP_COLORS.common.white },
                    }}
                >
                    {group}
                </Typography>
            ))}
        </Box>
    );
};

export default Groups;
