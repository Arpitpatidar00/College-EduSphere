import { useEffect, useRef, useState, useCallback } from 'react';
import { useUpdateLocation } from '@services/api/Global/activeLocation';
import { Box, Typography } from '@mui/material';

const LocationTracker = ({ onLocationUpdate }) => {
    const [location, setLocation] = useState(null);
    const [status, setStatus] = useState('loading');
    const watchId = useRef(null);
    const { mutate: updateLocation, isError, error } = useUpdateLocation();

    const handlePositionUpdate = useCallback(
        (position) => {
            const { latitude, longitude } = position.coords;
            const newLocation = { lat: latitude, lng: longitude };

            if (
                !location ||
                Math.abs(location.lat - latitude) > 0.0001 ||
                Math.abs(location.lng - longitude) > 0.0001
            ) {
                setLocation(newLocation);
                setStatus('success');
                updateLocation({ latitude, longitude }, {
                    onSuccess: () => {
                        onLocationUpdate(newLocation); // Only call after successful DB update
                    },
                });
            }
        },
        [location, onLocationUpdate, updateLocation]
    );

    useEffect(() => {
        if (!navigator.geolocation) {
            setStatus('error');
            console.error('Geolocation not supported.');
            return;
        }

        // Start watching position immediately on mount
        watchId.current = navigator.geolocation.watchPosition(
            handlePositionUpdate,
            (err) => {
                if (err.code === 1) {
                    setStatus('denied');
                } else {
                    setStatus('error');
                }
                console.error('Geolocation error:', err);
            },
            { enableHighAccuracy: true, timeout: 10000 }
        );

        return () => {
            if (watchId.current !== null) {
                navigator.geolocation.clearWatch(watchId.current);
            }
        };
    }, [handlePositionUpdate]);

    return (
        <Box
            sx={{
                position: 'absolute',
                top: 16,
                left: 16,
                zIndex: 1000,
                bgcolor: 'white',
                p: 2,
                borderRadius: 2,
            }}
        >
            {status === 'loading' && <Typography>Fetching location...</Typography>}
            {status === 'success' && location && (
                <Typography sx={{ fontWeight: 500 }}>
                    Lat: {location.lat.toFixed(4)}, Lon: {location.lng.toFixed(4)}
                </Typography>
            )}
            {status === 'denied' && (
                <Typography color="error">Location access denied. Please enable it.</Typography>
            )}
            {status === 'error' && (
                <Typography color="error">
                    {isError ? error?.message : 'Failed to fetch location'}
                </Typography>
            )}
        </Box>
    );
};

export default LocationTracker;