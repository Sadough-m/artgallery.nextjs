import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Dashboard.module.css";

// gm : files ↓

// gm : components ↓
import Item from './Item'

export default function NotificationList() {
  // gm : states ↓

  return (
    <Grid item className={Style.NotificationList}>
      {/* section */}
      <Item text="0 order to fulfil"/>
      <Item text="0 Artwork wiating for delivery fulfil"/>
      <Item text="0 order to waiting for payment"/>
      <Item text="0 Unanswered inquiry to waiting for response"/>
      <Item text="0 request to waiting for acceptance"/>
    </Grid>
  );
}
