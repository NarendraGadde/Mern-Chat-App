import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router";
import { GetToken } from "../Middleware/LoginMiddleware";

function PrivateRoute({
  component: Component,
  isLoggedIn,
  getAccessToken,
  token,
  ...rest
}) {
  useEffect(() => {
    const refreshtoken = localStorage.getItem("refreshtoken");
    if (refreshtoken) {
      getAccessToken(refreshtoken);
    }
  }, [getAccessToken]);

  return (
    <Route
      {...rest}
      render={(props) => {
        return isLoggedIn || localStorage.getItem("refreshtoken") ? (
          <Component {...props} token={token} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.login.isLoggedIn,
    token: state.login.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAccessToken: (refreshtoken) => GetToken(dispatch, refreshtoken),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
