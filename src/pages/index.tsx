// pages/index.js
import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001"); // Replace with your server URL

const Index = () => {
  const [messages, setMessages] = useState<any>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {

    socket.on("trade", (message) => {

      setMessages(message);
    });
  }, []);

  const sendMessage = () => {
    socket.emit("trade", "user_1");
  };

  return (
    <div>
      <div className="grid grid-rows-3 grid-flow-col gap-4">
        <div className="row-start-1  bg-slate-100 p-28">
          <h1 className="text-center py-16">YOUR TRADE DETAILS</h1>
          <div>
            <div>{messages}</div>
          </div>
        </div>

        <div className="row-start-1  bg-slate-100 p-28">
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={sendMessage}
          >
            TRADE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
