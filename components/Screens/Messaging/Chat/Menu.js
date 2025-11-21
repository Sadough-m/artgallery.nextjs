import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Grid, Hidden, IconButton } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Messaging.module.css";

// gm : files ↓
import ProfilePng from "../../../../public/images/Guy96.png";
import HistorySvg from "../../../../public/images/icons/Message - History.svg";
import OrdersSvg from "../../../../public/images/icons/OrdersTab.svg";
import PlusSvg from "../../../../public/images/icons/Plus - CircleBlack.svg";
import ArrowSvg from "../../../../public/images/icons/Arrow left -.svg";

// gm : components ↓
import Icons from "./Icons";

export default function Menu({setShowMenu}) {
  // gm : states ↓

  return (
    <>
      <Grid item className={Style.ChatMenu}>
        <Hidden mdUp>
          <Grid container justifyContent="space-between" alignItems="center" className={Style.P_NavMenu}>
            <Grid item>
              <IconButton size="small" onClick={()=>setShowMenu(false)}>
                <img src={ArrowSvg.src} />
              </IconButton>
            </Grid>
            <Icons/>
          </Grid>
        </Hidden>
        {/* Header */}
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          className={Style.P_Profile}
        >
          <Grid item>
            <img src={ProfilePng.src} className={Style.ProfileImg} />
          </Grid>
          <Grid item className={Style.ProfileName}>
            Esther Howard
          </Grid>
          <Grid item className={Style.ProfileType}>
            Customer
          </Grid>
        </Grid>

        {/* Menu Tabs*/}
        <Grid item className={Style.MenuTabs1}>
          <img src={HistorySvg.src} className={Style.SvgTabs} /> Message history
        </Grid>
        {/* Menu Tabs*/}
        <Grid item className={Style.MenuTabs1}>
          <img src={OrdersSvg.src} className={Style.SvgTabs} /> Order history
        </Grid>
        {/* Menu Tabs*/}
        <Grid item className={Style.MenuTabs}>
          <img src={PlusSvg.src} className={Style.SvgTabs} /> Private note
        </Grid>
      </Grid>
      <Grid item style={{ width: 256, float: "right" }}></Grid>
    </>
  );
}
