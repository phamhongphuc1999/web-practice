import { Container } from "@material-ui/core";
import React, { forwardRef, useEffect } from "react";

const MainFresh = forwardRef(({ state, className }, ref) => {
  const [count, setCount] = state;

  useEffect(() => {
    setCount(count + 1);
  }, []);

  return (
    <Container style={{ position: "relative", marginTop: "70px" }}>
      <div ref={ref}></div>
    </Container>
  );
});

export default MainFresh;
