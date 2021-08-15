import React from "react";
import { Container, Paper, Typography } from "@material-ui/core";
import partnerImg from "../../../assets/images/footer/bgDeliveryNow.png";
import { useTranslation } from "react-i18next";
import cx from "classnames";

import * as styles from "../../../assets/css/layouts/footer.module.css";

const PartnerFooter = () => {
  const { t } = useTranslation();

  return (
    <Paper className="my-10 py-3">
      <Container maxWidth="md">
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-9">
            <Typography variant="h6" className={styles.footerTitle}>
              <a className="text-red-600 font-bold" href="/">
                Now.vn
              </a>
              &nbsp;
              <a className="text-blue-500 font-bold" href="/">
                {t("footer.partner.text1")}
              </a>
            </Typography>
            <Typography className={cx("text-xs", styles.content)}>
              {t("footer.partner.text2")}
            </Typography>
            <Typography>
              <span className="font-bold text-red-600">Now</span>&nbsp;
              {t("footer.partner.text3")}
            </Typography>
            <Typography>
              {t("footer.partner.text4")}
              <a className="text-blue-500 font-bold" href="/">
                {" "}
                {t("here")}{" "}
              </a>
              {t("footer.partner.text5")}&nbsp;
              <a className="text-blue-500 font-bold" href="/">
                jobs@gofast.vn
              </a>
              &nbsp;
              {t("footer.partner.text6")}
            </Typography>
          </div>
          <div className="col-span-3">
            <img src={partnerImg} alt="partner footer" width="170px" />
          </div>
        </div>
      </Container>
    </Paper>
  );
};

export default PartnerFooter;
