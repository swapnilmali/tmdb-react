import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { BASE_IMAGE_URL } from "../../config";
import { setDefaultBgProperties } from "../../util/CssUtil";
import MovieMeta from "./MovieMeta";
import { getMovieDetails } from "../../api/MovieAPI";
import Pace from "react-pace-progress";

class MovieDetails extends Component {
  state = { movie: null, loaded: false };

  // Check the props for changes in the state
  // set the state according to the route
  static getDerivedStateFromProps(nextProps, prevState) {
    const { movie } = nextProps.location.state;
    if (prevState.movie && prevState.movie.id !== movie.id) {
      return { movie: movie, loaded: false };
    }
    return null;
  }

  componentDidUpdate = () => {
    if (!this.state.loaded) {
      this.getDetails(this.state.movie.id);
    }
  };

  getDetails = async id => {
    const movie = await getMovieDetails(id);
    this.setState({ movie, loaded: true });
  };

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
      <>
        {!this.state.loaded ? (
          <Pace color="#27ae60" height={3} style={{ display: "absolute" }} />
        ) : null}
        `
        <div
          className="ui segment"
          style={{
            margin: "2vh",
            marginLeft: "10vw",
            marginRight: "10vw",
            padding: "2vh",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            border: "1px solid #333"
          }}
        >
          <div className="ui stackable two column grid">
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
        </div>
      </>
    );
  }
}

export default withRouter(MovieDetails);
