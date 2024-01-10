const chatRoomModel = require("../models/chatRoom.js");
const Result = require("../utils/result.js");

exports.createChatRoom = async (ctx) => {
  const { senderId, receiverId } = ctx.request.body;

  try {
    const existingChatRoom = await chatRoomModel.findOne({
      $or: [
        { participants: [senderId, receiverId] },
        { participants: [receiverId, senderId] },
      ],
    });

    if (existingChatRoom) {
      return Result.success(ctx, existingChatRoom, "Existing Chat Room Found");
    }

    const newChatRoom = new chatRoomModel({
      participants: [senderId, receiverId],
    });

    await newChatRoom.save();

    return Result.success(ctx, newChatRoom, "Chat Room Created");
  } catch (error) {
    return Result.error(ctx, error.code, error.message);
  }
};
