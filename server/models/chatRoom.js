const mongoose = require("mongoose");

const chatRoomSchema = new mongoose.Schema({
  participants: {
    type: mongoose.Schema.Types.Array,
  },

  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema);

module.exports = ChatRoom;
