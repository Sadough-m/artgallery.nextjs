import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Star.module.css";

// gm : files ↓

// gm : components ↓

export default function AboutArtwork({ title, value }) {
  // gm : states ↓

  return (
    <Grid item className={Style.AboutArtwork}>
      <Grid container justifyContent="space-between">
        <Grid item className={Style.Title}>{title}</Grid>
        <Grid item className={Style.Value}>{value}</Grid>
      </Grid>
    </Grid>
  );
}
