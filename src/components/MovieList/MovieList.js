import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import * as Config from "../../config";
import Axios from "../../api/axios";
import MovieListItem from "./MovieListItem";

class MovieList extends Component {
  state = {
    movies: [],
    error: null,
    searchType: "popular",
    searchParam: undefined
  };

  // Search the movies with default state
  componentDidMount() {
    this.searchMovies();
  }

  // Listen for the state change and search the movies with changed state
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchType !== this.state.searchType ||
      prevState.searchParam !== this.state.searchParam
    ) {
      this.searchMovies();
    }
  }

  // Check the props for changes in the state
  // set the state according to the route
  static getDerivedStateFromProps(nextProps, prevState) {
    const { match } = nextProps;
    let searchType = Config.SEARCH_MOVIES;
    let searchParam;
    if (match.path === "/") {
      searchType = Config.POPULAR_MOVIES;
    } else if (match.url.indexOf("/search/") === -1) {
      searchType = match.params.query;
    } else {
      searchParam = match.params.query;
    }

    return { searchType, searchParam };
  }

  // Call the TMDB api according to the search type
  searchMovies = async () => {
    let searchType = this.state.searchType;
    let method;
    let params = {
      language: "en-US",
      region: "US"
    };
    if (searchType === Config.SEARCH_MOVIES) {
      method = "/" + Config.SEARCH_MOVIES + "/movie";
      params = {
        query: this.state.searchParam,
        language: "en-US",
        region: "US"
      };
    } else {
      method = Config.MOVIE_API + searchType;
    }
    console.log(method);
    const response = await Axios.get(method, {
      params: params
    });
    const movies = response.data.results;
    this.setState({
      movies
    });
  };

  render() {
    const movies = this.state.movies.map(movie => {
      return <MovieListItem key={movie.id} movie={movie} />;
    });
    return <div className="ui stackable cards centered">{movies}</div>;
  }
}

export default withRouter(MovieList);
