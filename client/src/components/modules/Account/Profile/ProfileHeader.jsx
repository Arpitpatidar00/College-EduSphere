import { useState, useRef } from "react";
import {
    Box,
    Typography,
    Avatar,
    IconButton,
    Chip,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import { APP_COLORS } from "../../../../enums/Colors";
import { transformImagePath } from "../../../../utils/image.utils";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import SettingsIcon from "@mui/icons-material/Settings";
import EditProfileModal from "./EditProfileModal";
import { useUpdateCollege } from "@services/api/Auth/college.service";
import { useUpdateStudent } from "@services/api/Auth/student.service";
import { useDispatch } from "react-redux";
import { UserType } from "@/enums/AuthConstants";
import { updateUserState } from "@/store/slices/auth.slice";
import { useTheme, useMediaQuery } from "@mui/material";

const StyledDialog = {
    "& .MuiDialog-paper": {
        borderRadius: 8,
        padding: "16px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
        maxWidth: { xs: "90%", sm: "500px" },
    },
};

const ProfileHeader = ({ user, onProfileChange }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // xs (0-600px)
    const dispatch = useDispatch();
    const { mutateAsync: updateStudent, isPending: isStudentPending } = useUpdateStudent();
    const { mutateAsync: updateCollege, isPending: isCollegePending } = useUpdateCollege();

    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isImageConfirmOpen, setImageConfirmOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleEditClick = () => setEditModalOpen(true);
    const handleSaveChanges = async (updatedData) => {
        try {
            let result;
            const formData = new FormData();
            Object.entries(updatedData).forEach(([key, value]) => {
                if (key === "profilePictureFile" && value) {
                    formData.append("profilePicture", value);
                } else if (value !== undefined && value !== null) {
                    formData.append(key, value);
                }
            });

            if (user.role === UserType.STUDENT) {
                result = await updateStudent({ body: formData, id: user._id });
            } else if (user.role === UserType.COLLEGE) {
                result = await updateCollege({ body: formData, id: user._id });
            }

            if (result.result?.user && dispatch) dispatch(updateUserState(result.result.user));
            if (onProfileChange && result.result?.user) onProfileChange(result.result.user);
            setEditModalOpen(false);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    const handleProfilePictureChange = () => fileInputRef.current?.click();
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
            formData.append("profilePicture", selectedFile);
            try {
                let result;
                if (user.role === UserType.STUDENT) result = await updateStudent({ body: formData });
                else if (user.role === UserType.COLLEGE) result = await updateCollege({ body: formData });
                if (result.result.user) {
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
        <Box sx={{ position: "relative", width: "100%", pt: { xs: 4, sm: 6, md: 12 } }}>
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: { xs: 100, sm: 150, md: 200 },
                    background: "linear-gradient(90deg, rgba(132, 161, 191, 0.5) 0%, rgba(255, 182, 217, 0.5) 100%)",
                    borderTopLeftRadius: { xs: 10, sm: 15, md: 20 },
                    borderTopRightRadius: { xs: 10, sm: 15, md: 20 },
                    zIndex: -1,
                }}
            />

            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: "space-between",
                    alignItems: "center",
                    maxWidth: { xs: "100%", sm: "90%", md: "1200px" },
                    mx: "auto",
                    p: { xs: 1, sm: 2, md: 3 },
                }}
            >
                <Box
                    sx={{
                        position: "relative",
                        display: "inline-block",
                        width: { xs: "150px", sm: "200px", md: "350px" },
                        height: { xs: "150px", sm: "200px", md: "350px" },
                        mb: { xs: 2, md: 0 },
                    }}
                >
                    <Avatar
                        src={
                            previewImage ||
                            (user?.profilePicture ? transformImagePath(user.profilePicture) : "https://via.placeholder.com/150")
                        }
                        alt={`${user?.firstName || user.institutionName} ${user?.lastName ?? ""}`}
                        sx={{
                            width: "100%",
                            height: "100%",
                            border: `4px solid ${APP_COLORS.accent?.[100] ?? "#ccc"}`,
                            borderRadius: "20%",
                            boxShadow: "0 4px 10px rgba(157, 157, 157, 0.1)",
                        }}
                        imgProps={{
                            style: { objectFit: "cover", objectPosition: "top" },
                        }}
                    />
                    <IconButton
                        onClick={handleProfilePictureChange}
                        sx={{
                            position: "absolute",
                            bottom: { xs: 0, sm: 5, md: 10 },
                            right: { xs: 0, sm: 5, md: 10 },
                            backgroundColor: APP_COLORS.primary[500],
                            color: "#fff",
                            border: "2px solid white",
                            padding: { xs: 0.5, sm: 1 },
                            "&:hover": { backgroundColor: APP_COLORS.primary[700] },
                        }}
                    >
                        <AddIcon sx={{ fontSize: { xs: 16, sm: 20, md: 24 } }} />
                    </IconButton>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        style={{ display: "none" }}
                    />
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 1, sm: 2 }, px: { xs: 0, sm: 2, md: 4 } }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, sm: 1 }, flexWrap: "wrap" }}>
                        <Typography
                            variant={isMobile ? "h6" : "h4"}
                            component="h1"
                            sx={{ fontWeight: "bold", wordBreak: "break-word" }}
                        >
                            {user?.firstName || user?.institutionName} {user?.lastName}
                        </Typography>
                        <IconButton
                            onClick={handleEditClick}
                            sx={{
                                backgroundColor: APP_COLORS.grey[200],
                                color: APP_COLORS.primary[500],
                                borderRadius: "50%",
                                padding: { xs: 0.5, sm: 1 },
                                "&:hover": { backgroundColor: APP_COLORS.grey[300] },
                            }}
                        >
                            <EditIcon fontSize={isMobile ? "small" : "medium"} />
                        </IconButton>
                        <IconButton
                            sx={{
                                backgroundColor: APP_COLORS.grey[200],
                                color: APP_COLORS.primary[500],
                                borderRadius: "50%",
                                padding: { xs: 0.5, sm: 1 },
                                "&:hover": { backgroundColor: APP_COLORS.grey[300] },
                            }}
                        >
                            <SettingsIcon fontSize={isMobile ? "small" : "medium"} />
                        </IconButton>
                    </Box>

                    <Box sx={{ display: "flex", gap: { xs: 0.5, sm: 1 }, mt: { xs: 0.5, sm: 1 }, flexWrap: "wrap" }}>
                        <Chip
                            label={`Followers: ${user?.followers ?? 0}`}
                            sx={{
                                backgroundColor: APP_COLORS.grey[200],
                                color: APP_COLORS.primary[500],
                                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                                minHeight: { xs: "28px", sm: "32px" },
                            }}
                        />
                        <Chip
                            label={`Following: ${user?.following ?? 0}`}
                            sx={{
                                backgroundColor: APP_COLORS.grey[200],
                                color: APP_COLORS.primary[500],
                                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                                minHeight: { xs: "28px", sm: "32px" },
                            }}
                        />
                    </Box>

                    <Typography
                        color="text.secondary"
                        sx={{ fontSize: { xs: "0.875rem", sm: "1rem" }, mt: { xs: 0.5, sm: 1 }, wordBreak: "break-word" }}
                    >
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

            <Dialog open={isImageConfirmOpen} onClose={handleImageCancel} sx={StyledDialog}>
                <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>Confirm Profile Picture</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: 2 }}>
                        {previewImage && (
                            <Avatar
                                src={previewImage}
                                alt={`${user?.firstName || user.institutionName} ${user?.lastName ?? ""}`}
                                sx={{
                                    width: { xs: "200px", sm: "300px" },
                                    height: { xs: "200px", sm: "300px" },
                                    border: `4px solid ${APP_COLORS.accent?.[200] ?? "#ccc"}`,
                                    borderRadius: "20%",
                                    boxShadow: "0 4px 10px rgba(157, 157, 157, 0.1)",
                                }}
                                imgProps={{ style: { objectFit: "cover", objectPosition: "top" } }}
                            />
                        )}
                    </Box>
                </DialogContent>
                <DialogActions sx={{ justifyContent: "center", gap: 2 }}>
                    <Button onClick={handleImageCancel} variant="outlined" sx={{ borderRadius: "8px" }}>
                        Cancel
                    </Button>
                    <Button onClick={handleImageConfirm} color="primary" variant="contained" sx={{ borderRadius: "8px", px: 3 }}>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ProfileHeader;