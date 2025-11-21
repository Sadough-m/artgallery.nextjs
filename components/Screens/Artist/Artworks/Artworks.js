import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/savedArtist.module.css";

// gm : files ↓

// gm : components ↓

export default function Artworks() {
  // gm : states ↓

  return (
    <Grid item>
      <Grid container direction="column">
        <Grid item className={Style.textNote}>
          Artworks
        </Grid>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          className={Style.Box}
        >
          <Grid item className={Style.text_notAdded}>
            No transactions added yet
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
