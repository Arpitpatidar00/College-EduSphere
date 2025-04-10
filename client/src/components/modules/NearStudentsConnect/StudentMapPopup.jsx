import { Paper, Avatar, Typography, Box, Button, Chip } from '@mui/material';
import { transformImagePath } from '@/utils/image.utils';
import { useToggleFollow } from '@services/api/main/follow.service';
import { useDispatch, useSelector } from 'react-redux';
import { updateFollowState, selectUserData } from '@/store/slices/auth.slice';
import { FOLLOW_STATUS } from '@/enums/AuthConstants';
import { APP_COLORS } from '@/enums/Colors';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const StudentMapPopup = ({ isCurrentUser = false, student, currentUser }) => {
    const dispatch = useDispatch();
    const user = useSelector(selectUserData);
    const { mutateAsync: toggleFollow } = useToggleFollow();

    const name = isCurrentUser ? 'You' : `${student?.name}`;
    const picture = transformImagePath(
        isCurrentUser
            ? currentUser?.profilePicture || '/default-avatar.png'
            : student?.profilePicture || '/default-avatar.png'
    );

    const isFollowing = user?.follow?.following?.some(
        (follow) => follow.user === student?.studentId
    );

    const visibility = student?.privacySettings?.visibility || 'private';

    const handleFollowToggle = async () => {
        if (!student) return;

        const status = isFollowing
            ? null
            : visibility === 'public'
                ? FOLLOW_STATUS.FOLLOWING
                : FOLLOW_STATUS.REQUESTED;

        try {
            const response = await toggleFollow({ userId: student.studentId, status });
            if (response?.result) {
                dispatch(updateFollowState(response.result));
            }
        } catch (error) {
            console.error('Error toggling follow:', error);
        }
    };

    return (
        <Paper
            elevation={3}
            sx={{
                width: 240,
                p: 2,

            }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
                <Avatar
                    src={picture}
                    alt={name}
                    sx={{
                        width: 80,
                        height: 80,
                        border: '2px solid',
                        borderColor: APP_COLORS.primary[100],
                        bgcolor: 'grey.100'
                    }}
                />

                <Box sx={{ textAlign: 'center' }}>
                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        sx={{
                            color: APP_COLORS.primary[800],
                            mb: 0.5
                        }}
                    >
                        {name}
                    </Typography>

                    {isCurrentUser ? (
                        <Chip
                            icon={<LocationOnIcon />}
                            label="Your Location"
                            size="small"
                            color="primary"
                            variant="outlined"
                        />
                    ) : (
                        <>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    mb: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 0.5
                                }}
                            >
                                <LocationOnIcon fontSize="small" />
                                {student?.distance ? `${student.distance} away` : 'Distance: N/A'}
                            </Typography>

                            <Box sx={{
                                display: 'flex',
                                gap: 1,
                                justifyContent: 'center',
                                flexWrap: 'wrap'
                            }}>
                                <Button
                                    variant="contained"
                                    size="small"
                                    onClick={handleFollowToggle}
                                    disabled={!student}
                                    sx={{
                                        minWidth: 90,
                                        bgcolor: isFollowing ? APP_COLORS.accent[400] : APP_COLORS.primary[600],
                                        color: APP_COLORS.primary[300],
                                        textTransform: 'none',
                                        '&:hover': {
                                            bgcolor: isFollowing ? APP_COLORS.accent[200] : APP_COLORS.primary[700],
                                        },
                                        '&:disabled': {
                                            bgcolor: 'grey.300',
                                            color: 'grey.600'
                                        }
                                    }}
                                >
                                    {isFollowing ? 'Unfollow' : visibility === 'public' ? 'Follow' : 'Request'}
                                </Button>

                                <Button
                                    variant="outlined"
                                    size="small"
                                    color="success"
                                    startIcon={<PersonIcon />}
                                    onClick={() => window.open(`/profile/${student.studentId}`, '_blank')}
                                    sx={{
                                        minWidth: 90,
                                        textTransform: 'none'
                                    }}
                                >
                                    Profile
                                </Button>
                            </Box>
                        </>
                    )}
                </Box>
            </Box>
        </Paper>
    );
};

export default StudentMapPopup;