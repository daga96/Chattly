import axios from "axios";
import { getLocalStorage, setLocalStorage } from "./storage";
import { exchangeToken } from "../services/apiService";
import { useAuth } from "../contexts/AuthContext";

const API_URL = "http://localhost:8080";

const createHeader = async () => {
  try {
    const token = getLocalStorage("accessToken");

    if (!token) {
      throw new Error("Token not found in local storage");
    }

    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  } catch (error) {
    console.error("Error creating headers:", error);
    throw error;
  }
};

const sendRequest = async ({ method, url, data }) => {
  const headers = await createHeader();

  try {
    const response = await axios({
      method,
      url: `${API_URL}${url}`,
      data,
      headers,
    });

    if (
      response.data.code == 401 &&
      response.data.message == "Token Verification Failed"
    ) {
      const refreshToken = getLocalStorage("refreshToken");
      const res = await exchangeToken({ refreshToken: refreshToken });

      setLocalStorage("accessToken", res.data.accessToken);
    }

    return response.data;
  } catch (err) {
    console.error("API request error:", err);
    throw new Error("Failed to make API request");
  }
};

export default sendRequest;
