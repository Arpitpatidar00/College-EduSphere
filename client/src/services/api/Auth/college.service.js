import { MethodTypesEnum } from "../../../enums/ApiMethord";

import { apiEndPoints } from "../../apiEndpoint";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useGenericMutation } from "../../../hook/useGenericMutation";
import { createServerAction } from "../../../hook/createServerAction";

export const getCollegeAction = async (params, authToken, showSuccessToast) => {
  return createServerAction({
    url: apiEndPoints.getAllCollege,
    body: params,
    method: MethodTypesEnum.GET,
    authToken,
    showSuccessToast,
  });
};
export const updateCollegeAction = async ({ body }) => {
  return createServerAction({
    method: MethodTypesEnum.PATCH,
    url: `${apiEndPoints.updateCollege}`,
    body,
  });
};

export const useGetAllCollege = (params, initialData, paginationModel) =>
  useQuery({
    queryKey: ["colleges", params, paginationModel],
    queryFn: async () => {
      const response = await getCollegeAction(params, "", false);
      if (!response.code) {
        throw response;
      }
      return response.result;
    },
    initialData: () => initialData,
    placeholderData: keepPreviousData,
  });

export const updateCollegeStatusAction = async ({ body, _id }) => {
  return createServerAction({
    method: MethodTypesEnum.PATCH,
    url: `${apiEndPoints.updateCollegeStatus}/${_id}`,
    body,
  });
};

// Hook to use mutation for updating a college
export const useUpdateCollege = () => {
  return useGenericMutation(updateCollegeAction, ["colleges"]);
};
export const useUpdateStatusCollege = () => {
  return useGenericMutation(updateCollegeStatusAction, ["colleges"]);
};
