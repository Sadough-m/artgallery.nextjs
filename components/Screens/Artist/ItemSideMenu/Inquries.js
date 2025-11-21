import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Grid, Hidden } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Home.module.css";
import ArtistStyle from "../../../../styles/artist.module.css";

// gm : files ↓
import Inquries from "../../../../public/images/icons/Inquries.svg";

// gm : components ↓

export default function InquriesItem({ pageName, InquriesOpen, handleTabMobile, TabHandlerMobile, TabHandler }) {
  // gm : states ↓

  return (
    <>
      <Hidden smDown>
        <Grid item className={Style.tabSideMenu}>
          <Grid container direction="column">
            <Grid item className={Style.cursor_P}>
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
                className={`${ArtistStyle.text_dashboard} `}
              >
                <Grid item>
                  <Grid container alignItems="center" spacing={1}>
                    <Grid item className={ArtistStyle.imgDashboard}>
                      <Image
                        src={Inquries}
                        className={
                          pageName === "Inquries"
                            ? ArtistStyle.TabSelectedImg
                            : ""
                        }
                      />
                    </Grid>
                    <Grid
                      item
                      className={
                        pageName === "Inquries" ? ArtistStyle.text_dark : ""
                      }
                    >
                      Inquries
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Hidden>
      <Hidden mdUp>
        <Grid item>
          <Grid
            container
            alignItems="center"
            className={ArtistStyle.ItemsDash}
            spacing={1}
            onClick={() => handleTabMobile("Inquries")}
          >
            <Grid item className={ArtistStyle.imgItemsMobile}>
              <Image
                src={Inquries}
                className={InquriesOpen ? ArtistStyle.TabSelectedImg : ""}
              />
            </Grid>
            <Grid item className={` ${TabHandlerMobile(InquriesOpen)}`}>
              Inquries
            </Grid>
          </Grid>
        </Grid>
      </Hidden>
    </>
  );
}
