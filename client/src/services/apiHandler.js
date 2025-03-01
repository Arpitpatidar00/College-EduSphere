// src/services/apiHandler.js
import { selectToken } from "../store/slices/auth.slice";
import { makeStore } from "../store/store";
import api from "./api.config"; // e.g., an Axios instance
import ErrorService from "./errorService";
import { MethodTypesEnum } from "../enums/ApiMethord";

export const sendRequest = async ({
  url,
  body = null,
  auth = true,
  params = null,
  method = "GET",
}) => {
  const reqMethod = method.toLowerCase();
  const token = selectToken(makeStore().getState());

  const config = {
    method,
    url,
  };

  if (
    reqMethod === MethodTypesEnum.GET ||
    reqMethod === MethodTypesEnum.PATCH ||
    reqMethod === MethodTypesEnum.POST ||
    reqMethod === MethodTypesEnum.PUT ||
    reqMethod === MethodTypesEnum.DELETE
  ) {
    if (body) {
      config.data = body;
    }
    if (params) {
      config.params = params;
    }
  }

  // For GET requests, use query parameters (here we assume body holds params).
  if (reqMethod === MethodTypesEnum.GET) {
    config.params = body;
  }

  // Set headers based on whether body is a FormData or not.
  if (body instanceof FormData) {
    config.headers = {
      "Content-Type": "multipart/form-data",
    };
  } else {
    config.headers = {
      "Content-Type": "application/json; charset=utf-8",
    };
  }

  // Attach the Authorization header if token is available.
  if (token && auth) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await api(config);
    // Handle response (for example, show toast messages if needed)
    ErrorService.handleResponse(response);
    return {
      ...response.data,
      status: response.status,
    };
  } catch (error) {
    // Handle errors via ErrorService.
    ErrorService.handleResponse(error?.response);
    return {
      code: false,
      status: error?.response?.status || 500,
      error: error?.message,
      result: null,
    };
  }
};
