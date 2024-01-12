import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center bg-gray-900">
      <div className="flex w-screen justify-end p-4">
        <Link to="/login" className="text-gray-900">
          <button className="rounded-lg ">Login</button>
        </Link>
      </div>
      <div className="h-full w-screen flex flex-col items-center justify-center ">
        <div className=" w-full max-w-md text-center ">
          <h2 className="text-6xl font-semibold mb-4text-white">Chattly</h2>
          <p className="text-white text-sm mb-6">
            Real-time chat application for you and your friends.
          </p>
          <button className="w-full bg-purple-400 text-white py-2 rounded-lg hover:bg-purple-500">
            Join Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
