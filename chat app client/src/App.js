import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Chat from "./Components/Chat";
import Header from "./Components/Header";
import PrivateRoute from "./Components/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/login" exact strict component={Login} />
        <Route path="/signin" exact strict component={Signup} />
        <PrivateRoute path="/chat" exact strict component={Chat} />
        <Redirect to="/login" />
      </Switch>
    </Router>
  );
};

export default App;
