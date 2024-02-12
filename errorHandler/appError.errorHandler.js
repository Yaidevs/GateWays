/**
 * Custom error handler Class.
 * -It extends the builtin error handling -
 * and add the statusCode and isOperational fields to it.
 */

class AppError extends Error {
  //? Errors raised by using this class will be caught by global error handle that has been configured .
  constructor(message, statusCode) {
    super(message);
    this.customMessage = message || "error";
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
