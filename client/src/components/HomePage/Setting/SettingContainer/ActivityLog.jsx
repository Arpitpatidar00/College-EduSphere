import { Box, Typography } from "@mui/material";
import { History } from "@mui/icons-material";

const ActivityLog = () => (
    <>
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
            <History sx={{ fontSize: 40, mr: 2 }} />
            <Typography variant="h4">Activity Log</Typography>
        </Box>
        <Typography variant="body2">
            View your recent account activities.
        </Typography>
    </>
);

export default ActivityLog;
