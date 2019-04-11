import React from "react";
import CompanyItem from "./CompanyItem";

const CompanyList = ({ movie }) => {
  return movie.production_companies
    ? movie.production_companies.slice(0, 3).map(company => {
        return <CompanyItem company={company} />;
      })
    : [];
};

export default CompanyList;
