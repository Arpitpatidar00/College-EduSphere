import { Link } from "react-router-dom";
import { Container, Typography, Button, Box } from "@mui/material";
import { styled } from "@mui/system";
import { APP_COLORS } from "../../enums/Colors";
// Styled Components
const StyledContainer = styled(Container)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  backgroundColor: APP_COLORS.background,
  padding: 0,
});

const StyledBox = styled(Box)({
  padding: "40px",
  borderRadius: "12px",
  backgroundColor: APP_COLORS.cardBg,
  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
  maxWidth: "420px",
  animation: "fadeIn 0.6s ease-in-out",
  "@keyframes fadeIn": {
    "0%": { opacity: 0, transform: "translateY(-10px)" },
    "100%": { opacity: 1, transform: "translateY(0)" },
  },
});

const StyledButton = styled(Button)({
  backgroundColor: APP_COLORS.primary,
  color: "#fff",
  fontWeight: "600",
  padding: "12px 24px",
  borderRadius: "6px",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: APP_COLORS.primaryDark,
    transform: "scale(1.05)",
  },
});


const NotFound = () => {
  return (
    <StyledContainer>
      <StyledBox>
        <Typography variant="h1" sx={{ fontSize: "120px", fontWeight: "700", color: APP_COLORS.primary }}>
          404
        </Typography>
        <Typography variant="h6" sx={{ fontSize: "20px", color: APP_COLORS.common, marginBottom: "16px" }}>
          Oops! The page you’re looking for doesn’t exist.
        </Typography>
        <Typography variant="body2" sx={{ color: APP_COLORS.text.light, marginBottom: "30px" }}>
          It may have been moved or deleted. Try going back to the homepage.
        </Typography>
        <Link to="/">
          <StyledButton variant="contained">Go Back Home</StyledButton>
        </Link>
      </StyledBox>
    </StyledContainer>
  );
};
export default NotFound;
