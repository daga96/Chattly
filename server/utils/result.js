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
