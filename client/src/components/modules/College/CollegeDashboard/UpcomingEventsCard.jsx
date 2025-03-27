import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const FormationCard = styled(Card)(({ theme }) => ({
    borderRadius: theme.spacing(2),
    backgroundColor: "#1C2526",
    color: "#fff",
    padding: theme.spacing(2),
}));

const UpcomingEventsCard = () => {
    return (
        <FormationCard>
            <CardContent>
                <Typography variant="h6">
                    UPCOMING EVENT
                    <Box
                        component="span"
                        sx={{
                            display: "inline-block",
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            backgroundColor: "green",
                            ml: 1,
                        }}
                    />
                </Typography>
                <Typography variant="body2">Tech Fest 2025</Typography>
                <Typography variant="body2">Mar 15 at 10:00 AM</Typography>
                <Typography variant="body2">
                    A technology festival featuring hackathons, workshops, and more.
                </Typography>
            </CardContent>
        </FormationCard>
    );
};

export default UpcomingEventsCard;