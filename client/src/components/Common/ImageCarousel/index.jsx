import { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { transformImagePath } from '../../../utils/image.utils';
import { Box } from '@mui/material';

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
            autoPlay={true}
            animation="slide"
            duration={1000} // Increased from default (usually 500ms) to 1000ms (1 second)
            interval={4000} // Time between auto slides (4 seconds)
            indicators={allImagesArr.length > 1}
            navButtonsAlwaysVisible={allImagesArr.length > 1}
            swipe={true}
            navButtonsProps={{
                style: {
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    borderRadius: "50%",
                    padding: 8,
                    margin: 10,
                    transition: 'all 0.3s ease', // Smooth transition for nav buttons
                }
            }}
            indicatorContainerProps={{
                style: {
                    position: "absolute",
                    bottom: 10,
                    zIndex: 1,
                    textAlign: "center",
                    width: "100%",
                }
            }}
            activeIndicatorIconButtonProps={{
                style: {
                    color: "#fff",
                }
            }}
            indicatorIconButtonProps={{
                style: {
                    color: "rgba(255, 255, 255, 0.6)",
                    margin: "0 4px",
                    transition: 'all 0.3s ease', // Smooth transition for indicators
                }
            }}
        >
            {allImagesArr.map((image, idx) => {
                const imageUrl = image.startsWith('blob:') ? image : transformImagePath(image);

                return (
                    <Box
                        key={idx}
                        sx={{
                            position: "relative",
                            width: "100%",
                            height: height || "350px",
                            overflow: "hidden",
                            backgroundColor: "#f5f5f5",
                        }}
                    >
                        <img
                            src={imageUrl}
                            alt={`Post image ${idx + 1}`}
                            loading="lazy"
                            onError={handleError}
                            style={{
                                width: width || "100%",
                                height: "100%",
                                objectFit: objectFit || "cover",
                                objectPosition: "center",
                                transition: "transform 1s ease-in-out, opacity 0.5s ease-in-out", // Smoother image transition
                                transform: activeIndex === idx ? 'scale(1)' : 'scale(1.02)', // Subtle zoom effect
                            }}
                        />
                    </Box>
                );
            })}
        </Carousel>
    );
};

export default ImageCarousel;