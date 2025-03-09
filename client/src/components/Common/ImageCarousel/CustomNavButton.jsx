import { IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { APP_COLORS } from '../../../enums/Colors';

const CustomNavButton = ({ direction, onClick, activeIndex, length }) => {
    // Determine if the button should be visible
    const isVisible =
        (direction === 'prev' && activeIndex > 0) ||
        (direction === 'next' && activeIndex < length - 1);

    if (!isVisible) return null;

    return (
        <IconButton onClick={onClick} style={{ position: 'absolute', color: APP_COLORS.common.black, top: '40%', [direction === 'prev' ? 'left' : 'right']: 0 }}>
            {direction === 'prev' ? <ArrowBackIos /> : <ArrowForwardIos />}
        </IconButton>
    );
};

export default CustomNavButton;
