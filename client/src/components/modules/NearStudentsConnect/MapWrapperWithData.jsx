import { useGetNearbyStudents } from '@services/api/Global/activeLocation';
import MapWrapper from './MapWrapper';

const MapWrapperWithData = ({ userLocation }) => {
    const { data: nearbyStudents = [], isLoading, isError } = useGetNearbyStudents(
        userLocation.lat,
        userLocation.lng,
        {
            staleTime: 10000,
            placeholderData: [],
        }
    );

    return (
        <MapWrapper
            userLocation={userLocation}
            nearbyStudents={nearbyStudents}
            isLoading={isLoading}
            isError={isError}
        />
    );
};

export default MapWrapperWithData;
