import { Box } from '@mui/material';
import ImageCarousel from '../../../Common/ImageCarousel/index';
import { APP_COLORS } from '../../../../enums/Colors';

const PostMedia = ({ mediaUrls, coverImage }) => {
    return (
        <Box
            sx={{
                width: '60%',
                bgcolor: APP_COLORS.primary,
            }}
        >
            <ImageCarousel coverImage={coverImage} images={mediaUrls} width="100%" height="100vh" objectFit="cover" />
        </Box>
    );
};

export default PostMedia;