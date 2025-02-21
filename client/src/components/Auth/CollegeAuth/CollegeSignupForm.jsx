
import { useState, useEffect } from "react";
import * as Components from "../common/userAuth.styles";
import { Formik, Field } from "formik";
import {
    Stepper,
    Step,
    StepLabel,
    Box,
    Typography,
    Button,
    IconButton, InputAdornment,
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
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { ROUTES } from "../../Global/Routes/CommonRoutes";
import signUpValidationSchemas from "./signUpValidationSchemas";
import UserType from "../../../../../server/src/constants/userTypeEnum";
import InfiniteScrollDropdown from "../../../common/InfiniteScrollDropdown";
import {
    useGetAllCountries,
    useGetAllStates,
    useGetAllCities,
} from "../../../services/api/master/location.service.js";

function CollegeSignupForm({ onSubmit, signIn }) {
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const [countryList, setCountryList] = useState([]);
    const [stateOptions, setStateOptions] = useState([]);
    const [cityOptions, setCityOptions] = useState([]);

    const [selectedState, setSelectedState] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to manage confirm password visibility

    const [countryPagination, setCountryPagination] = useState({
        page: 0,
        pageSize: 20,
    });
    const [statePagination, setStatePagination] = useState({
        page: 0,
        pageSize: 20,
    });
    const [cityPagination, setCityPagination] = useState({
        page: 0,
        pageSize: 20,
    });

    const {
        data: countryData,
        isFetching: fetchingCountries,
        refetch: refetchCountries,
    } = useGetAllCountries(
        { page: countryPagination.page, limit: countryPagination.pageSize, searchTerm },
        { data: [], totalCount: 0 }
    );

    const {
        data: stateData,
        isFetching: fetchingStates,
        refetch: refetchStates,
    } = useGetAllStates(
        { page: statePagination.page, limit: statePagination.pageSize, countryId: selectedCountry },
        { data: [], totalCount: 0 }
    );

    const {
        data: cityData,
        isFetching: fetchingCities,
        refetch: refetchCities,
    } = useGetAllCities({
        page: cityPagination.page,
        limit: cityPagination.pageSize,
        stateId: selectedState,
    });

    useEffect(() => {
        refetchCountries();
    }, [countryPagination, refetchCountries, searchTerm]);

    useEffect(() => {
        if (countryData?.data) {
            setCountryList((prevList) => {
                const existingItems = new Map(prevList.map((item) => [item._id, item]));
                countryData.data.forEach((item) => {
                    existingItems.set(item._id.toString(), {
                        _id: item._id.toString(),
                        label: item.name,
                    });
                });
                return Array.from(existingItems.values());
            });
        }
    }, [countryData]);

    // Fetch states only when a country is selected and state pagination changes
    useEffect(() => {
        if (selectedCountry) {
            refetchStates();
        }
    }, [statePagination, refetchStates, selectedCountry]);

    useEffect(() => {
        if (stateData?.data) {
            setStateOptions((prevList) => {
                const existingItems = new Map(prevList.map((item) => [item._id, item]));
                stateData.data.forEach((item) => {
                    existingItems.set(item._id.toString(), {
                        _id: item._id.toString(),
                        label: item.name,
                    });
                });
                return Array.from(existingItems.values());
            });
        }
    }, [stateData]);

    // Fetch cities only when a state is selected and city pagination changes
    useEffect(() => {
        if (selectedState) {
            refetchCities();
        }
    }, [cityPagination, refetchCities, selectedState]);

    useEffect(() => {
        if (cityData?.data) {
            setCityOptions((prevList) => {
                const existingItems = new Map(prevList.map((item) => [item._id, item]));
                cityData.data.forEach((item) => {
                    existingItems.set(item._id.toString(), {
                        _id: item._id.toString(),
                        label: item.name,
                    });
                });
                return Array.from(existingItems.values());
            });
        }
    }, [cityData]);

    const initialValues = {
        institutionName: "",
        email: "",
        contactPhone: "",
        countryId: "",
        stateId: "",
        cityId: "",
        password: "",
        pinCode: "",
    };

    const handleClickShowPassword = () => setShowPassword((prev) => !prev); // Toggle password visibility
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((prev) => !prev); // Toggle confirm password visibility

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
                            if (step < 3) {
                                setStep(step + 1);
                            } else {
                                await onSubmit({ ...values, role: UserType.COLLEGE }, actions);
                            }
                            setLoading(false);
                        }}
                    >
                        {({ values, errors, touched, handleSubmit, setFieldValue }) => (
                            <Components.Form onSubmit={handleSubmit}>
                                <Stepper activeStep={step} alternativeLabel sx={{ mb: 3 }}>
                                    {[
                                        { label: "Institution Details", icon: <AccountCircle /> },
                                        { label: "Location Information", icon: <Badge /> },
                                        { label: "Password Setup", icon: <Security /> },
                                        { label: "Review", icon: <Description /> },
                                    ].map((item, index) => (
                                        <Step key={index}>
                                            <StepLabel>{item.label}</StepLabel>
                                        </Step>
                                    ))}
                                </Stepper>

                                <Box sx={{ p: 2 }}>
                                    {step === 0 && (
                                        <>
                                            <Typography
                                                variant="h5"
                                                sx={{ color: APP_COLORS.primary[500] }}
                                            >
                                                Institution Details
                                            </Typography>
                                            <Field
                                                as={Components.Input}
                                                name="institutionName"
                                                placeholder="Institution Name"
                                                label="Institution Name"
                                                fullWidth
                                                margin="normal"
                                                error={
                                                    touched.institutionName &&
                                                    Boolean(errors.institutionName)
                                                }
                                                helperText={
                                                    touched.institutionName && errors.institutionName
                                                }
                                                sx={{ bgcolor: APP_COLORS.grey[50] }}
                                            />
                                            <Field
                                                as={Components.Input}
                                                name="email"
                                                label="Contact Email"
                                                fullWidth
                                                placeholder="Contact Email"
                                                margin="normal"
                                                error={
                                                    touched.email && Boolean(errors.email)
                                                }
                                                helperText={touched.email && errors.email}
                                                sx={{ bgcolor: APP_COLORS.grey[50] }}
                                            />
                                            <Field
                                                as={Components.Input}
                                                name="contactPhone"
                                                label="Contact Phone"
                                                fullWidth
                                                placeholder="Contact Phone"
                                                margin="normal"
                                                error={
                                                    touched.contactPhone && Boolean(errors.contactPhone)
                                                }
                                                helperText={touched.contactPhone && errors.contactPhone}
                                                sx={{ bgcolor: APP_COLORS.grey[50] }}
                                            />
                                        </>
                                    )}

                                    {step === 1 && (
                                        <>
                                            <Typography
                                                variant="h5"
                                                sx={{ color: APP_COLORS.primary[500] }}
                                            >
                                                Location Information
                                            </Typography>

                                            <InfiniteScrollDropdown
                                                fetchData={refetchCountries}
                                                options={countryList}
                                                selectedValue={values.countryId}
                                                onChange={(value) => {
                                                    setFieldValue("countryId", value);
                                                    setSelectedCountry(value);
                                                    setStateOptions([]);
                                                    setFieldValue("stateId", "");
                                                    setCityOptions([]);
                                                    setFieldValue("cityId", "");
                                                    setCountryPagination({ page: 0, pageSize: 20 });
                                                }}
                                                searchTerm={searchTerm}
                                                setSearchTerm={setSearchTerm}
                                                loading={fetchingCountries}
                                                paginationModel={countryPagination}
                                                setPaginationModel={setCountryPagination}
                                                label="Select an Country"

                                            />

                                            {/* State Dropdown */}
                                            <InfiniteScrollDropdown
                                                fetchData={refetchStates}
                                                options={stateOptions}
                                                selectedValue={values.stateId}
                                                onChange={(value) => {
                                                    setFieldValue("stateId", value);
                                                    setSelectedState(value);
                                                    setCityOptions([]);
                                                    setFieldValue("cityId", "");
                                                    setStatePagination({ page: 0, pageSize: 20 });
                                                }}
                                                searchTerm={searchTerm}
                                                setSearchTerm={setSearchTerm}
                                                loading={fetchingStates}
                                                paginationModel={statePagination}
                                                setPaginationModel={setStatePagination}
                                                label="Select an State"

                                            />

                                            <InfiniteScrollDropdown
                                                fetchData={refetchCities}
                                                options={cityOptions}
                                                selectedValue={values.cityId}
                                                onChange={(value) => {
                                                    setFieldValue("cityId", value);
                                                }}
                                                searchTerm={searchTerm}
                                                setSearchTerm={setSearchTerm}
                                                loading={fetchingCities}
                                                paginationModel={cityPagination}
                                                setPaginationModel={setCityPagination}
                                                label="Select an City"

                                            />
                                            <Field
                                                as={Components.Input}
                                                name="pinCode"
                                                label="Pin Code"
                                                fullWidth
                                                placeholder="Pin Code"
                                                margin="normal"
                                                error={
                                                    touched.pinCode && Boolean(errors.pinCode)
                                                }
                                                helperText={touched.pinCode && errors.pinCode}
                                                sx={{ bgcolor: APP_COLORS.grey[50] }}
                                            />
                                        </>
                                    )}
                                    {step === 2 && (
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
                                                type={showPassword ? "text" : "password"} // Toggle password visibility
                                                error={touched.password && Boolean(errors.password)}
                                                helperText={touched.password && errors.password}
                                                sx={{ bgcolor: APP_COLORS.grey[50] }}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                onClick={handleClickShowPassword}
                                                                edge="end"
                                                            >
                                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />

                                            <Field
                                                as={Components.Input}
                                                name="confirmPassword"
                                                label="Confirm Password"
                                                fullWidth
                                                placeholder="Confirm Password"
                                                margin="normal"
                                                type={showConfirmPassword ? "text" : "password"} // Toggle confirm password visibility
                                                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                                                helperText={touched.confirmPassword && errors.confirmPassword}
                                                sx={{ bgcolor: APP_COLORS.grey[50] }}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                onClick={handleClickShowConfirmPassword}
                                                                edge="end"
                                                            >
                                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </>
                                    )}
                                    {step === 3 && (
                                        <>
                                            <Typography
                                                variant="h5"
                                                sx={{ color: APP_COLORS.primary[500] }}
                                            >
                                                Review Details
                                            </Typography>
                                            <Box sx={{ mt: 2 }}>
                                                <Typography variant="body1">
                                                    <strong>Institution Name:</strong>{" "}
                                                    {values.institutionName}
                                                </Typography>
                                                <Typography variant="body1">
                                                    <strong>Contact Email:</strong> {values.contactEmail}
                                                </Typography>
                                                <Typography variant="body1">
                                                    <strong>Contact Phone:</strong> {values.contactPhone}
                                                </Typography>
                                                <Typography variant="body1">
                                                    <strong>Country:</strong>{" "}
                                                    {
                                                        countryList.find(
                                                            (option) => option._id === values.countryId
                                                        )?.label
                                                    }
                                                </Typography>
                                                <Typography variant="body1">
                                                    <strong>State:</strong>{" "}
                                                    {
                                                        stateOptions.find(
                                                            (option) => option.id === values.stateId
                                                        )?.label
                                                    }
                                                </Typography>
                                                <Typography variant="body1">
                                                    <strong>City:</strong>{" "}
                                                    {
                                                        cityOptions.find(
                                                            (option) => option.id === values.cityId
                                                        )?.label
                                                    }
                                                </Typography>
                                            </Box>
                                        </>
                                    )}
                                </Box>

                                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                                    {step > 0 && (
                                        <Button onClick={() => setStep(step - 1)}>Back</Button>
                                    )}
                                    <Button type="submit">
                                        {step < 3 ? "Next" : "Submit"}
                                    </Button>
                                </Box>
                                <Components.LinkContainer>
                                    <Link to={ROUTES.AUTH.STUDENT} style={{ cursor: "pointer" }}>
                                        Are you a Student? Signup as a Student
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

export default CollegeSignupForm;
