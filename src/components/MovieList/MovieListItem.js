import React, { Component } from "react";
import StarRatings from "react-star-ratings";

class MovieListItem extends Component {
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

  hasClass = (el, className) => {
    if (el.classList) return el.classList.contains(className);
    return !!el.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"));
  };

  rollOverHandler = event => {
    const dimmer = document.querySelector("#dimmer" + this.props.movie.id);
    if (dimmer.classList) dimmer.classList.add("active");
    else if (!this.hasClass(dimmer, "active")) dimmer.className += " active";
  };

  rollOutHandler = event => {
    const dimmer = document.querySelector("#dimmer" + this.props.movie.id);
    if (dimmer.classList) dimmer.classList.remove("active");
    else if (this.hasClass(dimmer, "active")) {
      var reg = new RegExp("(\\s|^)active(\\s|$)");
      dimmer.className = dimmer.className.replace(reg, " ");
    }
  };

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
        <div className="image">
          <img
            alt={movie.title}
            src={`http://image.tmdb.org/t/p/w342${movie.poster_path}`}
          />
        </div>
        <div id={`dimmer${movie.id}`} className="ui dimmer">
          <div className="content" style={this.style}>
            <h2 className="ui inverted header" style={{ color: "#00FF00" }}>
              {movie.title}
            </h2>
            <h4 style={{ color: "#cccccc" }}>{movie.overview}</h4>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieListItem;
