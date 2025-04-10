import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import {
    Box,
    Typography,
    CircularProgress,
    Alert,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUserData } from '@/store/slices/auth.slice';
import { transformImagePath } from '@/utils/image.utils';
import { createAvatarIcon, createCurrentUserIcon } from './createMarkers';
import StudentMapPopup from './StudentMapPopup';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Leaflet marker icons fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const MapWrapper = ({ userLocation, nearbyStudents, isLoading, isError }) => {
    const currentUser = useSelector(selectUserData);

    if (isError) {
        return (
            <Box sx={{ p: 4 }}>
                <Alert severity="error">Failed to load nearby students. Please try again.</Alert>
            </Box>
        );
    }

    if (isLoading) {
        return (
            <Box
                sx={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <CircularProgress />
                <Typography variant="body1" sx={{ ml: 2 }}>
                    Loading students...
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ width: '100%', height: '100%', borderRadius: 2, overflow: 'hidden' }}>
            <MapContainer
                center={[userLocation.lat, userLocation.lng]}
                zoom={15}
                scrollWheelZoom
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker
                    position={[userLocation.lat, userLocation.lng]}
                    icon={createCurrentUserIcon(
                        transformImagePath(currentUser?.profilePicture || '/default-avatar.png')
                    )}
                >
                    <Popup>
                        <StudentMapPopup isCurrentUser currentUser={currentUser} />
                    </Popup>
                </Marker>

                {/* 👥 Nearby Students */}
                {nearbyStudents.map((student) => {
                    const offsetLat = student.lat + (Math.random() * 0.00005 - 0.000025);
                    const offsetLng = student.lng + (Math.random() * 0.00005 - 0.000025);

                    return (
                        <Marker
                            key={student.studentId}
                            position={[offsetLat, offsetLng]}
                            icon={createAvatarIcon(
                                transformImagePath(student.profilePicture || '/default-avatar.png')
                            )}
                        >
                            <Popup>
                                <StudentMapPopup student={student} />
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>
        </Box>
    );
};

export default MapWrapper;
