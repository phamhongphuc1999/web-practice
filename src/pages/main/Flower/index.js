import { FLOWERS } from "../../../assets/config/constant";
import NowSearch from "../components/NowSearch";
import React, { useRef, useState } from "react";
import { useScroll } from "../components/hook";
import MainFlower from "./MainFlower";
import cx from "classnames";

import * as styles from "../page.module.css";

const categoryList = ["all", "congratulatory", "condolatory", "plants"];

const Flower = () => {
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
        <NowSearch isMove={isMove} categoryList={categoryList} type={FLOWERS} />
      </div>
      <MainFlower
        state={[count, setCount]}
        ref={scrollRef}
        className="float-right"
      />
    </>
  );
};

export default Flower;
