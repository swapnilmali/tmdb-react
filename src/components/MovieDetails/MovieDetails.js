import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { BASE_IMAGE_URL } from "../../config";
import { resetBackground } from "../../util/CssUtil";
import { getMovieDetails, cancelTokenSource } from "../../api/MovieAPI";
import Pace from "react-pace-progress";
import CreditList from "./CreditList";
import Gallery from "../Gallery/Gallery";
import MovieMeta from "./MovieMeta/MovieMeta";

const containerStyle = {
  marginTop: "2vh",
  marginLeft: "5vw",
  marginRight: "5vw",
  marginBottom: "8vh",
  padding: "2vh",
  backgroundColor: "rgba(0, 0, 0, 0.8)"
};

/**
 * Component to show all the movie details
 * It consists of MovieMeta, CreditList and Gallery of images
 */
class MovieDetails extends Component {
  state = { movie: null, forceLoad: true };
  signal = cancelTokenSource();

  /**
   * Check the props for changes in the state
   * set the state according to the route
   * @param {*} nextProps Props which are about to set
   * @param {*} prevState Previous props of the component
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    const { movie } = nextProps.location.state;
    if (prevState.movie && prevState.movie.id !== movie.id) {
      return { movie: movie, forceLoad: true };
    }
    return null;
  }

  /**
   * Get the movie details on the update of the component
   */
  componentDidUpdate = () => {
    if (this.state.forceLoad) {
      this.getDetails(this.state.movie.id);
    }
  };

  /**
   * Get details of the movie by provided id.
   */
  getDetails = async id => {
    const movie = await getMovieDetails(this.signal.token, id);
    if (movie) {
      this.setState({ movie, forceLoad: false });
    }
  };

  /**
   * Set the state with provided movie from the router
   */
  componentDidMount = () => {
    this.setState({ movie: this.props.location.state.movie });
  };

  /**
   * Cancel the aync call
   * Reset the background of the body.
   */
  componentWillUnmount = () => {
    this.signal.cancel("Cancelled");
    const body = document.querySelector("body");
    body.style.background =
      "radial-gradient(circle,rgb(5, 132, 252) 0%,rgb(230, 28, 248) 100%)";
    resetBackground(body);
  };

  /**
   * Sets the background of the body by the backdrop image of the movie.
   */
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

  /**
   * Renders MovieMeta, Credits and Image gallery
   */
  render() {
    const { movie } = this.state;
    if (!movie) {
      return <></>;
    }

    this.setBackdrop();
    return (
      <>
        {this.state.forceLoad ? (
          <Pace color="#27ae60" height={3} style={{ display: "absolute" }} />
        ) : null}
        `
        <div className="ui segment" style={containerStyle}>
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
