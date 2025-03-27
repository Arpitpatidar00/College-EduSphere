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
export const updateStudentAction = async ({ body }) => {
  return createServerAction({
    method: MethodTypesEnum.PATCH,
    url: `${apiEndPoints.updateStudent}`,
    body,
  });
};

export const updateStudentStatusAction = async ({ body, _id }) => {
  return createServerAction({
    method: MethodTypesEnum.PATCH,
    url: `${apiEndPoints.updateStudentStatus}/${_id}`,
    body,
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

export const useUpdateStudent = () => {
  return useGenericMutation(updateStudentAction, ["students"]);
};
export const useUpdateStatusStudent = () => {
  return useGenericMutation(updateStudentStatusAction, ["students"]);
};
