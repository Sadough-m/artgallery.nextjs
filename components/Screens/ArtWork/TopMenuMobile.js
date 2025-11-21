import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// good man : material ui ↓
import { Grid, Hidden } from "@material-ui/core";

// good man : styles ↓
import ArtWorkStyle from "../../../styles/artworkflow.module.css";

// good man : files ↓

// good man : components ↓

export default function TopMenuMobile() {
  // good man : states ↓
  const [itemMenu, setItemMenu] = useState("All artworks");


   // set wich top menu selected (in mobile)
   const handleSideMenuList = (value) => {
    setItemMenu(value);
  };

  // return color of badge
  const handleBadgeColor = (value) => {
    if (itemMenu === value) {
      return ArtWorkStyle.badge_dot;
    } else return ArtWorkStyle.badge_dot_Gray;
  };

  // return style of top menu (in mobile)
  const handleTextColor = (value) => {
    if (itemMenu === value) {
      return ArtWorkStyle.itemDashMobile_active;
    } else return ArtWorkStyle.itemDashMobile;
  };
  return (
    <Hidden mdUp>
      <Grid item className={ArtWorkStyle.navMenu_mobile}>
        <Grid container justifyContent="space-between">
          <Grid
            item
            className={handleTextColor("All artworks")}
            onClick={() => handleSideMenuList("All artworks")}
          >
            <span className={handleBadgeColor("All artworks")}></span>
            All artworks
          </Grid>
          <Grid
            item
            className={handleTextColor("On transit")}
            onClick={() => handleSideMenuList("On transit")}
          >
            {/* <span className={handleBadgeColor("On transit")}></span>
            On transit */}
          </Grid>
          <Grid
            item
            className={handleTextColor("Lists")}
            onClick={() => handleSideMenuList("Lists")}
          >
            {/* <span className={handleBadgeColor("Lists")}></span>
            Lists */}
          </Grid>
        </Grid>
      </Grid>
    </Hidden>
  );
}
