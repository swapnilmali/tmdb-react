import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Autosuggest from "react-autosuggest";
import { searchMovies } from "../../api/MovieAPI";
import * as Config from "../../config";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.searchRef = React.createRef();
  }
  state = {
    term: "",
    suggestions: []
  };

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  getSuggestionValue = suggestion => {
    console.log(suggestion.title);
    return suggestion.title;
  };

  // Use your imagination to render suggestions.
  renderSuggestion = movie => {
    let poster_path = movie.poster_path
      ? "http://image.tmdb.org/t/p/w185/" + movie.poster_path
      : Config.DEFAULT_POSTER;
    return (
      <div className="ui item">
        <img
          className="ui top aligned image movie-item-image"
          src={poster_path}
          width={50}
          height={60}
          alt={movie.title}
        />
        <span style={{ marginLeft: "5px" }}>
          &nbsp;{movie.title} ({movie.release_date.split("-")[0]})<br />
        </span>
      </div>
    );
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = async ({ value }) => {
    const response = await searchMovies(Config.SEARCH_MOVIES, value, 1);
    this.setState({
      suggestions: response.movies
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onSuggestionSelected = (event, { suggestion }) => {
    console.log(suggestion);
  };

  changeHandler = (event, { newValue }) => {
    this.setState({ term: newValue });
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
    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: "Search Movie",
      value: this.state.term,
      onChange: this.changeHandler
    };
    const { suggestions } = this.state;
    return (
      <div className="content">
        <div ref={this.searchRef} className="ui search">
          <form className="ui form" onSubmit={this.submitHandler}>
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              onSuggestionSelected={this.onSuggestionSelected}
              getSuggestionValue={this.getSuggestionValue}
              renderSuggestion={this.renderSuggestion}
              inputProps={inputProps}
            />
          </form>
          <div className="results" />
        </div>
      </div>
    );
  }
}

export default withRouter(SearchBar);
