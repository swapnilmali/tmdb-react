import React from "react";
import CompanyItem from "./CompanyItem";

/**
 * Renders the list of the production company images of the provided movie.
 * @param {*} movie
 */
const CompanyList = ({ movie }) => {
  return movie.production_companies
    ? movie.production_companies.slice(0, 3).map(company => {
        return <CompanyItem key={company.id} company={company} />;
      })
    : [];
};

export default CompanyList;
