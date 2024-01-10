import { createContext, useContext, useState } from "react";
import axios from "axios";
import {
  removeLocalStorage,
  setLocalStorage,
  useLocalStorage,
} from "../utils/Storage";

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
      setCurrentUser(res.data.data.user);
      setLocalStorage("token", res.data.data.token);
      setLocalStorage("user", res.data.data.user);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    removeLocalStorage("token");
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
