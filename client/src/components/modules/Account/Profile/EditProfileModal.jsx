import { useState } from "react";
import { Modal, Box, Typography, TextField, Button, Stack, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { APP_COLORS } from "../../../../enums/Colors";
import { UserType } from "@/enums/AuthConstants";


const EditProfileModal = ({ open, handleClose, user, handleSave, isCollegePending, isStudentPending }) => {


    const [formData, setFormData] = useState({
        ...(user?.role === UserType.STUDENT
            ? {
                firstName: user?.firstName || "",
                lastName: user?.lastName || "",
                bio: user?.bio || "",
                location: user?.location || "",
                website: user?.website || "",
                phoneNumber: user?.phoneNumber || "",
                interest: user?.interest || "",
                socialLinks: {
                    twitter: user?.socialLinks?.twitter || "",
                    instagram: user?.socialLinks?.instagram || "",
                    linkedin: user?.socialLinks?.linkedin || "",
                    facebook: user?.socialLinks?.facebook || "",
                },
            }
            : {
                institutionName: user?.institutionName || "",
                bio: user?.bio || "",
                location: user?.location || "",
                websiteURL: user?.websiteURL || "",
                contactEmail: user?.contactEmail || "",
                contactPhone: user?.contactPhone || "",
                socialLinks: {
                    twitter: user?.socialLinks?.twitter || "",
                    instagram: user?.socialLinks?.instagram || "",
                    linkedin: user?.socialLinks?.linkedin || "",
                    facebook: user?.socialLinks?.facebook || "",
                    youtube: user?.socialLinks?.youtube || "",
                },
            }),
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes("socialLinks.") || name.includes("socialLinks.")) {
            const [parent, child] = name.split(".");
            setFormData({
                ...formData,
                [parent]: {
                    ...formData[parent],
                    [child]: value,
                },
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };


    const isStudent = user?.role === UserType.STUDENT;

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
                    width: { xs: "90%", sm: 800 },
                    maxHeight: "90vh",
                    bgcolor: "background.paper",
                    borderRadius: 6,
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                    p: { xs: 2, sm: 4 },
                    overflowY: "auto",
                    transition: "transform 0.3s ease, opacity 0.2s ease",
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
                        mb: 3,
                        borderBottom: "1px solid",
                        borderColor: "grey.200",
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
                        {isStudent ? "Edit Student Profile" : "Edit College Profile"}
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
                <Stack spacing={2.5}>
                    {isStudent ? (
                        <>
                            <TextField
                                label="First Name"
                                name="firstName"
                                value={formData.firstName}
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
                                label="Interest"
                                name="interest"
                                value={formData.interest}
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
                        </>
                    ) : (
                        <>
                            <TextField
                                label="Institution Name"
                                name="institutionName"
                                value={formData.institutionName}
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
                                label="Contact Email"
                                name="contactEmail"
                                value={formData.contactEmail}
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
                                label="Contact Phone"
                                name="contactPhone"
                                value={formData.contactPhone}
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
                        </>
                    )}

                    {/* Common Fields */}
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
                    <TextField
                        label="Website"
                        name={isStudent ? "website" : "websiteURL"}
                        value={isStudent ? formData.website : formData.websiteURL}
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
                    {isStudent && (
                        <TextField
                            label="Phone Number"
                            name="phoneNumber"
                            value={formData.phoneNumber}
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
                    )}

                    {/* Social Links/Handles */}
                    <TextField
                        label="Twitter"
                        name={isStudent ? "socialLinks.twitter" : "socialLinks.twitter"}
                        value={isStudent ? formData.socialLinks.twitter : formData.socialLinks.twitter}
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
                        label="Instagram"
                        name={isStudent ? "socialLinks.instagram" : "socialLinks.instagram"}
                        value={isStudent ? formData.socialLinks.instagram : formData.socialLinks.instagram}
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
                        label="LinkedIn"
                        name={isStudent ? "socialLinks.linkedin" : "socialLinks.linkedin"}
                        value={isStudent ? formData.socialLinks.linkedin : formData.socialLinks.linkedin}
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
                        label="Facebook"
                        name={isStudent ? "socialLinks.facebook" : "socialLinks.facebook"}
                        value={isStudent ? formData.socialLinks.facebook : formData.socialLinks.facebook}
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
                    {!isStudent && (
                        <TextField
                            label="YouTube"
                            name="socialLinks.youtube"
                            value={formData.socialLinks.youtube}
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
                    )}
                </Stack>

                {/* Save Button */}
                <Button
                    variant="contained"
                    fullWidth
                    loading={isCollegePending | isStudentPending}
                    sx={{
                        mt: 4,
                        py: 1.2,
                        bgcolor: APP_COLORS.primary[500],
                        borderRadius: 4,
                        textTransform: "none",
                        fontWeight: 300,
                        width: 100,
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