import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Avatar from "react-avatar";

const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      logout();
    } catch (error) {
      console.error("Logout failed", error.message);
    } finally {
      navigate("/");
    }
  };
  return (
    <div className="flex h-20 w-full p-10 items-center justify-between bg-gray-800 text-slate-50">
      Chattly
      <div className="flex items-center">
        <Avatar name={currentUser.username} size="40" round={true} />
        <div className="mx-2">{currentUser.username}</div>
        <FontAwesomeIcon
          icon={faSignOutAlt}
          className="ml-2  cursor-pointer"
          title="Logout"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default Header;
