
import { Card, CardContent, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { revenueData } from '../data/mockData';

export default function RevenueChart() {
    return (
        <Card>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Revenue
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    Last 7 days vs prior week
                </Typography>

                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={revenueData}>
                        <XAxis
                            dataKey="date"
                            stroke="#888888"
                            tick={{ fill: '#888888' }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            stroke="#888888"
                            tick={{ fill: '#888888' }}
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(value) => `$${value / 1000} k`}
                        />
                        <Tooltip />
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

