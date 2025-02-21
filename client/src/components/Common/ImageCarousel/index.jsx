import { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import CustomNavButton from './CustomNavButton';

const ImageCarousel = ({ images, width, height }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleChange = (index) => {
        setActiveIndex(index);
    };

    return (
        <Carousel
            index={activeIndex}
            onChange={handleChange}
            navButtonsAlwaysInvisible={images.length <= 1}
            NavButton={({ onClick, next }) => (
                <CustomNavButton
                    direction={next ? 'next' : 'prev'}
                    onClick={onClick}
                    activeIndex={activeIndex}
                    length={images.length}
                />
            )}
        >
            {images.map((image, idx) => (
                <img
                    key={idx}
                    src={image}
                    alt={`Post image ${idx + 1}`}
                    style={{
                        width: width || '100%',
                        height: height || 'auto',
                        objectFit: "cover",
                        borderRadius: 8,
                    }}
                />
            ))}
        </Carousel>
    );
};

export default ImageCarousel;
