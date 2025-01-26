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

class BadRequestError extends CustomError {
  constructor(message) {
    super("BadRequestError", 400, message || "Bad Request");
  }
}

class InternalServerError extends CustomError {
  constructor(message) {
    super("InternalServerError", 500, message || "Internal Server Error");
  }
}

class NotFoundError extends CustomError {
  constructor(message) {
    super("NotFoundError", 404, message || "Not Found");
  }
}

class UnauthorizedError extends CustomError {
  constructor(message) {
    super("UnauthorizedError", 401, message || "Unauthorized");
  }
}

class ForbiddenError extends CustomError {
  constructor(message) {
    super("ForbiddenError", 403, message || "Forbidden");
  }
}

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
export function OK(res, result = null, message = "", code = true) {
  sendResponse(res, STATUS_CODES.OK, result, message, code);
}

export function ERROR(res, result = null, message = "Error", code = false) {
  sendResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, result, message, code);
}

export function UNAUTHORIZED(
  res,
  result = null,
  message = "You are not authorized to perform this action.",
  code = false
) {
  sendResponse(res, STATUS_CODES.UNAUTHORIZED, result, message, code);
}

export function BAD(res, result = null, message = "Bad Request", code = false) {
  sendResponse(res, STATUS_CODES.BAD_REQUEST, result, message, code);
}

export function NOT_FOUND(
  res,
  result = null,
  message = "Resource Not Found",
  code = false
) {
  sendResponse(res, STATUS_CODES.NOT_FOUND, result, message, code);
}

export function FORBIDDEN(
  res,
  result = null,
  message = "Access Denied",
  code = false
) {
  sendResponse(res, STATUS_CODES.FORBIDDEN, result, message, code);
}

export function UNKNOWN(
  res,
  result = null,
  message = "An unexpected error occurred. Please try again later.",
  code = false
) {
  sendResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, result, message, code);
}
