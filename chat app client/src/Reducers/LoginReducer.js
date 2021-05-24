const initialState = {
  isLoggedIn: null,
  token: "",
  errors: [],
  Message: "",
  user: {},
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        token: action.token,
        isLoggedIn: true,
        user: action.user,
      };
    case "LOGIN_FAIL":
    case "REGISTER_FAIL":
      return {
        ...state,
        errors: action.errors,
      };
    case "REGISTER_SUCCESS":
      return {
        ...state,
        Message: action.value,
      };
    case "REMOVE_ALERTS":
      return {
        ...state,
        errors: [],
      };
    case "REMOVE_MESSAGE":
      return {
        ...state,
        Message: "",
      };
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        token: "",
      };
    default:
      return state;
  }
};

export default LoginReducer;
