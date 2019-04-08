import React from "react";
import StarRatings from "react-star-ratings";
import { BASE_IMAGE_URL } from "../config";

const style = { color: "white", fontWeight: "bold" };
const textStyle = {
  marginBottom: "1em",
  fontSize: "22px",
  color: "white"
};
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

export const getCompanies = movie => {
  return movie.production_companies
    ? movie.production_companies.slice(0, 3).map(company => {
        const companySrc = company.logo_path
          ? `${BASE_IMAGE_URL}/w185${company.logo_path}`
          : "/assets/logo.png";
        return (
          <div
            key={company.id}
            className="ui image"
            data-tooltip={company.name}
            data-position="bottom center"
            data-inverted
            style={{
              backgroundColor: "#ddd",
              paddingTop: "5px",
              marginLeft: "1vw"
            }}
          >
            <img
              className="ui small image"
              alt={company.name}
              src={companySrc}
            />
          </div>
        );
      })
    : [];
};

export const getTagLine = movie => {
  if (movie.tagline) {
    return <div style={textStyle}>{movie.tagline}</div>;
  }
  return "";
};
