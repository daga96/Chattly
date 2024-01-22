import React from "react";

const Message = ({ message, sender, self }) => {
  const bubbleClasses = `p-2 w-fit rounded-lg break-words ${
    sender === self
      ? "justify-end bg-purple-400 text-white"
      : "justify-start bg-gray-800 text-white"
  }`;

  return (
    <li className={`${self !== sender ? "justify-start" : "justify-end"} flex`}>
      <div className={bubbleClasses}>{message}</div>
    </li>
  );
};

export default Message;
