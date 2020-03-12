import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import AuthPage from "./pages/Auth";
import BookingsPage from "./pages/Bookings";
import EventsPage from "./pages/Events";
import MainNavigation from "./components/Navigation/MainNavigation";
import AuthContext from "./context/auth-context";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: null,
      userId: null
    };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login(token, userId, TokenExpiredError) {
    this.setState({ token: token, userId: userId });
  }

  logout = () => {
    this.setState({ token: null, userId: null });
  };

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <AuthContext.Provider
            value={{
              token: this.state.token,
              userId: this.state.userId,
              login: this.login,
              logout: this.logout
            }}
          >
            <MainNavigation />
            <main className="main-content">
              <Switch>
                {!this.state.token && (
                  <Redirect from="/" to="/auth" component={null} exact />
                )}
                {!this.state.token && (
                  <Redirect
                    from="/bookings"
                    to="/auth"
                    component={null}
                    exact
                  />
                )}
                {this.state.token && (
                  <Redirect from="/" to="/events" component={null} exact />
                )}
                {this.state.token && (
                  <Redirect from="/auth" to="/events" component={null} exact />
                )}
                {!this.state.token && (
                  <Route path="/auth" component={AuthPage} />
                )}
                <Route path="/events" component={EventsPage} />
                {this.state.token && (
                  <Route path="/bookings" component={BookingsPage} />
                )}
              </Switch>
            </main>
          </AuthContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
