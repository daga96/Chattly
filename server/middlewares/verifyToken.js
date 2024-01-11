const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Result = require("../utils/result");
dotenv.config();

exports.VerifyToken = async (ctx, next) => {
  const token = ctx.request.headers.authorization.split(" ")[1];

  try {
    const decodeValue = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);

    if (decodeValue) {
      ctx.state.user = decodeValue;
      await next();
    }
  } catch (e) {
    Result.error(ctx, 401, "Token Verification Failed");
  }
};

exports.VerifySocketToken = async (socket, next) => {
  const token = socket.handshake.auth && socket.handshake.auth.token;

  try {
    const decodeValue = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);

    if (decodeValue) {
      socket.user = decodeValue;
      return next();
    }
  } catch (e) {
    console.error("Token verification error:", e);
  }
};
