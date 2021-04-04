const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");
const { json } = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 5000;
require("dotenv").config();

app.use(json());
app.use(cors());
app.use(require("./routes"));

mongoose.connect(process.env.MONGOOSE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("Connected to mongoDB");
});

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: ["http://localhost:3000", "https://ptthanh0606.github.io"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected to socket`);
  let conversationIdRoom = "";

  socket.on("OPEN_CONVERSATION", ({ conversationId }) => {
    socket.join(conversationId);

    conversationIdRoom = conversationId;
  });

  socket.on("CLIENT_MESSAGE_SEND", (data) => {
    console.log(data, conversationIdRoom);
    io.to(conversationIdRoom).emit("MESSAGE_INCOMMING", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

server.listen(PORT, () => {
  console.log("App is listening on port " + PORT);
});

module.exports = app;
