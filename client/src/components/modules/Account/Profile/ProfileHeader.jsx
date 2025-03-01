import { useState } from "react";
import { Box, Typography, Avatar, IconButton } from "@mui/material";
import { APP_COLORS } from "../../../../enums/Colors";
import { transformImagePath } from "../../../../utils/image.utils";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import EditProfileModal from "./EditProfileModal"; // Import Modal

const ProfileHeader = ({ user, onProfileChange }) => {
    const [isEditModalOpen, setEditModalOpen] = useState(false);

    const handleEditClick = () => {
        setEditModalOpen(true);
    };

    const handleSaveChanges = (updatedData) => {
        console.log("Updated Profile:", updatedData);
        setEditModalOpen(false);
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
                    background: "linear-gradient(90deg, rgba(132, 161, 191, 0.5) 0%, rgba(255, 182, 217, 0.5) 100%)",
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    zIndex: -1,
                }}
            />

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 1200, mx: "auto", p: 3 }}>
                <Box sx={{ position: "relative", display: "inline-block", width: 350, height: 350 }}>
                    <Avatar
                        src={user?.profilePicture ? transformImagePath(user.profilePicture) : "https://via.placeholder.com/150"}
                        alt={`${user?.firstName ?? "User"} ${user?.lastName ?? ""}`}
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

                    {/* Add/Edit Profile Picture Icon */}
                    <IconButton
                        onClick={onProfileChange}
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
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 1, flex: 1, px: 4 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
                            {user?.firstName ?? "John"} {user?.lastName ?? "Doe"}
                        </Typography>

                        {/* Edit Profile Button */}
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
                    </Box>

                    <Typography color="text.secondary" sx={{ fontSize: "1rem", mt: 0.5 }}>
                        {user?.bio ?? "No bio available"} <br /> {user?.location ?? "Unknown location"}
                    </Typography>
                </Box>
            </Box>

            {/* Edit Profile Modal */}
            <EditProfileModal open={isEditModalOpen} handleClose={() => setEditModalOpen(false)} user={user} handleSave={handleSaveChanges} />
        </Box>
    );
};

export default ProfileHeader;
