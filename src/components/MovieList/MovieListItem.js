import React from "react";
import StarRatings from "react-star-ratings";

const style = { color: "white", fontWeight: "bold" };

// Returns rating div with stars if average votes are greater than 0
const getRating = movie => {
  if (movie.vote_average > 0) {
    return (
      <div className="content">
        <StarRatings
          rating={movie.vote_average / 2}
          starRatedColor="yellow"
          numberOfStars={5}
          starDimension="20px"
          starSpacing="5px"
          name="rating"
        />
        <div
          className="right floated meta"
          style={style}
        >{` ${movie.vote_average / 2} / 5`}</div>
      </div>
    );
  } else {
    return (
      <div className="content">
        <div className="right floated meta" style={style}>
          NA
        </div>
      </div>
    );
  }
};

const MovieListItem = props => {
  const { movie } = props;
  return (
    <div
      id="movie-list-item"
      className="ui card"
      style={{ cursor: "pointer" }}
      onClick={props.onClick}
    >
      {getRating(movie)}
      <div className="image">
        <img
          alt={movie.title}
          src={`http://image.tmdb.org/t/p/w342${movie.poster_path}`}
        />
      </div>
    </div>
  );
};

export default MovieListItem;
