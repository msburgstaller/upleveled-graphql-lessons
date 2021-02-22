import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Home } from "./Home";
import { Profile } from "./Profile";
import { OtherProfile } from "./OtherProfile";
import { Container } from "./Container";

export const App = () => {
  return (
    <Router>
      <Container>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/">
            <Home />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/profile/:profileId">
            <OtherProfile />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
};
