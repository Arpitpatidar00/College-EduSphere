// src/hooks/createServerAction.js
import { sendRequest } from "../services/apiHandler";

export async function createServerAction(props) {
  try {
    const response = await sendRequest(props);
    return response;
  } catch (error) {
    return {
      code: false,
      status: 500,
      error: error.message,
      result: null,
    };
  }
}
