import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid, Hidden } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../../styles/Star.module.css";

// gm : files ↓
import PlsuSvg from "../../../../../public/images/icons/Plus Black.svg";

// gm : components ↓
import CustomizeArtwork from "./CustomizeArtwork";

export default function Artworks() {
  // gm : states ↓

  return (
    <Grid item className={Style.Main} style={{paddingBottom:12}}>
      <Hidden smDown>
        <Grid item className={Style.TitleItems}>
          Items
        </Grid>
      </Hidden>
      <Hidden mdUp>
        <Grid item className={Style.TitleMain}>
          Artworks
        </Grid>
      </Hidden>

      <CustomizeArtwork />
    </Grid>
  );
}
