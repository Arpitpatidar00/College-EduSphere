import { IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

const CustomNavButton = ({ direction, onClick, activeIndex, length }) => {
    // Determine if the button should be visible
    const isVisible =
        (direction === 'prev' && activeIndex > 0) ||
        (direction === 'next' && activeIndex < length - 1);

    if (!isVisible) return null;

    return (
        <IconButton onClick={onClick} style={{ position: 'absolute', top: '50%', [direction === 'prev' ? 'left' : 'right']: 0 }}>
            {direction === 'prev' ? <ArrowBackIos /> : <ArrowForwardIos />}
        </IconButton>
    );
};

export default CustomNavButton;
