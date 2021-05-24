import React, { useState, useEffect } from "react";
import { LoginRequest, GetToken } from "../Middleware/LoginMiddleware";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Error from "./Error";

function Login(props) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const refreshtoken = localStorage.getItem("refreshtoken");
    if (refreshtoken) {
      props.getAccessToken(refreshtoken);
    }
  }, [props]);

  const setValue = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const submit = async (e) => {
    e.preventDefault();
    await props.submit(formData);
  };

  if (props.isLoggedIn) {
    return <Redirect to="/chat" />;
  }

  return (
    <div className="container">
      <div className="mt-5">
        <Error />
      </div>
      <div className="row mt-5"></div>
      <div className="row mt-5">
        <div className=" p-3 text-center col-lg-4 offset-lg-4 col-md-6 offset-md-3 border col-sm-8 offset-sm-2 col-8 offset-2 bg-info rounded">
          <div className="h4 font-italic text-light">Login</div>
          <form className="form p-3" onSubmit={(e) => submit(e)}>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              required
              name="email"
              value={formData.email}
              onChange={(e) => setValue(e)}
              autoComplete="off"
              autoFocus
            />
            <br />
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              required
              name="password"
              value={formData.password}
              onChange={(e) => setValue(e)}
              autoComplete="off"
            />
            <br />
            <div className="text-center">
              <button type="submit" className="btn  btn-success">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { isLoggedIn: state.login.isLoggedIn };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submit: (formData) => LoginRequest(dispatch, formData),
    getAccessToken: (refreshtoken) => GetToken(dispatch, refreshtoken),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
