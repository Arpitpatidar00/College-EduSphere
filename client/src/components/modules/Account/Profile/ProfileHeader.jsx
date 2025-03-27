import { useState, useRef } from "react";
import { Box, Typography, Avatar, IconButton, Chip, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { APP_COLORS } from "../../../../enums/Colors";
import { transformImagePath } from "../../../../utils/image.utils";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import SettingsIcon from "@mui/icons-material/Settings"; // Added Settings icon

import EditProfileModal from "./EditProfileModal";
import { useUpdateCollege } from "@services/api/Auth/college.service";
import { useUpdateStudent } from "@services/api/Auth/student.service";
import { useDispatch } from "react-redux";
import { UserType } from "@/enums/AuthConstants";
import { updateUserState } from "@/store/slices/auth.slice";

const ProfileHeader = ({ user, onProfileChange }) => {
    const dispatch = useDispatch();
    const { mutateAsync: updateStudent, isPending: isStudentPending } = useUpdateStudent();
    const { mutateAsync: updateCollege, isPending: isCollegePending } = useUpdateCollege();

    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isImageConfirmOpen, setImageConfirmOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleEditClick = () => {
        setEditModalOpen(true);
    };

    const handleSaveChanges = async (updatedData) => {
        try {
            let result;
            const formData = new FormData();

            Object.entries(updatedData).forEach(([key, value]) => {
                if (key === 'profilePictureFile' && value) {
                    formData.append('profilePicture', value);
                } else if (value !== undefined && value !== null) {
                    formData.append(key, value);
                }
            });

            if (user.role === UserType.STUDENT) {
                result = await updateStudent({ body: formData, id: user._id });
            } else if (user.role === UserType.COLLEGE) {

                result = await updateCollege({ body: formData, id: user._id });

            }

            if (result.result?.user && dispatch) {
                dispatch(updateUserState(result.result.user));
            }

            if (onProfileChange && result.result?.user) {
                onProfileChange(result.result.user);
            }

            setEditModalOpen(false);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    const handleProfilePictureChange = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl);
            setSelectedFile(file);
            setImageConfirmOpen(true);
            event.target.value = null;
        }
    };

    const handleImageConfirm = async () => {
        if (selectedFile) {

            const formData = new FormData();
            formData.append('profilePicture', selectedFile);

            try {
                let result;

                if (user.role === UserType.STUDENT) {
                    result = await updateStudent({ body: formData });
                } else if (user.role === UserType.COLLEGE) {

                    result = await updateCollege({ body: formData });
                }
                if (result.result.user) {
                    console.log('result.result.user: ', result.result.user);
                    dispatch(updateUserState(result.result.user));
                    onProfileChange(result.result.user);
                }
            } catch (error) {
                console.error("Error uploading profile picture:", error);
            }
        }
        setImageConfirmOpen(false);
        setPreviewImage(null);
        setSelectedFile(null);
    };

    const handleImageCancel = () => {
        setImageConfirmOpen(false);
        setPreviewImage(null);
        setSelectedFile(null);
    };

    return (
        <Box sx={{ position: "relative", width: "100%", pt: 12 }}>
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: 200,
                    background:
                        "linear-gradient(90deg, rgba(132, 161, 191, 0.5) 0%, rgba(255, 182, 217, 0.5) 100%)",
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    zIndex: -1,
                }}
            />

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    maxWidth: 1200,
                    mx: "auto",
                    p: 3,
                }}
            >
                <Box
                    sx={{
                        position: "relative",
                        display: "inline-block",
                        width: 350,
                        height: 350,
                    }}
                >
                    <Avatar
                        src={
                            previewImage ||
                            (user?.profilePicture
                                ? transformImagePath(user.profilePicture)
                                : "https://via.placeholder.com/150")
                        }
                        alt={`${user?.firstName || user.institutionName} ${user?.lastName ?? ""}`}
                        sx={{
                            width: "100%",
                            height: "100%",
                            border: `10px solid ${APP_COLORS.accent?.[100] ?? "#ccc"}`,
                            borderRadius: "20%",
                            boxShadow: "0 4px 10px rgba(157, 157, 157, 0.1)",
                        }}
                        imgProps={{
                            style: {
                                objectFit: "cover",
                                objectPosition: "top",
                            },
                        }}
                    />
                    <IconButton
                        onClick={handleProfilePictureChange}
                        sx={{
                            position: "absolute",
                            bottom: 10,
                            right: 10,
                            backgroundColor: APP_COLORS.primary[500],
                            color: "#fff",
                            border: "2px solid white",
                            "&:hover": { backgroundColor: APP_COLORS.primary[700] },
                        }}
                    >
                        <AddIcon />
                    </IconButton>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        style={{ display: "none" }}
                    />
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 1, flex: 1, px: 4 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
                            {user?.firstName || user?.institutionName} {user?.lastName}
                        </Typography>
                        <IconButton
                            onClick={handleEditClick}
                            sx={{
                                backgroundColor: APP_COLORS.grey[200],
                                color: APP_COLORS.primary[500],
                                borderRadius: "50%",
                                padding: "4px",
                                "&:hover": { backgroundColor: APP_COLORS.grey[300] },
                            }}
                        >
                            <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                            // onClick={handleSettingsClick}
                            sx={{
                                backgroundColor: APP_COLORS.grey[200],
                                color: APP_COLORS.primary[500],
                                borderRadius: "50%",
                                padding: "4px",
                                "&:hover": { backgroundColor: APP_COLORS.grey[300] },
                            }}
                        >
                            <SettingsIcon fontSize="small" />
                        </IconButton>
                    </Box>

                    <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                        <Chip
                            label={`Followers: ${user?.followers ?? 0}`}
                            sx={{
                                backgroundColor: APP_COLORS.grey[200],
                                color: APP_COLORS.primary[500],
                                fontSize: "0.875rem",
                                minHeight: "32px",
                            }}
                        />
                        <Chip
                            label={`Following: ${user?.following ?? 0}`}
                            sx={{
                                backgroundColor: APP_COLORS.grey[200],
                                color: APP_COLORS.primary[500],
                                fontSize: "0.875rem",
                                minHeight: "32px",
                            }}
                        />
                    </Box>

                    <Typography color="text.secondary" sx={{ fontSize: "1rem", mt: 0.5 }}>
                        {user?.bio ?? "No bio available"}
                    </Typography>
                </Box>
            </Box>

            <EditProfileModal
                open={isEditModalOpen}
                handleClose={() => setEditModalOpen(false)}
                user={user}
                handleSave={handleSaveChanges}
                isCollegePending={isCollegePending}
                isStudentPending={isStudentPending}
            />

            <Dialog open={isImageConfirmOpen} onClose={handleImageCancel}>
                <DialogTitle>Confirm Profile Picture</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        {previewImage && (
                            <Avatar
                                src={previewImage}
                                sx={{ width: 200, height: 200 }}
                            />
                        )}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleImageCancel}>Cancel</Button>
                    <Button onClick={handleImageConfirm} color="primary" variant="contained">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ProfileHeader;