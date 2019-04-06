import React from "react";
import { getRating } from "../../util/MovieUtil";
import GenreList from "../GenreList/GenreList";

const MovieMeta = props => {
  const { movie } = props;
  return (
    <>
      <div className="ui form">
        <div className="inline fields">
          <div
            className="field"
            style={{ fontFamily: "Spectral", fontSize: "35px" }}
          >
            {movie.title}
          </div>
          <div className="field">{getRating(movie)}</div>
        </div>
        <GenreList
          genres={movie.genre_ids}
          size="large"
          style={{ marginTop: "2em" }}
        />
      </div>
      <div
        className="ui stackable two column grid"
        style={{ marginTop: "2em" }}
      >
        <div
          className="ui column"
          style={{
            color: "#ddd",
            fontFamily: "Roboto Condensed",
            fontSize: "18px",
            lineHeight: "1.2em"
          }}
        >
          {movie.overview}
        </div>
      </div>
    </>
  );
};

export default MovieMeta;
