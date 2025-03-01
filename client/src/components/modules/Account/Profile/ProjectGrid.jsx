import { Grid, Typography } from "@mui/material";
import ProjectCard from "./ProjectCard";

const ProjectGrid = ({ postData }) => {

    if (!postData?.data || !Array.isArray(postData.data) || postData.data.length === 0) {
        return <Typography variant="h6" sx={{ textAlign: "center", mt: 3 }}>No projects available.</Typography>;
    }

    return (
        <Grid container spacing={3}>
            {postData.data.map((post) => (
                <Grid item key={post?._id || post?.id} xs={12} sm={6} md={4}>
                    <ProjectCard post={post} />
                </Grid>
            ))}
        </Grid>
    );
};

export default ProjectGrid;
