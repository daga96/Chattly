import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      setError("All fields are required!");
      return;
    } else if (password !== confirmPassword) {
      setError("Password and Confirm Password do not match.");
      return;
    } else {
      setError("");
    }

    try {
      setLoading(true);
      const res = await register(username, email, password);
      navigate("/login");
      console.log(res);
    } catch (error) {
      console.error("Registration failed:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-3xl font-semibold mb-6 text-white">Register</h2>
        <form onSubmit={handleRegistration}>
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
          <div className="mb-4">
            <label
              className="block text-white text-sm font-semibold mb-2"
              htmlFor="email"
            >
              Email
            </label>

            <input
              className="w-full px-3 py-2 rounded-md bg-gray-700 text-white"
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-white text-sm font-semibold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="w-full px-3 py-2 rounded-md bg-gray-700 text-white"
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-white cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-white text-sm font-semibold mb-2"
              htmlFor="confirmpassword"
            >
              Confirm Password
            </label>
            <input
              className="w-full px-3 py-2 rounded-md bg-gray-700 text-white"
              type="password"
              id="confirmpassword"
              name="confirmpassword"
              placeholder="Enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="h-8">
            {error && <div className="text-red-300 font-bold "> {error} </div>}
          </div>
          <button
            className="w-full mb-4 bg-purple-400 text-white py-2 rounded-lg hover:bg-purple-500"
            type="submit"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
          <div className="text-sm">
            <Link
              to="/login"
              className=" text-purple-400 hover:underline hover:text-purple-500"
            >
              Already have an account? Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
