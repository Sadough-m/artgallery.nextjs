import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Grid, IconButton } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../styles/Messaging.module.css";

// gm : files ↓
import ThreeDotSvg from "../../../public/images/icons/3dot.svg";
import EditDelete from "./EditDelete";

// gm : components ↓

export default function Label({ Logo }) {
  // gm : states ↓

  return (
    <Grid item className={Style.Label}>
      <Grid item className={Style.Labeltitle}>
        <img src={Logo.src} className={Style.LabelImg} /> Lable name
      </Grid>
      <Grid item className={Style.ThreeDot}>
        <EditDelete />
      </Grid>
    </Grid>
  );
}
