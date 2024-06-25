// server/server.js
const http = require("http");
const axios = require("axios");

const server = http.createServer((req, res) => {
  // Handle HTTP requests if needed
});
const handleFetch = async (message) => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://pdzsl5xw2kwfmvauo5g77wok3q0yffpl.lambda-url.us-east-2.on.aws/",
      headers: {},
    };
    const { data } = await axios.request(config);

    return data;
  } catch (error) {
    console.log("error.=", error)
    return "something went wrong";
  }
};
const { Server } = require("socket.io");
const io = new Server(server, { cors: { origin: "*" } });
io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle chat messages
  socket.on("trade", (message) => {
    handleFetch(message)
      .then((res) => {
      console.log("json parse", JSON.stringify(res))
        io.emit("trade", JSON.stringify(res));
      })
      .catch((e) => console.log("err", e));
    // Broadcast the message to all connected clients
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(3001, () => {
  console.log("WebSocket server listening on port 3001");
});
