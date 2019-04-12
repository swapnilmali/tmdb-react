import React from "react";

const textStyle = {
  marginBottom: "1em",
  fontSize: "22px",
  color: "white"
};

/**
 * Renders the movie release date, runtime, revenue and budget
 * @param {*} props
 */
const MovieReleaseDetails = props => {
  const { movie } = props;
  return (
    <>
      <div>
        <span style={textStyle}>Released date </span>
        <br />
        <span>{movie.release_date}</span>
      </div>
      <br />
      <div>
        <span style={textStyle}>Runtime </span>
        <br />
        <span>{movie.runtime} mins</span>
      </div>
      <br />
      <div>
        <span style={textStyle}>Budget </span>
        <br />
        <span>${movie.budget}</span>
      </div>
      <br />
      <div>
        <span style={textStyle}>Revenue </span>
        <br />
        <span>${movie.revenue}</span>
      </div>
    </>
  );
};

export default MovieReleaseDetails;
