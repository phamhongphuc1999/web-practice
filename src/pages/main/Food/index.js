import React, { useRef, useState } from "react";
import NowSearch from "../components/NowSearch";
import MainFood from "./MainFood";
import { FOOD } from "../../../assets/config/constant";
import { useScroll } from "../components/hook";
import cx from "classnames";

import * as styles from "../page.module.css";

const categoryList = [
  "all",
  "food",
  "drink",
  "vege",
  "cakes",
  "dessert",
  "homemade",
  "stressfood",
  "pizza/burger",
  "chicken",
  "hotpot",
  "sushi",
  "noodles",
  "rice",
];

const Food = () => {
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
        <NowSearch isMove={isMove} categoryList={categoryList} type={FOOD} />
      </div>
      <MainFood
        state={[count, setCount]}
        ref={scrollRef}
        className="float-right"
      />
    </>
  );
};

export default Food;
