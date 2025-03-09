import { MethodTypesEnum } from "../../../enums/ApiMethord";

import { apiEndPoints } from "../../apiEndpoint";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useGenericMutation } from "../../../hook/useGenericMutation";
import { createServerAction } from "../../../hook/createServerAction";

export const getStudentAction = async (params, authToken, showSuccessToast) => {
  return createServerAction({
    url: apiEndPoints.getAllStudents,
    body: params,
    method: MethodTypesEnum.GET,
    authToken,
    showSuccessToast,
  });
};

export const useGetAllStudents = (params, initialData, paginationModel) =>
  useQuery({
    queryKey: ["students", params, paginationModel],
    queryFn: async () => {
      const response = await getStudentAction(params, "", false);
      if (!response.code) {
        throw response;
      }
      return response.result;
    },
    initialData: () => initialData,
    placeholderData: keepPreviousData,
  });
