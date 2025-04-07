import { useGetNearbyStudents } from '@services/api/Global/activeLocation';
import MapWrapper from './MapWrapper';

const MapWrapperWithData = ({ userLocation }) => {
    const { data: nearbyStudents = [] } = useGetNearbyStudents(
        userLocation.lat,
        userLocation.lng,
        {
            staleTime: 10000,
            placeholderData: [],
        }
    );

    return <MapWrapper userLocation={userLocation} nearbyStudents={nearbyStudents} />;
};

export default MapWrapperWithData;
