import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Autosuggest from "react-autosuggest";
import { searchMovies, cancelTokenSource } from "../../api/MovieAPI";
import GenreList from "../GenreList/GenreList";
import * as Config from "../../config";
import { debounce } from "lodash";

/**
 * SearchBar component
 * Search the movies for the input from the user
 */
class SearchBar extends Component {
  state = {
    term: "",
    suggestions: []
  };

  signal = cancelTokenSource();

  /**
   * This is used to check if the suggestion is highlighted in auto-suggest component.
   */
  selectedSuggestion = null;

  /**
   * Auto suggest helper method
   * When suggestion is clicked, Autosuggest needs to populate the input
   * based on the clicked suggestion. Teach Autosuggest how to calculate the
   * input value for every given suggestion.
   */
  getSuggestionValue = suggestion => {
    return suggestion.title;
  };

  /**
   *  Renders the suggestion with movie image, name and genres
   */
  renderSuggestion = movie => {
    let poster_path = movie.poster_path
      ? "http://image.tmdb.org/t/p/w185/" + movie.poster_path
      : Config.DEFAULT_POSTER;
    return (
      <div className="ui" style={{ display: "flex" }}>
        <img
          style={{ border: "1px solid rgb(58, 57, 57)" }}
          className="ui center aligned image"
          src={poster_path}
          width={60}
          height={80}
          alt={movie.title}
        />
        <span style={{ marginLeft: "15px", fontWeight: "bold" }}>
          &nbsp;{movie.title} ({movie.release_date.split("-")[0]})
          <br />
          <GenreList
            style={{ marginTop: "10px", cursor: "pointer" }}
            genres={movie.genre_ids}
          />
        </span>
      </div>
    );
  };

  /**
   * Debouncing the loading of suggestions.
   */
  debouncedLoadSuggestions = debounce(this.loadSuggestions, 500);

  componentWillUnmount = () => {
    this.signal.cancel("Cancelled");
  };

  /**
   * Loads the suggestion for the provided query
   * @param {*} query
   */
  async loadSuggestions(query) {
    const response = await searchMovies(
      this.signal.token,
      Config.SEARCH_MOVIES,
      query,
      1
    );
    this.selectedSuggestion = null;
    if (response) {
      this.setState({
        suggestions: response.movies
      });
    }
  }

  /**
   * Auto suggest helper method
   * Autosuggest will call this function every time you need to update suggestions.
   */

  suggestionsFetchRequestedHandler = async ({ value }) => {
    this.debouncedLoadSuggestions(value);
  };

  /**
   * Auto suggest helper method
   * Autosuggest will call this function every time you need to clear suggestions.
   */

  suggestionsClearRequestedHandler = () => {
    this.setState({
      suggestions: []
    });
  };

  /**
   * Navigates to the movie details page.
   * Setting the initial state with the selected movie.
   */
  suggestionSelectedHandler = (event, { suggestion }) => {
    this.props.history.push({
      pathname: Config.MOVIE_API,
      state: { movie: suggestion }
    });
    this.setState({ term: "" });
  };

  /**
   * Sets the selected suggestion on the highlight in auto suggest
   */
  suggestionHighlightedHandler = ({ suggestion }) => {
    this.selectedSuggestion = suggestion;
  };

  /**
   * Change handler to set the new serach term.
   */
  changeHandler = (event, { newValue }) => {
    this.setState({ term: newValue });
  };

  /**
   * Navigates to the search page with the query
   */
  submitHandler = event => {
    event.preventDefault();
    const path = "/search/" + this.state.term;
    this.props.history.push({
      pathname: path
    });
    this.setState({ term: "" });
  };

  /**
   * Checks if the enter key is pressed.
   * If there is no selected suggestion calls the submit handler.
   */
  keyDownHandler = event => {
    if (event.keyCode === 13 && !this.selectedSuggestion) {
      this.submitHandler(event);
    }
  };

  /**
   * It renders the auto-suggest component
   */
  render() {
    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: "Search Movie",
      value: this.state.term,
      onChange: this.changeHandler,
      onKeyDown: this.keyDownHandler
    };
    const { suggestions } = this.state;
    return (
      <div className="content">
        <Autosuggest
          id="auto-suggest"
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.suggestionsFetchRequestedHandler}
          onSuggestionsClearRequested={this.suggestionsClearRequestedHandler}
          onSuggestionSelected={this.suggestionSelectedHandler}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          onSuggestionHighlighted={this.suggestionHighlightedHandler}
          inputProps={inputProps}
        />
      </div>
    );
  }
}

export default withRouter(SearchBar);
