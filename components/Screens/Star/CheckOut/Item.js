import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Star.module.css";

// gm : files ↓
import ManPng from "../../../../public/images/man.jpg";

// gm : components ↓

export default function Item() {
  // gm : states ↓

  return (
    <Grid container className={Style.Item}>
      <Grid item>
        <img src={ManPng.src} className={Style.ItemImage}/>
      </Grid>
      <Grid item className={Style.TextItem}>
        <Grid item style={{fontWeight:600}}>Sohrab sepehri</Grid>
        <Grid item>Black Swan - ATLS Series</Grid>
        <Grid item>Painting</Grid>
        <Grid item style={{fontWeight:700}}>$299</Grid>
      </Grid>
    </Grid>
  );
}
