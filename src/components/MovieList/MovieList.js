import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import * as Config from "../../config";
import { searchMovies, cancelTokenSource } from "../../api/MovieAPI";
import MovieListItem from "./MovieListItem";
import { addCssClass, removeCssClass } from "../../util/CssUtil";
import * as uuidv4 from "uuid/v4";

/**
 * To show the list of the movies.
 * Contains infinite scroll to show the result
 */
class MovieList extends Component {
  constructor(props) {
    super(props);
    this.dimmerRef = React.createRef();
    this.headingRef = React.createRef();
    this.signal = cancelTokenSource();
  }

  /**
   * Current page number to search from the server
   */
  pageNumber = 1;

  state = {
    movies: [],
    error: null,
    searchType: "popular",
    searchParam: undefined,
    movieCount: 0
  };

  /**
   * Cancel the async request of the search movie listings
   */
  componentWillUnmount = () => {
    this.signal.cancel("Cancelled");
  };

  /**
   * Search the movies with default state
   */

  componentDidMount() {
    addCssClass(this.dimmerRef, "active");
    this.getMovies();
  }

  /**
   * Listen for the state change and search the movies with changed state
   */

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchType !== this.state.searchType ||
      prevState.searchParam !== this.state.searchParam
    ) {
      addCssClass(this.dimmerRef, "active");
      this.pageNumber = 1;
      this.setState({ movies: [] });
      this.getMovies();
    }
  }

  /**
   * Helper function to return the heading
   */
  getHeading = () => {
    let heading;
    switch (this.state.searchType) {
      case Config.POPULAR_MOVIES:
        heading = "Popular";
        break;
      case Config.TOP_RATED_MOVIES:
        heading = "Top Rated";
        break;
      case Config.UPCOMING_MOVIES:
        heading = "Upcoming";
        break;
      case Config.NOW_PLAYING_MOVIES:
        heading = "Now Playing";
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

  /**
   * Check the props for changes in the state
   * set the state according to the route parameter
   * There are four listing types
   * @param {*} nextProps
   * @param {*} prevState
   */
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

  /**
   * Get the list of the movies according to search parameters
   */
  getMovies = async () => {
    const response = await searchMovies(
      this.signal.token,
      this.state.searchType,
      this.state.searchParam,
      this.pageNumber
    );
    if (response) {
      this.setState({
        movies: this.state.movies.concat(response.movies),
        movieCount: response.total
      });

      this.pageNumber++;
      removeCssClass(this.dimmerRef, "active");
    }
  };

  /**
   * Renders movies inside infinite scroll
   */
  render() {
    const movies = this.state.movies.map(movie => {
      return <MovieListItem key={uuidv4()} movie={movie} />;
    });
    return (
      <div style={{ marginBottom: "5vh", marginTop: "2vh" }}>
        <h2
          ref={this.headingRef}
          style={{ color: "white", paddingLeft: "2em" }}
        >
          {this.getHeading()}
        </h2>
        <InfiniteScroll
          className="ui stackable cards centered"
          style={{ paddingLeft: "2vw", paddingRight: "2vw" }}
          dataLength={movies.length} //This is important field to render the next data
          next={this.getMovies}
          hasMore={true}
          loader=""
          endMessage=""
        >
          {movies}
        </InfiniteScroll>
        <div ref={this.dimmerRef} className="ui page dimmer transition fade in">
          <div className="ui text loader">Getting Movies</div>
        </div>
      </div>
    );
  }
}

export default withRouter(MovieList);
