const Router = require("@koa/router");
const userController = require("../controllers/user");
const roomController = require("../controllers/chatRoom");
const messageController = require("../controllers/chatMessage");

const router = new Router();

router.post("/createUser", userController.createUser);
router.post("/login", userController.authUser);
router.post("/exchangeToken", userController.exchangeAccessToken);

router.post("/getUser", userController.getUser);
router.post("/getUserId", userController.getUserById);
router.get("/getAllUsers", userController.getAllUsers);

router.post("/createRoom", roomController.createChatRoom);

router.post("/createMessage", messageController.createMessage);
router.post("/getMessages", messageController.getMessage);

module.exports = router;
