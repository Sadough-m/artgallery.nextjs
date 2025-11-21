import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// good man : material ui ↓
import { Grid } from "@material-ui/core";

// good man : styles ↓
import artworkStyle from "../../../styles/artworkflow.module.css";

// good man : files ↓

// good man : components ↓

export default function SectionPrivacy({title, value}) {
  // mrx : states ↓

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="space-between"
      className={artworkStyle.P_items}
    >
      <Grid item className={artworkStyle.titleItems5}>
          {title}
      </Grid>
      <Grid item className={artworkStyle.titleValue5}>
          {value}
      </Grid>
      <span className={artworkStyle.lineTitle}></span>

    </Grid>
  );
}
