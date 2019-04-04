import React from "react";
import { Link } from "react-router-dom";

const NavBar = props => {
  return (
    <div>
      <Link className="ui big teal label" to="/">
        Popular
      </Link>
      <Link className="ui big olive label" to="/">
        Top rated
      </Link>
      <Link className="ui big blue label" to="/">
        Upcoming
      </Link>
      <Link className="ui big yellow label" to="/">
        Now Playing
      </Link>
    </div>
  );
};

export default NavBar;
