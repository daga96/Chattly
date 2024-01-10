import React, { useState } from "react";

import UserLine from "./UserLine";
import { createChatRoom } from "../services/ChatService";

const UsersList = ({ users, changeChat, currentUser, online }) => {
  const handleNewChatRoom = async (user) => {
    const members = {
      senderId: currentUser._id,
      receiverId: user._id,
    };

    const res = await createChatRoom(members);

    changeChat(res);
  };

  return (
    <div className="h-full bg-gray-900 ">
      {users
        ?.filter((user) => user && user._id !== currentUser._id)
        ?.map((contact) => (
          <div key={contact._id} onClick={() => handleNewChatRoom(contact)}>
            <UserLine user={contact} isOnline={online.includes(contact._id)} />
          </div>
        ))}
    </div>
  );
};

export default UsersList;
