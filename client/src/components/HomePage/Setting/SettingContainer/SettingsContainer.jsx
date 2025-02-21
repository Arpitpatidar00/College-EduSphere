import { Box, Typography } from "@mui/material";
import {
    PrivacySecurity,
    AccountSettings,
    ConnectedApps,
    ChangePassword,
    ActivityLog,
    OtherSettings
} from "./index";
import { APP_COLORS } from '../../../../enums/Colors';


const SettingsContainer = ({ selectedSection }) => {
    const sections = {
        "Privacy and Security": <PrivacySecurity />,
        "Account": <AccountSettings />,
        "Apps and website": <ConnectedApps />,
        "Change Password": <ChangePassword />,
        "Activity log": <ActivityLog />,
        "Others": <OtherSettings />,
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                bgcolor: APP_COLORS.common.black,
                color: APP_COLORS.common.white,
                borderRadius: 4,
                p: 4,
            }}
        >
            {sections[selectedSection] || <Typography variant="h4">Select a setting</Typography>}
        </Box>
    );
};

export default SettingsContainer;
