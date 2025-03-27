import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const StyledCard = styled(Card)(({ theme }) => ({
    borderRadius: theme.spacing(2),
    backgroundColor: "#F5F7FA",
    boxShadow: "none",
    padding: theme.spacing(2),
}));

const ActivityChart = ({ chartData, title }) => {
    return (
        <StyledCard>
            <CardContent>
                <Typography variant="body2" color="textSecondary">
                    {title.toUpperCase()}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Last 7 days VS prior week
                </Typography>
                <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={chartData}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="current"
                            stroke="#000"
                            name="Last 7 days"
                        />
                        <Line
                            type="monotone"
                            dataKey="prior"
                            stroke="#888"
                            name="Prior week"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </StyledCard>
    );
};

export default ActivityChart;