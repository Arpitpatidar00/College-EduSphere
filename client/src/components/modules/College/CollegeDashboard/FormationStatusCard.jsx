import React from "react";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const FormationCard = styled(Card)(({ theme }) => ({
    borderRadius: theme.spacing(2),
    backgroundColor: "#1C2526",
    color: "#fff",
    padding: theme.spacing(2),
}));

const FormationStatusCard = () => {
    return (
        <FormationCard>
            <CardContent>
                <Typography variant="h6">FORMATION STATUS</Typography>
                <Typography variant="body2">In progress</Typography>
                <Box sx={{ my: 2 }}>
                    <Box
                        sx={{
                            width: "100%",
                            backgroundColor: "#555",
                            height: 8,
                            borderRadius: 4,
                        }}
                    >
                        <Box
                            sx={{
                                width: "60%",
                                backgroundColor: "#888",
                                height: 8,
                                borderRadius: 4,
                            }}
                        />
                    </Box>
                </Box>
                <Typography variant="body2">Estimated processing</Typography>
                <Typography variant="body2">4-5 business days</Typography>
                <Button
                    variant="outlined"
                    sx={{ mt: 2, color: "#fff", borderColor: "#fff" }}
                >
                    VIEW STATUS
                </Button>
            </CardContent>
        </FormationCard>
    );
};

export default FormationStatusCard;