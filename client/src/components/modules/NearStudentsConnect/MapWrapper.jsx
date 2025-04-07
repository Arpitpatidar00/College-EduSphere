import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
    Box,
    Typography,
    Button,
    Avatar,
    CircularProgress,
    Paper,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUserData } from '@/store/slices/auth.slice';
import { transformImagePath } from '@/utils/image.utils';
import { createAvatarIcon, createCurrentUserIcon } from './createMarkers';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix default Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

// 🔸 Student Popup Component
const StudentPopup = ({ student }) => (
    <Paper elevation={3} sx={{ p: 2, width: 200, textAlign: 'center' }}>
        <Avatar
            src={transformImagePath(student.profilePicture || '/default-avatar.png')}
            alt={student.name}
            sx={{ width: 64, height: 64, mb: 1, mx: 'auto' }}
        />
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            {student.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Distance: {student.distance}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
            <Button
                variant="contained"
                size="small"
                color="primary"
                onClick={() => console.log(`Followed ${student.name}`)}
                sx={{ textTransform: 'none' }}
            >
                Follow
            </Button>
            <Button
                variant="outlined"
                size="small"
                color="success"
                onClick={() => window.open(`/profile/${student.studentId}`, '_blank')}
                sx={{ textTransform: 'none' }}
            >
                View Profile
            </Button>
        </Box>
    </Paper>
);

// 🔸 MapWrapper Component
const MapWrapper = ({ userLocation, nearbyStudents }) => {
    const currentUser = useSelector(selectUserData);

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                position: 'relative',
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: 3,
            }}
        >
            {userLocation ? (
                <MapContainer
                    center={[userLocation.lat, userLocation.lng]}
                    zoom={15}
                    style={{ height: '100%', width: '100%' }}
                    scrollWheelZoom={true}
                >
                    <TileLayer
                        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {/* 🔵 Current User Marker */}
                    <Marker
                        position={[userLocation.lat, userLocation.lng]}
                        icon={createCurrentUserIcon(
                            transformImagePath(
                                currentUser?.profilePicture || '/default-avatar.png'
                            )
                        )}
                    >
                        <Popup>
                            <Paper elevation={3} sx={{ p: 2, width: 200, textAlign: 'center' }}>
                                <Avatar
                                    src={transformImagePath(
                                        currentUser?.profilePicture || '/default-avatar.png'
                                    )}
                                    alt="You"
                                    sx={{ width: 64, height: 64, mb: 1, mx: 'auto' }}
                                />
                                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                    You
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Your current location
                                </Typography>
                            </Paper>
                        </Popup>
                    </Marker>

                    {/* 👥 Nearby Students Markers */}
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
                                    <StudentPopup student={student} />
                                </Popup>
                            </Marker>
                        );
                    })}
                </MapContainer>
            ) : (
                <Box
                    sx={{
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'grey.100',
                    }}
                >
                    <CircularProgress />
                    <Typography variant="body1" sx={{ ml: 2 }}>
                        Loading map...
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default MapWrapper;