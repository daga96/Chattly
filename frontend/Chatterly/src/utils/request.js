import axios from "axios";
import { getLocalStorage } from "./Storage";

const API_URL = "http://localhost:8080";

const createHeader = async () => {
  try {
    const token = getLocalStorage("token");

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
  console.log("Headers:", headers);
  try {
    const response = await axios({
      method,
      url: `${API_URL}${url}`,
      data,
      headers,
    });
    return response.data;
  } catch (err) {
    console.error("API request error:", err);
    throw new Error("Failed to make API request");
  }
};

export default sendRequest;
