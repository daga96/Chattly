import { io } from "socket.io-client";
import { getLocalStorage } from "../utils/storage";
import sendRequest from "../utils/request";

const baseURL = "http://localhost:8080";

export const initiateSocketConnection = async () => {
  try {
    const token = getLocalStorage("accessToken");
    const socket = io(baseURL, {
      port: 8080,
      auth: {
        token,
      },
    });

    return socket;
  } catch (error) {
    console.error("Socket connection error:", error.message);
    throw error;
  }
};

export const createChatRoom = async (participants) => {
  try {
    const res = await sendRequest({
      method: "post",
      url: "/createRoom",
      data: participants,
    });

    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
