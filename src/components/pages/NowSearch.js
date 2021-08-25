import React from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineSearch } from "react-icons/ai";
import cx from "classnames";
import { Container } from "@material-ui/core";
import { useSelector } from "react-redux";

import AppStoreEn from "../../assets/images/apps/AppStore.png";
import AppStoreVi from "../../assets/images/apps/AppStore-vn.png";
import PlayStoreEn from "../../assets/images/apps/PlayStore.png";
import PlayStoreVi from "../../assets/images/apps/PlayStore-vn.png";

import * as styles from "../../assets/css/shared/page.module.css";

const NowSearch = ({ categoryList, move, type }) => {
  const { t } = useTranslation();
  const [isMove, setMove] = move;

  const language = useSelector((state) => state.setting.language);

  const categoryClick = (category) => {};

  const searchButtonClick = (searchText) => {};

  const searchInputChange = (e) => {};

  return (
    <Container>
      <div
        className={cx({
          [styles.nowSearch]: !isMove,
          [styles.nowMoveSearch]: isMove,
        })}
      >
        <div className="font-bold text-3xl pb-1">
          {t(`searchTitle`, { entity: t(`${type}.entity`) })}
        </div>
        <div className="text-base">
          {t(`searchText`, {
            locations: 100,
            city: "Hanoi",
            start: "07:00",
            end: "23:00",
          })}
        </div>
        <div className={styles.inputSearch}>
          <input
            className={styles.input}
            type="text"
            placeholder={t(`${type}.inputPlaceholder`)}
            onChange={(e) => searchInputChange(e)}
          />
          <button
            className={styles.searchBtn}
            onClick={() => searchButtonClick()}
          >
            <AiOutlineSearch size="30px" />
          </button>
        </div>
        <div className={styles.categoryFilter}>
          {categoryList.map((element, index) => {
            return (
              <button
                key={index}
                className={styles.categoryBtn}
                onClick={() => categoryClick(element)}
              >
                {t(`${type}.category.${element}`)}
              </button>
            );
          })}
        </div>
        <div className="text-lg pt-4">{t("useAppText")}</div>
        <div className="flex mt-5">
          <img
            src={language === "vi" ? AppStoreVi : AppStoreEn}
            alt="app store"
            className={cx(
              styles.imgApp,
              "border border-white rounded-md cursor-pointer"
            )}
          />
          <img
            src={language === "en" ? PlayStoreVi : PlayStoreEn}
            alt="play store"
            className="ml-4 cursor-pointer"
            style={{ width: "37%", height: "37%" }}
          />
        </div>
      </div>
    </Container>
  );
};

export default NowSearch;
