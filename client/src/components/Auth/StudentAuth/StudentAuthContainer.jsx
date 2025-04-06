import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import * as Components from "../common/userAuth.styles";
import { toast } from "react-toastify";
import Loader from "../../Common/Loading/Loading";
import LoginForm from "../common/LoginForm";
import StudentSignupForm from "./StudentSignupForm";
import { loginThunk, signupThunk } from "../../../store/thunk/auth.thunk";
import { ROUTES } from "../../Global/Routes/CommonRoutes";
import { APP_IMAGES } from "../../Common/Images/index";
import { APP_COLORS } from "@/enums/Colors";

function StudentAuthContainer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [signIn, setSignIn] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 769);

  const handleSignUp = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      await dispatch(signupThunk(values)).unwrap();
      navigate(ROUTES.HOME.INDEX);
    } catch (error) {
      toast.error("Error during signup.");
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  const handleSignIn = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      await dispatch(loginThunk(values)).unwrap();
      navigate(ROUTES.HOME.INDEX);
    } catch (error) {
      toast.error("Invalid credentials");
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  const toggleAuthMode = () => {
    // Delay the animation state slightly for smoother transitions
    setIsLogin((prev) => !prev);
    setTimeout(() => setSignIn((prev) => !prev), 100);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Components.Container>
          {isLogin ? (
            <LoginForm onSubmit={handleSignIn} signIn={signIn} toggleAuthMode={toggleAuthMode} />
          ) : (
            <StudentSignupForm onSubmit={handleSignUp} signIn={signIn} />
          )}

          {isMobile && ( // Show buttons only on desktop (when not mobile)
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 2,
                width: "100%",
                px: 2, // Optional padding for better spacing
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setIsLogin(true);
                  setSignIn(true);
                }}
              >
                Login
              </Button>
              <Button
                variant="outlined"
                color={APP_COLORS.primary[400]}
                onClick={() => {
                  setIsLogin(false);
                  setSignIn(false);
                }}
              >
                Sign Up
              </Button>
            </Box>
          )}

          {!isMobile && (
            <Components.OverlayContainer signinIn={signIn}>
              <Components.Overlay signinIn={signIn}>
                <Components.LeftOverlayPanel
                  bgImage={APP_IMAGES.STUDENT_SIGNUP_IMAGE}
                  signinIn={signIn}
                >
                  <Components.Title>Hello, Friend!</Components.Title>
                  <Components.GhostButton onClick={toggleAuthMode}>
                    Sign In
                  </Components.GhostButton>
                </Components.LeftOverlayPanel>

                <Components.RightOverlayPanel
                  bgImage={APP_IMAGES.STUDENT_LOGIN_IMAGE}
                  signinIn={signIn}
                >
                  <Components.Title>Welcome Back!</Components.Title>
                  <Components.GhostButton onClick={toggleAuthMode}>
                    Sign Up
                  </Components.GhostButton>
                </Components.RightOverlayPanel>
              </Components.Overlay>
            </Components.OverlayContainer>
          )}
        </Components.Container>
      )}
    </>
  );
}

export default StudentAuthContainer;