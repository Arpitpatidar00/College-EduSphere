
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