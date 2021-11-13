import React, { Component } from "react";
import { Helmet } from "react-helmet";
const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Sanjeevani: Hospital at your doorstep",
  description: "Hospital at your doorstep",
  keywords: "medicines"
};
export default Meta;
