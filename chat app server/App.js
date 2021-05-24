var express = require("express");
// var connectDB = require("./config/DbConnection");
var app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
var mongoose = require("mongoose");
var config = require("config");
var mongoDBUrl = config.get("mongoURI");

io.of("/api/chat/socket").on("connection", (socket) => {
  console.log("socket connection established");
});

//Data Base Connection

// connectDB();
// var io = require("../App");

mongoose.connect(mongoDBUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  const changeStream = connection.collection("chats").watch();
  changeStream.on("change", (change) => {
    io.of("/api/chat/socket").emit("newMessage", change);
  });
});

//Init Middleware
app.use(express.json({ extended: false }));

//Routes
app.use("/api/register", require("./routes/api/register"));
app.use("/api/login", require("./routes/api/login"));
app.use("/api/chat", require("./routes/api/chat"));

server.listen(9000, () => {
  console.log("Server Started");
});
