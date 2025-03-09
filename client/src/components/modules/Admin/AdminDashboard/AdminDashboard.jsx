import {
    Box,
    Container,
    Grid,
    Typography,

} from "@mui/material";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import RefreshIcon from "@mui/icons-material/Refresh";
import Sidebar from "../AdminSidebar/Sidebar";
import StatCard from "./StatCard";
import RevenueChart from "./RevenueChart";
import TaskList from "./TaskList";
// import EmailList from "./EmailList";
import { statsData } from "../data/mockData";
import { Card } from "@mui/material";

export default function AdminDashboard() {
    return (
        <Box sx={{ display: "flex", maxHeight: "calc(100vh - 64px)" }}>
            <Box
                sx={{
                    width: 250,
                    flexShrink: 0,
                    position: "fixed",
                    top: "64px", // Starts below 64px navbar
                    left: 0,
                    height: "calc(100vh - 64px)", // Adjusts height to account for navbar
                    zIndex: 1100, // Lower than typical navbar zIndex (1200)
                }}
            >
                <Sidebar />
            </Box>

            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    ml: { xs: 0, md: "250px" },
                    width: { xs: "100%", md: "calc(100% - 250px)" },
                    pt: { xs: 10, md: 10 },
                    maxHeight: "calc(100vh - 64px)",
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
                        <Typography variant="h4">Good morning, James!</Typography>
                    </Box>

                    <Grid container spacing={3}>
                        {statsData.map((stat) => (
                            <Grid item xs={12} sm={6} md={3} key={stat.id}>
                                <StatCard
                                    title={stat.title}
                                    value={stat.value}
                                    description={stat.description}
                                    change={stat.change}
                                />
                            </Grid>
                        ))}

                        <Grid item xs={12} md={8}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <RevenueChart />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TaskList />
                                </Grid>
                                <Grid item xs={12}>
                                    <Card sx={{ bgcolor: "black", color: "white", p: 3 }}>
                                        <Typography variant="h6">Board meeting</Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{ color: "grey.400", mt: 1 }}
                                        >
                                            Feb 22 at 6:00 PM
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{ color: "grey.400", mt: 2 }}
                                        >
                                            You have been invited to attend a meeting of the Board
                                            Directors.
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
