import React from "react";
import { Card, CardContent, Typography, Box, Avatar, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
    borderRadius: theme.spacing(2),
    backgroundColor: "#F5F7FA",
    boxShadow: "none",
    padding: theme.spacing(2),
}));

const RecentEmailsCard = () => {
    return (
        <StyledCard>
            <CardContent>
                <Typography variant="body2" color="textSecondary">
                    RECENT EMAILS
                </Typography>
                <Box sx={{ mt: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <Avatar sx={{ mr: 1 }}>H</Avatar>
                        <Box>
                            <Typography variant="body2">Hannah Morgan</Typography>
                            <Typography variant="caption" color="textSecondary">
                                Meeting scheduled
                            </Typography>
                        </Box>
                        <Typography
                            variant="caption"
                            color="textSecondary"
                            sx={{ ml: "auto" }}
                        >
                            1:24 PM
                        </Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ display: "flex", alignItems: "center", my: 1 }}>
                        <Avatar sx={{ mr: 1 }}>M</Avatar>
                        <Box>
                            <Typography variant="body2">Megan Clark</Typography>
                            <Typography variant="caption" color="textSecondary">
                                Update on marketing campaign
                            </Typography>
                        </Box>
                        <Typography
                            variant="caption"
                            color="textSecondary"
                            sx={{ ml: "auto" }}
                        >
                            12:32 PM
                        </Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ display: "flex", alignItems: "center", my: 1 }}>
                        <Avatar sx={{ mr: 1 }}>B</Avatar>
                        <Box>
                            <Typography variant="body2">Brandon Williams</Typography>
                            <Typography variant="caption" color="textSecondary">
                                DESIGNLY 2.0 is about to launch
                            </Typography>
                        </Box>
                        <Typography
                            variant="caption"
                            color="textSecondary"
                            sx={{ ml: "auto" }}
                        >
                            Yesterday at 8:57 PM
                        </Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                        <Avatar sx={{ mr: 1 }}>R</Avatar>
                        <Box>
                            <Typography variant="body2">Reid Smith</Typography>
                            <Typography variant="caption" color="textSecondary">
                                My friend Julie loves Dappr!
                            </Typography>
                        </Box>
                        <Typography
                            variant="caption"
                            color="textSecondary"
                            sx={{ ml: "auto" }}
                        >
                            Yesterday at 8:49 PM
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </StyledCard>
    );
};

export default RecentEmailsCard;