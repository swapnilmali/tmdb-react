import React, { Component } from "react";

class SearchBar extends Component {
  state = {
    term: ""
  };

  render() {
    return (
      <div className="content">
        <div className="ui icon input" style={{ width: "100%" }}>
          <input className="prompt" type="text" placeholder="Search movie" />
          <i className="search link icon" />
        </div>
      </div>
    );
  }
}

export default SearchBar;
