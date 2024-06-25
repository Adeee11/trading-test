// pages/index.js
import React, { useState, useEffect } from "react";
import io from "socket.io-client";

// const socket = io("http://localhost:3001"); // Replace with your server URL
const socket = io("http://172.31.35.98:3001/"); 

const Index = () => {
  const [error, setError] = useState({ userErr: "", passErr: "" });
  const [messages, setMessages] = useState<any>("");
  const [replicateData, setReplicateData] = useState<any>("");
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [auth, setAuth] = useState<{ user: string; password: string }>({
    user: "",
    password: "",
  });

  useEffect(() => {
    socket.on("trade", (message) => {
      setMessages(message);

      if (message) setOpenForm(true);
    });
    socket.on("signIn", (message) => {
      console.log("signin", message);
      if (message) {
        setReplicateData(message);
        setOpenForm(false);
      }
    });
  }, []);

  const sendMessage = () => {
    socket.emit("trade", "user_1");
  };
  const signIn = () => {
    if (auth.user === "") {
      setError((prevState) => ({
        ...prevState,
        userErr: "user required",
      }));
    }
    if (auth.password === "") {
      setError((prevState) => ({
        ...prevState,
        passErr: "password required",
      }));
    }
    if (auth.user !== "" && auth.password !== "" && messages !== "") {
      const data = {
        trade: messages,
        user: auth.user,
        password: auth.password,
      };
      socket.emit("signIn", data);
    }
  };
  console.log(auth);
  return (
    <div>
      <div className="grid grid-rows grid-flow-col gap-1 h-svh bg-slate-900 p-28">
        <div className="row-start-1  bg-slate-100 px-28 pt-8 w-[500px] h-[auto]" >
          <h1 className="text-center ">YOUR TRADE DETAILS</h1>
          <div className="py-8">
            {openForm && (
              <div className="w-full max-w-xs">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Username
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="text"
                      placeholder="Username"
                      onChange={(a) =>
                        setAuth((prevState) => ({
                          ...prevState,
                          user: a.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Password
                    </label>
                    <input
                      className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      id="password"
                      type="password"
                      placeholder="******************"
                      onChange={(a) =>
                        setAuth((prevState) => ({
                          ...prevState,
                          password: a.target.value,
                        }))
                      }
                    />
                    {error.passErr !== "" && (
                      <p className="text-red-500 text-xs italic">
                        Please choose a password.
                      </p>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                      onClick={signIn}
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            )}
           <p className="overflow-x-auto"> {replicateData !== "" && replicateData}</p>
          </div>
        </div>

        <div className="row-start-1  bg-slate-100 flex justify-center items-center">
          <div>
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={sendMessage}
              disabled={openForm}
            >
              TRADE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
