import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../styles/Dashboard.module.css";

// gm : files ↓

// gm : components ↓

export default function TodaysIncome() {
  // gm : states ↓

  return (
    <Grid item >
      <Grid container justifyContent="space-between" alignItems="center" className={Style.TodaysIncome}>
        <Grid item className={Style.p_price_noBr}>
          <Grid item className={Style.today_price}>$460.00</Grid>
          <Grid item className={Style.today_sales}>Today’s sales</Grid>
        </Grid>
        <Grid item className={Style.p_price}>
          <Grid item className={Style.today_price}>3</Grid>
          <Grid item className={Style.today_sales}>Today’s sales</Grid>
        </Grid>
        <Grid item className={Style.p_price}>
          <Grid item className={Style.today_price}>290</Grid>
          <Grid item className={Style.today_sales}>Vistor today</Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
