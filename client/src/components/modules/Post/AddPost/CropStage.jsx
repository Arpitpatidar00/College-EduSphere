// src/components/AddPostForm/CropStage.js
import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { AppBar, Toolbar, IconButton, Typography, Button, Box, Slider } from '@mui/material';
import { ArrowBack, ZoomIn, ZoomOut } from '@mui/icons-material';

const CropStage = ({ selectedImage, goBack, onComplete }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onCropComplete = useCallback((_, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleComplete = () => {
        onComplete(croppedAreaPixels);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '70vh' }}>
            <AppBar position="static" color="transparent" elevation={0}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={goBack}>
                        <ArrowBack />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                        Crop
                    </Typography>
                    <Button color="primary" onClick={handleComplete}>
                        Next
                    </Button>
                </Toolbar>
            </AppBar>

            <Box sx={{ position: 'relative', flexGrow: 1, borderRadius: 6 }}>
                <Cropper
                    image={selectedImage}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
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
        </Box>
    );
};

export default CropStage;
