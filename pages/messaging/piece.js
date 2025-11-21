import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";

// mrx : material ui ↓
import { Hidden, Button, Grid } from "@material-ui/core";

// mrx : styles ↓
import Style from "../../styles/Messaging.module.css";

// rmx : files  ↓

// mrx : components ↓
import Menu from "../../components/Screens/Messaging/Menu";
import ListV2 from "../../components/Screens/Messaging/ListV1/ListV2";

export default function Person() {
  return (
    <Grid item className={Style.MainMessaging}>
      <Grid container>
        <Hidden smDown>
          <Menu />
        </Hidden>
        <Grid item className={Style.Warpper} >
          <ListV2 ListType = "Piece"/>
        </Grid>
      </Grid>
    </Grid>
  );
}
