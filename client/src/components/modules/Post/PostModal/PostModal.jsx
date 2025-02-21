import { Modal, Box, IconButton } from "@mui/material";
import PostMedia from "./PostMedia";
import PostComments from "./PostComments";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    height: "90%",
    bgcolor: "black",
    display: "flex",
    outline: "none",
    borderRadius: 4,
    overflow: "hidden",
};

const PostModal = ({ post, isOpen, onClose, onNext, onPrevious }) => {
    console.log('post: ', post.images);
    if (!post) return null;

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box sx={modalStyle}>


                {/* Left Navigation */}
                <IconButton
                    sx={{
                        position: "absolute",
                        left: 10,
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "white",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
                        zIndex: 10,
                    }}
                    onClick={onPrevious}
                >
                    <ArrowBack />
                </IconButton>

                <PostMedia mediaUrls={post.images} />

                <Box sx={{ width: "40%", display: "flex", flexDirection: "column", color: "white" }}>
                    <PostComments post={post} />
                </Box>

                {/* Right Navigation */}
                <IconButton
                    sx={{
                        position: "absolute",
                        right: 10,
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "white",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
                        zIndex: 10,
                    }}
                    onClick={onNext}
                >
                    <ArrowForward />
                </IconButton>
            </Box>
        </Modal>
    );
};

export default PostModal;
