import { Card, CardContent, Typography } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function EngagementChart({ title, data }) {
    return (
        <Card sx={{ boxShadow: 3, borderRadius: 5, p: 2 }}>
            <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    Activity in the Last 7 Days
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                        <XAxis
                            dataKey="date"
                            stroke="#888888"
                            tick={{ fill: "#888888" }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            stroke="#888888"
                            tick={{ fill: "#888888" }}
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(value) => `${value / 1000}k`}
                        />
                        <Tooltip contentStyle={{ backgroundColor: "#333", color: "#fff" }} cursor={{ stroke: "#4CAF50", strokeWidth: 2 }} />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#4CAF50"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
