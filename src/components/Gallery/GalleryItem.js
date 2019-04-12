import React from "react";
import * as uuidv4 from "uuid/v4";

const imageStyle = {
  border: "1px solid #333",
  marginBottom: "15px",
  cursor: "pointer"
};

const rollOverHandler = event => {
  const img = event.target;
  img.style.boxShadow = "0px 0px 5px #fff";
};

const rollOutHandler = event => {
  const img = event.target;
  img.style.boxShadow = "";
};

/**
 * GalleryItem component renders the single backdrop image of the movie.
 * @param {*} props
 */
const GalleryItem = props => {
  const { index, openLightbox, filePath, src } = props;
  return (
    <div
      className="ui image"
      key={uuidv4()}
      data-index={index}
      onClick={() => {
        openLightbox(index);
      }}
    >
      <img
        id="gallery-item-image"
        alt={filePath}
        src={src}
        style={imageStyle}
        onMouseOver={rollOverHandler}
        onMouseOut={rollOutHandler}
      />
    </div>
  );
};

export default GalleryItem;
