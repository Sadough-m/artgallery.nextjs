import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid, Hidden } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Star.module.css";

// gm : files ↓
import GuyPng from "../../../../public/images/guy.png";
import LogInPng from "../../../../public/images/LogInInstagram.png";
import ArrowSvg from "../../../../public/images/icons/arrowRightNewGray.svg";
import CheckSvg from "../../../../public/images/icons/Check - Circle blue.svg";
import InsSvg from "../../../../public/images/icons/Instagram.svg";

// gm : components ↓

export default function Creator() {
  // gm : states ↓

  return (
    <Grid item className={Style.Creator}>
      <Grid item className={Style.CreatorText}>
        Creator
      </Grid>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        className={Style.Profile}
      >
        <Grid item>
          <Grid container alignItems="center" className={Style.P_Profile}>
            <Grid item>
              <img src={GuyPng.src} className={Style.ProfileImg} />
            </Grid>
            <Grid item className={Style.ProfileName}>
              Esther Howard
            </Grid>
          </Grid>
        </Grid>
        <Grid item className={Style.P_NewCreator}>
          <Button
            endIcon={<img src={ArrowSvg.src} />}
            className={Style.NewCreator}
          >
            <Hidden smDown>View Creator</Hidden>
          </Button>
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        className={Style.P_LogInIns}
      >
        <Grid item className={Style.TextProfile}>
          For fastening up the process, please login to your proffesional
          instagram account.
        </Grid>
        <Grid item className={Style.LogInIns}>
          <img src={InsSvg.src} className={Style.ImgIns}/> Log in with Instagram
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        className={Style.BgUserName}
      >
        <Grid item className={Style.InstaUserName}>
          <span className={Style.BadgeBlue}></span>Instagram @Username
        </Grid>
        <Grid item >
          <Button color="primary" startIcon={<img src={CheckSvg.src} />}>
            Verified
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
