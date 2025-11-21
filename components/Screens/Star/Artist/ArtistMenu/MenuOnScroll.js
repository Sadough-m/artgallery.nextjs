import React, { useState, useEffect  } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../../styles/Star.module.css";

// gm : files ↓
import GuyPng from "../../../../../public/images/Mashang1.png";

// gm : components ↓

export default function MenuOnScroll({ShowNav}) {
  // gm : states ↓


  return (
    <Grid item className={`${Style.MenuOnScroll} ${ShowNav  && Style.ShowMe}`}>
      {/* Info */}
      <Grid item className={Style.ArtistInfoOnScroll}>
        <Grid container alignItems="center">
          <Grid item>
            <img src={GuyPng.src} className={Style.ImgOnScroll} />
          </Grid>
          <Grid item className={Style.InfoArtist}>
            <Grid item>
              <Grid item className={Style.NameOnScroll}>
                Esther Howard{" "}
                <span className={Style.TypeAlies}>(Creator alies)</span>
              </Grid>

              <Grid item className={Style.LocatipnOnScroll}>
                United Kingdom
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      
    </Grid>
  );
}
