import React from "react";
import { GENRES } from "../../config";

const GenreList = props => {
  const size = props.size ? props.size : "medium";
  const genres = props.genres.map(genreId => {
    const genre = GENRES[genreId];
    return (
      <label
        key={genreId}
        className={`ui ${size} label`}
        style={{
          color: "white",
          backgroundColor: genre.color,
          marginTop: "2px",
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
