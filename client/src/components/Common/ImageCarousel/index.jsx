import { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import CustomNavButton from './CustomNavButton';
import { transformImagePath } from '../../../utils/image.utils';

const ImageCarousel = ({ images = [], width, height, coverImage, objectFit }) => {
    const validImages = images.filter(img => img && typeof img === 'string');

    const allImagesArr = coverImage
        ? [coverImage, ...validImages.filter(img => img !== coverImage)]
        : validImages;

    const [activeIndex, setActiveIndex] = useState(0);

    const handleChange = (index) => {
        setActiveIndex(index);
    };

    const handleError = (event) => {
        event.target.src = "/assets/placeholder-image.jpg";
    };

    if (!coverImage && allImagesArr.length === 0) {
        return null;
    }

    return (
        <Carousel
            index={activeIndex}
            onChange={handleChange}
            navButtonsAlwaysInvisible={allImagesArr.length <= 1}
            NavButton={({ onClick, next }) => (
                <CustomNavButton
                    direction={next ? 'next' : 'prev'}
                    onClick={onClick}
                    activeIndex={activeIndex}
                    length={allImagesArr.length}
                />
            )}
        >
            {allImagesArr.map((image, idx) => {
                const imageUrl = image.startsWith('blob:') ? image : transformImagePath(image);

                return (
                    <img
                        key={idx}
                        src={imageUrl}
                        alt={`Post image ${idx + 1}`}
                        loading="lazy"
                        onError={handleError}
                        style={{
                            width: width || "100%",
                            height: height || "auto",
                            objectFit: objectFit || "cover",
                            objectPosition: "top center",
                        }}
                    />
                );
            })}
        </Carousel>
    );
};

export default ImageCarousel;
