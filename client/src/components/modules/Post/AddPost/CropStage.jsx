import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { AppBar, Toolbar, IconButton, Typography, Button, Box, Slider } from '@mui/material';
import { ArrowBack, ZoomIn, ZoomOut, ArrowForward, ArrowBackIosNew } from '@mui/icons-material';
import { useCreatePost } from '../../../../services/api/main/post.service';


const CropStage = ({ goBack, postData }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreas, setCroppedAreas] = useState({});
    const createPost = useCreatePost();


    const onCropComplete = useCallback((_, croppedAreaPixels) => {
        setCroppedAreas((prev) => ({
            ...prev,
            [postData.media[currentIndex]]: croppedAreaPixels,
        }));
    }, [currentIndex, postData.media]);

    const goNext = () => {
        if (currentIndex < postData.media.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        }
    };

    const goPrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
        }
    };

    const handleComplete = () => {
        const updatePostData = {
            ...postData,
            media: croppedAreas,
        };

        createPost.mutateAsync(updatePostData);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '70vh' }}>
            <AppBar position="static" color="transparent" elevation={0}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={goBack}>
                        <ArrowBack />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                        Crop Image {currentIndex + 1} / {postData.media.length}
                    </Typography>
                    <Button color="primary" onClick={handleComplete}>
                        Done
                    </Button>
                </Toolbar>
            </AppBar>

            <Box sx={{ position: 'relative', flexGrow: 1, borderRadius: 6 }}>
                <Cropper
                    image={postData.media[currentIndex]}
                    crop={crop}
                    zoom={zoom}
                    aspect={16 / 9}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
                <ZoomOut />
                <Slider
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    onChange={(e, zoom) => setZoom(zoom)}
                    sx={{ mx: 2, flexGrow: 1 }}
                />
                <ZoomIn />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 2, py: 1 }}>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={currentIndex === 0}
                    onClick={goPrev}
                    startIcon={<ArrowBackIosNew />}
                >
                    Prev
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={currentIndex === postData.media.length - 1}
                    onClick={goNext}
                    endIcon={<ArrowForward />}
                >
                    Next
                </Button>
            </Box>
        </Box>
    );
};

export default CropStage;
