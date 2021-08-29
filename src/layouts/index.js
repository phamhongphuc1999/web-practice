import React from "react";
import Header from "./headers/Header";
import StandardFooter from "./footers";
import NowControl from "./other/NowControl";

const Layout = ({ pathname, children }) => {
  return (
    <>
      <Header pathname={pathname} />
      <div id="content">{children}</div>
      <StandardFooter pathname={pathname} />
      <NowControl />
    </>
  );
};

export default Layout;
