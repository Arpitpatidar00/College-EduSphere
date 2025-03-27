import { APP_COLORS } from "@/enums/Colors";
import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#fff",
        position: "fixed",
        width: "100%",
      }}
    >
      <Container maxWidth="sm" textAlign="center">
        <Box
          sx={{
            backgroundImage: "url('./assets/notFound.gif')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: 400,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
        </Box>

        <Box mt={-5} textAlign="center">

          <Typography variant="h1" color={APP_COLORS.primary[900]} fontWeight="bold">
            404
          </Typography>
          <Typography variant="h4" fontWeight="bold">
            Looks Like You're Lost
          </Typography>
          <Typography variant="body1" mt={1}>
            The page you are looking for is not available.
          </Typography>
          <Button
            variant="contained"
            backgroundColor={APP_COLORS.primary[900]}
            component={Link}
            to="/"
            sx={{ mt: 2 }}
          >
            Go to Home
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default NotFoundPage;