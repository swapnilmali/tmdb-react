import React from "react";
import YouTube from "react-youtube";

function _onReady(event) {
  // access to player in all event handlers via event.target
  //   event.target.pauseVideo();
}

const GalleryItem = props => {
  const { data } = props;
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 0
    }
  };
  return (
    <div>
      <h1>GalleryItem</h1>
      <YouTube videoId="2g811Eo7K8U" opts={opts} onReady={_onReady} />
    </div>
  );
};

export default GalleryItem;
