import { Grid } from "@material-ui/core";
import React, { useRef } from "react";
import Criteria from "./components/Criteria";
import Register from "./components/Register";
import Header from "./header/header";

const Recruitment = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);

  return (
    <>
      <Header ref1={ref1} ref2={ref2} ref3={ref3} ref4={ref4} />
      <Grid container>
        <Grid item xs={12} ref={ref1}>
          <Register />
        </Grid>
        <Grid item xs={12} ref={ref2} style={{ paddingTop: "16px" }}>
          <Criteria />
        </Grid>
      </Grid>
    </>
  );
};

export default Recruitment;
