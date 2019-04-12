import React from "react";
import { BASE_IMAGE_URL } from "../../config";

/**
 * Renders the image, name and charater of the cast/crew
 * @param {*} props
 */
const CreditListItem = props => {
  if (!props || !props.credit) {
    return null;
  }

  const { job, character, name, profile_path } = props.credit;
  const role = job ? job : character;
  const src = profile_path
    ? `${BASE_IMAGE_URL}/w150_and_h150_face${profile_path}`
    : "/assets/photo.png";

  return (
    <div className="ui" style={{ textAlign: "center" }}>
      <img
        className="ui rounded image centered"
        alt={name}
        src={src}
        width={150}
        height={150}
        style={{
          border: "1px solid #aaa",
          objectFit: "cover",
          marginBottom: "10px"
        }}
      />
      <span
        style={{
          display: "inline-block",
          width: "130px",
          fontWeight: "bold"
        }}
      >
        {name}
      </span>
      <br />
      <span
        style={{
          display: "inline-block",
          width: "130px",
          fontStyle: "italic"
        }}
      >
        {role}
      </span>
      <br />
      <br />
    </div>
  );
};

export default CreditListItem;
