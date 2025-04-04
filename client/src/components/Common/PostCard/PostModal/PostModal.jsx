import { Modal, Box, IconButton } from "@mui/material";
import PostMedia from "./PostMedia";
import PostComments from "./PostComments";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { APP_COLORS } from "../../../../enums/Colors";

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "85%",
    height: "95%",
    backgroundColor: APP_COLORS.secondary[600],
    display: "flex",
    outline: "none",
    overflow: "hidden",
};

const buttonStyle = {
    position: "fixed",
    top: "50%",
    transform: "translateY(-50%)",
    color: "white",
    backgroundColor: "rgba(0,0,0,0.5)",
    "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
    zIndex: 1500,
};


const PostModal = ({ post, isOpen, onClose, onNext, onPrevious }) => {

    if (!post) return null;

    return (
        <>
            {isOpen && (
                <>
                    <IconButton
                        sx={{ ...buttonStyle, left: 20 }}
                        onClick={(e) => {
                            e.stopPropagation();
                            onPrevious();
                        }}
                    >
                        <ArrowBack />
                    </IconButton>

                    <IconButton
                        sx={{ ...buttonStyle, right: 20 }}
                        onClick={(e) => {
                            e.stopPropagation();
                            onNext();
                        }}
                    >
                        <ArrowForward />
                    </IconButton>
                    <IconButton
                        sx={{
                            position: "absolute",
                            top: 16,
                            right: 16,
                            color: "white",
                            zIndex: 10,
                            backgroundColor: APP_COLORS.primary[900],
                            "&:hover": { backgroundColor: APP_COLORS.primary[400] },
                        }}

                    >
                        <CloseIcon />
                    </IconButton>
                </>
            )}

            <Modal open={isOpen} onClose={onClose} >
                <Box sx={modalStyle} onClick={(e) => e.stopPropagation()}>
                    <PostMedia mediaUrls={post.media
                    } coverImage={post.coverImage} />
                    <Box sx={{
                        width: "40%", display: "flex", flexDirection: "column", color: "white", backgroundColor: APP_COLORS.secondary,
                    }}>
                        <PostComments post={post} />
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default PostModal;
