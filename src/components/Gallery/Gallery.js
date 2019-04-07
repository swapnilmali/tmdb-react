import React, { Component } from "react";
import * as uuidv4 from "uuid/v4";
import { BASE_IMAGE_URL } from "../../config";
import Lightbox from "react-images";

const textStyle = {
  fontFamily: "Roboto Condensed",
  marginLeft: "2vw",
  fontSize: "22px",
  textAlign: "center"
};

class Gallery extends Component {
  state = { currentImageIndex: 0, lightboxIsOpen: false };

  openLightbox = index => {
    this.setState({
      currentImageIndex: index,
      lightboxIsOpen: true
    });
  };

  closeLightbox = () => {
    this.setState({
      currentImageIndex: 0,
      lightboxIsOpen: false
    });
  };

  gotoPrevious = () => {
    this.setState({
      currentImageIndex: this.state.currentImageIndex - 1
    });
  };

  gotoNext = () => {
    this.setState({
      currentImageIndex: this.state.currentImageIndex + 1
    });
  };

  getImageComponents() {
    const gallerySource = [];
    const { images } = this.props;
    if (!images) {
      return { ui: [], gallerySource };
    }
    const imageComponents = images
      .map((image, index) => {
        const src = image.file_path
          ? `${BASE_IMAGE_URL}/w300${image.file_path}`
          : "/assets/photo.png";
        if (index < 10) {
          gallerySource.push({
            src: `${BASE_IMAGE_URL}/original${image.file_path}`
          });
        }

        return (
          <div
            className="ui image"
            key={uuidv4()}
            data-index={index}
            onClick={() => {
              this.openLightbox(index);
            }}
          >
            <img
              className="ui image"
              alt={image.file_path}
              src={src}
              style={{
                border: "1px solid #333",
                marginBottom: "5px",
                cursor: "pointer"
              }}
            />
          </div>
        );
      })
      .slice(0, 10);
    return { ui: imageComponents, gallerySource: gallerySource };
  }

  render() {
    const { images } = this.props;
    if (!images) {
      return null;
    }

    const imageComponents = this.getImageComponents();
    const imagesUI = imageComponents.ui;
    const gallerySource = imageComponents.gallerySource;

    return (
      <>
        <br />
        <br />
        <div style={textStyle}>
          <span>Images</span>
          <br />
          <br />
          <br />
        </div>
        <div className="ui stackable centered grid">{imagesUI}</div>
        <Lightbox
          images={gallerySource}
          isOpen={this.state.lightboxIsOpen}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          onClose={this.closeLightbox}
          currentImage={this.state.currentImageIndex}
          width={window.innerWidth}
        />
      </>
    );
  }
}

export default Gallery;
