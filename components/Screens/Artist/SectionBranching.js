import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// good man : material ui ↓
import { Grid } from "@material-ui/core";

// good man : styles ↓
import savedArtistStyle from "../../../styles/savedArtist.module.css";

// good man : files ↓

// good man : components ↓

export default function SectionBranching({title, value}) {
  // mrx : states ↓

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="space-between"
      className={savedArtistStyle.P_items}
    >
      <Grid item className={savedArtistStyle.titleItems}>
          {title}
      </Grid>
      <Grid item className={savedArtistStyle.titleValue}>
          {value}
      </Grid>
      
    </Grid>
  );
}
