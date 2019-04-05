import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { addCssClass, removeCssClass } from "../../util/CssUtil";
import { BASE_IMAGE_URL } from "../../config";
import { LazyLoadComponent } from "react-lazy-load-image-component";

class MovieListItem extends Component {
  constructor(props) {
    super(props);
    this.dimmerRef = React.createRef();
    this.pageDimmer = React.createRef();
  }

  style = { color: "white", fontWeight: "bold" };

  // Returns rating div with stars if average votes are greater than 0
  getRating = movie => {
    if (movie.vote_average > 0) {
      return (
        <div className="content">
          <StarRatings
            rating={movie.vote_average / 2}
            starRatedColor="yellow"
            numberOfStars={5}
            starDimension="15px"
            starSpacing="2px"
            name="rating"
          />
          <div className="right floated meta" style={this.style}>{` ${
            movie.vote_average
          } / 10`}</div>
        </div>
      );
    } else {
      return (
        <div className="content">
          <div className="right floated meta" style={this.style}>
            NA
          </div>
        </div>
      );
    }
  };

  // On roll over show dimmer component
  rollOverHandler = () => {
    addCssClass(this.dimmerRef, "active");
  };

  // On roll over hide dimmer component
  rollOutHandler = () => {
    removeCssClass(this.dimmerRef, "active");
  };

  getOverview() {
    let overview = this.props.movie.overview;
    if (overview.length > 600) {
      overview = overview.substr(0, 600) + "...";
    }
    return overview;
  }

  render() {
    const { movie } = this.props;
    return (
      <div
        onMouseOver={this.rollOverHandler}
        onMouseOut={this.rollOutHandler}
        id="movie-list-item"
        className="ui card dimmable"
        style={{ cursor: "pointer" }}
        onClick={this.props.onClick}
      >
        {this.getRating(movie)}
        <LazyLoadComponent>
          <div className="ui image">
            <img
              className="movie-item-image"
              alt={movie.title}
              effect="blur"
              src={
                movie.poster_path
                  ? `${BASE_IMAGE_URL}/w342${movie.poster_path}`
                  : "/assets/poster.png"
              }
            />
          </div>
        </LazyLoadComponent>
        <div className="content">
          &nbsp;{movie.title} &nbsp;({movie.release_date.split("-")[0]})
        </div>

        <div ref={this.dimmerRef} className="ui dimmer transition fade in">
          <div className="content" style={this.style}>
            <h2 className="ui inverted header" style={{ color: "#00FF00" }}>
              {movie.title}
            </h2>
            <h4 style={{ color: "#cccccc" }}>{this.getOverview()}</h4>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(MovieListItem);
