import React, { useEffect, useRef, useState } from "react";
import NowSearch from "../../../components/pages/NowSearch";
import MainFood from "./MainFood";
import { FOOD } from "../../../assets/config/constant";
import cx from "classnames";

import * as styles from "../../../assets/css/shared/page.module.css";

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
  const [limit, setLimit] = useState(0);
  const [isMove, setMove] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    if (scrollRef != null) {
      const temp =
        scrollRef["current"]["clientHeight"] - (window.screen.height - 90);
      setLimit(temp);
    }
  }, [scrollRef, count]);

  const listenToScroll = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    if (winScroll > limit) setMove(true);
    else setMove(false);
  };

  return (
    <>
      <div
        className={cx(styles.nowBanner, {
          [styles.moveBanner]: isMove,
          [styles.fixedBanner]: !isMove,
        })}
        style={isMove ? { top: limit } : {}}
      >
        <NowSearch
          move={[isMove, setMove]}
          categoryList={categoryList}
          type={FOOD}
        />
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
