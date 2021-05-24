import React, { Fragment } from "react";

function Spinner() {
  return (
    <Fragment>
      <div className="text-center mt-5 ml-5">
        <i
          className="fa fa-spinner"
          style={{
            fontSize: "50px",
            color: "green",
          }}
          aria-hidden="true"
        ></i>
      </div>
    </Fragment>
  );
}

export default Spinner;
