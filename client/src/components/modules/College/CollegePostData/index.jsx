import PostList from "@/components/Common/PostCard/index";
import { useGetAllPosts } from "../../../../services/api/main/post.service";
import { Box } from "@mui/material";

const CollegePostData = () => {
    const { data: postData } = useGetAllPosts(
        { page: 0, limit: 20 },
        { data: [], totalCount: 0 }
    );
    return (
        <Box
            sx={{
                ml: 4,
                flex: 1,
                overflowY: "auto",
                "-ms-overflow-style": "none",
                "scrollbar-width": "none",
                "&::-webkit-scrollbar": { display: "none" },
            }}
        >
            <PostList postData={postData} isGrid={true} />

        </Box>
    );
};

export default CollegePostData;
