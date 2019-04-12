import React, { Component } from "react";
import { BASE_IMAGE_URL } from "../../config";
import Lightbox from "react-images";
import GalleryItem from "./GalleryItem";

const textStyle = {
  fontFamily: "Roboto Condensed",
  marginLeft: "2vw",
  fontSize: "22px",
  textAlign: "center"
};

/**
 * Gallery class to show the backdrops of the movie.
 */
class Gallery extends Component {
  state = { currentImageIndex: 0, lightboxIsOpen: false };

  /**
   * Opens lightbox component on clicking of the gallery item
   */
  openLightbox = index => {
    this.setState({
      currentImageIndex: index,
      lightboxIsOpen: true
    });
  };

  /**
   * Closes the lighbox
   */
  closeLightbox = () => {
    this.setState({
      currentImageIndex: 0,
      lightboxIsOpen: false
    });
  };

  /**
   * Navigate to previous image in the lightbox
   */
  gotoPrevious = () => {
    this.setState({
      currentImageIndex: this.state.currentImageIndex - 1
    });
  };

  /**
   * Navigate to next image in the lightbox
   */
  gotoNext = () => {
    this.setState({
      currentImageIndex: this.state.currentImageIndex + 1
    });
  };

  /**
   * Returns the object which contains UI of the gallery items
   * and the data source for the lightbox component
   */
  getItems() {
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
          <GalleryItem
            key={image.file_path}
            index={index}
            src={src}
            openLightbox={this.openLightbox}
            filePath={image.file_path}
          />
        );
      })
      .slice(0, 10);
    return { ui: imageComponents, gallerySource: gallerySource };
  }

  /**
   * Render function of the component. Renders the GalleryItem components in a grid fashion.
   */
  render() {
    const { images } = this.props;
    if (!images) {
      return null;
    }

    const imageComponents = this.getItems();
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
