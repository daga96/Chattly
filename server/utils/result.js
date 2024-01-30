/**
 * Module for handling JSON responses in a web server.
 * - 'json': Formats a JSON response with provided data, status code, and optional message.
 * - 'success': Sends successful responses with status code 200 (OK).
 * - 'error': Sends error responses with optional code and message, defaulting to 500 (Internal Server Error).
 * Utilizes 'http-status' library for status codes and 'common' module for utility functions.
 */

const httpStatus = require("http-status");
const util = require("../utils/common");

function json(ctx, data, code = httpStatus.OK, message = null) {
  ctx.type = "json";
  ctx.body = { code, message, data };
}

function success(ctx, data = null, message = null) {
  json(ctx, data, httpStatus.OK, message);
}

function error(ctx, code, message = null) {
  const err = util.isEmpty(code)
    ? { code: httpStatus.INTERNAL_SERVER_ERROR, message: "Unknown error" }
    : { code: code, message: message };
  json(ctx, "", err.code, message || err.message);
}

module.exports = {
  json,
  success,
  error,
};
