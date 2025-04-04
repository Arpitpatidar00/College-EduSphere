import React from "react";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const PostNavigation = ({ onClose }) => {
    return (
        <>
            {/* Close Button */}
            <IconButton
                sx={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    color: "white",
                    zIndex: 10
                }}
                onClick={onClose}
            >
                <CloseIcon />
            </IconButton>

            {/* Left Arrow - Centered Vertically */}
            <IconButton
                sx={{
                    position: "absolute",
                    left: 16,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "white",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                    },
                    zIndex: 10
                }}
            >
                <ArrowBackIosIcon fontSize="large" />
            </IconButton>

            {/* Right Arrow - Centered Vertically */}
            <IconButton
                sx={{
                    position: "absolute",
                    right: 16,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "white",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                    },
                    zIndex: 10
                }}
            >
                <ArrowForwardIosIcon fontSize="large" />
            </IconButton>
        </>
    );
};

export default PostNavigation;
