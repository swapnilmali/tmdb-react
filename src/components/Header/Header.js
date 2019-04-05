import "./Header.css";
import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import NavBar from "./NavBar";

const imageStyle = {
  marginTop: "1vh",
  marginLeft: "1vw",
  maxWidth: "150px"
};

const Header = props => {
  return (
    <div className="header-component">
      <div className="ui three column stackable grid">
        <div className="row">
          <div className="two wide column middle aligned">
            <Link to="/">
              <img alt="The Movie DB" src="assets/db.svg" style={imageStyle} />
            </Link>
          </div>
          <div className="right floated seven wide column middle aligned">
            <SearchBar />
          </div>
          <div className="seven wide column middle aligned">
            <NavBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
