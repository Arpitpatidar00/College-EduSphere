// Response Utility Functions
export function sendResponse(
  res,
  statusCode,
  result = null,
  message = "",
  code = true
) {
  res.status(statusCode).json({
    code,
    message: message || "",
    result: result || null,
  });
}

// Custom Error Classes
class CustomError extends Error {
  constructor(name, statusCode, message) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
  }
}

const createErrorClass = (name, statusCode, defaultMessage) => {
  return class extends CustomError {
    constructor(message = defaultMessage) {
      super(name, statusCode, message);
    }
  };
};

const BadRequestError = createErrorClass("BadRequestError", 400, "Bad Request");
const InternalServerError = createErrorClass(
  "InternalServerError",
  500,
  "Internal Server Error"
);
const NotFoundError = createErrorClass("NotFoundError", 404, "Not Found");
const UnauthorizedError = createErrorClass(
  "UnauthorizedError",
  401,
  "Unauthorized"
);
const ForbiddenError = createErrorClass("ForbiddenError", 403, "Forbidden");

export {
  BadRequestError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
};

// Constants for Common HTTP Status Codes
export const STATUS_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

// Response Functions for Common Status Codes
const createResponseFunction = (statusCode, defaultMessage, code) => {
  return (res, result = null, message = defaultMessage) => {
    sendResponse(res, statusCode, result, message, code);
  };
};

export const OK = createResponseFunction(STATUS_CODES.OK, "", true);
export const ERROR = createResponseFunction(
  STATUS_CODES.INTERNAL_SERVER_ERROR,
  "Error",
  false
);
export const UNAUTHORIZED = createResponseFunction(
  STATUS_CODES.UNAUTHORIZED,
  "You are not authorized to perform this action.",
  false
);
export const BAD = createResponseFunction(
  STATUS_CODES.BAD_REQUEST,
  "Bad Request",
  false
);
export const NOT_FOUND = createResponseFunction(
  STATUS_CODES.NOT_FOUND,
  "Resource Not Found",
  false
);
export const FORBIDDEN = createResponseFunction(
  STATUS_CODES.FORBIDDEN,
  "Access Denied",
  false
);
export const UNKNOWN = createResponseFunction(
  STATUS_CODES.INTERNAL_SERVER_ERROR,
  "An unexpected error occurred. Please try again later.",
  false
);
