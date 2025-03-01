// src/components/AddPostModal.js
import { Modal, Box } from "@mui/material";
import AddPostForm from "./AddPostForm";
import { APP_COLORS } from "../../../../enums/Colors.js";

const AddPostModal = ({ open, onClose }) => {
    return (
        <Modal open={open} onClose={onClose} aria-labelledby="add-post-modal">
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: { xs: "90%", sm: "80%", md: "60%" },
                    bgcolor: APP_COLORS.primary[50],
                    borderRadius: 6,
                    p: 5,
                }}
            >
                <AddPostForm onClose={onClose} />
            </Box>

        </Modal>
    );
};

export default AddPostModal;
