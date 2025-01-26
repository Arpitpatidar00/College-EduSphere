import { toast } from "react-toastify";

export default class ErrorService {
  static handleResponse(response) {
    // {
    //   code:
    //   message:
    //   data:
    // }
    if (!response) return false;

    const { status, data } = response;

    // Handling the specific success case
    if (status === 200 && data.code === true) {
      return true;
    }

    // Handling the specific case where status is 200 but code is false
    if (status === 200 && data.code === false) {
      // Display an error message based on the response or a default message
      const errorMessage =
        data.message || "Operation failed. Please try again.";
      this.sendErrorMessage(errorMessage);
      return false;
    }

    // Handle other HTTP statuses and error cases
    if (status >= 400 && status < 500) {
      if (status === 404) {
        this.sendWarnMessage("Invalid API");
      } else if (status === 409 || status === 403) {
        this.sendWarnMessage(data?.message || "Access Denied");
      } else if (status === 401) {
        console.error(data?.message);
      } else {
        this.sendErrorMessage(data?.message || "Client Error");
      }
      return false;
    }
    if (status === 500) {
      this.sendErrorMessage("Something went wrong!");
      return false;
    }

    this.sendErrorMessage(data.message || "Unexpected Error");
    return false;
  }

  static displayAlert(type, message = "Something went wrong") {
    toast[type](message, {
      position: "top-right",
    });
  }

  static logError(msg) {
    this.displayAlert("error", msg);
  }

  static sendOkMessage(msg) {
    this.displayAlert("success", msg);
  }

  static sendErrorMessage(msg) {
    this.displayAlert("error", msg);
  }

  static sendWarnMessage(msg) {
    this.displayAlert("warn", msg);
  }
}
