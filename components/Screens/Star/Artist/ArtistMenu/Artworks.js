import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../../styles/Star.module.css";

// gm : files ↓
import ArtworkPng from "../../../../../public/images/StarArtwork.png";
import ArtworkPng1 from "../../../../../public/images/StarArtwork1.png";
import ArtworkPng2 from "../../../../../public/images/StarArtwork2.png";
import ArtworkPng3 from "../../../../../public/images/StarArtwork3.png";

// gm : components ↓
import ArtworkItem from "./ArtworkItem";

export default function Artworks() {
  // gm : states ↓

  return (
    <Grid item className={Style.Artworks}>
      <span className={Style.ForId} id="Artworks"></span>

      <Grid item className={Style.ArtworkText}>
        Artwork
      </Grid>
      <Grid container>
        <ArtworkItem Img={ArtworkPng} />
        <ArtworkItem Img={ArtworkPng1} />
        <ArtworkItem Img={ArtworkPng2} />
        <ArtworkItem Img={ArtworkPng3} />
      </Grid>
      <Grid container justifyContent="center">
        <Grid item>
          <Button className={Style.ViewAll}>View All</Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
