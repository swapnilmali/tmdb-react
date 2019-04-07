import React from "react";
import CreditListItem from "./CreditListItem";

const textStyle = {
  textAlign: "center",
  fontFamily: "Roboto Condensed",
  fontSize: "22px"
};

const CreditList = props => {
  if (!props || !props.movie || !props.movie.credits) {
    return null;
  }

  const { crew, cast } = props.movie.credits;
  const noOfCast = Math.max(Math.floor(window.innerWidth / 220), 4);

  const directors = crew
    .filter(person => person.job === "Director" || person.job === "Producer")
    .map((person, index) => {
      return <CreditListItem key={person.credit_id} credit={person} />;
    })
    .splice(0, 2);

  const actors = cast.slice(0, noOfCast - 2).map(person => {
    return <CreditListItem key={person.cast_id} credit={person} />;
  });

  return (
    <>
      <br />
      <br />
      <div className="ui stackable two column grid ">
        <div className="five wide left floated column">
          <div style={textStyle}>
            <span>Crew</span>
            <br />
            <br />
            <br />
          </div>
          <div className="ui stackable centered grid">{directors}</div>
        </div>
        <div className="eleven wide left floated column">
          <div style={textStyle}>
            <span>
              Cast
              <br />
              <br />
              <br />
            </span>
          </div>
          <div className="ui stackable centered grid">{actors}</div>
        </div>
      </div>
    </>
  );
};

export default CreditList;
