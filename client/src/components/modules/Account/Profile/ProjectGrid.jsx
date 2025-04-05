import { Grid, Typography } from "@mui/material";
import ProjectCard from "./ProjectCard";
import { useState } from "react";
import PostModal from "../../../Common/PostCard/PostModal/PostModal";

const ProjectGrid = ({ postData }) => {
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
        if (!postData?.data || postData.data.length === 0) return;
        const nextIndex = (currentIndex + 1) % postData.data.length;
        setCurrentIndex(nextIndex);
        setSelectedPost(postData.data[nextIndex]);
    };

    const handlePrevious = () => {
        if (!postData?.data || postData.data.length === 0) return;
        const prevIndex = (currentIndex - 1 + postData.data.length) % postData.data.length;
        setCurrentIndex(prevIndex);
        setSelectedPost(postData.data[prevIndex]);
    };

    if (!postData?.data || !Array.isArray(postData.data) || postData.data.length === 0) {
        return <Typography variant="h6" sx={{ textAlign: "center", mt: { xs: 2, sm: 3 } }}>No Post available.</Typography>;
    }

    return (
        <>
            <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                {postData.data.map((post, index) => (
                    <Grid item key={post?._id || post?.id} xs={12} sm={6} md={4}>
                        <ProjectCard handleOpenModal={() => handleOpenModal(index)} post={post} />
                    </Grid>
                ))}
            </Grid>
            {isModalOpen && selectedPost && (
                <PostModal
                    post={selectedPost}
                    isOpen={isModalOpen}
                    onClose={() => setModalOpen(false)}
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                />
            )}
        </>
    );
};

export default ProjectGrid;