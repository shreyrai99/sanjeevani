import React from "react";
import { Spinner } from "react-bootstrap";
const Loader = () => {
  return (
    <>
      <Spinner
        animation="grow"
        variant="primary"
        style={{
          width: "50px",
          height: "50px",
          margin: "auto",
          display: "block"
        }}
      />
      <Spinner
        animation="grow"
        variant="success"
        style={{
          width: "50px",
          height: "50px",
          margin: "auto",
          display: "block"
        }}
      />
      <Spinner
        animation="grow"
        variant="danger"
        style={{
          width: "50px",
          height: "50px",
          margin: "auto",
          display: "block"
        }}
      />
      <Spinner
        animation="grow"
        variant="warning"
        style={{
          width: "50px",
          height: "50px",
          margin: "auto",
          display: "block"
        }}
      />
      <Spinner
        animation="grow"
        variant="info"
        style={{
          width: "50px",
          height: "50px",
          margin: "auto",
          display: "block"
        }}
      />
      />
    </>
  );
};
export default Loader;
