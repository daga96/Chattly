const Koa = require("koa");
const { koaBody } = require("koa-body");
const cors = require("@koa/cors");
const compress = require("koa-compress");
const router = require("./routes");
const io = require("socket.io");
const http = require("http");
const mongo = require("./config/mongo");
const { VerifyToken, VerifySocketToken } = require("./middlewares/verifyToken");

const app = new Koa();

app.use(cors());
app.use(compress());
app.use(koaBody({ jsonLimit: "100mb" }));

const socketIoPathRegex = /^\/socket\.io\//;

app.use(async (ctx, next) => {
  if (
    ctx.path === "/login" ||
    ctx.path === "/createUser" ||
    ctx.path === "/exchangeToken" ||
    socketIoPathRegex.test(ctx.path)
  ) {
    await next();
  } else {
    await VerifyToken(ctx, next);
  }
});
app.server = http.createServer(app.callback());

app.use(router.routes());
app.io = io(app.server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
app.io.use(VerifySocketToken);

global.onlineUsers = new Map();

function getKey(map, value) {
  for (const [key, val] of map.entries()) {
    if (val === value) {
      return key;
    }
  }
  return null;
}

app.io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("addUser", (userId) => {
    onlineUsers.set(userId, socket.id);
    socket.emit("getUsers", Array.from(onlineUsers));
  });

  socket.on("sendMessage", ({ senderId, receiverId, message }) => {
    const sendUserSocket = onlineUsers.get(receiverId);
    if (sendUserSocket) {
      app.io.to(sendUserSocket).emit("getMessage", {
        senderId,
        message,
      });
    }
  });

  socket.on("disconnect", () => {
    onlineUsers.delete(getKey(onlineUsers, socket.id));
    app.io.emit("getUsers", Array.from(onlineUsers));
  });
});

app.server.listen(8080, () => {
  console.log("Server listening on port", 8080);
});
