import React from "react";

const MessageInput = ({ placeholder, submit }) => {
  const [message, setMessage] = React.useState("");

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submit(message);
      setMessage("");
    }
  };

  return (
    <div className="flex w-full items-center p-4">
      <input
        type="text"
        placeholder={placeholder}
        value={message}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="flex-1 rounded-md py-2 px-4 bg-gray-800 focus:outline-none "
      />
      <button
        onClick={() => {
          setMessage("");
          submit(message);
        }}
        className="ml-4 bg-purple-400 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:border-purple-300"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
