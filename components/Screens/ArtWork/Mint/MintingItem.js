import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// good man : material ui ↓
import { Grid } from "@material-ui/core";

// good man : styles ↓
import ArtWorkFlowStyle from "../../../../styles/artworkflow.module.css";

// good man : files ↓
import info from '../../../../public/images/icons/Info gray.svg'
import checkCircle from '../../../../public/images/icons/Check - Circle blue.svg'

// good man : components ↓

export default function MintingItem({text, checked}) {
  // mrx : states ↓

  return (
    <Grid item style={{marginTop:'4px'}}>
      <Grid container alignItems="center" spacing={1}>
        <Grid item className={ArtWorkFlowStyle.P_pic_mintItem}>
            <Image src={!checked?info:checkCircle}/>
        </Grid>
        <Grid item className={ArtWorkFlowStyle.titleItemMint}>{text}</Grid>
      </Grid>
    </Grid>
  );
}
