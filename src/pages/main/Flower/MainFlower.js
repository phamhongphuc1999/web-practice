import { Container } from "@material-ui/core";
import { forwardRef, useEffect } from "react";
import cx from "classnames";
import { near } from "../../../demo-data/liquor/near";
import { sale } from "../../../demo-data/liquor/topSale";
import HeaderCollection from "../../../components/collections/HeaderCollection";
import { useTranslation } from "react-i18next";

import * as styles from "../page.module.css";

const MainFlower = forwardRef(({ state, className }, ref) => {
  const { t } = useTranslation();
  const [count, setCount] = state;

  useEffect(() => {
    setCount(count + 1);
  }, [near, sale]);

  return (
    <Container style={{ position: "relative", marginTop: "70px" }}>
      <div ref={ref} className={cx(className, styles.mainHome)}>
        <HeaderCollection
          action={t("flowersPage.entity")}
          address={t("chooseLocation")}
        />
      </div>
    </Container>
  );
});

export default MainFlower;
