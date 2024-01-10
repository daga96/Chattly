const chatMessageModel = require("../models/chatMessage.js");
const Result = require("../utils/result.js");

exports.createMessage = async (ctx) => {
  const body = ctx.request.body;
  console.log(body);
  const newMessage = new chatMessageModel(body);

  try {
    await newMessage.save();
    return Result.success(ctx, newMessage);
  } catch (error) {
    return Result.error(ctx, error.code, error.message);
  }
};

exports.getMessage = async (ctx) => {
  const { chatRoomId } = ctx.request.body;
  try {
    const messages = await chatMessageModel.find({
      chatRoomId: chatRoomId,
    });

    return Result.success(ctx, messages);
  } catch (error) {
    return Result.error(ctx, error.code, error.message);
  }
};
