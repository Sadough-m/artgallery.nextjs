import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid, Hidden } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Star.module.css";

// gm : files ↓

// gm : components ↓
import CustomizeArtwork from "./CustomizeArtwork";

export default function OrderCarts() {
  // gm : states ↓

  return (
    <Grid item className={Style.MainCart} style={{paddingBottom:12}}>
        <Grid item className={`${Style.TitleItems} ${Style.p_left}`}>
          Order Cart
        </Grid>
      

      <CustomizeArtwork />
    </Grid>
  );
}
