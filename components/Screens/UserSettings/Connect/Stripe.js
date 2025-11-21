import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/UserSettings.module.css";

// gm : files ↓
import stripePng from "../../../../public/images/Stripe.png";

// gm : components ↓

export default function Stripe() {
  // gm : states ↓

  const connected = false
  return (
    <Grid item className={Style.connectBox}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item className={Style.textConnect}>{connected?<><span className={Style.GreenBadge}></span>connected</>:"Connect to stripe"}</Grid>
        <Grid item>
          <img src={stripePng.src} className={Style.fitStripImg}/>
        </Grid>
      </Grid>
    </Grid>
  );
}
