import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { addCssClass, removeCssClass } from "../../util/CssUtil";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.searchRef = React.createRef();
  }

  state = {
    term: ""
  };

  changeHandler = event => {
    const term = event.target.value;
    if (term !== "") {
      addCssClass(this.searchRef, "loading");
    } else {
      removeCssClass(this.searchRef, "loading");
    }
    this.setState({ term });
  };

  submitHandler = event => {
    event.preventDefault();
    const path = "/search/" + this.state.term;
    this.props.history.push({
      pathname: path
    });
    this.setState({ term: "" });
  };

  render() {
    return (
      <div className="content">
        <div ref={this.searchRef} className="ui search">
          <form className="ui form" onSubmit={this.submitHandler}>
            <div className="ui icon input" style={{ width: "100%" }}>
              <input
                className="prompt"
                type="text"
                placeholder="Search movie"
                value={this.state.term}
                onChange={this.changeHandler}
              />
              <i className="search link icon" onClick={this.submitHandler} />
            </div>
          </form>
          <div className="results" />
        </div>
      </div>
    );
  }
}

export default withRouter(SearchBar);
