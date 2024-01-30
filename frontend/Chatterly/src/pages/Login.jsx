import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin();
  }

  const handleLogin = async () => {
    try {
      const loginRes = await login(username, password);
      if (loginRes !== null) {
        navigate("/chat");
      } else {
        setLoginError("비밀번호 또는 로그인이 잘못되었습니다");
      }
    } catch (error) {
      console.log(error);
      setLoginError("서버에 문제가 발생했습니다. 나중에 다시 시도해주세요");
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-3xl font-semibold mb-6 text-white">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-white text-sm font-semibold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="w-full px-3 py-2 rounded-md bg-gray-700 text-white"
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              className="block text-white text-sm font-semibold mb-2"
              htmlFor="currentpassword"
            >
              Password
            </label>
            <input
              className="w-full px-3 py-2 rounded-md bg-gray-700 text-white"
              type="password"
              id="currentpassword"
              name="currentpassword"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="h-8">
            {loginError && (
              <div className="text-red-300 font-bold "> {loginError} </div>
            )}
          </div>
          <button
            className="w-full mb-4 bg-purple-400 text-white py-2 rounded-lg hover:bg-purple-500"
            type="submit"
          >
            Log In
          </button>
        </form>

        <div className="text-sm">
          <Link
            to="/register"
            className=" text-purple-400 hover:underline hover:text-purple-500"
          >
            Don't have an account? Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
