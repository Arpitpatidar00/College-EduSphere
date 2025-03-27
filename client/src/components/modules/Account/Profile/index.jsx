import { Box } from '@mui/material';
import ProfileHeader from './ProfileHeader';
import ProfileTabs from './ProfileTabs';
import ProjectGrid from './ProjectGrid';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../../../store/slices/auth.slice'
import { useState } from 'react';
import { useGetAllPosts } from '../../../../services/api/main/post.service';

const Profile = () => {
    const userDate = useSelector(selectUserData);

    const [postPagination, setStatePagination] = useState({
        page: 0,
        pageSize: 20,
    });

    const { data: postData } = useGetAllPosts(
        { page: postPagination.page, limit: postPagination.pageSize, userId: userDate?._id },
        { data: [], totalCount: 0 }
    );


    return (
        <Box sx={{ pb: 5, m: 1 }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 4,

                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'center', flex: 1 }}>
                    <ProfileHeader user={userDate} />
                </Box>


            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', flex: 1 }}>

                <ProfileTabs tabs={userDate} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', flex: 1, m: 5 }}>

                <ProjectGrid postData={postData} />
            </Box>
        </Box>
    );
};

export default Profile;