import React from "react";
import { Spinner } from "react-bootstrap";

const LoadingSpinner = ({ show }) => {
  return (
    <div
      style={{
        zIndex: 100,
        position: "fixed",
        width: "100px",
        height: "100px",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      {show ? (
        <Spinner
          animation="border"
          role="status"
          style={{
            position: "relative",
            width: "100px",
            height: "100px",
          }}
        >
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : null}
    </div>
  );
};

export default LoadingSpinner;
