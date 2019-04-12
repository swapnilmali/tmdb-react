import React from "react";
import GenreList from "../../GenreList/GenreList";
import { BASE_IMAGE_URL } from "../../../config";
import MovieReleaseDetails from "./MovieReleaseDetails";
import CompanyList from "./CompanyList";
import MovieRating from "../../MovieRating/MovieRating";

const taglineStyle = {
  marginBottom: "1em",
  fontSize: "22px",
  color: "white"
};

const titleStyle = {
  fontFamily: "Spectral",
  fontSize: "35px",
  lineHeight: "1em"
};

const imageStyle = { maxHeight: "400px", border: "1px solid #666" };

const gridStyle = {
  marginTop: "1vh",
  color: "#ddd",
  fontSize: "18px",
  lineHeight: "1.2em"
};

/**
 * Helper function to return the tagline of the movie.
 * If the movie don't have tagline returns blank.
 * @param {*} tagline
 */
function getTagLine(tagline) {
  if (tagline) {
    return <div style={taglineStyle}>{tagline}</div>;
  }
  return "";
}

/**
 * Renders the movie metadata
 * It consists of movie title, tagline, overview, ratings and movie release information
 * @param {*} props
 */
const MovieMeta = props => {
  const { movie } = props;
  if (!movie) {
    return;
  }
  const { poster_path } = movie;
  const src = poster_path
    ? `${BASE_IMAGE_URL}/w342${poster_path}`
    : "/assets/poster.png";
  return (
    <>
      <div className="ui stackable two column grid">
        <div className="four wide column">
          <img
            id="movie-meta-image"
            className="ui centered image"
            alt={movie.title}
            src={src}
            style={imageStyle}
          />
        </div>
        <div className="right floated twelve wide column">
          <div className="ui form">
            <div className="inline fields">
              <div className="field" style={titleStyle}>
                {movie.title}
              </div>
              <span className="field">
                <MovieRating rating={movie.vote_average} />
              </span>
            </div>
            <GenreList
              className="field"
              genres={movie.genres ? movie.genres : movie.genre_ids}
              size="large"
            />
          </div>
          <div
            className="ui stackable two column centered grid"
            style={gridStyle}
          >
            <div className="ui left floated twelve wide column">
              {getTagLine(movie.tagline)}
              {movie.overview}
              {movie.production_companies ? (
                <div
                  className="ui images computer only"
                  style={{ margin: "20px" }}
                >
                  <CompanyList movie={movie} />
                </div>
              ) : null}
            </div>
            {movie.runtime ? (
              <div className="center aligned four wide column">
                <MovieReleaseDetails movie={movie} />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieMeta;
