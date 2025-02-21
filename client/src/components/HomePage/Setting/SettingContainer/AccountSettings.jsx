import { Box, Typography } from "@mui/material";
import { Person } from "@mui/icons-material";

const AccountSettings = () => (
    <>
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
            <Person sx={{ fontSize: 40, mr: 2 }} />
            <Typography variant="h4">Account Settings</Typography>
        </Box>
        <Typography variant="body2">
            Update your account details and preferences.
        </Typography>
    </>
);

export default AccountSettings;
