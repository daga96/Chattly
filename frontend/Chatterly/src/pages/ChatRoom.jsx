import React, { useState, useEffect, useRef } from "react";
import {
  getRoomMessages,
  getUserById,
  sendMessage,
} from "../services/apiService";

import Message from "../components/Message";
import MessageInput from "../components/MessageInput";

const ChatRoom = ({ currentChat, currentUser, socket }) => {
  const [messages, setMessages] = useState([]);
  const [incomingMessage, setIncomingMessage] = useState(null);
  const [contact, setContact] = useState("");

  const scrollRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getRoomMessages({ chatRoomId: currentChat._id });

      setMessages(res.data);
    };
    fetchData();
  }, [currentChat._id]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    socket.current?.on("getMessage", (data) => {
      setIncomingMessage({
        senderId: data.senderId,
        message: data.message,
      });
    });
  }, [socket]);

  useEffect(() => {
    incomingMessage && setMessages((prev) => [...prev, incomingMessage]);
  }, [incomingMessage]);

  const handleFormSubmit = async (message) => {
    const receiverId = currentChat.participants.find(
      (member) => member !== currentUser._id
    );

    socket.current.emit("sendMessage", {
      senderId: currentUser._id,
      receiverId: receiverId,
      message: message,
    });

    const messageBody = {
      chatRoomId: currentChat._id,
      sender: currentUser._id,
      message: message,
    };

    const res = await sendMessage(messageBody);
    setMessages([...messages, res.data]);
  };

  useEffect(() => {
    const fetchData = async () => {
      const receiverId = currentChat.participants.find(
        (member) => member !== currentUser._id
      );

      const res = await getUserById({ _id: receiverId });
      console.log(res.data);
      setContact(res.data);
    };
    fetchData();
  }, [currentChat]);

  return (
    <div className="flex flex-col w-full h-full  items-center text-slate-500">
      <div className="w-full p-4  font-bold text-gray-200">
        {contact.username}
      </div>
      <div className="relative w-full p-6 overflow-y-auto h-full  ">
        <ul className="space-y-2">
          {messages?.map((message, index) => (
            <div key={index} ref={scrollRef}>
              <Message
                message={message.message}
                sender={message.sender}
                self={currentUser._id}
              />
            </div>
          ))}
        </ul>
      </div>
      <MessageInput placeholder={`Message here`} submit={handleFormSubmit} />
    </div>
  );
};

export default ChatRoom;
