import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../../styles/Orders.module.css";

// gm : files ↓
import GuyPng from "../../../../../public/images/guy.png";

// gm : components ↓

export default function NotFound() {
  // gm : states ↓

  return (
      <Grid container alignItems="center" justifyContent="center"  className={Style.NotFound}>
        <Grid item>
        Not found
        </Grid>
      </Grid>
  );
}
