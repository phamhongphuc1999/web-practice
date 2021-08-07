import React from "react";
import Header from "./headers/Header";
import LocalModal from "../components/layouts/LocalModal";
import SearchModal from "../components/layouts/SearchModal";
import StandardFooter from "./footers";
import NowControl from "../components/layouts/NowControl";

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
