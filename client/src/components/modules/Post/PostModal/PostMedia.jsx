import { Box } from '@mui/material';
import ImageCarousel from '../../../Common/ImageCarousel/index';
import { APP_COLORS } from '../../../../enums/Colors';

const PostMedia = ({ mediaUrls }) => {
    return (
        <Box
            sx={{
                width: '60%',
                bgcolor: APP_COLORS.primary,
            }}
        >
            <ImageCarousel images={mediaUrls} width="100%" height="100vh" />
        </Box>
    );
};

export default PostMedia;
