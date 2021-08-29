import cx from "classnames";
import { Container } from "@material-ui/core";
import React, { forwardRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import HeaderCollection from "../../../components/collections/HeaderCollection";
import { collection } from "../../../demo-data/fresh/collection";
import { near } from "../../../demo-data/fresh/near";
import { sale } from "../../../demo-data/fresh/topSale";

import * as styles from "../page.module.css";
import CollectionDetail from "../../../components/collections/CollectionDetail";
import RestaurantList from "../../../components/collections/RestaurantList";

const titles = ["near", "topSale", "bestRate", "fast"];

const MainFresh = forwardRef(({ state, className }, ref) => {
  const { t } = useTranslation();
  const [count, setCount] = state;

  useEffect(() => {
    setCount(count + 1);
  }, [collection]);

  return (
    <Container style={{ position: "relative", marginTop: "70px" }}>
      <div ref={ref} className={cx(className, styles.mainHome)}>
        <HeaderCollection
          action={t("freshPage.entity")}
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

export default MainFresh;
