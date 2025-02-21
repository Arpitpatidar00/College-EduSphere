import { Box, Typography } from "@mui/material";
import { Security } from "@mui/icons-material";

const PrivacySecurity = () => (
    <>
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
            <Security sx={{ fontSize: 40, mr: 2 }} />
            <Typography variant="h4">Privacy and Security</Typography>
        </Box>
        <Typography variant="body2">
            Manage your privacy and security settings.
        </Typography>
    </>
);

export default PrivacySecurity;
