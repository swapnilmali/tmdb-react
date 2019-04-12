import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { addCssClass, removeCssClass } from "../../util/CssUtil";
import { BASE_IMAGE_URL } from "../../config";
import GenreList from "../GenreList/GenreList";
import { MOVIE_API } from "../../config";
import MovieRating from "../MovieRating/MovieRating";

const titleStyle = {
  color: "#00FF00",
  fontFamily: "Spectral",
  fontSize: "25px"
};
const style = { color: "white", fontWeight: "bold" };

/**
 * Component to render the movie in the list
 */
class MovieListItem extends Component {
  constructor(props) {
    super(props);
    this.dimmerRef = React.createRef();
    this.imageRef = React.createRef();
  }

  // Maximum overview characters to display
  static MAX_OVERVIEW_CHARS = 600;
  // Maximum title characters to display
  static MAX_TITLE_CHARS = 25;
  /**
   * Sets the source of the image on component mount
   */
  componentDidMount = () => {
    const { poster_path } = this.props.movie;
    const src = poster_path
      ? `${BASE_IMAGE_URL}/w342${poster_path}`
      : "/assets/poster.png";
    this.imageRef.current.src = src;
  };

  /**
   * Rollover handler shows the overview and genres of the movie inside dimmer
   */
  rollOverHandler = () => {
    removeCssClass(this.dimmerRef, "out");
    addCssClass(this.dimmerRef, "active");
    addCssClass(this.dimmerRef, "in");
  };

  /**
   * Rollover handler hides the dimmer
   */
  rollOutHandler = () => {
    removeCssClass(this.dimmerRef, "in");
    addCssClass(this.dimmerRef, "out");
  };

  /**
   * Helper function to return the overview of the movie.
   * Overview is truncated to maximum of 600 characters to fit in th UI.
   */
  getOverview() {
    let overview = this.props.movie.overview;
    if (overview.length > MovieListItem.MAX_OVERVIEW_CHARS) {
      overview = overview.substr(0, MovieListItem.MAX_OVERVIEW_CHARS) + "...";
    }
    return overview;
  }

  /**
   * Helper function to return the truncated title
   */
  getTitle() {
    let title = this.props.movie.title;
    if (title.length > MovieListItem.MAX_TITLE_CHARS) {
      title = title.substr(0, MovieListItem.MAX_TITLE_CHARS) + "...";
    }
    return title;
  }

  /**
   * Navigate to the MovieDetails component and
   * set its initial state to selected movie
   */
  clickHandler = () => {
    this.props.history.push({
      pathname: MOVIE_API,
      state: { movie: this.props.movie }
    });
  };

  /**
   * Renders the movie ratings, image, overview, title and genres
   */
  render() {
    const { movie } = this.props;
    return (
      <div
        onMouseOver={this.rollOverHandler}
        id="movie-list-item"
        className="ui card dimmable"
        style={{ cursor: "pointer" }}
        onClick={this.clickHandler}
      >
        <MovieRating rating={movie.vote_average} />
        <div className="ui image">
          <img
            ref={this.imageRef}
            className="movie-item-image"
            alt={movie.title}
            effect="blur"
            src="/assets/poster.png"
          />
        </div>
        <div className="content" style={style}>
          {this.getTitle()} &nbsp;({movie.release_date.split("-")[0]})
        </div>

        <div
          onMouseOut={this.rollOutHandler}
          ref={this.dimmerRef}
          className="ui dimmer transition fade"
        >
          <div className="content" style={style}>
            <h2 className="ui inverted header" style={titleStyle}>
              {movie.title}
            </h2>
            <h4 style={{ color: "#cccccc" }}>{this.getOverview()}</h4>
            <GenreList
              style={{ marginTop: "10px", cursor: "pointer" }}
              genres={movie.genre_ids}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(MovieListItem);
