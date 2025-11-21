import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Grid, IconButton } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/UserSettings.module.css";

// gm : files ↓

// gm : components ↓
import EditDelete from "./EditDelete";

export default function Tamplate() {
  // gm : states ↓

  return (
    <Grid item className={Style.Email}>
      <Grid item className={Style.EmailTitle}>Message title is here</Grid>
      <Grid item className={Style.EmailAllList}>Sample description</Grid>
      <Grid item className={Style.dotsLocation_email}>
        <EditDelete />
      </Grid>
    </Grid>
  );
}
