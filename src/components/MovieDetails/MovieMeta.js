import React from "react";
import { getRating } from "../../util/MovieUtil";
import GenreList from "../GenreList/GenreList";
import { BASE_IMAGE_URL } from "../../config";

const textStyle = {
  marginBottom: "1em",
  fontSize: "22px",
  color: "white"
};

function getTagLine(movie) {
  if (movie.tagline) {
    return <div style={textStyle}>{movie.tagline}</div>;
  }
  return "";
}

const MovieMeta = props => {
  const { movie } = props;
  if (!movie) {
    return;
  }
  const { poster_path } = movie;
  const src = poster_path
    ? `${BASE_IMAGE_URL}/w342${poster_path}`
    : "/assets/poster.png";
  const companies = movie.production_companies
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
  return (
    <>
      <div className="ui stackable two column grid">
        <div className="four wide column">
          <img
            id="movie-meta-image"
            className="ui centered image"
            alt={movie.title}
            src={src}
            style={{ maxHeight: "400px", border: "1px solid #666" }}
          />
        </div>
        <div className="right floated twelve wide column">
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
            </div>
            <GenreList
              className="field"
              genres={movie.genres ? movie.genres : movie.genre_ids}
              size="large"
            />
          </div>
          <div
            className="ui stackable two column centered grid"
            style={{
              marginTop: "1vh",
              color: "#ddd",
              fontSize: "18px",
              lineHeight: "1.2em"
            }}
          >
            <div className="ui left floated twelve wide column">
              {getTagLine(movie)}
              {movie.overview}
              {movie.production_companies ? (
                <div
                  className="ui images computer only"
                  style={{ margin: "20px" }}
                >
                  {companies}
                </div>
              ) : null}
            </div>
            {movie.runtime ? (
              <div className="center aligned four wide column">
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
        </div>
      </div>
    </>
  );
};

export default MovieMeta;
