import { useState } from "react";
import {
    Container,
    Grid,
    Typography,
    Card,
} from "@mui/material";
import StatCard from "./StatCard";
import EngagementChart from "./RevenueChart";
import CollegeRequestList from "./CollegeRequestList";
import { statsData, revenueData } from "../data/mockData";
import { useSelector } from "react-redux";
import { selectUserData } from "../../../../store/slices/auth.slice";
import { dataMapping } from "../data/mockData";

export default function AdminDashboardContainer() {
    const userData = useSelector(selectUserData);
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
        <Container
            maxWidth="xl"
            sx={{
                pt: { xs: 8, sm: 10 },
                pb: 1,
                px: { xs: 2, sm: 3, md: 4 },
                height: "100%",
            }}
        >
            <Typography
                variant="h4"
                fontWeight={600}
                mb={4}
                sx={{
                    fontSize: { xs: "1.5rem", sm: "2rem" },
                }}
            >
                Good morning, {userData.firstName || user.institutionName}!
            </Typography>

            <Grid container spacing={{ xs: 2, md: 3 }}>
                {statsData.map((stat) => (
                    <Grid item xs={12} sm={6} md={3} key={stat.id}>
                        <div
                            onClick={() => handleStatClick(stat)}
                            style={{ cursor: "pointer" }}
                        >
                            <StatCard {...stat} />
                        </div>
                    </Grid>
                ))}

                <Grid item xs={12} md={8}>
                    <EngagementChart
                        title={selectedStat.title}
                        data={selectedStat.data}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <CollegeRequestList />
                    <Card
                        sx={{
                            bgcolor: "primary.dark",
                            color: "white",
                            p: 3,
                            borderRadius: 2,
                            mt: 3,
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
        </Container>
    );
}