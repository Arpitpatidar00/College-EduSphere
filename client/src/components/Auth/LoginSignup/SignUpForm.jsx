import {
  Visibility,
  VisibilityOff,
  Google as GoogleIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { useFormik } from "formik";
import * as Yup from "yup";

const signupValidation = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  dob: Yup.date().required("Date of Birth is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  acceptTerms: Yup.boolean().oneOf(
    [true],
    "You must accept the terms and conditions"
  ),
});

const SignUpForm = ({ showPassword, togglePasswordVisibility }) => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      dob: null,
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
    validationSchema: signupValidation,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Box mt={3} component="form" onSubmit={formik.handleSubmit}>
      <TextField
        label="First Name"
        fullWidth
        margin="normal"
        name="firstName"
        value={formik.values.firstName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
        helperText={formik.touched.firstName && formik.errors.firstName}
      />
      <TextField
        label="Last Name"
        fullWidth
        margin="normal"
        name="lastName"
        value={formik.values.lastName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
        helperText={formik.touched.lastName && formik.errors.lastName}
      />
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <DemoContainer components={["DatePicker"]}>
        <Stack direction="column" width="100%">
          <DatePicker
            sx={{ width: "100%" }}
            label="Date of Birth"
            value={formik.values.dob}
            onChange={(newDate) => {
              formik.setFieldValue("dob", newDate);
              formik.setTouched("dob", true);
            }}
          />
          {formik.touched.dob && Boolean(formik.errors.dob) && (
            <Typography color="error" variant="caption">
              {formik.errors.dob}
            </Typography>
          )}
        </Stack>
      </DemoContainer>
      <TextField
        label="Password"
        type={showPassword ? "text" : "password"}
        fullWidth
        margin="normal"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={togglePasswordVisibility}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Confirm Password"
        type={showPassword ? "text" : "password"}
        fullWidth
        margin="normal"
        name="confirmPassword"
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.confirmPassword &&
          Boolean(formik.errors.confirmPassword)
        }
        helperText={
          formik.touched.confirmPassword && formik.errors.confirmPassword
        }
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={togglePasswordVisibility}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <FormControlLabel
        control={
          <Checkbox
            name="acceptTerms"
            checked={formik.values.acceptTerms}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        }
        label="I accept the terms and conditions"
        sx={{ mt: 2 }}
      />
      {formik.touched.acceptTerms && Boolean(formik.errors.acceptTerms) && (
        <Typography variant="body2" color="error" sx={{ mt: -1, mb: 1 }}>
          {formik.errors.acceptTerms}
        </Typography>
      )}
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        Sign Up
      </Button>
      <Typography align="center" variant="body2" sx={{ mt: 2 }}>
        OR
      </Typography>
      <Button
        variant="outlined"
        fullWidth
        startIcon={<GoogleIcon />}
        sx={{ mt: 2 }}
      >
        Sign up with Google
      </Button>
    </Box>
  );
};

export default SignUpForm;
