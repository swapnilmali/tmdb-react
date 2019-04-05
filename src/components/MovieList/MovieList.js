import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import * as Config from "../../config";
import Axios from "../../api/axios";
import MovieListItem from "./MovieListItem";
import { addCssClass, removeCssClass } from "../../util/CssUtil";

class MovieList extends Component {
  constructor(props) {
    super(props);
    this.pageDimmer = React.createRef();
    this.headingRef = React.createRef();
  }

  pageNumber = 1;
  state = {
    movies: [],
    error: null,
    searchType: "popular",
    searchParam: undefined,
    movieCount: 0
  };

  // Search the movies with default state
  componentDidMount() {
    addCssClass(this.pageDimmer, "active");
    this.searchMovies();
  }

  // Listen for the state change and search the movies with changed state
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchType !== this.state.searchType ||
      prevState.searchParam !== this.state.searchParam
    ) {
      addCssClass(this.pageDimmer, "active");
      this.pageNumber = 1;
      this.setState({ movies: [] });
      this.searchMovies();
    }
  }

  getHeading = () => {
    let heading = "";
    switch (this.state.searchType) {
      case Config.POPULAR_MOVIES:
        heading += "Popular";
        break;
      case Config.TOP_RATED_MOVIES:
        heading += "Top Rated";
        break;
      case Config.UPCOMING_MOVIES:
        heading += "Upcoming";
        break;
      case Config.NOW_PLAYING_MOVIES:
        heading += "Now Playing";
        break;
      case Config.SEARCH_MOVIES:
        heading =
          "Found " +
          this.state.movieCount +
          " results of '" +
          this.state.searchParam +
          "'";
        break;
      default:
        heading = "";
        break;
    }
    return heading;
  };

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
      region: "US",
      page: this.pageNumber
    };
    if (searchType === Config.SEARCH_MOVIES) {
      method = "/" + Config.SEARCH_MOVIES + "/movie";
      params = {
        query: this.state.searchParam,
        language: "en-US",
        region: "US",
        page: this.pageNumber
      };
    } else {
      method = Config.MOVIE_API + searchType;
    }
    this.pageNumber++;
    const response = await Axios.get(method, {
      params: params
    });

    const movies = this.state.movies.concat(response.data.results);
    this.setState({
      movies,
      movieCount: response.data.total_results
    });
    removeCssClass(this.pageDimmer, "active");
  };

  render() {
    const movies = this.state.movies.map(movie => {
      return <MovieListItem key={movie.id} movie={movie} />;
    });
    return (
      <>
        <h2
          ref={this.headingRef}
          style={{ color: "white", paddingLeft: "2em" }}
        >
          {this.getHeading()}
        </h2>
        <InfiniteScroll
          className="ui stackable cards centered"
          dataLength={movies.length} //This is important field to render the next data
          next={this.searchMovies}
          hasMore={true}
          loader=""
          endMessage=""
        >
          {movies}
        </InfiniteScroll>
        <div
          ref={this.pageDimmer}
          className="ui page dimmer transition fade in"
        >
          <div className="ui text loader">Getting Movies</div>
        </div>
      </>
    );
  }
}

export default withRouter(MovieList);
