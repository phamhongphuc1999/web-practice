import { Container } from "@material-ui/core";
import { forwardRef, useEffect } from "react";
import cx from "classnames";
import { near } from "../../../demo-data/liquor/near";
import { sale } from "../../../demo-data/liquor/topSale";
import { collection } from "../../../demo-data/food/collection";
import HeaderCollection from "../../../components/collections/HeaderCollection";
import { useTranslation } from "react-i18next";
import CollectionDetail from "../../../components/collections/CollectionDetail";
import RestaurantList from "../../../components/collections/RestaurantList";

import * as styles from "../page.module.css";

const titles = ["near", "topSale", "bestRate", "fast"];

const MainPet = forwardRef(({ state, className }, ref) => {
  const { t } = useTranslation();
  const [count, setCount] = state;

  useEffect(() => {
    setCount(count + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [near, sale]);

  return (
    <Container style={{ position: "relative", marginTop: "70px" }}>
      <div ref={ref} className={cx(className, styles.mainHome)}>
        <HeaderCollection
          action={t("petPage.entity")}
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

export default MainPet;
