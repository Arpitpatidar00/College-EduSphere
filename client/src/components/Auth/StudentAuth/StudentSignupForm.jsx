import { useState, useEffect } from "react";
import * as Components from "../common/userAuth.styles";
import { Formik, Field } from "formik";
import {
    Stepper,
    Step,
    StepLabel,
    TextField,
    Box,
    Typography,
    Button,
} from "@mui/material";
import {
    AccountCircle,
    Badge,
    Security,
    Description,
} from "@mui/icons-material";
import Loader from "../../Common/Loading/Loading";
import { APP_COLORS } from "../../../enums/Colors";
import { Link } from "react-router-dom";
import { ROUTES } from "../../Global/Routes/CommonRoutes";
import signUpValidationSchemas from "./signUpValidationSchemas";
import { UserType } from "../../../enums/AuthConstants";
import InfiniteScrollDropdown from "../../../common/InfiniteScrollDropdown";
import { useGetAllCollege } from "../../../services/api/Auth/users";

const courseOptions = [
    { label: "Computer Science", id: "67b385aa8473cd955a191904" },
    { label: "Business Administration", id: "67b385aa8473cd955a191904" },
    { label: "Mechanical Engineering", id: "67b385aa8473cd955a191904" },
];

const steps = [
    { label: "Basic Information", icon: <AccountCircle /> },
    { label: "Additional Details", icon: <Badge /> },
    { label: "Password Setup", icon: <Security /> },
    { label: "Review", icon: <Description /> },
];

