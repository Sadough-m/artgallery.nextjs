import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Grid, IconButton } from "@material-ui/core";

// gm : styles ↓
import ColStyle from "../../../../styles/Collection.module.css";

// gm : files ↓
import closeIcon from '../../../../public/images/icons/Close12.svg'

// gm : components ↓

export default function AppItem({ title, img }) {
  // gm : states ↓

  return (
    <Grid item className={ColStyle.appItem}>
      <Grid container alignItems="center">
        <Grid item className={ColStyle.p_logoApp}>
          <img src={img.src} className={ColStyle.logoApp} />
        </Grid>
        <Grid item className="fs14">{title}</Grid>
      </Grid>
      <IconButton size="small" className={ColStyle.iconClose}>
          <img src={closeIcon.src}/>
      </IconButton>
    </Grid>
  );
}
