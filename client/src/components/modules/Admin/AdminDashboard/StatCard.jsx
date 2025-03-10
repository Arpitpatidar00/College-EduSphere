import { Card, CardContent, Typography, Box } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

export default function StatCard({ title, value, description, change }) {
    const isPositive = change && change > 0;

    return (
        <Card sx={{ boxShadow: 3, borderRadius: 5, p: 2 }}>
            <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="h4" fontWeight={600} gutterBottom>
                    {value}
                    {change && (
                        <Box
                            component="span"
                            sx={{
                                display: "inline-flex",
                                alignItems: "center",
                                ml: 1,
                                color: isPositive ? "success.main" : "error.main",
                                typography: "body2",
                            }}
                        >
                            {isPositive ? (
                                <TrendingUpIcon fontSize="small" />
                            ) : (
                                <TrendingDownIcon fontSize="small" />
                            )}
                            {Math.abs(change)}%
                        </Box>
                    )}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
}