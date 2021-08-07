import { LIQUOR } from "../../assets/config/constant";
import NowSearch from "../../components/shared/pages/NowSearch";
import React from "react";

const categoryList = ["all", "beer"];

const Liquor = () => {
  return (
    <>
      <NowSearch categoryList={categoryList} type={LIQUOR} />
    </>
  );
};

export default Liquor;
