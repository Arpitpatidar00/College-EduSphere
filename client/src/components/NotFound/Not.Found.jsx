// src/pages/NotFound.js
import { Link } from "react-router-dom";
import { Container, Typography, Button, Box } from "@mui/material";
import { styled } from "@mui/system";

const NotFound = () => {
  return (
    <StyledContainer>
      <StyledBox>
        <Typography
          variant="h1"
          sx={{
            fontSize: "100px",
            fontWeight: "700",
            marginBottom: "20px",
            color: "#333",
          }}
        >
          404
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: "18px",
            color: "#666",
            marginBottom: "30px",
            textAlign: "center",
          }}
        >
          Oops! The page you're looking for doesn't exist.
        </Typography>
        <Link to="/">
          <StyledButton variant="contained" size="large">
            Go Back to Homepage
          </StyledButton>
        </Link>
      </StyledBox>
    </StyledContainer>
  );
};

const StyledContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  backgroundColor: "#F5F5F5",
  padding: 0,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: "8px",
  backgroundColor: "#FFFFFF",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  width: "100%",
  maxWidth: "400px",
  textAlign: "center",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#007BFF",
  color: "#fff",
  fontWeight: "600",
  borderRadius: "4px",
  padding: "12px 24px",
  transition: "background-color 0.3s ease, transform 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: "#0056b3",
    transform: "scale(1.05)",
  },
}));

export default NotFound;
