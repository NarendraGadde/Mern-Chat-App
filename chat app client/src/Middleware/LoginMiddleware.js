import axios from "axios";

const LoginRequest = async (dispatch, formData) => {
  try {
    const response = await axios.post("api/login", formData);
    // if (response.status !== 200) throw "Exception";
    localStorage.setItem("refreshtoken", response.data.refreshtoken);
    dispatch({
      type: "LOGIN_SUCCESS",
      token: response.data.token,
      user: {},
    });
  } catch (error) {
    dispatch({
      type: "LOGIN_FAIL",
      errors: error.response.data.errors,
    });
    setTimeout(() => {
      dispatch({
        type: "REMOVE_ALERTS",
      });
    }, 3000);
  }
};

const RegisterRequest = async (dispatch, formData) => {
  // Make Register Request to Express API End Point
  try {
    dispatch({
      type: "REMOVE_ALERTS",
    });
    const response = await axios.post("api/register", formData);
    dispatch({
      type: "REGISTER_SUCCESS",
      value: response.data,
    });
    setTimeout(() => {
      dispatch({
        type: "REMOVE_MESSAGE",
      });
    }, 5000);
  } catch (error) {
    console.log(error.response.data.errors);
    dispatch({
      type: "REGISTER_FAIL",
      errors: error.response.data.errors,
    });
    setTimeout(() => {
      dispatch({
        type: "REMOVE_ALERTS",
      });
    }, 5000);
  }
};

const Logout = (dispatch) => {
  localStorage.removeItem("refreshtoken");
  dispatch({
    type: "LOGOUT",
  });
  dispatch({
    type: "CLEAR_FRIENDS",
  });
  dispatch({
    type: "CLEAR_MESSAGES",
  });
};

const GetToken = async (dispatch, refreshtoken) => {
  const headers = { refreshtoken };
  try {
    const response = await axios.get("/api/login/getaccesstoken", {
      headers,
    });
    dispatch({
      type: "LOGIN_SUCCESS",
      token: response.data.token,
      user: response.data.user,
    });
  } catch (error) {
    console.log(error);
  }
};
export { LoginRequest, RegisterRequest, Logout, GetToken };
