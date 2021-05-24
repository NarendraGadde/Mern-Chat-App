import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Logout } from "../Middleware/LoginMiddleware";
function Header(props) {
  const history = useHistory();
  return (
    <div className="container-fluid">
      <div className="row bg-info">
        <div className="col-4 col-sm-4 offset-sm-1 col-md-5 offset-md-2  p-3  text-right font-italic text-light h4">
          My Project
        </div>
        <div className=" text-right  col-7 col-sm-6 offset-sm-1 offset-md-0 col-md-5 p-3 ">
          {props.isLoggedIn ? (
            <div className="row">
              <h5 className=" offset-2 pt-1 col-6 text-light font-italic text-right">
                {props.user.name && (
                  <div>Welcome {props.user.name.split(" ")[0]}</div>
                )}
              </h5>
              <div className="col-4">
                <button
                  className="btn btn-success"
                  onClick={() => {
                    props.logout();
                    history.push("/logout");
                  }}
                >
                  <i className="fa fa-sign-out"></i>
                  {"  "}
                  Logout
                </button>
              </div>
            </div>
          ) : localStorage.getItem("refreshtoken") ? (
            <></>
          ) : (
            <div>
              <button
                className="btn btn-success"
                onClick={() => {
                  history.push("/login");
                }}
              >
                <i className="fa fa-sign-in"></i> Login
              </button>
              <button
                className="btn btn-success ml-2"
                onClick={() => {
                  history.push("/signin");
                }}
              >
                <i className="fa fa-sign-in"></i> Signup
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.login.isLoggedIn,
    user: state.login.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => Logout(dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
