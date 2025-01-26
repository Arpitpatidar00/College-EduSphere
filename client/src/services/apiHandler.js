import { selectToken } from "../store/slices/auth.slice";
import { makeStore } from "../store/store";
import api from "./api.config";
import { methodType } from "./apiEndpoint";
import ErrorService from "./errorService";

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
    reqMethod === methodType.PUT ||
    reqMethod === methodType.PATCH ||
    reqMethod === methodType.POST ||
    reqMethod === methodType.DELETE
  ) {
    if (body) {
      config.data = body;
    }
    // this is for the case where in post api we are sending id as query params and data as body
    if (params) {
      config.params = params;
    }
  }

  if (method.toLocaleLowerCase() === methodType.GET) {
    config.params = body;
  }

  if (body instanceof FormData) {
    config.headers = {
      "Content-Type": "multipart/form-data",
    };
  } else {
    config.headers = {
      "Content-Type": "application/json; charset=utf-8",
    };
  }

  if (token && auth) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await api(config);
    // Use ErrorService to handle the response
    ErrorService.handleResponse(response);

    return {
      ...response.data,
      status: response.status,
    };
  } catch (error) {
    ErrorService.handleResponse(error?.response);
    return {
      code: false,
      status: error?.response?.status || 500,
      result: null,
    };
  }
};
