import React, { useRef, useState } from "react";
import NowSearch from "../components/NowSearch";
import { PET } from "../../../assets/config/constant";
import cx from "classnames";
import MainPet from "./MainPet";
import { useScroll } from "../components/hook";

import * as styles from "../page.module.css";

const categoryList = ["all", "pet"];

const Pet = () => {
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
        <NowSearch isMove={isMove} categoryList={categoryList} type={PET} />
      </div>
      <MainPet
        state={[count, setCount]}
        ref={scrollRef}
        className="float-right"
      />
    </>
  );
};

export default Pet;
