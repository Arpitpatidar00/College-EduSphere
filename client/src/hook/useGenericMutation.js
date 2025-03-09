import { useMutation, useQueryClient } from "@tanstack/react-query";
import ErrorService from "../services/errorService";

export function useGenericMutation(mutationFn, queryKeysToInvalidate) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: (response) => {
      if (response.code) {
        if (Array.isArray(queryKeysToInvalidate)) {
          queryKeysToInvalidate.forEach((key) => {
            queryClient.invalidateQueries([key], { exact: false });
          });
        } else {
          queryClient.invalidateQueries([queryKeysToInvalidate], {
            exact: false,
          });
        }
      } else {
        ErrorService.handleResponse(response);
        throw response;
      }
    },
  });
}
