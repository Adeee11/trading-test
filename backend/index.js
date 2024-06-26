// server/server.js
const http = require("http");
const axios = require("axios");

const server = http.createServer((req, res) => {
  // Handle HTTP requests if needed
  const url = req.url;
  if (url === '/') {
    res.write(' Welcome to Home page');
    res.end();
}
});

const handleFetch = async (message) => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://pdzsl5xw2kwfmvauo5g77wok3q0yffpl.lambda-url.us-east-2.on.aws/",

      headers: {},
    };
    // const { data } = await axios.request(config);
    const data = {
      symbol: "BTCUSD",
      operation: "Buy",
      volume: 0.07,
      takeprofit: 104646,
      comment: "Blackalgo #47a8d5d2",
    };
    return data;
  } catch (error) {
    console.log("error.=", error);
    return "something went wrong";
  }
};
const handleAuth = async (message) => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://pdzsl5xw2kwfmvauo5g77wok3q0yffpl.lambda-url.us-east-2.on.aws/",

      headers: {},
    };
    // const { data } = await axios.request(config);

    return "5cdb5717-dace-4049-9b08-d92f43c82ed8";
  } catch (error) {
    console.log("error.=", error);
    return "something went wrong";
  }
};
const handleRaplicate = async (message) => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://pdzsl5xw2kwfmvauo5g77wok3q0yffpl.lambda-url.us-east-2.on.aws/",

      headers: {},
    };
    // const { data } = await axios.request(config);
    const data = {
      ticket: 212928420,
      openTime: "2024-06-25T15:15:15",
      closeTime: "1970-01-01T00:00:00",
      expiration: "1970-01-01T00:00:00",
      type: "Buy",
      lots: 0.5,
      symbol: "BTCUSD",
      openPrice: 61078.26,
      stopLoss: 0,
      takeProfit: 100000,
      closePrice: 61063.26,
      magicNumber: 0,
      swap: 0,
      commission: 0,
      comment: "Blackalgo #",
      profit: -7.5,
      rateOpen: 1,
      rateClose: 0,
      rateMargin: 1,
      ex: {
        order: 212928420,
        login: 44712225,
        symbol: "QlRDVVNEAAAAAAAA",
        digits: 2,
        cmd: 0,
        volume: 50,
        open_time: 1719328515,
        state: 0,
        open_price: 61078.26,
        sl: 0,
        tp: 100000,
        close_time: 0,
        value_date: 0,
        expiration: 0,
        place_type: 0,
        conv_rates: [1, 0],
        commission: 0,
        commission_agent: 0,
        storage: 0,
        close_price: 61063.26,
        profit: -7.5,
        taxes: 0,
        magic: 0,
        comment: "Blackalgo #",
        internal_id: 0,
        activation: 0,
        spread: 0,
        margin_rate: 1,
        timestamp: 1719328515,
        reserved: [0, 0, 0, 0],
        next: 0,
      },
      placedType: "Client",
      state: "OPEN_NORMAL",
    };
    return data;
  } catch (error) {
    console.log("error.=", error);
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
        console.log("json parse", JSON.stringify(res));
        io.emit("trade", JSON.stringify(res));
      })
      .catch((e) => console.log("err", e));
    // Broadcast the message to all connected clients
  });
  socket.on("signIn", (message) => {
    handleAuth(message)
      .then((res) => {
        handleRaplicate(res).then((response) => {
          io.emit("signIn", JSON.stringify(response));
        });
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
