import { Grid2 } from "@mui/material";
import AuthContainer from "../components/Auth/LoginSignup/Auth.container";
import HeroContainer from "../components/Auth/HeroContainer/Hero.container";

//  this will be just a container for me
const LoginPage = () => {
  return (
    <Grid2 container height="100vh">
      <Grid2 size={6}>
        <AuthContainer />
      </Grid2>
      <Grid2 size={6}>
        <HeroContainer />
      </Grid2>
    </Grid2>
  );
};

export default LoginPage;
