import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import * as Components from "../common/userAuth.styles";
import Loader from "../../Common/Loading/Loading";
import LoginForm from "../common/LoginForm";
import CollegeSignupForm from "./CollegeSignupForm";
import { APP_IMAGES } from '../../Common/Images/index';
import { ROUTES } from '../../Global/Routes/CommonRoutes';
import { loginThunk, signupThunk } from '../../../store/thunk/auth.thunk';

function CollegeAuthContainer() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [signIn, setSignIn] = useState(true);
    const [isMobile, setIsMobile] = useState(false);


    const handleSignUp = async (values, { setSubmitting }) => {
        setLoading(true);
        try {
            await dispatch(signupThunk(values)).unwrap();
            navigate(ROUTES.HOME.INDEX);
        } catch (error) {
            toast.error("Error during signup.", error);
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
            toast.error("Invalid credentials", error);
        } finally {
            setLoading(false);
            setSubmitting(false);
        }
    };

    const toggleAuthMode = () => {
        setIsLogin((prev) => !prev);
        setSignIn((prev) => !prev);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth >= 768);
        };
        handleResize();
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
                        <CollegeSignupForm onSubmit={handleSignUp} signIn={signIn} />
                    )}

                    {isMobile && (
                        <Components.OverlayContainer signinIn={signIn}>
                            <Components.Overlay signinIn={signIn}>
                                <Components.LeftOverlayPanel bgImage={APP_IMAGES.COLLEGE_SIGNUP_IMAGE} signinIn={signIn}>
                                    <Components.Title>Hello, Friend!</Components.Title>
                                    <Components.GhostButton onClick={toggleAuthMode}>
                                        Sign In
                                    </Components.GhostButton>
                                </Components.LeftOverlayPanel>
                                <Components.RightOverlayPanel bgImage={APP_IMAGES.COLLEGE_LOGIN_IMAGE} signinIn={signIn}>
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

export default CollegeAuthContainer;
