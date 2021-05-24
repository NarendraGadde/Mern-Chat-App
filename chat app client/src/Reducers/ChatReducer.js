const intialState = {
  messages: [],
  friends: [],
  getmessages: false,
  activefriendid: "",
};
const ChatReducer = (state = intialState, action) => {
  if (action.type === "CHAT") {
    return { ...state, messages: [...state.messages, action.value] };
  }
  if (action.type === "SET_MESSAGES") {
    return { ...state, messages: [...action.value] };
  }
  if (action.type === "SET_FRIENDS") {
    return { ...state, friends: [...action.value] };
  }
  if (action.type === "CLEAR_FRIENDS") {
    return { ...state, friends: [] };
  }
  if (action.type === "CLEAR_MESSAGES") {
    return { ...state, messages: [] };
  }
  if (action.type === "GET_MESSAGES") {
    return { ...state, getmessages: !state.getmessages };
  }
  if (action.type === "NEW_MESSAGE") {
    return { ...state, messages: [...state.messages, action.value] };
  }
  if (action.type === "NEW_MESSAGE_COUNT") {
    // console.log(action.value);
    const newFriends = state.friends.map((friend) =>
      friend.id === action.value
        ? { ...friend, newmessagecount: friend.newmessagecount + 1 }
        : friend
    );
    // console.log(newFriends);
    // console.log("SAM");
    return { ...state, friends: newFriends };
  }
  if (action.type === "SET_ACTIVE_FRIEND") {
    return { ...state, activefriendid: action.value };
  }
  return state;
};

export default ChatReducer;
