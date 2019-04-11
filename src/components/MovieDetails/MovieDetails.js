import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { BASE_IMAGE_URL } from "../../config";
import { resetBackground } from "../../util/CssUtil";
import { getMovieDetails, cancelTokenSource } from "../../api/MovieAPI";
import Pace from "react-pace-progress";
import CreditList from "./CreditList";
import Gallery from "../Gallery/Gallery";
import MovieMeta from "./MovieMeta/MovieMeta";

class MovieDetails extends Component {
  state = { movie: null, loaded: false };
  signal = cancelTokenSource();

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
    const movie = await getMovieDetails(this.signal.token, id);
    if (movie) {
      this.setState({ movie, loaded: true });
    }
  };

  componentDidMount = () => {
    this.setState({ movie: this.props.location.state.movie });
  };

  componentWillUnmount = () => {
    this.signal.cancel("Cancelled");
    const body = document.querySelector("body");
    body.style.background =
      "radial-gradient(circle,rgb(5, 132, 252) 0%,rgb(230, 28, 248) 100%)";
    resetBackground(body);
  };

  setBackdrop = () => {
    const { movie } = this.state;
    const backgroundImage = movie.backdrop_path
      ? BASE_IMAGE_URL + "/original" + movie.backdrop_path
      : null;
    if (backgroundImage) {
      const body = document.querySelector("body");
      body.style.backgroundImage = `url('${backgroundImage}')`;
      resetBackground(body);
    }
  };

  render() {
    const { movie } = this.state;
    if (!movie) {
      return <></>;
    }

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
            marginTop: "2vh",
            marginLeft: "5vw",
            marginRight: "5vw",
            marginBottom: "8vh",
            padding: "2vh",
            backgroundColor: "rgba(0, 0, 0, 0.8)"
          }}
        >
          <MovieMeta movie={movie} />
          <CreditList movie={movie} />
          <Gallery
            images={movie.images ? movie.images.backdrops : null}
            videos={movie.videos ? movie.videos.results : null}
          />
        </div>
      </>
    );
  }
}

export default withRouter(MovieDetails);
