import React from "react";
import Avatar from "react-avatar";
const UserLine = ({ user, isOnline }) => {
  return (
    <div className="flex h-[5rem] w-full items-center hover:bg-gray-900 cursor-pointer">
      <div className="h-10 w-10 relative rounded-full ml-4 mr-4 ">
        <Avatar name={user.username} size="40" round={true} />
        {isOnline ? (
          <div
            className={
              "h-2 w-2 absolute right-0 bottom-1 rounded-full bg-green-400"
            }
          ></div>
        ) : (
          <div
            className={
              "h-2 w-2 absolute right-0 bottom-1 rounded-full bg-gray-300"
            }
          ></div>
        )}
      </div>

      <p className="text-slate-50">{user.username}</p>
    </div>
  );
};
export default UserLine;
