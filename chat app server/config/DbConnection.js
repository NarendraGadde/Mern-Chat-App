var mongoose = require("mongoose");
var config = require("config");
var mongoDBUrl = config.get("mongoURI");
// var io = require("../App");

const connectDB = () => {
  mongoose.connect(mongoDBUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
};

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongo");
  const changeStream = connection.collection("chats").watch();
  changeStream.on("change", (change) => {
    console.log(change);
  });
});

module.exports = connectDB;
