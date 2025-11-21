import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/UserSettings.module.css";

// gm : files ↓
import paypalPng from "../../../../public/images/paypal.png";

// gm : components ↓

export default function Paypal() {
  // gm : states ↓

  const connected = false
  return (
    <Grid item className={Style.connectBox_mR10}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item className={Style.textConnect}>{connected?<><span className={Style.GreenBadge}></span>connected</>:"Connect to paypal"}</Grid>
        <Grid item>
          <img src={paypalPng.src} className={Style.fitStripImg}/>
        </Grid>
      </Grid>
    </Grid>
  );
}
