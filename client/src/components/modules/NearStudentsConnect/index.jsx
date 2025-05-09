import { useState, lazy, Suspense } from 'react';
import { Box } from '@mui/material';
import LocationTracker from '../../../common/LocationTracker';

const MapWrapperWithData = lazy(() => import('./MapWrapperWithData'));

const NearStudentsConnect = () => {
    const [userLocation, setUserLocation] = useState(null);

    return (
        <Box sx={{ position: 'relative', width: '100vw', height: '100vh' }}>
            {userLocation && (
                <Suspense fallback={<div>Loading map...</div>}>
                    <MapWrapperWithData userLocation={userLocation} />
                </Suspense>
            )}
            <LocationTracker onLocationUpdate={setUserLocation} />
        </Box>
    );
};

export default NearStudentsConnect;
