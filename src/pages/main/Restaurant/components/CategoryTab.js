import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { BiRestaurant, BiHappyBeaming } from "react-icons/bi";
import { GiCakeSlice } from "react-icons/gi";
import cx from "classnames";
import { List, ListItem, ListItemText } from "@material-ui/core";

import * as styles from "../restaurant.module.css";

const CategoryTag = () => {
  const { t } = useTranslation();

  const [display, setDisplay] = useState([false, false, false]);
  const [tab, setTab] = useState(0);

  const DropdownList = () => (
    <List>
      <ListItem button>
        <ListItemText primary={t("restaurantPage.tab.list.offer")} />
      </ListItem>
      <ListItem button>
        <ListItemText primary={t("restaurantPage.tab.list.collection")} />
      </ListItem>
      <ListItem button>
        <ListItemText primary={t("restaurantPage.tab.list.location")} />
      </ListItem>
      <ListItem button>
        <ListItemText primary={t("restaurantPage.tab.list.block")} />
      </ListItem>
    </List>
  );

  const onTabEnter = (tab) => {
    if (tab === 0) setDisplay([true, false, false]);
    else if (tab === 1) setDisplay([false, true, false]);
    else setDisplay([false, false, true]);
  };

  const onTabLeave = () => {
    setDisplay([false, false, false]);
  };

  const onTabClick = (tab) => {
    setTab(tab);
  };

  return (
    <div className={cx("grid grid-cols-3", styles.restaurantTabContainer)}>
      <div
        className={cx("col-span-1", styles.tabElement, {
          "bg-white": display[0] || tab === 0,
          "bg-transparent": !display[0],
        })}
        onMouseEnter={() => onTabEnter(0)}
        onMouseLeave={() => onTabLeave()}
        onClick={() => onTabClick(0)}
      >
        <div className={cx(styles.tabIcon, "bg-yellow-700")}>
          <BiRestaurant size="40" color="white" />
        </div>
        <span className={styles.tabTitle}>
          {t("restaurantPage.tab.foodAndDrink")}
        </span>
        <div
          className={cx(styles.list, {
            [styles.activeList]: display[0],
            [styles.inactiveList]: !display[0],
          })}
        >
          {DropdownList()}
        </div>
      </div>
      <div
        className={cx("col-span-1", styles.tabElement, {
          "bg-white": display[1] || tab === 1,
          "bg-transparent": !display[1],
        })}
        onMouseEnter={() => onTabEnter(1)}
        onMouseLeave={() => onTabLeave()}
        onClick={() => onTabClick(1)}
      >
        <div className={cx(styles.tabIcon, "bg-red-300")}>
          <GiCakeSlice size="40" color="white" />
        </div>
        <span className={styles.tabTitle}>
          {t("restaurantPage.tab.dessert")}
        </span>
        <div
          className={cx(styles.list, {
            [styles.activeList]: display[1],
            [styles.inactiveList]: !display[1],
          })}
        >
          {DropdownList()}
        </div>
      </div>
      <div
        className={cx("col-span-1", styles.tabElement, {
          "bg-white": display[2] || tab === 2,
          "bg-transparent": !display[2],
        })}
        onMouseEnter={() => onTabEnter(2)}
        onMouseLeave={() => onTabLeave()}
        onClick={() => onTabClick(2)}
      >
        <div className={cx(styles.tabIcon, "bg-green-400")}>
          <BiHappyBeaming size="40" color="white" />
        </div>
        <span className={styles.tabTitle}>
          {t("restaurantPage.tab.entertainment")}
        </span>
        <div
          className={cx(styles.list, {
            [styles.activeList]: display[2],
            [styles.inactiveList]: !display[2],
          })}
        >
          {DropdownList()}
        </div>
      </div>
    </div>
  );
};

export default CategoryTag;
