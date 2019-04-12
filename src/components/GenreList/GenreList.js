import React from "react";
import { GENRES } from "../../config";
import { isNumber } from "util";

/**
 * GenreList component renders all the genres of the movie.
 * @param {*} props
 */
const GenreList = props => {
  const size = props.size ? props.size : "medium";

  const genres = props.genres.map(source => {
    const genreId = isNumber(source) ? source : source.id;
    const genre = GENRES[genreId];
    return (
      <label
        key={genreId}
        className={`ui ${size} label`}
        style={{
          color: "white",
          backgroundColor: genre.color,
          marginBottom: "2px",
          cursor: "pointer"
        }}
      >
        {genre.label}
      </label>
    );
  });

  return (
    <div className="ui" style={props.style}>
      {genres}
    </div>
  );
};

export default GenreList;
