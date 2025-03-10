import { Box, Typography } from "@mui/material";
import { BubbleBackground } from "./BubbleBackground";
import { APP_COLORS } from "../../../enums/Colors";
import { Field, ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import * as Components from "../common/userAuth.styles";
import { UserType } from "../../../enums/AuthConstants";
import { useState } from "react";
import { loginThunk } from "../../../store/thunk/auth.thunk";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { ROUTES } from '../../Global/Routes/CommonRoutes';

export default function AdminLoginPage() {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formikConfig = {
        initialValues: { email: "", password: "" },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email format")
                .required("Email is required"),
            password: Yup.string()
                .min(5, "Password must be at least 5 characters")
                .required("Password is required"),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            setLoading(true);
            const loginData = {
                ...values,
                role: UserType.ADMIN,
            };
            try {
                await dispatch(loginThunk(loginData)).unwrap();
                navigate(ROUTES.ADMIN.INDEX);
            } catch (error) {
                toast.error("Invalid credentials: " + (error.message || "Unknown error"));
            } finally {
                setLoading(false);
                setSubmitting(false);
            }
        },
    };

    return (
        <Box
            position="relative"
            sx={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: APP_COLORS.accent,
                overflow: "hidden",
            }}
        >
            {/* Background Animation */}
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 0,
                }}
            >
                <BubbleBackground />
            </Box>

            {/* Login Box */}
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: { xs: "90%", sm: "80%", md: "40%" },
                    maxWidth: "500px",
                    bgcolor: APP_COLORS.accent,
                    color: APP_COLORS.accent,
                    p: { xs: 3, md: 5 },
                    borderRadius: "12px",
                    textAlign: "center",
                    zIndex: 1,
                }}
            >
                <Typography
                    variant="h4"
                    gutterBottom
                    align="center"
                    color="white"
                    sx={{
                        textTransform: "uppercase",
                        letterSpacing: "2px",
                        fontWeight: "bold",
                        position: "relative",
                        display: "inline-block",
                        fontFamily: "Georgia, serif",
                    }}
                >
                    Welcome Back, Admin
                </Typography>

                {/* Form Section */}
                <Box sx={{ mt: 3 }}>
                    <Formik {...formikConfig}>
                        {({ isSubmitting }) => (
                            <Form style={{ width: "100%", textAlign: "center" }}>
                                <Field
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    as={Components.Input}
                                    sx={{ mb: 2 }}
                                />
                                <ErrorMessage name="email" component="div" className="error-message" />

                                <Field
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    as={Components.Input}
                                    sx={{ mb: 2 }}
                                />
                                <ErrorMessage name="password" component="div" className="error-message" />

                                <Components.LinkContainer sx={{ mb: 2 }}>
                                    <Link to="/forgot-password" style={{ cursor: "pointer", color: "white" }}>
                                        Forgot Password?
                                    </Link>
                                </Components.LinkContainer>

                                {/* Smooth Animated Sign In Button */}
                                <Components.Button
                                    type="submit"
                                    disabled={isSubmitting || loading}
                                    sx={{
                                        width: "100%",
                                        maxWidth: "280px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        mt: 3,
                                        py: 1.5,
                                        fontSize: "1.1rem",
                                        fontWeight: "bold",
                                        textTransform: "uppercase",
                                        borderRadius: "8px",
                                        backgroundColor: APP_COLORS.primary,
                                        transition: "all 0.3s ease-in-out",
                                        "&:hover": {
                                            backgroundColor: APP_COLORS.primaryDark,
                                            transform: "scale(1.05)", // Smooth hover effect
                                        },
                                    }}
                                >
                                    {isSubmitting || loading ? "Signing In..." : "Sign In"}
                                </Components.Button>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Box>
        </Box>
    );
}
