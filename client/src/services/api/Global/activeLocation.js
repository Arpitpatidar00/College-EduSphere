import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { createServerAction } from "../../../hook/createServerAction";
import { useGenericMutation } from "../../../hook/useGenericMutation";
import { apiEndPoints } from "../../apiEndpoint";
import { MethodTypesEnum } from "../../../enums/ApiMethord";

export const updateLocationAction = async ({ latitude, longitude }) => {
  return createServerAction({
    url: `${apiEndPoints.updateLocation}`,
    body: { latitude, longitude },
    method: MethodTypesEnum.POST,
  });
};

export const getNearbyStudentsAction = async (latitude, longitude) => {
  if (!latitude || !longitude) throw new Error("Missing coordinates");

  return createServerAction({
    url: `${apiEndPoints.getNearbyStudents}?latitude=${latitude}&longitude=${longitude}`,
    method: MethodTypesEnum.GET,
  });
};

export const useUpdateLocation = () => {
  return useGenericMutation(updateLocationAction, [
    "location",
    "nearbyStudents",
  ]);
};

export const useGetNearbyStudents = (latitude, longitude, options = {}) =>
  useQuery({
    queryKey: ["nearbyStudents", latitude, longitude],
    queryFn: async () => {
      const response = await getNearbyStudentsAction(latitude, longitude);
      if (!response.code) {
        throw new Error(response.message || "Failed to fetch nearby students");
      }
      return response.result;
    },
    placeholderData: keepPreviousData,
    enabled: !!latitude && !!longitude,
    ...options, // allow overrides like initialData, staleTime, etc.
  });
