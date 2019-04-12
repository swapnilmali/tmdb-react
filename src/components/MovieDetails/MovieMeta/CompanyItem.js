import React from "react";
import { BASE_IMAGE_URL } from "../../../config";

/**
 * Renders the production company image
 * @param {*} company
 */
const CompanyItem = ({ company }) => {
  const companySrc = company.logo_path
    ? `${BASE_IMAGE_URL}/w185${company.logo_path}`
    : "/assets/logo.png";

  return (
    <div
      key={company.id}
      className="ui image"
      data-tooltip={company.name}
      data-position="bottom center"
      data-inverted
      style={{
        backgroundColor: "#ddd",
        paddingTop: "5px",
        marginLeft: "1vw"
      }}
    >
      <img className="ui small image" alt={company.name} src={companySrc} />
    </div>
  );
};

export default CompanyItem;
