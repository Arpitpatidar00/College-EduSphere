import { Card, CardContent, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme, isSelected }) => ({
    borderRadius: theme.spacing(2),
    backgroundColor: "#F5F7FA",
    boxShadow: isSelected ? "0 0 10px rgba(0, 0, 0, 0.2)" : "none",
    padding: theme.spacing(2),
    cursor: "pointer",
    "&:hover": {
        boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
    },
}));

const StatsCard = ({ icon: Icon, value, label, onClick, isSelected }) => {
    return (
        <StyledCard onClick={onClick} isSelected={isSelected}>
            <CardContent sx={{ display: "flex", alignItems: "center" }}>
                <Icon sx={{ mr: 2, fontSize: 40 }} />
                <Box>
                    <Typography variant="h6">{value}</Typography>
                    <Typography variant="body2" color="textSecondary">
                        {label}
                    </Typography>
                </Box>
            </CardContent>
        </StyledCard>
    );
};

export default StatsCard;