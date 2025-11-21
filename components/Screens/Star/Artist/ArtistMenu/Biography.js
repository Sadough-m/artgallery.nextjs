import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../../styles/Star.module.css";

// gm : files ↓

// gm : components ↓

export default function Biography() {
  // gm : states ↓

  return (
    <Grid item className={Style.Biography}>
      <Grid item className={Style.Biography_Text}>Biography</Grid>
      <Grid item className={Style.Biography_Dummy}>
        With minimalism at the epicentre of his work, Jason Martin’s approaches
        his painting with a controlled manner through his use of brushwork and
        choice of colour. By redefining the process and fundamentals of
        painting, Martin works in pigment, acrylic, oil paint, graphite and cast
        metal to create a universe of swirling forms. Atmospheric landscapes
        manifest his canvas and he manipulates the materiality of his paint to
        mimic.
      </Grid>
    </Grid>
  );
}
