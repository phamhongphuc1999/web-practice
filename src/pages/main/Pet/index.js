import React from "react";
import NowSearch from "../components/NowSearch";
import { PET } from "../../../assets/config/constant";

const categoryList = ["all", "pet"];

const Pet = () => {
  return (
    <>
      <NowSearch categoryList={categoryList} type={PET} />
    </>
  );
};

export default Pet;
