import * as Yup from "yup";

const signUpValidationSchemas = [
  // Step 0: Institution Details
  Yup.object({
    institutionName: Yup.string().required("Institution Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    contactPhone: Yup.string().required("Contact Phone is required"),
  }),
  // Step 1: Location Information
  Yup.object({
    countryId: Yup.string().required("Country is required"),
    stateId: Yup.string().required("State is required"),
    cityId: Yup.string().required("City is required"),
    pinCode:Yup.string().required("PinCode is required"),
  }),
  // Step 2: Password Setup
  Yup.object({
    password: Yup.string()
      .min(5, "Password must be at least 5 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  }),
  // Step 3: Review – No validations needed here
  Yup.object({}),
];
export default signUpValidationSchemas;
