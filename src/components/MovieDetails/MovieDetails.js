import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { BASE_IMAGE_URL } from "../../config";
import { setDefaultBgProperties } from "../../util/CssUtil";

class MovieDetails extends Component {
  state = { movie: null };

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
    this.setBackdrop();
    return (
      <div className="ui" style={{ margin: "2em" }}>
        <h1>MovieDetails</h1>
      </div>
    );
  }
}

export default withRouter(MovieDetails);
