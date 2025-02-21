import { Box, Typography } from "@mui/material";
import { Apps } from "@mui/icons-material";

const ConnectedApps = () => (
    <>
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
            <Apps sx={{ fontSize: 40, mr: 2 }} />
            <Typography variant="h4">Connected Apps</Typography>
        </Box>
        <Typography variant="body2">
            Manage your connected apps and permissions.
        </Typography>
    </>
);

export default ConnectedApps;
