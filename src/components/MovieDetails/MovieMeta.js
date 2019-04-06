import React from "react";
import { getRating } from "../../util/MovieUtil";
import GenreList from "../GenreList/GenreList";

const textStyle = {
  marginBottom: "1em",
  fontSize: "22px",
  color: "white"
};

function getTagLine(movie) {
  console.log("gettagline", movie);
  if (movie.tagline) {
    return <div style={textStyle}>{movie.tagline}</div>;
  }
  return "";
}

const MovieMeta = props => {
  const { movie } = props;
  return (
    <>
      <div className="ui form">
        <div className="inline fields">
          <div
            className="field"
            style={{
              fontFamily: "Spectral",
              fontSize: "35px",
              lineHeight: "1em"
            }}
          >
            {movie.title}
          </div>
          <span className="field">{getRating(movie)}</span>
          <GenreList
            className="field"
            genres={movie.genres ? movie.genres : movie.genre_ids}
            size="large"
          />
        </div>
      </div>
      <div
        className="ui stackable two column grid"
        style={{
          marginTop: "2em",
          color: "#ddd",
          fontFamily: "Roboto Condensed",
          fontSize: "18px",
          lineHeight: "1.2em"
        }}
      >
        <div className="ui column">
          {getTagLine(movie)}
          {movie.overview}
        </div>
        {movie.runtime ? (
          <div className="ui column" style={{ paddingLeft: "5em" }}>
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
          </div>
        ) : null}
      </div>
    </>
  );
};

export default MovieMeta;
