import { useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import PostCard from "./PostCard";
import PostModal from "./PostModal/PostModal";

const PostList = ({ postData, isGrid = false }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleOpenModal = (postIndex) => {
        if (!postData?.data?.length) return;
        setCurrentIndex(postIndex);
        setSelectedPost(postData.data[postIndex]);
        setModalOpen(true);
    };

    const handleNext = () => {
        if (!postData?.data?.length) return;
        const nextIndex = (currentIndex + 1) % postData.data.length;
        setCurrentIndex(nextIndex);
        setSelectedPost(postData.data[nextIndex]);
    };

    const handlePrevious = () => {
        if (!postData?.data?.length) return;
        const prevIndex = (currentIndex - 1 + postData.data.length) % postData.data.length;
        setCurrentIndex(prevIndex);
        setSelectedPost(postData.data[prevIndex]);
    };

    return (
        <Box>
            {postData?.data?.length > 0 ? (
                isGrid ? (
                    <Grid container spacing={2}>
                        {postData.data.map((post, index) => (
                            <Grid item xs={12} sm={4} md={6} sx={{
                                p: 2,
                                alignItems: "center",
                                justifyContent: "center",

                            }}
                                key={post._id}>
                                <PostCard post={post} index={index} onOpenModal={handleOpenModal} />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    postData.data.map((post, index) => (
                        <PostCard key={post._id} post={post} index={index} onOpenModal={handleOpenModal} />
                    ))
                )
            ) : (
                <Typography sx={{ textAlign: "center", color: "grey.600" }}>
                    No posts available
                </Typography>
            )}

            {isModalOpen && selectedPost && (
                <PostModal
                    post={selectedPost}
                    isOpen={isModalOpen}
                    onClose={() => setModalOpen(false)}
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                />
            )}
        </Box>
    );
}

export default PostList;
