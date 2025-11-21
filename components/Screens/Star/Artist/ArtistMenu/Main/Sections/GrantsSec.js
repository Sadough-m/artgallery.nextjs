import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../../../../styles/Star.module.css";

// gm : files ↓

// gm : components ↓

export default function GrantsSec() {
  // gm : states ↓

  return (
    <Grid item className={Style.Section}>
      {/* Item */}
      <Grid item className={Style.SecItem}>
        <Grid container justifyContent="space-between">
          <Grid item >
          Year
          </Grid>
          <Grid item className={Style.SecValue}>
            Value
          </Grid>
        </Grid>
      </Grid>
      {/* Item */}
      <Grid item className={Style.SecItem}>
        <Grid container justifyContent="space-between">
          <Grid item >
          Title
          </Grid>
          <Grid item className={Style.SecValue}>
            Value
          </Grid>
        </Grid>
      </Grid>
      {/* Item */}
      <Grid item className={Style.SecItem}>
        <Grid container justifyContent="space-between">
          <Grid item >
          Institution
          </Grid>
          <Grid item className={Style.SecValue}>
            Value
          </Grid>
        </Grid>
      </Grid>
      <span className={Style.LineFake2}></span>
    </Grid>
  );
}
