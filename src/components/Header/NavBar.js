import React from "react";
import { Link } from "react-router-dom";
import * as Config from "../../config";

const marginStyle = {
  marginTop: "2px"
};

/**
 * NavBar component.
 * It consists of the links to the movie listings
 * @param {*} props
 */
const NavBar = props => {
  return (
    <div>
      <Link
        className="ui big teal label"
        style={marginStyle}
        to={`/get/${Config.POPULAR_MOVIES}`}
      >
        Popular
      </Link>
      <Link
        className="ui big olive label"
        style={marginStyle}
        to={`/get/${Config.TOP_RATED_MOVIES}`}
      >
        Top rated
      </Link>
      <Link
        className="ui big blue label"
        style={marginStyle}
        to={`/get/${Config.UPCOMING_MOVIES}`}
      >
        Upcoming
      </Link>
      <Link
        className="ui big yellow label"
        style={marginStyle}
        to={`/get/${Config.NOW_PLAYING_MOVIES}`}
      >
        Now Playing
      </Link>
    </div>
  );
};

export default NavBar;
