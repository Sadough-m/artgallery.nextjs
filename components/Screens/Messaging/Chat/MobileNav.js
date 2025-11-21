import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Grid, Hidden, IconButton } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Messaging.module.css";

// gm : files ↓
import ArrowSvg from "../../../../public/images/icons/Arrow left -.svg";
import GuyPng from "../../../../public/images/icons/pic guy1.svg";
import DotSvg from "../../../../public/images/icons/dot black.svg";

// gm : components ↓

export default function MobileNav({ setShowMenu }) {
  // gm : states ↓

  return (
    <>
      <Hidden mdUp>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          className={Style.MobileNav}
        >
          <Grid item>
            <Grid container alignItems="center">
              <Grid item className={Style.P_ArrowLeft}>
                <IconButton size="small">
                  <img src={ArrowSvg.src} />
                </IconButton>
              </Grid>
                <Grid item onClick={() => setShowMenu(true)}>
                  <img src={GuyPng.src} className={Style.ImgMobileNav} />
                </Grid>
                <Grid item className={Style.GuyName} onClick={() => setShowMenu(true)}>
                  Esther Howard
                </Grid>
            </Grid>
          </Grid>
          <Grid item className={Style.P_Dot}>
            <IconButton size="small">
              <img src={DotSvg.src} />
            </IconButton>
          </Grid>
        </Grid>
      </Hidden>
    </>
  );
}
