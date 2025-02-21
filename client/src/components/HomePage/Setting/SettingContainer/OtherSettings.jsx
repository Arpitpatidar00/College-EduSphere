import { Box, Typography } from "@mui/material";
import { Build } from "@mui/icons-material";

const OtherSettings = () => (
    <>
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
            <Build sx={{ fontSize: 40, mr: 2 }} />
            <Typography variant="h4">Other Settings</Typography>
        </Box>
        <Typography variant="body2">
            Customize additional settings.
        </Typography>
    </>
);

export default OtherSettings;
