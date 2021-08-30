import React, { forwardRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import cx from "classnames";
import HeaderCollection from "../../../components/collections/HeaderCollection";
import CollectionDetail from "../../../components/collections/CollectionDetail";
import { collection } from "../../../demo-data/food/collection";
import RestaurantList from "../../../components/collections/RestaurantList";
import { near } from "../../../demo-data/food/near";
import { sale } from "../../../demo-data/food/topSale";
import { Container } from "@material-ui/core";

import * as styles from "../page.module.css";

const titles = ["near", "topSale", "bestRate", "fast"];

const MainFood = forwardRef(({ state, className }, ref) => {
  const { t } = useTranslation();
  const [count, setCount] = state;

  useEffect(() => {
    setCount(count + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collection, near, sale]);

  return (
    <Container style={{ position: "relative", marginTop: "70px" }}>
      <div ref={ref} className={cx(className, styles.mainHome)}>
        <HeaderCollection
          action={t("foodPage.entity")}
          address={t("chooseLocation")}
        />
        <CollectionDetail data={collection} />
        <RestaurantList
          titles={titles.map((element, index) => t(element))}
          actions={[near, sale, near, sale]}
        />
      </div>
    </Container>
  );
});

export default MainFood;
