import {
    Card,
    CardContent,
    Typography,
    Box,
    Stack,
    Avatar
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { APP_COLORS } from '../../../../enums/Colors';
import ImageCarousel from '../../../Common/ImageCarousel/index';

const ProjectCard = ({ post }) => {
    console.log('post: ', post);

    const formatNumber = (num) => {
        if (!num) return 0;
        return num >= 1000 ? (num / 1000).toFixed(1) + 'k' : num;
    };

    return (
        <Card sx={{
            height: '100%',
            position: 'relative',
            borderRadius: 6,
            overflow: 'hidden',
            boxShadow: 3,
            '&:hover': {
                boxShadow: 6,
                transform: 'translateY(-4px)',
                transition: 'all 0.2s ease-in-out'
            }
        }}>
            {/* User Info */}
            <Box sx={{
                position: 'absolute',
                top: 10,
                left: 10,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                zIndex: 1
            }}>
                <Avatar
                    src={post?.user?.profilePicture || "https://via.placeholder.com/40"}
                    alt={post?.user?.firstName || "User"}
                    sx={{ width: 30, height: 30 }}
                />
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'white' }}>
                    {post?.user?.firstName} {post?.user?.lastName}
                </Typography>
            </Box>

            {/* Image Carousel */}
            <ImageCarousel
                images={post?.media}
                coverImage={post?.coverImage}
                height="450px"
            />

            <CardContent sx={{
                p: 2,
                backgroundColor: APP_COLORS.secondary[50],
                '&:last-child': { pb: 2 }
            }}>
                {/* Title */}
                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    justifyContent: 'space-between',
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    gap: 1,
                    mb: 1.5
                }}>
                    <Typography
                        variant="h6"
                        component="h3"
                        sx={{
                            fontWeight: 'bold',
                            flex: 1,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: { xs: 'normal', sm: 'nowrap' }
                        }}
                    >
                        {post.title}
                    </Typography>

                    {/* Likes & Views */}
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{ flexShrink: 0, mt: { xs: 1, sm: 0 } }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <FavoriteIcon sx={{
                                fontSize: 18,
                                color: APP_COLORS.secondary[600],
                                transition: 'color 0.2s',
                                '&:hover': { color: APP_COLORS.secondary[800] }
                            }} />
                            <Typography
                                variant="body2"
                                color={APP_COLORS.secondary[600]}
                                sx={{ fontWeight: 500 }}
                            >
                                {formatNumber(post?.totalLikes?.length || 0)}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <VisibilityIcon sx={{
                                fontSize: 18,
                                color: APP_COLORS.secondary[600],
                                transition: 'color 0.2s',
                                '&:hover': { color: APP_COLORS.secondary[800] }
                            }} />
                            <Typography
                                variant="body2"
                                color={APP_COLORS.primary[600]}
                                sx={{ fontWeight: 500 }}
                            >
                                {formatNumber(post?.totalViews || 0)}
                            </Typography>
                        </Box>
                    </Stack>
                </Box>

                {/* Tags */}
                {post.tags?.length > 0 && (
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            mt: 0.5,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {Array.isArray(post.tags) ? post.tags.join(', ') : post.tags.split(' ')}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};

export default ProjectCard;
