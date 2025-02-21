import { useMutation, useQueryClient } from "@tanstack/react-query";
import ErrorService from "../services/errorService";

export function useGenericMutation(mutationFn, queryKeysToInvalidate) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: (response) => {
      if (response.code) {
        queryClient.invalidateQueries({ queryKey: queryKeysToInvalidate });
      } else {
        ErrorService.handleResponse(response);
        throw response;
      }
    },
  });
}
