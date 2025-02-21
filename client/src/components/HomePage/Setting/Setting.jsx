import { useState } from "react";
import { Grid } from "@mui/material";
import SettingsSidebar from './SettingSidebar/SettingsSidebar';
import SettingsContainer from './SettingContainer/SettingsContainer';

const Setting = () => {
    const [selectedSection, setSelectedSection] = useState("Privacy and Security");

    return (
        <Grid
            container
            sx={{
                height: "calc(100vh - 64px)",
                justifyContent: "center",
                alignItems: "center",
                padding: 2,
                gap: 4
            }}
        >
            <Grid
                item
                xs={3}
                sx={{
                    height: "88vh",
                    borderRadius: 4,
                    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
                }}
            >
                <SettingsSidebar
                    selectedSection={selectedSection}
                    setSelectedSection={setSelectedSection}
                />
            </Grid>

            <Grid
                item
                xs={6}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "88vh",
                    borderRadius: 4,
                    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
                }}
            >
                <SettingsContainer selectedSection={selectedSection} />
            </Grid>
        </Grid>
    );
};

export default Setting;
