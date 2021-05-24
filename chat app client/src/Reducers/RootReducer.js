import ChatReducer from "./ChatReducer";
import LoginReducer from "./LoginReducer";
import { combineReducers } from "redux";
const RootReducer = combineReducers({
  login: LoginReducer,
  chat: ChatReducer,
});

export default RootReducer;
