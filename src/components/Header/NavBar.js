import React from "react";
import { Link } from "react-router-dom";
import * as Config from "../../config";

const NavBar = props => {
  return (
    <div>
      <Link
        className="ui big teal label"
        style={{
          marginTop: "2px"
        }}
        to={`/get/${Config.POPULAR_MOVIES}`}
      >
        Popular
      </Link>
      <Link
        className="ui big olive label"
        style={{
          marginTop: "2px"
        }}
        to={`/get/${Config.TOP_RATED_MOVIES}`}
      >
        Top rated
      </Link>
      <Link
        className="ui big blue label"
        style={{
          marginTop: "2px"
        }}
        to={`/get/${Config.UPCOMING_MOVIES}`}
      >
        Upcoming
      </Link>
      <Link
        className="ui big yellow label"
        style={{
          marginTop: "2px"
        }}
        to={`/get/${Config.NOW_PLAYING_MOVIES}`}
      >
        Now Playing
      </Link>
    </div>
  );
};

export default NavBar;
