import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { BASE_IMAGE_URL } from "../../config";
import { setDefaultBgProperties } from "../../util/CssUtil";
import MovieMeta from "./MovieMeta";

class MovieDetails extends Component {
  state = { movie: null };

  // Check the props for changes in the state
  // set the state according to the route
  static getDerivedStateFromProps(nextProps, prevState) {
    const { movie } = nextProps.location.state;
    if (prevState.movie && prevState.movie.id !== movie.id) {
      return { movie };
    }
    return null;
  }

  componentDidMount = () => {
    this.setState({ movie: this.props.location.state.movie });
  };

  componentWillUnmount = () => {
    const body = document.querySelector("body");
    body.style.background =
      "radial-gradient(circle,rgb(5, 132, 252) 0%,rgb(230, 28, 248) 100%)";
    setDefaultBgProperties(body);
  };

  setBackdrop = () => {
    const { movie } = this.state;
    const backgroundImage = movie.backdrop_path
      ? BASE_IMAGE_URL + "/original" + movie.backdrop_path
      : null;
    if (backgroundImage) {
      const body = document.querySelector("body");
      body.style.backgroundImage = `url('${backgroundImage}')`;
      setDefaultBgProperties(body);
    }
  };

  render() {
    const { movie } = this.state;
    if (!movie) {
      return <></>;
    }
    const { poster_path } = movie;
    const src = poster_path
      ? `${BASE_IMAGE_URL}/w342${poster_path}`
      : "/assets/poster.png";
    this.setBackdrop();
    return (
      <div
        className="ui segment stackable two column grid"
        style={{
          margin: "2em",
          marginLeft: "10em",
          marginRight: "10em",
          padding: "2em",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          border: "1px solid #333"
        }}
      >
        <div className="four wide column">
          <img
            className="ui centered image"
            alt={movie.title}
            src={src}
            style={{ maxHeight: "400px", border: "1px solid #222" }}
          />
        </div>
        <div className="right floated twelve wide column">
          <MovieMeta movie={movie} />
        </div>
      </div>
    );
  }
}

export default withRouter(MovieDetails);
