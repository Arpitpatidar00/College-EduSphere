import { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { Key } from "@mui/icons-material";

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!oldPassword || !newPassword || !confirmPassword) {
            setError("All fields are required.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("New password and confirm password do not match.");
            return;
        }

        // Proceed with password update logic (API call)
        setError("");
    };

    return (
        <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                <Key sx={{ fontSize: 40, mr: 2 }} />
                <Typography variant="h4">Change Password</Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 3 }}>
                Update your password for better security.
            </Typography>

            <form onSubmit={handleSubmit}>
                <TextField
                    label="Old Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                />
                <TextField
                    label="New Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <TextField
                    label="Confirm Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                {error && (
                    <Typography color="error" sx={{ mt: 1 }}>
                        {error}
                    </Typography>
                )}

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 3 }}
                >
                    Update Password
                </Button>
            </form>
        </Box>
    );
};

export default ChangePassword;
