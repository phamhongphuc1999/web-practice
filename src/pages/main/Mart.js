import { MART } from "../../assets/config/constant";
import NowSearch from "../../components/shared/pages/NowSearch";
import React from "react";

const categoryList = [
  "all",
  "cosmetics",
  "mother",
  "toy",
  "clothers",
  "electronic",
  "jewelry",
];

const Mart = () => {
  return (
    <>
      <NowSearch categoryList={categoryList} type={MART} />
    </>
  );
};

export default Mart;
