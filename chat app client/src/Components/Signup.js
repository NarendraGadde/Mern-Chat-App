import React, { useState, useEffect } from "react";
import { RegisterRequest } from "../Middleware/LoginMiddleware";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Error from "./Error";

function Signup(props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const setValue = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const history = useHistory();

  useEffect(() => {
    setFormData({ ...formData, name: "", email: "", password: "" });
  }, [props.Message]);

  if (props.Message) {
    setTimeout(() => {
      history.push("/login");
    }, 3000);
  }
  const submit = (e) => {
    e.preventDefault();
    props.submit(formData);
  };

  return (
    <div className="container">
      <div className="mt-2">
        <Error />
      </div>
      <div className="mt-5 row">
        {props.Message && (
          <div className="col-lg-4 offset-lg-4 p-2 text-center border rounded bg-success font-italic text-light">
            {props.Message}
          </div>
        )}
      </div>
      <div className="row mt-5">
        <div className="p-3 col-lg-4 text-center offset-lg-4 col-md-6 offset-md-3 border col-sm-8 offset-sm-2 col-8 offset-2 rounded bg-info">
          <div className="h4 font-italic text-light mt-2">Signin</div>

          <form className="form p-3" onSubmit={(e) => submit(e)}>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              required
              name="name"
              onChange={(e) => setValue(e)}
              value={formData.name}
              autoComplete="off"
              autoFocus
            />
            <br />
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              required
              name="email"
              onChange={(e) => setValue(e)}
              value={formData.email}
              autoComplete="off"
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
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    Message: state.login.Message,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    submit: (name, email, password) =>
      RegisterRequest(dispatch, name, email, password),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
