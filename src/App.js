import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import MovieList from "./components/MovieList/MovieList";
import Footer from "./components/Footer/Footer";

class App extends Component {
  render() {
    return (
      <>
        <Router>
          <div className="ui inverted fixed top">
            <Header />
          </div>
          <div className="ui main container-fluid">
            <Route exact path="/" component={MovieList} />
          </div>
          <div class="ui center aligned inverted footer segment fixed bottom sticky full-width">
            <Footer />
          </div>
        </Router>
      </>
    );
  }
}

export default App;
