import React from 'react';
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Container,
  Link,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import BackgroundImage from '/assets/swag-slayer-dd2EOQBycJY-unsplash.jpg'; // Replace with actual image path

const AdminLoginPage = () => {
  return (
    <Container maxWidth={false} sx={{
      height: "calc(100vh - 64px)",
      display: 'flex',
      bgcolor: '#f5f5f5',
      overflow: 'hidden',
      padding: 2,
      borderRadius: 4,
    }}>
      <Grid container sx={{ height: '100%', overflow: 'hidden' }}>

        {/* Left Side (Form) */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 4,
            bgcolor: '#fff',
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: 400,
              textAlign: 'center'
            }}
          >
            <Typography variant="h4" gutterBottom>
              Crextio
            </Typography>
            <Typography variant="h5" gutterBottom>
              Create an account
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Sign up and get 30 day free trial
            </Typography>

            <Box sx={{ mt: 3 }}>
              <TextField
                fullWidth
                label="Full Name"
                variant="outlined"
                margin="normal"
                defaultValue="Amélie Laurent"
              />
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                margin="normal"
                defaultValue="amélielaurent7622@gmail.com"
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                defaultValue="************"
              />

              <Button
                variant="contained"
                size="large"
                sx={{
                  mt: 2,
                  bgcolor: '#ffca28', // Yellow button
                  color: '#000',
                  '&:hover': { bgcolor: '#ffb300' }
                }}
                fullWidth
              >
                Submit
              </Button>

              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-around' }}>
                <Button
                  variant="outlined"
                  startIcon={<img src="/path-to-apple-icon.png" alt="Apple" width="20" />} // Replace with actual path
                  sx={{ borderColor: '#000', color: '#000' }}
                >
                  Apple
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<img src="/path-to-google-icon.png" alt="Google" width="20" />} // Replace with actual path
                  sx={{ borderColor: '#000', color: '#000' }}
                >
                  Google
                </Button>
              </Box>

              <Typography variant="body2" sx={{ mt: 2 }}>
                Have any account? <Link href="#" underline="hover">Sign in</Link>
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                <Link href="#" underline="hover">Terms & Conditions</Link>
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Right Side (Image with Custom Curve) */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            position: 'relative',
            backgroundImage: `url(${BackgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: { xs: 'none', md: 'block' }, // Hide on mobile
            borderRadius: 20,
            overflow: 'hidden',
            WebkitMaskImage: `url("data:image/svg+xml,
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>
        <path d='M0,0 L80,0 Q100,0 100,20 L100,80 Q100,100 80,100 L0,100 Z' fill='white'/>
      </svg>")`,
            maskImage: `url("data:image/svg+xml,
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>
        <path d='M0,0 L80,0 Q100,0 100,20 L100,80 Q100,100 80,100 L0,100 Z' fill='white'/>
      </svg>")`,
          }}



        >
          {/* Floating Close Button */}
          <IconButton
            sx={{
              position: 'absolute',
              top: 20,
              right: 20,
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '50%',
              width: 40,
              height: 40,
              boxShadow: 2,
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 1)' }
            }}
          >
            <CloseIcon />
          </IconButton>
        </Grid>

      </Grid>
    </Container>
  );
};

export default AdminLoginPage;