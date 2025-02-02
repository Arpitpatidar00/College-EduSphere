import { Grid, Container } from "@mui/material";
import AuthContainer from "../components/Auth/LoginSignup/Auth.container";
import HeroContainer from "../components/Auth/HeroContainer/Hero.container";
import { APP_COLORS } from "../enums/Colors";

//  this will be just a container for me
const LoginPage = () => {
  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Grid
        container
        sx={{
          borderRadius: 4,
          overflow: "hidden",
          bgcolor: APP_COLORS.grey,
          boxShadow: 3,
        }}
      >
        <Grid item xs={6} sx={{ p: 2 }}>
          <AuthContainer />
        </Grid>
        <Grid item xs={6} >
          <HeroContainer />
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;
