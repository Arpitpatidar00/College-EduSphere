import { useState } from "react";
import { Modal, Box, Typography, TextField, Button, Stack, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { APP_COLORS } from "../../../../enums/Colors";

const EditProfileModal = ({ open, handleClose, user, handleSave }) => {
    const [formData, setFormData] = useState({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        bio: user?.bio || "",
        location: user?.location || "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="edit-profile-modal"
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Box
                sx={{
                    position: "relative",
                    width: { xs: "90%", sm: 400 }, // Responsive width
                    maxHeight: "90vh", // Limit height on small screens
                    bgcolor: "background.paper",
                    borderRadius: 6, // Slightly softer corners
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)", // Softer, modern shadow
                    p: { xs: 2, sm: 4 }, // Responsive padding
                    overflowY: "auto", // Scrollable if content overflows
                    transition: "transform 0.3s ease, opacity 0.2s ease", // Smooth open/close
                    transform: open ? "scale(1)" : "scale(0.95)",
                    opacity: open ? 1 : 0,
                }}
            >
                {/* Header */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 3, // Increased margin for breathing room
                        borderBottom: "1px solid",
                        borderColor: "grey.200", // Subtle divider
                        pb: 1,
                    }}
                >
                    <Typography
                        variant="h6"
                        component="h2"
                        sx={{
                            fontWeight: 600,
                            color: "text.primary",
                            letterSpacing: "0.02em",
                        }}
                    >
                        Edit Profile
                    </Typography>
                    <IconButton
                        onClick={handleClose}
                        sx={{
                            color: "grey.600",
                            "&:hover": { color: "grey.800", bgcolor: "grey.100" },
                            transition: "color 0.2s ease, background-color 0.2s ease",
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>

                {/* Form Fields */}
                <Stack spacing={2.5}> {/* Slightly larger spacing */}
                    <TextField
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        size="small" // Smaller input for cleaner look
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 1.5,
                                "&:hover fieldset": { borderColor: APP_COLORS.primary[500] },
                                "&.Mui-focused fieldset": { borderColor: APP_COLORS.primary[700] },
                            },
                            "& .MuiInputLabel-root": { color: "grey.600" },
                        }}
                    />
                    <TextField
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        size="small"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 1.5,
                                "&:hover fieldset": { borderColor: APP_COLORS.primary[500] },
                                "&.Mui-focused fieldset": { borderColor: APP_COLORS.primary[700] },
                            },
                            "& .MuiInputLabel-root": { color: "grey.600" },
                        }}
                    />
                    <TextField
                        label="Bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={3}
                        variant="outlined"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 1.5,
                                "&:hover fieldset": { borderColor: APP_COLORS.primary[500] },
                                "&.Mui-focused fieldset": { borderColor: APP_COLORS.primary[700] },
                            },
                            "& .MuiInputLabel-root": { color: "grey.600" },
                        }}
                    />
                    <TextField
                        label="Location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        size="small"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 1.5,
                                "&:hover fieldset": { borderColor: APP_COLORS.primary[500] },
                                "&.Mui-focused fieldset": { borderColor: APP_COLORS.primary[700] },
                            },
                            "& .MuiInputLabel-root": { color: "grey.600" },
                        }}
                    />
                </Stack>

                {/* Save Button */}
                <Button
                    variant="contained"
                    fullWidth
                    sx={{
                        mt: 4, // More space before button
                        py: 1.2, // Taller button
                        bgcolor: APP_COLORS.primary[500],
                        borderRadius: 1.5,
                        textTransform: "none", // Avoid uppercase for modern look
                        fontWeight: 500,
                        "&:hover": {
                            bgcolor: APP_COLORS.primary[700],
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        },
                        "&:active": {
                            bgcolor: APP_COLORS.primary[800],
                        },
                        transition: "background-color 0.3s ease, box-shadow 0.2s ease",
                    }}
                    onClick={() => handleSave(formData)}
                >
                    Save Changes
                </Button>
            </Box>
        </Modal>
    );
};

export default EditProfileModal;