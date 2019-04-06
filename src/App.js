import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import MovieList from "./components/MovieList/MovieList";
import Footer from "./components/Footer/Footer";
import MovieDetails from "./components/MovieDetails/MovieDetails";

class App extends Component {
  render() {
    return (
      <>
        <Router>
          <div
            className="ui container-fluid fixed top sticky full-width"
            style={{
              position: "sticky"
            }}
          >
            <Header />
          </div>

          <div id="content" className="ui full-width">
            <Route exact path="/" component={MovieList} />
            <Route exact path="/get/:query" component={MovieList} />
            <Route exact path="/search/:query" component={MovieList} />
            <Route exact path="/movie" component={MovieDetails} />
          </div>
          <div className="ui center aligned segment inverted footer fixed bottom sticky full-width">
            <Footer />
          </div>
        </Router>
      </>
    );
  }
}

export default App;
