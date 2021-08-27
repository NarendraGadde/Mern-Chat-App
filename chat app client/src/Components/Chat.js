//Adding Comment

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import openSocket from "socket.io-client";
import {
  ChatRequest,
  GetFriends,
  GetMessages,
  NewMessage,
  setActiveFriendId,
} from "../Middleware/ChatMiddleware";
import { useRef } from "react";
import Spinner from "../Components/Spinner";

function Chat({
  token,
  getFriends,
  getMessages,
  friends,
  messages,
  onChat,
  id,
  getmessages,
  newMessage,
  activefriendid,
  setActiveFriendId,
}) {
  const [afriend, setFriend] = useState("");
  const inputref = useRef(null);
  const myRef = useRef(null);
  // console.log(afriend);

  const executeScroll = () => myRef.current.scrollIntoView();
  var socket = null;
  useEffect(() => {
    socket = openSocket("/api/chat/socket", { transport: ["websocket"] });
    socket.on("newMessage", (message) => {
      newMessagefromFriend(message);
      // console.log(message.fullDocument.senderid);
      // if (message.fullDocument.senderid === afriend) {
      //   newMessage(message.fullDocument);
      // }
      // newMessageCount(message.fullDocument.senderid);
    });
  }, []);

  const newMessagefromFriend = (message) => {
    // console.log(message.fullDocument.senderid);
    // console.log(afriend);
    if (message.fullDocument.senderid === afriend) {
      newMessage(message.fullDocument);
    }
  };

  useEffect(() => {
    if (token) getFriends(token, id);
  }, [token, getFriends]);

  useEffect(() => {
    if (myRef.current !== null) executeScroll();
  }, [getmessages, messages]);

  const setMessage = async (e) => {
    if (e.keyCode === 13 && e.target.value) {
      await onChat(token, id, afriend, e.target.value);
      e.target.value = "";
    }
  };

  return (
    <div className="container-fluid position-fixed" style={{ height: "100%" }}>
      <div className="row h-100 bg-light">
        <div
          className="col-4 col-lg-4 
         border-right border-info p-0"
        >
          <input
            type="text"
            placeholder="Search for friends"
            className="form-control border-0 rounded-border font-italic"
          />
          <div className="overflow-auto" style={{ height: " 80%" }}>
            {friends.map((friend) => {
              if (friend.id === afriend) {
                return (
                  <div
                    key={friend.id}
                    className=" text-center text-justify text-break border-bottom border-info p-2 bg-info"
                    type="button"
                    onClick={() => {
                      setFriend(friend.id);
                      getMessages(token, friend.id);
                    }}
                  >
                    {friend.name}
                  </div>
                );
              }
              return (
                <div
                  key={friend.id}
                  className=" text-center  text-justify text-break border-bottom border-info p-2 friend "
                  type="button"
                  onClick={() => {
                    setFriend(friend.id);
                    getMessages(token, friend.id);
                  }}
                >
                  {friend.name}
                  {"  "}
                  {friend.newMessageCount}
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-8 col-lg-8 h-100">
          {getmessages === true ? (
            <div className="m-5">
              <Spinner />
            </div>
          ) : (
            <div style={{ height: "100%" }}>
              {afriend !== "" ? (
                <>
                  <div className="row overflow-auto" style={{ height: "80%" }}>
                    <div className="col-12">
                      {messages.length > 0 ? (
                        messages.map((message) => {
                          if (message.senderid === id)
                            return (
                              <div
                                className="d-flex flex-row-reverse mt-2 mr-2"
                                key={message._id}
                                ref={myRef}
                              >
                                <div
                                  className="font-italic text-light rounded p-2  bg-dark"
                                  style={{
                                    width: "fit-content",
                                    overflowWrap: "break-word",
                                    maxWidth: "50%",
                                  }}
                                >
                                  {message.message}
                                </div>
                              </div>
                            );
                          else
                            return (
                              <div
                                className="font-italic text-dark mt-2 rounded p-2 ml-2 bg-white"
                                style={{ width: "fit-content" }}
                                key={message._id}
                                ref={myRef}
                              >
                                {message.message}
                              </div>
                            );
                        })
                      ) : (
                        <div className="h4 font-italic text-success m-5">
                          Start you Conversation .............
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="row fixed" style={{ height: "20%" }}>
                    <div className="form mt-lg-4 mt-2 w-100">
                      <input
                        type="text "
                        className="form-control font-italic"
                        placeholder="Type Something..."
                        required
                        ref={inputref}
                        onKeyUp={(e) => {
                          setMessage(e);
                        }}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-info font-italic h3">
                  Please Select a Chat to Display
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    messages: state.chat.messages,
    isLoggedIn: state.login.isLoggedIn,
    friends: state.chat.friends,
    id: state.login.user._id,
    getmessages: state.chat.getmessages,
    activefriendid: state.chat.activefriendid,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onChat: (token, senderid, receiverid, message) =>
      ChatRequest(dispatch, token, senderid, receiverid, message),
    getMessages: (token, friendid) => GetMessages(dispatch, token, friendid),
    getFriends: (token, id) => GetFriends(dispatch, token, id),
    newMessage: (message) => NewMessage(dispatch, message),
    setActiveFriendId: (id) => setActiveFriendId(dispatch, id),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
