import { Card, CardContent, Typography, Box, Avatar, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
    borderRadius: theme.spacing(2),
    backgroundColor: "#F5F7FA",
    boxShadow: "none",
    padding: theme.spacing(2),
}));

const RecentActivitiesCard = () => {
    return (
        <StyledCard>
            <CardContent>
                <Typography variant="body2" color="textSecondary">
                    RECENT ACTIVITIES
                </Typography>
                <Box sx={{ mt: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <Avatar sx={{ mr: 1 }}>S</Avatar>
                        <Box>
                            <Typography variant="body2">Student Council</Typography>
                            <Typography variant="caption" color="textSecondary">
                                Posted a new announcement
                            </Typography>
                        </Box>
                        <Typography
                            variant="caption"
                            color="textSecondary"
                            sx={{ ml: "auto" }}
                        >
                            1:30 PM
                        </Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ display: "flex", alignItems: "center", my: 1 }}>
                        <Avatar sx={{ mr: 1 }}>E</Avatar>
                        <Box>
                            <Typography variant="body2">Event Team</Typography>
                            <Typography variant="caption" color="textSecondary">
                                Registered 50 students for Tech Fest
                            </Typography>
                        </Box>
                        <Typography
                            variant="caption"
                            color="textSecondary"
                            sx={{ ml: "auto" }}
                        >
                            12:45 PM
                        </Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ display: "flex", alignItems: "center", my: 1 }}>
                        <Avatar sx={{ mr: 1 }}>C</Avatar>
                        <Box>
                            <Typography variant="body2">Collaboration Lead</Typography>
                            <Typography variant="caption" color="textSecondary">
                                Partnered with XYZ College for Hackathon
                            </Typography>
                        </Box>
                        <Typography
                            variant="caption"
                            color="textSecondary"
                            sx={{ ml: "auto" }}
                        >
                            Yesterday at 9:00 PM
                        </Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                        <Avatar sx={{ mr: 1 }}>A</Avatar>
                        <Box>
                            <Typography variant="body2">Admin</Typography>
                            <Typography variant="caption" color="textSecondary">
                                Updated student profiles
                            </Typography>
                        </Box>
                        <Typography
                            variant="caption"
                            color="textSecondary"
                            sx={{ ml: "auto" }}
                        >
                            Yesterday at 8:30 PM
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </StyledCard>
    );
};

export default RecentActivitiesCard;