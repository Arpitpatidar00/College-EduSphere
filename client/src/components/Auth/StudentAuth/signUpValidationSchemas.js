import * as Yup from "yup";

const signUpValidationSchemas = [
  Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
  }),
  Yup.object({
    enrollmentId: Yup.string().required("enrollmentId is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  }),
  Yup.object({
    collegeId: Yup.string().required("College is required"),
    courseId: Yup.string().required("Course is required"),
  }),
  Yup.object({
    password: Yup.string()
      .min(5, "Password must be at least 5 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  }),
  Yup.object({}),
];
export default signUpValidationSchemas;
