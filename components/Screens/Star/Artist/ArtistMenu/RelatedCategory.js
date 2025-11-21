import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../../styles/Star.module.css";

// gm : files ↓

// gm : components ↓

export default function RelatedCategory() {
  // gm : states ↓

  return (
    <Grid item className={Style.RelatedCategory}>
      <Grid item className={Style.Cat_Text}>
      Related category
      </Grid>
      <Grid container>
          <Grid item className={Style.CategoryItem}>I’m a Category</Grid>
          <Grid item className={Style.CategoryItem}>I’m a Category</Grid>
          <Grid item className={Style.CategoryItem}>I’m a Category</Grid>
          <Grid item className={Style.CategoryItem}>I’m a Category</Grid>
          <Grid item className={Style.CategoryItem}>I’m a Category</Grid>
          <Grid item className={Style.CategoryItem}>I’m a Category</Grid>
          <Grid item className={Style.CategoryItem}>I’m a Category</Grid>
      </Grid>
    </Grid>
  );
}
