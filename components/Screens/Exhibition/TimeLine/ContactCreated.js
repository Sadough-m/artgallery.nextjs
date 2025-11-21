import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Exhibition.module.css";

// gm : files ↓
import EllipsPng from "../../../../public/images/icons/Ellipse 176.svg";

// gm : components ↓

export default function ContactCreated() {
  // gm : states ↓

  return (
    <Grid item className={Style.ContactCreated}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item className={Style.TextContact}>
          <img src={EllipsPng.src} className={Style.Elipse} />
          Contact created
        </Grid>
        <Grid item className={Style.DateContact}>
          {" "}
          <span className={Style.Date}>28-10-2021</span>{" "}
          <span className={Style.Time}>3:00 PM</span>{" "}
        </Grid>
      </Grid>
      <Grid item className={Style.ContactDesk}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </Grid>
        <span className={Style.LineContact}></span>
    </Grid>
  );
}
