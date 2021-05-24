import axios from "axios";

const ChatRequest = async (dispatch, token, senderid, receiverid, message) => {
  const headers = {
    token,
  };
  const body = {
    senderid,
    receiverid,
    message,
  };

  try {
    const response = await axios.post("/api/chat", body, { headers });
    dispatch({
      type: "CHAT",
      value: response.data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const GetMessages = async (dispatch, token, friendid) => {
  dispatch({
    type: "GET_MESSAGES",
  });
  const body = { friendid };
  const headers = { token };
  try {
    const messages = await axios.post("/api/chat/getmessages", body, {
      headers,
    });
    // console.log(messages);
    dispatch({
      type: "SET_MESSAGES",
      value: messages.data.result,
    });
    dispatch({
      type: "GET_MESSAGES",
    });
  } catch (error) {
    console.log(error.message);
  }
};

const GetFriends = async (dispatch, token, id) => {
  const headers = { token };

  try {
    const result = await axios.get(`/api/chat/getfriends/${id}`, {
      headers,
    });
    // console.log(result.data.result);
    dispatch({
      type: "SET_FRIENDS",
      value: result.data.result,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const NewMessage = (dispatch, message) => {
  dispatch({
    type: "NEW_MESSAGE",
    value: message,
  });
};

const setActiveFriendId = (dispatch, id) => {
  dispatch({
    type: "SET_ACTIVE_FRIEND",
    value: id,
  });
};

export { ChatRequest, GetMessages, GetFriends, NewMessage, setActiveFriendId };
