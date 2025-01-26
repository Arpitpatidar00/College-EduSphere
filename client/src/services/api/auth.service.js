import { apiEndPoints, methodType } from "../apiEndpoint";
import { sendRequest } from "../apiHandler";
import ErrorService from "../errorService";

export const userLoginApi = async (body, endpoint = "userLogin") => {
  try {
    const { code, result, message } = await sendRequest({
      url: apiEndPoints[endpoint],
      body,
      method: methodType.POST,
    });

    if (code) {
      ErrorService.sendOkMessage(message);
      return result;
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    ErrorService.logError("An unexpected error occurred.");
  }
  return null;
};

export const userSignUpApi = async (body, endpoint = "userSignup") => {
  try {
    const { code, result, message } = await sendRequest({
      url: apiEndPoints[endpoint],
      body,
      method: "POST",
    });

    if (code) {
      ErrorService.sendOkMessage(message);
      return result;
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    ErrorService.logError("An unexpected error occurred.");
  }
  return null;
};
