import React from "react";
import Criteria from "./components/Criteria";
import Register from "./components/Register";
import Header from "./header/header";

const Recruitment = () => {
  return (
    <>
      <Header />
      <div>
        <Register id="#register" />
        <Criteria id="#criteria" />
      </div>
    </>
  );
};

export default Recruitment;
