import { Box } from "@mui/material";
import ProfileHeader from "./ProfileHeader";
import ProfileTabs from "./ProfileTabs";
import ProjectGrid from "./ProjectGrid";
import { useSelector } from "react-redux";
import { selectUserData } from "../../../../store/slices/auth.slice";
import { useState } from "react";
import { useGetAllPosts } from "../../../../services/api/main/post.service";

const Profile = () => {

    const userData = useSelector(selectUserData);

    const [postPagination, setStatePagination] = useState({
        page: 0,
        pageSize: 20,
    });

    const { data: postData } = useGetAllPosts(
        { page: postPagination.page, limit: postPagination.pageSize, userId: userData?._id },
        { data: [], totalCount: 0 }
    );

    return (
        <Box
            sx={{
                pb: { xs: 2, sm: 3, md: 5 },
                m: { xs: 0.5, sm: 1 },
                px: { xs: 1, sm: 2, md: 2 },
                maxWidth: { xs: "100%", lg: "99%" },
                mx: "auto",
                width: "100%",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: "center",
                    justifyContent: "center",
                    gap: { xs: 2, sm: 3, md: 4 },
                    width: "100%",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                        flex: { md: 1 },
                    }}
                >
                    <ProfileHeader user={userData} />
                </Box>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    mt: { xs: 2, sm: 3, md: 4 },
                    p: { xs: 1, sm: 2 },
                }}
            >
                <ProfileTabs tabs={userData} />
            </Box>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    mt: { xs: 2, sm: 3, md: 5 },
                    mx: { xs: 0, sm: 2 },
                    p: { xs: 1, sm: 2 },
                }}
            >
                <ProjectGrid postData={postData} />
            </Box>
        </Box>
    );
};

export default Profile;