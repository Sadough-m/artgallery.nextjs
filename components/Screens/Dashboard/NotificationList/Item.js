import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Dashboard.module.css";

// gm : files ↓
import ArrowSvg from "../../../../public/images/icons/arrowRightNewGray.svg";

// gm : components ↓

export default function Item({text}) {
  // gm : states ↓

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      className={Style.NotificationItem}
    >
      <Grid item>{text}</Grid>
      <Grid item>
        <img src={ArrowSvg.src} />
      </Grid>
    </Grid>
  );
}
