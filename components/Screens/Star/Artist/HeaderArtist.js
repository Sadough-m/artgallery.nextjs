import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Star.module.css";

// gm : files ↓
import GuyPng from "../../../../public/images/Mashang.png";

// gm : components ↓

export default function HeaderArtist() {
  // gm : states ↓
  

  return (
    <Grid item className={Style.HeaderArtist}>
      <Grid item className={Style.HeaderBlack}>
        <img src={GuyPng.src} className={Style.Artist} />
      </Grid>
      <Grid item className={Style.ArtistName}>
        Esther Howard
      </Grid>
      <Grid item className={Style.Creator_Location}>
        Creator Alies
      </Grid>
      <Grid item className={Style.Creator_Location}>
        United Kingdom
      </Grid>
      
    </Grid>
  );
}
