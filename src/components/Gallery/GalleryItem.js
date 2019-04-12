import React from "react";
import * as uuidv4 from "uuid/v4";

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
        className="ui image"
        alt={filePath}
        src={src}
        style={{
          border: "1px solid #333",
          marginBottom: "5px",
          cursor: "pointer"
        }}
      />
    </div>
  );
};

export default GalleryItem;
