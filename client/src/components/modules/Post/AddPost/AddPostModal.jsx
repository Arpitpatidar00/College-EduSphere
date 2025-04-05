import { Modal, Box, useTheme } from "@mui/material";
import AddPostForm from "./AddPostForm";
import { APP_COLORS } from "../../../../enums/Colors.js";

const AddPostModal = ({ open, onClose }) => {
    const theme = useTheme();

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="add-post-modal"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: { xs: "92%", sm: "85%", md: "60%", lg: "800px" }, // Increased xs width for better usability
                    maxHeight: { xs: "85vh", sm: "90vh", md: "90vh" }, // Adjusted for small screens
                    bgcolor: theme.palette.mode === "dark" ? APP_COLORS.grey[800] : APP_COLORS.primary[50],
                    borderRadius: { xs: 2, sm: 4, md: 6 }, // Smaller radius on small devices
                    p: { xs: 1.5, sm: 2.5, md: 5 }, // Reduced padding on small devices
                    boxShadow: 24,
                    overflowY: "auto", // Enable scrolling for long content
                    outline: "none",
                    transition: "opacity 0.3s ease",
                    paddingBottom: { xs: "env(safe-area-inset-bottom, 0px)" },
                }}
            >
                <AddPostForm onClose={onClose} />
            </Box>
        </Modal>
    );
};

export default AddPostModal;