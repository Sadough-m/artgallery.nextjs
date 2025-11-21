import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Grid, Hidden, IconButton } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/UserSettings.module.css";

// gm : files ↓
import ArrowLeftSvg from "../../../../public/images/icons/Arrow left -.svg";
import SearchSvg from "../../../../public/images/icons/Search.svg";

// gm : components ↓
import CustomFilter from "../../Artist/CustomFilter";

export default function Header() {
  // gm : states ↓

  return (
    <>
      {/* for pc */}
      <Hidden smDown>
        <Grid item className={Style.HeaderApps}>
          {/* Apps Text */}
          <Grid item className={Style.P_Apps}>
            <IconButton size="small" className={Style.ArrowApps}>
              <Image src={ArrowLeftSvg} />
            </IconButton>
            Apps
          </Grid>

          <Grid item className={Style.P_Search}>
            {/* Search Input */}
            <Grid item className="posRel">
              <input
                type="search"
                className={Style.SearchInput}
                placeholder="Search app name"
              />
              <img src={SearchSvg.src} className={Style.SearchSvg} />
            </Grid>

            {/* Filter Boxs */}
            <Grid item className="posRel">
              <Grid item className={Style.P_FilterBoxes}>
                <Grid container alignItems="center">
                  <Grid item>
                    <CustomFilter label="Category" />
                  </Grid>
                  <Grid item>
                    <CustomFilter label="Sort by" />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Hidden>

      {/* for mobile */}
      <Hidden mdUp>
        <Grid item className={Style.HeaderFixMobile}>
          <Grid item className={Style.P_Apps_mobile}>
            <IconButton size="small" className={Style.ArrowApps}>
              <Image src={ArrowLeftSvg} />
            </IconButton>
            Apps
          </Grid>
        </Grid>
        {/* Search Input */}
        <Grid item className={Style.p_inputSearc}>
          <input
            type="search"
            className={Style.SearchInput}
            placeholder="Search app name"
          />
          <img src={SearchSvg.src} className={Style.SearchSvg} />
        </Grid>
        {/* Filter Boxs */}
          <Grid item className={Style.P_FilterBoxes_mobile}>
            <Grid container alignItems="center" >
              <Grid item className={Style.mr_10}>
                <CustomFilter label="Category" />
              </Grid>
              <Grid item>
                <CustomFilter label="Sort by" />
              </Grid>
            </Grid>
          </Grid>
      </Hidden>
    </>
  );
}
