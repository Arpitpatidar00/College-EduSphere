// src/services/errorService.js
import { toast } from "react-toastify";

export default class ErrorService {
  static handleResponse(response) {
    if (!response) return false;
    const { status, data } = response;

    // If successful response.
    if (status === 200 && data.code === true) {
      return true;
    }

    // Status 200 but with an error.
    if (status === 200 && data.code === false) {
      const errorMessage =
        data.message || "Operation failed. Please try again.";
      this.sendErrorMessage(errorMessage);
      return false;
    }

    // Client errors
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

    // Server error
    if (status === 500) {
      this.sendErrorMessage("Something went wrong!");
      return false;
    }

    // Fallback for unexpected errors.
    this.sendErrorMessage(data.message || "Unexpected Error");
    return false;
  }

  static displayAlert(type, message = "Something went wrong") {
    toast[type](message, { position: "top-right" });
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
