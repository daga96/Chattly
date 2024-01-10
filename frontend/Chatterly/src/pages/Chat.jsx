import React, { useEffect, useRef, useState } from "react";
import UsersList from "../components/UsersList";
import Header from "../components/Header";
import { initiateSocketConnection } from "../services/ChatService";
import { useAuth } from "../contexts/AuthContext";
import { getAllUsers } from "../services/apiService";
import EmptyChat from "./EmptyChat";
import ChatRoom from "./ChatRoom";

const Chat = () => {
  const socket = useRef();
  const { currentUser } = useAuth();
  const [onlineId, setOnlineId] = useState([]);
  const [allUsers, setAllUsers] = useState();
  const [currentChat, setCurrentChat] = useState();

  useEffect(() => {
    const getSocket = async () => {
      const res = await initiateSocketConnection();
      socket.current = res;
      socket.current.on("connect", () => {
        console.log("Connected to server");
        socket.current.emit("addUser", currentUser._id);
      });
      socket.current.on("connect_error", (error) => {
        console.error("Connection error:", error.message);
      });
      socket.current.on("getUsers", (users) => {
        const userId = users.map((user) => user[0]);
        setOnlineId(userId);
      });
    };

    getSocket();
  }, [currentUser]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllUsers();
      setAllUsers(res.data);
    };
    fetchData();
  }, []);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <div className="h-screen w-screen flex flex-col">
      <Header />
      <div className="flex h-full items-center justify-center bg-gray-900">
        <div className="h-full w-1/6">
          <UsersList
            users={allUsers}
            changeChat={handleChatChange}
            currentUser={currentUser}
            online={onlineId}
          />
        </div>
        <div
          className="h-full
         w-5/6"
        >
          {currentChat ? (
            <ChatRoom
              currentChat={currentChat}
              currentUser={currentUser}
              socket={socket}
            />
          ) : (
            <EmptyChat />
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
