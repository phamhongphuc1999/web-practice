import React from "react";
import Header from "./headers/Header";
import LocalModal from "./other/LocalModal";
import SearchModal from "./other/SearchModal";
import StandardFooter from "./footers";
import NowControl from "./other/NowControl";

const Layout = ({ pathname, children }) => {
  return (
    <>
      <Header pathname={pathname} />
      <div id="content">{children}</div>
      <StandardFooter pathname={pathname} />
      <SearchModal />
      <LocalModal />
      <NowControl />
    </>
  );
};

export default Layout;
