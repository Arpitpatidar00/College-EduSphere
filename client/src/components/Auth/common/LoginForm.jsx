import { useState } from "react";
import { useLocation } from "react-router-dom";
import * as Components from "../common/userAuth.styles";
import * as Yup from "yup";
import { Formik, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import Loader from "../../Common/Loading/Loading";
import ROUTES from "../../Global/Routes/CommonRoutes";
import { UserType } from "../../../enums/AuthConstants";

function LoginForm({ onSubmit, signIn }) {
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const isCollege = location.pathname.includes(UserType.COLLEGE);
    const title = isCollege ? "College Login" : "Student Login";
    const emailPlaceholder = isCollege ? "College Email" : "Student Email";
    const signInButtonText = isCollege ? "Login as College" : "Login as Student";

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
        onSubmit: async (values, actions) => {
            setLoading(true);

            const loginData = {
                ...values,
                role: isCollege ? "college" : "student",
            };


            await onSubmit(loginData, actions);
            setLoading(false);
        },
    };

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <Components.SignInContainer signinIn={signIn}>
                    <Formik {...formikConfig}>
                        {({ handleSubmit, isSubmitting }) => (
                            <Components.Form onSubmit={handleSubmit}>
                                <Components.Title>{title}</Components.Title>

                                <Field
                                    name="email"
                                    type="email"
                                    placeholder={emailPlaceholder}
                                    as={Components.Input}
                                />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="error-message"
                                />

                                <Field
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    as={Components.Input}
                                />
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="error-message"
                                />

                                <Components.LinkContainer>
                                    <Link to="/forgot-password" style={{ cursor: "pointer" }}>
                                        Forgot Password?
                                    </Link>
                                </Components.LinkContainer>

                                <Components.Button type="submit" disabled={isSubmitting}>
                                    {signInButtonText}
                                </Components.Button>

                                <Components.LinkContainer>
                                    <Link
                                        to={isCollege ? ROUTES.AUTH.STUDENT : ROUTES.AUTH.COLLEGE}
                                        style={{ cursor: "pointer" }}
                                    >
                                        Are you a Student?{" "}
                                        {isCollege ? "Login as a Student" : "Login as a College"}
                                    </Link>
                                </Components.LinkContainer>
                            </Components.Form>
                        )}
                    </Formik>
                </Components.SignInContainer>
            )}
        </>
    );
}

export default LoginForm;
