import React from "react";
import StarRatings from "react-star-ratings";

const style = { color: "white", fontWeight: "bold" };

// Returns rating div with stars if average votes are greater than 0
export const getRating = movie => {
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
        <div className="right floated meta" style={style}>{` ${
          movie.vote_average
        } / 10`}</div>
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
