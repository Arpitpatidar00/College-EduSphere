import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const FormationCard = styled(Card)(({ theme }) => ({
    borderRadius: theme.spacing(2),
    backgroundColor: "#1C2526",
    color: "#fff",
    padding: theme.spacing(2),
}));

const BoardMeetingCard = () => {
    return (
        <FormationCard>
            <CardContent>
                <Typography variant="h6">
                    BOARD MEETING
                    <Box
                        component="span"
                        sx={{
                            display: "inline-block",
                            width: 8,
                            height: 7,
                            borderRadius: "50%",
                            backgroundColor: "green",
                            ml: 1,
                        }}
                    />
                </Typography>
                <Typography variant="body2">Feb 22 at 6:00 PM</Typography>
                <Typography variant="body2">
                    You have been invited to attend a meeting of the Board of Directors.
                </Typography>
            </CardContent>
        </FormationCard>
    );
};

export default BoardMeetingCard;