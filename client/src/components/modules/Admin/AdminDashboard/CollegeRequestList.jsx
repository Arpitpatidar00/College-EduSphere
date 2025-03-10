import { Card, CardContent, Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { collegeRequests } from "../data/mockData";

export default function CollegeRequestList() {
    return (
        <Card sx={{ boxShadow: 3, borderRadius: 5, maxHeight: 400, overflowY: "auto" }}>
            <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                    New College Requests
                </Typography>
                <List sx={{ mt: 2, maxHeight: 220, overflowY: "auto" }}>
                    {collegeRequests.map((request) => (
                        <ListItem
                            key={request.id}
                            sx={{
                                px: 0,
                                borderBottom: "1px solid #e0e0e0",
                                "&:last-child": { borderBottom: "none" },
                            }}
                        >
                            <ListItemAvatar>
                                <Avatar src={request.college.logo} alt={request.college.name} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={request.college.name}
                                secondary={`Requested by: ${request.adminName}`}
                                secondaryTypographyProps={{ color: "text.secondary" }}
                            />
                            <Typography variant="caption" color="text.secondary">
                                {request.timestamp}
                            </Typography>
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
}
