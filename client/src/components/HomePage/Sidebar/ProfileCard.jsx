import { Box, Typography, Grid, Avatar, Button, useTheme, useMediaQuery } from '@mui/material';
import { APP_COLORS } from '../../../enums/Colors';
import { selectUserData } from '@/store/slices/auth.slice';
import { useSelector } from 'react-redux';
import { transformImagePath } from '@/utils/image.utils';
import { ROUTES } from '../../Global/Routes/CommonRoutes';
import { useNavigate } from 'react-router-dom';

const ProfileCard = () => {
    const user = useSelector(selectUserData);
    const navigate = useNavigate();

    const fullName = `${user?.firstName || ''} ${user?.lastName || ''}`;
    const username = user?.email?.split('@')[0] || '';
    const bio = user?.bio || 'Hey there! I’m using EduSphere.';
    const followersCount = user?.follow?.followers?.length || 0;
    const followingCount = user?.follow?.following?.length || 0;

    const RedirectToProfile = () => {
        navigate(ROUTES.HOME.PROFILE);

    }

    return (
        <Box
            sx={{
                width: {
                    xs: '100%',  // Full width on mobile
                    sm: 300,     // Fixed width on small screens and above
                },
                border: `1px solid ${APP_COLORS.grey[200]}`,
                borderRadius: 2,
                p: { xs: 2, sm: 2.5 },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                bgcolor: APP_COLORS.common.white,
                mx: 'auto', // center on small screens
            }}
        >
            <Grid
                container
                alignItems="center"
                justifyContent="space-between"
                sx={{ width: '100%', mb: 2 }}
            >
                <Grid item>
                    <Typography variant="body2" fontWeight="bold" sx={{ color: APP_COLORS.primary[500] }}>
                        {followersCount}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Followers
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="body2" fontWeight="bold" sx={{ color: APP_COLORS.primary[500] }}>
                        {followingCount}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Following
                    </Typography>
                </Grid>
            </Grid>

            <Avatar
                alt={fullName}
                src={transformImagePath(user?.profilePicture)}
                sx={{
                    width: { xs: 80, sm: 100 },
                    height: { xs: 80, sm: 100 },
                    mb: 1,
                }}
            />

            <Typography variant="h6" align="center" sx={{ mb: 0.5, color: APP_COLORS.primary[500] }}>
                {fullName}
            </Typography>
            <Typography
                variant="body2"
                align="center"
                sx={{ mb: 1, color: APP_COLORS.grey[600] }}
            >
                @{username}
            </Typography>

            <Typography
                variant="body2"
                align="center"
                sx={{
                    mb: 2,
                    color: APP_COLORS.grey[700],
                    px: { xs: 1, sm: 0 }, // Padding on small screens for better wrapping
                }}
            >
                {bio}
            </Typography>

            <Button
                onClick={RedirectToProfile}
                variant="contained" color="primary" fullWidth>
                My Profile
            </Button>
        </Box>
    );
};

export default ProfileCard;
