import { MethodTypesEnum } from "../../enums/ApiMethord";
import { apiEndPoints } from "../apiEndpoint";

import { sendRequest } from "../apiHandler";
import ErrorService from "../errorService";

export const LoginApi = async (body, endpoint) => {
  try {
    const { code, result, message } = await sendRequest({
      url: apiEndPoints[endpoint],
      body,
      method: MethodTypesEnum.POST,
    });

    if (code) {
      ErrorService.sendOkMessage(message);
      return result;
    }
  } catch (error) {
    ErrorService.logError("An unexpected error occurred.", error);
  }
  return null;
};
export const SignupApi = async (body, endpoint = "studentSignup") => {
  try {
    const { code, result, message } = await sendRequest({
      url: apiEndPoints[endpoint],
      body,
      method: MethodTypesEnum.POST,
    });

    if (code) {
      ErrorService.sendOkMessage(message);
      return result;
    }
  } catch (error) {
    ErrorService.logError("An unexpected error occurred.", error);
  }
  return null;
};

