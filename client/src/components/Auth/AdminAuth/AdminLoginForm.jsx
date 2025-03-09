import { Box, Typography, Button, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import "./adminLogin.css";

const AdminLoginForm = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        flex: 1,
        background: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 3,
        borderLeft: "1px solid #ddd", // Optional: Add a subtle border to match the screenshot
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: 48,
          color: theme.palette.secondary.main,
          mb: 2,
        }}
      >
        Rive
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: theme.palette.text.secondary, mb: 3 }}
      >
        Log in below or sign up to create a Rive account
      </Typography>
      <Button
        variant="outlined"
        sx={{
          width: 200,
          mb: 1.5,
          borderColor: theme.palette.text.secondary,
          color: theme.palette.secondary.main,
        }}
      >
        Google
      </Button>
      <Button
        variant="outlined"
        sx={{
          width: 200,
          mb: 2,
          borderColor: theme.palette.text.secondary,
          color: theme.palette.secondary.main,
        }}
      >
        Facebook
      </Button>
      <Typography
        variant="body2"
        sx={{ color: theme.palette.text.secondary, mb: 1.5 }}
      >
        or
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Username or email"
        sx={{ width: 200, mb: 1.5 }}
      />
      <TextField
        fullWidth
        variant="outlined"
        type="password"
        placeholder="Password"
        sx={{ width: 200, mb: 2 }}
      />
      <Button
        variant="contained"
        sx={{
          width: 200,
          mb: 1.5,
          background: theme.palette.secondary.main,
          color: theme.palette.background.default,
        }}
      >
        Log in
      </Button>
      <Typography
        variant="body2"
        sx={{
          color: theme.palette.text.secondary,
          textDecoration: "none",
          fontSize: 12,
          '&:hover': {
            textDecoration: 'underline', // Optional: Add hover effect for link
          },
        }}
        component="a"
        href="#"
      >
        Forgot password?
      </Typography>
    </Box>
  );
};

export default AdminLoginForm;