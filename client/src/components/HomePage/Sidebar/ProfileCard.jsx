import { Box, Typography, Grid, Avatar, Button } from '@mui/material';
import { APP_COLORS } from '../../../enums/Colors';
import { selectUserData } from '@/store/slices/auth.slice';
import { useSelector } from 'react-redux';
import { transformImagePath } from '@/utils/image.utils';

const ProfileCard = () => {
    const user = useSelector(selectUserData);

    return (
        <Box
            sx={{
                width: 300,
                border: `1px solid ${APP_COLORS.grey[200]}`,
                borderRadius: 2,
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                bgcolor: APP_COLORS.common.white, // Use global white for background
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
                        1984
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Followers
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="body2" fontWeight="bold" sx={{ color: APP_COLORS.primary[500] }}>
                        1002
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Following
                    </Typography>
                </Grid>
            </Grid>

            <Avatar
                alt="Alita Dizzouza"
                src={transformImagePath(user.profilePicture)}
                sx={{ width: 100, height: 100, mb: 1 }}
            />

            {/* Name and Username */}
            <Typography variant="h6" align="center" sx={{ mb: 0.5, color: APP_COLORS.primary[500] }}>
                Alita Dizzouza
            </Typography>
            <Typography
                variant="body2"
                align="center"
                sx={{ mb: 1, color: APP_COLORS.grey[600] }}
            >
                @elvizoodem
            </Typography>

            {/* Bio */}
            <Typography
                variant="body2"
                align="center"
                sx={{ mb: 2, color: APP_COLORS.grey[700] }}
            >
                Hello, I'm a UI/UX designer. Open to new projects.
            </Typography>

            <Button variant="contained" color="primary" fullWidth>
                My Profile
            </Button>
        </Box>
    );
};

export default ProfileCard;
