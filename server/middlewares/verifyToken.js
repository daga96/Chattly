const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

exports.VerifyToken = async (ctx, next) => {
  const token = ctx.request.headers.authorization.split(" ")[1];

  try {
    const decodeValue = jwt.verify(token, process.env.TOKEN_KEY);

    if (decodeValue) {
      ctx.state.user = decodeValue;
      await next();
    }
  } catch (e) {
    console.error("Token verification error:", e);
    ctx.status = 401;
    ctx.body = { message: "Internal Error" };
  }
};

exports.VerifySocketToken = async (socket, next) => {
  const token = socket.handshake.auth && socket.handshake.auth.token;

  try {
    const decodeValue = jwt.verify(token, process.env.TOKEN_KEY);

    if (decodeValue) {
      socket.user = decodeValue;
      return next();
    }
  } catch (e) {
    console.error("Token verification error:", e);
  }
};
