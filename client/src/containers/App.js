import React, { Component } from "react";

import ProtectedRoute from "../hoc/ProtectedRoute.js";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage.jsx";
import UnauthorizedPage from "../pages/UnauthorizedPage/UnauthorizedPage.jsx";
import HomePage from "../pages/HomePage/HomePage.jsx";
import AuthPage from "../pages/AuthPage/AuthPage";

import {
  Switch,
  Route,
  Redirect,
  withRouter
} from "react-router-dom";


import "./App.css";

class App extends Component {


  render() {
    return (
            <div className="App">
              <Switch>
                <Route path="/signin" component={AuthPage}></Route>
                <Route path="/signup" component={AuthPage}></Route>
                <Route path="/not-found" component={NotFoundPage}></Route>
                <Route path="/401" component={UnauthorizedPage}></Route>
                <ProtectedRoute auth={this.context.isAuthenticated} path="/annotate" component={HomePage} />
                <ProtectedRoute auth={this.context.isAuthenticated} path="/request" component={HomePage} />
                <ProtectedRoute auth={this.context.isAuthenticated} path="/results" component={HomePage} />
                <ProtectedRoute auth={this.context.isAuthenticated} path="/" component={HomePage} />
              </Switch>

        </div>
    );
  }
}


export default withRouter(App);
