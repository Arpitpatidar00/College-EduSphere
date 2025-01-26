import {
  Visibility,
  VisibilityOff,
  Google as GoogleIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../../../store/thunk/auth.thunk";
import { selectIsAuthenticated } from "../../../store/slices/auth.slice";
import { useNavigate } from "react-router-dom";
const loginValidation = Yup.object({
  email: Yup.string().email().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const LoginForm = ({ showPassword, togglePasswordVisibility }) => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();
  const handleFormSubmit = async (data) => {
    try {
      await dispatch(loginThunk(data)).unwrap();
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidation,
    onSubmit: async (values) => {
      await handleFormSubmit(values);
    },
  });

  return (
    <Box mt={3} component="form" onSubmit={formik.handleSubmit}>
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
      <Box display="flex" justifyContent="flex-end">
        <Button size="small">Forgot Password?</Button>
      </Box>
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        Login
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
        Sign in with Google
      </Button>
    </Box>
  );
};

export default LoginForm;
