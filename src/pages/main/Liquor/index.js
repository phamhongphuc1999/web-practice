import { LIQUOR } from "../../../assets/config/constant";
import NowSearch from "../components/NowSearch";
import cx from "classnames";
import React, { useRef, useState } from "react";
import { useScroll } from "../components/hook";

import * as styles from "../page.module.css";
import MainLiquor from "./MainLiquor";

const categoryList = ["all", "beer"];

const Liquor = () => {
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
        <NowSearch isMove={isMove} categoryList={categoryList} type={LIQUOR} />
      </div>
      <MainLiquor
        state={[count, setCount]}
        ref={scrollRef}
        className="float-right"
      />
    </>
  );
};

export default Liquor;
