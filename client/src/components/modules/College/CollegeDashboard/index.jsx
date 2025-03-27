import { useState } from "react";
import { Box, Grid } from "@mui/material";
import {
  Group as GroupIcon, // For Active Students
  Event as EventIcon, // For Upcoming Events
  Hub as HubIcon, // For Collaborations
  School as SchoolIcon, // For Students Managed
} from "@mui/icons-material";

// Import the new components
import Header from "./Header";
import StatsCard from "./StatsCard";
import ActivityChart from "./ActivityChart"; // Renamed from RevenueChart
import RecentActivitiesCard from "./RecentActivitiesCard"; // Renamed from RecentEmailsCard
import UpcomingEventsCard from "./UpcomingEventsCard"; // Renamed from BoardMeetingCard

// Define different datasets for each StatsCard
const activeStudentsData = [
  { date: "Feb 14", current: 1200, prior: 1100 },
  { date: "Feb 15", current: 1250, prior: 1150 },
  { date: "Feb 16", current: 1300, prior: 1200 },
  { date: "Feb 17", current: 1280, prior: 1180 },
  { date: "Feb 18", current: 1350, prior: 1250 },
  { date: "Feb 19", current: 1320, prior: 1220 },
  { date: "Feb 20", current: 1300, prior: 1200 },
];

const upcomingEventsData = [
  { date: "Feb 14", current: 5, prior: 3 },
  { date: "Feb 15", current: 7, prior: 4 },
  { date: "Feb 16", current: 10, prior: 6 },
  { date: "Feb 17", current: 8, prior: 5 },
  { date: "Feb 18", current: 12, prior: 7 },
  { date: "Feb 19", current: 9, prior: 6 },
  { date: "Feb 20", current: 6, prior: 4 },
];

const collaborationsData = [
  { date: "Feb 14", current: 3, prior: 2 },
  { date: "Feb 15", current: 4, prior: 3 },
  { date: "Feb 16", current: 5, prior: 4 },
  { date: "Feb 17", current: 4, prior: 3 },
  { date: "Feb 18", current: 6, prior: 5 },
  { date: "Feb 19", current: 5, prior: 4 },
  { date: "Feb 20", current: 4, prior: 3 },
];

const studentsManagedData = [
  { date: "Feb 14", current: 1500, prior: 1450 },
  { date: "Feb 15", current: 1520, prior: 1470 },
  { date: "Feb 16", current: 1550, prior: 1500 },
  { date: "Feb 17", current: 1530, prior: 1480 },
  { date: "Feb 18", current: 1580, prior: 1530 },
  { date: "Feb 19", current: 1560, prior: 1510 },
  { date: "Feb 20", current: 1540, prior: 1490 },
];

const CollegeDashboard = () => {
  // State to track the selected StatsCard
  const [selectedCard, setSelectedCard] = useState("activeStudents");

  // Map the selected card to the corresponding data
  const chartDataMap = {
    activeStudents: activeStudentsData,
    upcomingEvents: upcomingEventsData,
    collaborations: collaborationsData,
    studentsManaged: studentsManagedData,
  };

  // Handle click on StatsCard
  const handleCardClick = (cardType) => {
    setSelectedCard(cardType);
  };

  return (
    <Box sx={{ p: 3, height: "calc(100vh-64px)" }}>
      <Header />

      <Grid container spacing={3}>
        {/* First Row: Active Students, Upcoming Events, Collaborations, Students Managed */}
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            icon={GroupIcon}
            value="1,320"
            label="ACTIVE STUDENTS"
            onClick={() => handleCardClick("activeStudents")}
            isSelected={selectedCard === "activeStudents"}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            icon={EventIcon}
            value="12"
            label="UPCOMING EVENTS"
            onClick={() => handleCardClick("upcomingEvents")}
            isSelected={selectedCard === "upcomingEvents"}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            icon={HubIcon}
            value="5"
            label="COLLABORATIONS"
            onClick={() => handleCardClick("collaborations")}
            isSelected={selectedCard === "collaborations"}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            icon={SchoolIcon}
            value="1,560"
            label="STUDENTS MANAGED"
            onClick={() => handleCardClick("studentsManaged")}
            isSelected={selectedCard === "studentsManaged"}
          />
        </Grid>

        {/* Activity Chart */}
        <Grid item xs={12} md={6}>
          <ActivityChart
            chartData={chartDataMap[selectedCard]}
            title={
              selectedCard === "activeStudents"
                ? "Student Engagement"
                : selectedCard === "upcomingEvents"
                  ? "Event Participation"
                  : selectedCard === "collaborations"
                    ? "Collaboration Activities"
                    : "Student Management"
            }
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <RecentActivitiesCard />
        </Grid>

        {/* Upcoming Events Card */}
        <Grid item xs={12} md={3}>
          <UpcomingEventsCard />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CollegeDashboard;