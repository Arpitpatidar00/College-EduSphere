/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Button,
  TextField,
  Snackbar,
  Alert,
  Container,
  Grid
} from '@mui/material';
import axios from 'axios';

const EditProfile = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    profilePicture: ''
  });
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/user/profile');
        setUser(response.data);
      } catch (error) {
        setError('Failed to load user data.');
      }
    };

    fetchUserData();
  }, []);

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      await axios.put('/api/user/change-password', { password: newPassword });
      setSuccess('Password updated successfully.');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      setError('Failed to update password.');
    }
  };

  const handleProfilePictureChange = async () => {
    const formData = new FormData();
    formData.append('profilePicture', profilePictureFile);

    try {
      await axios.put('/api/user/update-profile-picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess('Profile picture updated successfully.');
      setProfilePictureFile(null);
      const response = await axios.get('/api/user/profile');
      setUser(response.data);
    } catch (error) {
      setError('Failed to update profile picture.');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Profile Information
        </Typography>
        <Box display="flex" alignItems="center" mb={3}>
          <Avatar
            alt={user.username}
            src={user.profilePicture || "https://randomuser.me/api/portraits/women/19.jpg"}
            sx={{ width: 80, height: 80, mr: 2 }}
          />
          <Box>
            <Typography variant="h6">{user.username}</Typography>
            <Typography variant="body2" color="textSecondary">{user.email}</Typography>
          </Box>
        </Box>

        <Typography variant="h6" gutterBottom>
          Change Profile Picture
        </Typography>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setProfilePictureFile(e.target.files[0])}
        />
        <Button variant="contained" color="primary" onClick={handleProfilePictureChange} sx={{ mt: 2 }}>
          Update Profile Picture
        </Button>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Change Password
        </Typography>
        <TextField
          label="New Password"
          type="password"
          fullWidth
          margin="normal"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <Button variant="contained" color="primary" onClick={handlePasswordChange} sx={{ mt: 2 }}>
          Update Password
        </Button>

        <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
          <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>

        <Snackbar open={!!success} autoHideDuration={6000} onClose={() => setSuccess('')}>
          <Alert onClose={() => setSuccess('')} severity="success" sx={{ width: '100%' }}>
            {success}
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default EditProfile;
