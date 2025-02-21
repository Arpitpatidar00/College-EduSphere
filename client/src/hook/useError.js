// src/hooks/useError.js
import { useEffect } from "react";
import ErrorService from "../services/errorService";

export const useError = (response, responses) => {
  useEffect(() => {
    if (responses && responses.length) {
      responses.forEach((item) => {
        if (item && item.error) {
          ErrorService.handleResponse(item);
        }
      });
    } else if (response && response.error) {
      ErrorService.handleResponse(response);
    }
  }, [response, responses]);
};
