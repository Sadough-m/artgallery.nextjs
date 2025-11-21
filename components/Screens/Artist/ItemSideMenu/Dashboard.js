import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Grid, Hidden } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Home.module.css";
import ArtistStyle from "../../../../styles/artist.module.css";

// gm : files ↓
import DasboardImg from "../../../../public/images/icons/Dashboard.svg";

// gm : components ↓

export default function DashboardItem({
  pageName,
  handleTabMobile,
  TabHandlerMobile,
  DashBoard,
}) {
  // gm : states ↓

  return (
    <>
      <Hidden smDown>
        <Grid item className={Style.tabSideMenu}>
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            className={`${ArtistStyle.text_dashboard}`}
          >
            <Link href="/dashboard">
              <Grid item>
                <Grid container alignItems="center" spacing={1}>
                  <Grid item className={ArtistStyle.imgDashboard}>
                    <Image
                      src={DasboardImg}
                      className={
                        pageName === "dashboard"
                          ? ArtistStyle.TabSelectedImg
                          : ""
                      }
                    />
                  </Grid>
                  <Grid
                    item
                    className={
                      pageName === "dashboard" ? ArtistStyle.text_dark : ""
                    }
                  >
                    Dashboard
                  </Grid>
                </Grid>
              </Grid>
            </Link>
          </Grid>
        </Grid>
      </Hidden>

      {/* for mobile */}
      <Hidden mdUp>
        <Link href="/dashboard">
          <Grid item>
            <Grid
              container
              alignItems="center"
              className={ArtistStyle.ItemsDash}
              spacing={1}
              onClick={() => handleTabMobile("DashBoard")}
            >
              <Grid item className={ArtistStyle.imgItemsMobile}>
                <Image
                  src={DasboardImg}
                  className={DashBoard || pageName==="dashboard" ? ArtistStyle.TabSelectedImg : ""}
                />
              </Grid>
              <Grid item className={` ${TabHandlerMobile(DashBoard || pageName==="dashboard")} `}>
                Dashboard
              </Grid>
            </Grid>
          </Grid>
        </Link>
      </Hidden>
    </>
  );
}
