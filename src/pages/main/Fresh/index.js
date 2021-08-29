import React, { useRef, useState } from "react";
import { FRESH } from "../../../assets/config/constant";
import MainFresh from "./MainFresh";
import NowSearch from "../components/NowSearch";
import cx from "classnames";

import * as styles from "../page.module.css";
import { useScroll } from "../components/hook";

const categoryList = [
  "all",
  "vege",
  "fruit",
  "meat",
  "seafood",
  "vegetable",
  "rice",
  "canned",
  "spice",
];

const Fresh = () => {
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
        <NowSearch isMove={isMove} categoryList={categoryList} type={FRESH} />
      </div>
      <MainFresh
        state={[count, setCount]}
        ref={scrollRef}
        className="float-right"
      />
    </>
  );
};

export default Fresh;
