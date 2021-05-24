const c = require("config");
const { request } = require("express");
const express = require("express");
const router = express.Router();
const { auth } = require("../../middleware/Authenticate");
const Chat = require("../../models/Chat");
const User = require("../../models/User");
const { route } = require("./register");

// @route   POST api/chat
// @desc    Returns all the Friends of the User
// @Access  Private
router.post("/", auth, async (req, res) => {
  const { senderid, receiverid, message } = req.body;
  try {
    let chat = new Chat({
      senderid,
      receiverid,
      message,
    });

    let result = await chat.save();
    return res.status(200).json(result);
  } catch (error) {
    res.send("Internal Server Error");
  }
  // console.log(req.body);
});

router.post("/getmessages", auth, async (req, res) => {
  const id = req.body.friendid;
  try {
    let result = await Chat.find({
      $and: [
        { senderid: { $in: [req.user.id, id] } },
        { receiverid: { $in: [req.user.id, id] } },
      ],
    });
    return res.status(200).json({
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Errro");
  }
});

router.get("/getfriends/:id", auth, async (req, res) => {
  const id = req.params.id;
  try {
    // const friends = await Chat.find({
    //   $or: [{ senderid: id }, { receiverid: id }],
    // });

    const friends = await User.find({}).select("-password");
    let result = [];

    friends.map((friend) => {
      if (req.user.id != friend._id)
        result.push({ id: friend._id, name: friend.name, newmessagecount: 0 });
    });
    // if (friends.length > 0) result = friends[0].senderid;
    res.status(200).json({
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Errror");
  }
});

module.exports = router;
