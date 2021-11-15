import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import Omdb from "./components/omdb/Omdb";
import ShowClickedResult from "./components/omdb/showResults";

export class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/abc" render={() => <h1>abc page</h1>} />
            <Route exact path="/" component={Omdb} />
            <Route
              exact
              path="/fetch-movie/:imdbID"
              component={ShowClickedResult}
            />
            <Route render={() => <h1>Not found 404</h1>} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
