import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/chat" element={<PrivateRoute element={Chat} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
