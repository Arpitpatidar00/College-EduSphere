import { useState } from "react";
import {
    Box,
    Container,
    Grid,
    Typography,
    Card,
    useTheme,
} from "@mui/material";
import Sidebar from "../AdminSidebar/Sidebar";
import StatCard from "./StatCard";
import EngagementChart from "./RevenueChart";
import CollegeRequestList from "./CollegeRequestList";
import { statsData, revenueData } from "../data/mockData";
import { useSelector } from 'react-redux';
import { selectUserData } from '../../../../store/slices/auth.slice'


// Mock data for different stats
const dataMapping = {
    "Total Registered Colleges": [
        { date: "Mar 1", value: 100 },
        { date: "Mar 2", value: 150 },
        { date: "Mar 3", value: 180 },
        { date: "Mar 4", value: 200 },
        { date: "Mar 5", value: 220 },
        { date: "Mar 6", value: 250 },
        { date: "Mar 7", value: 280 },
    ],
    "Total Students": [
        { date: "Mar 1", value: 5000 },
        { date: "Mar 2", value: 5200 },
        { date: "Mar 3", value: 5400 },
        { date: "Mar 4", value: 5600 },
        { date: "Mar 5", value: 5800 },
        { date: "Mar 6", value: 6000 },
        { date: "Mar 7", value: 6200 },
    ],
    "Active Users Today": [
        { date: "Mar 1", value: 4000 },
        { date: "Mar 2", value: 4500 },
        { date: "Mar 3", value: 4700 },
        { date: "Mar 4", value: 4900 },
        { date: "Mar 5", value: 5100 },
        { date: "Mar 6", value: 5300 },
        { date: "Mar 7", value: 5500 },
    ],
    "Posts Created": [
        { date: "Mar 1", value: 200 },
        { date: "Mar 2", value: 300 },
        { date: "Mar 3", value: 350 },
        { date: "Mar 4", value: 400 },
        { date: "Mar 5", value: 450 },
        { date: "Mar 6", value: 500 },
        { date: "Mar 7", value: 550 },
    ],
};

export default function AdminDashboard() {
    const userData = useSelector(selectUserData);

    const theme = useTheme();
    const [selectedStat, setSelectedStat] = useState({
        title: "User Engagement",
        data: revenueData,
    });

    const handleStatClick = (stat) => {
        setSelectedStat({
            title: stat.title,
            data: dataMapping[stat.title] || revenueData,
        });
    };

    return (
        <Box sx={{ display: "flex", bgcolor: theme.palette.background.default }}>
            <Box
                sx={{
                    width: 250,
                    flexShrink: 0,
                    position: "fixed",
                    top: "64px",
                    left: 0,
                    height: "calc(100vh - 64px)",
                    zIndex: 1100,
                }}
            >
                <Sidebar />
            </Box>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    ml: { xs: 0, md: "250px" },
                    width: { xs: "100%", md: "calc(100% - 250px)" },
                    pt: { xs: 8, md: 10 },
                    px: { xs: 2, md: 4 },
                    overflowY: "auto",
                }}
            >
                <Container maxWidth="xl">
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 4,
                        }}
                    >
                        <Typography variant="h4" fontWeight={600}>
                            Good morning, {userData.firstName || "Guest"}!
                        </Typography>
                    </Box>

                    <Grid container spacing={3}>
                        {statsData.map((stat) => (
                            <Grid item xs={12} sm={6} md={3} key={stat.id}>
                                <div onClick={() => handleStatClick(stat)} style={{ cursor: "pointer" }}>
                                    <StatCard {...stat} />
                                </div>
                            </Grid>
                        ))}

                        <Grid item xs={12} md={8}>
                            <EngagementChart title={selectedStat.title} data={selectedStat.data} />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <CollegeRequestList />
                                </Grid>
                                <Grid item xs={12}>
                                    <Card
                                        sx={{
                                            bgcolor: "primary.dark",
                                            color: "white",
                                            p: 3,
                                            borderRadius: 2,
                                        }}
                                    >
                                        <Typography variant="h6" fontWeight={600}>
                                            Board Meeting
                                        </Typography>
                                        <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
                                            Feb 22 at 6:00 PM
                                        </Typography>
                                        <Typography variant="body2" sx={{ opacity: 0.8, mt: 2 }}>
                                            You have been invited to attend a meeting of the Board of Directors.
                                        </Typography>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}
