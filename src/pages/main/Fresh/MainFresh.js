import { Container } from "@material-ui/core";
import React, { forwardRef } from "react";

const MainFresh = forwardRef(({ className }, ref) => {
  return (
    <Container style={{ position: "relative", marginTop: "70px" }}>
      <div ref={ref}></div>
    </Container>
  );
});

export default MainFresh;
