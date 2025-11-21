import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Exhibition.module.css";

// gm : files ↓
import Guy from "../../../../public/images/guy.png";
import ContactCreated from "./ContactCreated";

// gm : components ↓

export default function TimeLine() {
  // gm : states ↓

  return (
    <Grid item className={Style.TimeLine}>
      {/* title */}
      <Grid item className={Style.TimeLineText}>
        Timeline
      </Grid>
      <Grid container alignItems="center" className={Style.P_ImageInput}>
        <Grid item>
          <img src={Guy.src} className={Style.ImgTimeLine} />
        </Grid>
      </Grid>
      <Grid item className={Style.P_ContactCreated}>
        <ContactCreated/>
        <ContactCreated/>
        <ContactCreated/>
      </Grid>

    </Grid>
  );
}
