import { APP_COLORS } from '@/enums/Colors';
import { Typography, Box } from '@mui/material';

export const CommonHeader = ({ title, caption, description }) => {
    return (
        <Box
            sx={{
                position: 'relative',
                height: 300, // Adjust the height as needed
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end', // Align content towards the bottom
                alignItems: 'flex-start', // Align text to the left
                textAlign: 'left',

                backgroundImage: 'url(https://4kwallpapers.com/images/wallpapers/dark-background-abstract-background-network-3d-background-3840x2160-8324.png)', // Replace with your image path
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                padding: 1,
                color: APP_COLORS.accent[100],
                borderRadius: 4,

            }}
        >
            <Box
                sx={{
                    padding: 1,
                    fontFamily: "serif"

                }}
            >
                <Typography variant="h3" gutterBottom>{title}</Typography>
                <Typography variant="subtitle1" gutterBottom>{caption}</Typography>
                <Typography variant="body2" color="inherit">{description}</Typography>
            </Box>
        </Box>
    );
};
