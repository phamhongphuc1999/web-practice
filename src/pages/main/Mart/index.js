import { MART } from "../../../assets/config/constant";
import NowSearch from "../components/NowSearch";
import React, { useRef, useState } from "react";
import MainMart from "./MainMart";
import { useScroll } from "../components/hook";
import cx from "classnames";

import * as styles from "../page.module.css";

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
  const scrollRef = useRef(null);
  const [count, setCount] = useState(0);

  const { limit, isMove } = useScroll(scrollRef, count);

  return (
    <>
      <div
        className={cx(styles.nowBanner, {
          [styles.moveBanner]: isMove,
          [styles.fixedBanner]: !isMove,
        })}
        style={isMove ? { top: limit } : {}}
      >
        <NowSearch isMove={isMove} categoryList={categoryList} type={MART} />
      </div>
      <MainMart
        state={[count, setCount]}
        ref={scrollRef}
        className="float-right"
      />
    </>
  );
};

export default Mart;