function StudentSignupForm({ onSubmit, signIn }) {
    // Manage the current step and loading state
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);

    // College dropdown state management
    const [collegeOptions, setCollegeOptions] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [collegePagination, setCollegePagination] = useState({
        page: 0,
        pageSize: 20,
    });

    const {
        data: collegeData,
        isFetching: fetchingColleges,
        refetch: refetchColleges,
    } = useGetAllCollege(
        { page: collegePagination.page, limit: collegePagination.pageSize, searchTerm },
        { data: [], totalCount: 0 }
    );

    useEffect(() => {
        if (collegeData?.data) {
            setCollegeOptions((prevList) => {
                const existingItems = new Map(prevList.map((item) => [item._id, item]));
                collegeData.data.forEach((item) => {
                    existingItems.set(item._id.toString(), {
                        _id: item._id.toString(),
                        label: item.institutionName,
                    });
                });
                return Array.from(existingItems.values());
            });
        }
    }, [collegeData]);

    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        enrollmentId: "",
        collegeId: "",
        courseId: "",
        password: "",
        confirmPassword: "",
    };

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <Components.SignUpContainer signinIn={signIn}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={signUpValidationSchemas[step]}
                        onSubmit={async (values, actions) => {
                            setLoading(true);
                            try {
                                if (step < steps.length - 1) {
                                    // Move to the next step without clearing the form
                                    setStep(step + 1);
                                    actions.setSubmitting(false);
                                } else {
                                    const signUpData = {
                                        ...values,
                                        role: UserType.STUDENT,
                                    };

                                    // Call the API – if it fails, the error is caught
                                    await onSubmit(signUpData, actions);
                                    // If the API call succeeds, you could reset the form or redirect
                                    // For example: actions.resetForm();
                                }
                            } catch (error) {
                                console.error("Signup failed:", error);
                                // Optionally, set an error message here to show the user
                                // Do not reset the form values, so the user doesn’t have to re-enter data.
                                actions.setSubmitting(false);
                            } finally {
                                setLoading(false);
                            }
                        }}
                    >
                        {({ values, errors, touched, handleSubmit, setFieldValue }) => (
                            <Components.Form onSubmit={handleSubmit}>
                                <Stepper activeStep={step} alternativeLabel sx={{ mb: 3 }}>
                                    {steps.map((item, index) => (
                                        <Step key={index}>
                                            <StepLabel icon={item.icon}>{item.label}</StepLabel>
                                        </Step>
                                    ))}
                                </Stepper>

                                <Box sx={{ p: 2 }}>
                                    {/* Step 0: Basic Information */}
                                    {step === 0 && (
                                        <>
                                            <Typography variant="h5" sx={{ color: APP_COLORS.primary[500] }}>
                                                Basic Information
                                            </Typography>
                                            <Field
                                                as={Components.Input}
                                                name="firstName"
                                                placeholder="First Name"
                                                label="firstName"
                                                fullWidth
                                                margin="normal"
                                                error={touched.firstName && Boolean(errors.firstName)}
                                                helperText={touched.firstName && errors.firstName}
                                                sx={{ bgcolor: APP_COLORS.grey[50] }}
                                            />
                                            <Field
                                                as={Components.Input}
                                                name="lastName"
                                                placeholder="Last Name"
                                                label="lastName"
                                                fullWidth
                                                margin="normal"
                                                error={touched.lastName && Boolean(errors.lastName)}
                                                helperText={touched.lastName && errors.lastName}
                                                sx={{ bgcolor: APP_COLORS.grey[50] }}
                                            />
                                        </>
                                    )}

                                    {/* Step 1: Additional Details */}
                                    {step === 1 && (
                                        <>
                                            <Typography variant="h5" sx={{ color: APP_COLORS.primary[500] }}>
                                                Contact Information
                                            </Typography>
                                            <Field
                                                as={Components.Input}
                                                name="enrollmentId"
                                                placeholder="Enrollment ID"
                                                label="enrollmentId"
                                                fullWidth
                                                margin="normal"
                                                error={touched.enrollmentId && Boolean(errors.enrollmentId)}
                                                helperText={touched.enrollmentId && errors.enrollmentId}
                                                sx={{ bgcolor: APP_COLORS.grey[50] }}
                                            />

                                            <Field
                                                as={Components.Input}
                                                name="email"
                                                placeholder="Email"
                                                label="Email"
                                                fullWidth
                                                margin="normal"
                                                error={touched.email && Boolean(errors.email)}
                                                helperText={touched.email && errors.email}
                                                sx={{ bgcolor: APP_COLORS.grey[50] }}
                                            />
                                        </>
                                    )}

                                    {/* Step 2: College & Course Details */}
                                    {step === 2 && (
                                        <>
                                            <Typography variant="h5" sx={{ color: APP_COLORS.primary[500] }}>
                                                College Details
                                            </Typography>
                                            <InfiniteScrollDropdown
                                                fetchData={refetchColleges}
                                                options={collegeOptions}
                                                selectedValue={values.collegeId}
                                                onChange={(value) => setFieldValue("collegeId", value)}
                                                searchTerm={searchTerm}
                                                setSearchTerm={setSearchTerm}
                                                loading={fetchingColleges}
                                                label="Select College"
                                                paginationModel={collegePagination}
                                                setPaginationModel={setCollegePagination}
                                            />
                                            <Components.StyledAutocomplete
                                                options={courseOptions}
                                                getOptionLabel={(option) => option.label}
                                                value={
                                                    courseOptions.find(
                                                        (option) => option.id === values.courseId
                                                    ) || null
                                                }
                                                onChange={(event, value) =>
                                                    setFieldValue("courseId", value ? value.id : "")
                                                }
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label="Select Course"
                                                        error={touched.courseId && Boolean(errors.courseId)}
                                                        helperText={touched.courseId && errors.courseId}
                                                        sx={{ bgcolor: APP_COLORS.grey[50] }}
                                                    />
                                                )}
                                                sx={{ my: 2 }}
                                            />
                                        </>
                                    )}

                                    {/* Step 3: Password Setup */}
                                    {step === 3 && (
                                        <>
                                            <Typography variant="h5" sx={{ color: APP_COLORS.primary[500] }}>
                                                Password Setup
                                            </Typography>
                                            <Field
                                                as={Components.Input}
                                                name="password"
                                                label="Password"
                                                fullWidth
                                                placeholder="Password"
                                                margin="normal"
                                                type="password"
                                                error={touched.password && Boolean(errors.password)}
                                                helperText={touched.password && errors.password}
                                                sx={{ bgcolor: APP_COLORS.grey[50] }}
                                            />
                                            <Field
                                                as={Components.Input}
                                                name="confirmPassword"
                                                label="Confirm Password"
                                                fullWidth
                                                placeholder="Confirm Password"
                                                margin="normal"
                                                type="password"
                                                error={
                                                    touched.confirmPassword && Boolean(errors.confirmPassword)
                                                }
                                                helperText={
                                                    touched.confirmPassword && errors.confirmPassword
                                                }
                                                sx={{ bgcolor: APP_COLORS.grey[50] }}
                                            />
                                        </>
                                    )}

                                    {/* Step 4: Review */}
                                    {step === 4 && (
                                        <>
                                            <Typography variant="h5" sx={{ color: APP_COLORS.primary[500] }}>
                                                Review Your Information
                                            </Typography>
                                            <Box sx={{ mt: 2 }}>
                                                <Typography variant="body1">
                                                    <strong>Name:</strong> {values.firstName} {values.lastName}
                                                </Typography>
                                                <Typography variant="body1">
                                                    <strong>Enrollment:</strong> {values.enrollmentId}
                                                </Typography>
                                                <Typography variant="body1">
                                                    <strong>Email:</strong> {values.email}
                                                </Typography>
                                                <Typography variant="body1">
                                                    <strong>College:</strong> {values.collegeId}
                                                </Typography>
                                                <Typography variant="body1">
                                                    <strong>Course:</strong> {values.courseId}
                                                </Typography>
                                            </Box>
                                        </>
                                    )}
                                </Box>

                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        mt: 2,
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        disabled={step === 0}
                                        onClick={() => setStep(step - 1)}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{
                                            bgcolor: APP_COLORS.primary[500],
                                            "&:hover": { bgcolor: APP_COLORS.primary[700] },
                                        }}
                                    >
                                        {step < steps.length - 1 ? "Next" : "Sign Up"}
                                    </Button>
                                </Box>

                                <Components.LinkContainer>
                                    <Link to={ROUTES.AUTH.COLLEGE} style={{ cursor: "pointer" }}>
                                        Are you a College? {"Signup as a College"}
                                    </Link>
                                </Components.LinkContainer>
                            </Components.Form>
                        )}
                    </Formik>
                </Components.SignUpContainer>
            )}
        </>
    );
}

export default StudentSignupForm;
