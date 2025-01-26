import { Box, Container, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

const type = {
  LOGIN: "LOGIN",
  SIGNUP: "SIGNUP",
};

const data = {
  [type.LOGIN]: {
    heading: "Welcome Back",
    subheading: "Login to your account",
  },
  [type.SIGNUP]: {
    heading: "Create Account",
    subheading: "Sign up to get started and enjoy our services",
  },
};

const AuthContainer = () => {
  const [whichTab, setWhichTab] = useState(type.LOGIN); // 0 for Login, 1 for Signup
  const [showPassword, setShowPassword] = useState(false);

  const handleTabChange = (event, newValue) => {
    setWhichTab(newValue);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        gap={2}
      >
        <Box display="flex" justifyContent="center" mb={2}>
          <img src="/assets/logo.png" alt="Logo" width="100" />
        </Box>
        <Box textAlign="center">
          <Typography variant="h4" align="center" gutterBottom>
            {data[whichTab].heading}
          </Typography>
          <Typography variant="body1" align="center" gutterBottom>
            {data[whichTab].subheading}
          </Typography>
        </Box>

        <Tabs value={whichTab} onChange={handleTabChange} centered>
          <Tab label="Login" value={type.LOGIN} />
          <Tab label="Signup" value={type.SIGNUP} />
        </Tabs>

        {whichTab === type.LOGIN ? (
          <LoginForm
            showPassword={showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
          />
        ) : (
          <SignUpForm
            showPassword={showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
          />
        )}
      </Stack>
    </Container>
  );
};

export default AuthContainer;
