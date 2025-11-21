import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';


// good man : material ui ↓
import {
  Grid,
} from '@material-ui/core';

// good man : styles ↓
import ArtWorkFlowStyle from "../../../../styles/artworkflow.module.css";

// good man : files ↓

// good man : components ↓

export default function MintingStatus({ title, badgeColor }) {
  // mrx : states ↓


  return (
    <Grid item>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        className={ArtWorkFlowStyle.P_items3}
      >
        <Grid item className={ArtWorkFlowStyle.titleItems1}>
          {/* change color of badge */}
          <span
            style={{ background: "#" + badgeColor }}
            className={ArtWorkFlowStyle.badgeIT}
          ></span>{title}{" "}
        </Grid>
      </Grid>
    </Grid>
  )
}