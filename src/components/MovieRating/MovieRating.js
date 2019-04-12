import React from "react";
import StarRatings from "react-star-ratings/build/star-ratings";

const textStyle = { color: "white", fontWeight: "bold" };

/**
 * Renders the star ratings
 * @param {*} rating
 */
const MovieRating = ({ rating }) => {
  if (rating > 0) {
    return (
      <div className="content">
        <StarRatings
          rating={rating / 2}
          starRatedColor="yellow"
          numberOfStars={5}
          starDimension="15px"
          starSpacing="2px"
          name="rating"
        />
        <div
          className="right floated meta"
          style={textStyle}
        >{` ${rating} / 10`}</div>
      </div>
    );
  } else {
    return (
      <div className="content">
        <div className="right floated meta" style={textStyle}>
          NA
        </div>
      </div>
    );
  }
};

export default MovieRating;
