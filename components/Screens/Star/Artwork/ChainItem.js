import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid, Hidden } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Star.module.css";

// gm : files ↓
import ElipsSvg from "../../../../public/images/icons/Ellipse 176.svg";
import ArrowSvg from "../../../../public/images/icons/Arrow right blue.svg";

// gm : components ↓

export default function ChainItem() {
  // gm : states ↓

  return (
    <Grid item className={Style.ChainItem}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <img src={ElipsSvg.src} className={Style.Elips} />
          Alex Nikk
        </Grid>
        <Grid item>Transfered</Grid>
        <Grid item>Hidden</Grid>
        <Grid item>
          <Button
            color="primary"
            endIcon={<img src={ArrowSvg.src} />}
            className={Style.MoreInfo}
          >
            <Hidden smDown>More Info</Hidden>
          </Button>
        </Grid>
      </Grid>
      <span className={Style.LineChain}></span>
    </Grid>
  );
}
