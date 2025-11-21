import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// good man : material ui ↓
import { Grid, Hidden } from "@material-ui/core";

// good man : styles ↓
import Style from "../../../../styles/Orders.module.css";

// good man : files ↓

// good man : components ↓

export default function TopMenuMobile({ PageName }) {
  // good man : states ↓

  // set wich top menu selected (in mobile)
  const handleSideMenuList = (value) => {
    setItemMenu(value);
  };

  // return color of badge
  const handleBadgeColor = (value) => {
    if (value === PageName) {
      return Style.badge_dot;
    } else return Style.badge_dot_Gray;
  };

  // return style of top menu (in mobile)
  const handleTextColor = (value) => {
    if (value === PageName) {
      return Style.itemDashMobile_active;
    } else return Style.itemDashMobile;
  };
  return (
    <Hidden mdUp>
      <Grid item className={Style.navMenu_mobile}>
        <Grid container>
          <Link href="/orders">
            <Grid item className={handleTextColor("All Orders")}>
              <span className={handleBadgeColor("All Orders")}></span>
              All Orders
            </Grid>
          </Link>
          <Link href="/orders/draft">
            <Grid item className={handleTextColor("Draft Orders")}>
              <span className={handleBadgeColor("Draft Orders")}></span>
              Draft Orders
            </Grid>
          </Link>
        </Grid>
      </Grid>
    </Hidden>
  );
}
