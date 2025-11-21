import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";

// mrx : material ui ↓
import { Hidden, Button, Grid } from "@material-ui/core";

// mrx : styles ↓
import Style from "../../styles/Messaging.module.css";

// rmx : files  ↓
import imgEmpty from "../../public/images/Mask.png";

// mrx : components ↓
import Menu from "../../components/Screens/Messaging/Menu";
import ListV1 from "../../components/Screens/Messaging/ListV1/ListV1";

export default function Index() {

  if (true) {
    return (
      <Grid item className={Style.MainMessaging}>
        <Grid container>
          <Menu />
          <Grid item className={Style.Warpper}>
            <ListV1 />
          </Grid>
        </Grid>
      </Grid>
    );
  } else {
    return (
      <Grid item>
        <Grid container direction="row">
          {/* start contact area */}
          <Grid item className={Style.Wrapper_Empty}>
            <Hidden smDown>
              <Grid item className={Style.titleText}>
                <span className={Style.badgeGreen}></span>Inquries
              </Grid>
            </Hidden>

            {/* empty contacts */}
            <Grid
              container
              alignItems="center"
              direction="column"
              justifyContent="center"
              className={Style.p_empty}
            >
              <Grid item className={Style.img_mask}>
                <img src={imgEmpty.src} />
              </Grid>
              <Grid item className={Style.text_manage_noWidth}>
                Your messages will appear here
              </Grid>
              <Grid item className={Style.text_product}>
                This is where you’ll add products and manage your pricing. You
                can also import and export your product inventory.
              </Grid>
            </Grid>
          </Grid>
          {/* end contact area */}
        </Grid>
      </Grid>
    );
  }
}
