import React from "react";
import { Link } from "react-router-dom";
import * as Config from "../../config";

const NavBar = props => {
  return (
    <div>
      <Link className="ui big teal label" to={`/${Config.POPULAR_MOVIES}`}>
        Popular
      </Link>
      <Link className="ui big olive label" to={`/${Config.TOP_RATED_MOVIES}`}>
        Top rated
      </Link>
      <Link className="ui big blue label" to={`/${Config.UPCOMING_MOVIES}`}>
        Upcoming
      </Link>
      <Link
        className="ui big yellow label"
        to={`/${Config.NOW_PLAYING_MOVIES}`}
      >
        Now Playing
      </Link>
    </div>
  );
};

export default NavBar;
