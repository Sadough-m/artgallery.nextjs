import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../../styles/Star.module.css";

// gm : files ↓

// gm : components ↓

export default function ArtworkItem({Img}) {
  // gm : states ↓

  return (
    <Grid item className={Style.ArtworkItem}>
      <Grid item className="posRel">
        <img src={Img.src} className={Style.ImageArtwork}/>
        <span className={Style.TypeArtwork}>Painting</span>
      </Grid>
      <Grid item className={Style.Model}>3D model for “D” word</Grid>
      <Grid item className={Style.PriceArt}>$150.00</Grid>
    </Grid>
  );
}
