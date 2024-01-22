import { createContext, useContext, useState } from "react";
import axios from "axios";
import {
  removeLocalStorage,
  setLocalStorage,
  useLocalStorage,
} from "../utils/storage";

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

const baseURL = "http://localhost:8080";

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useLocalStorage("user");
  const [loading, setLoading] = useState(false);

  async function register(username, email, password) {
    try {
      const res = await axios.post(`${baseURL}/createUser`, {
        username: username,
        email: email,
        password: password,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function login(username, password) {
    try {
      setLoading(true);
      const res = await axios.post(`${baseURL}/login`, {
        username: username,
        password: password,
      });

      if (res.data.data.user != undefined) {
        setCurrentUser(res.data.data.user);
        setLocalStorage("accessToken", res.data.data.accessToken);
        setLocalStorage("refreshToken", res.data.data.refreshToken);
        setLocalStorage("user", res.data.data.user);

        return res.data;
      }
      return null;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    removeLocalStorage("accessToken");
    removeLocalStorage("refreshToken");
    removeLocalStorage("user");
  }

  const value = {
    currentUser,
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
