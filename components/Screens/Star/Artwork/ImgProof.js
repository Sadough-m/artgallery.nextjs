import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Star.module.css";

// gm : files ↓
import ImgProofPng from "../../../../public/images/ImgProof.png";
import NotSupPng from "../../../../public/images/NotSupProof.png";

// gm : components ↓

export default function ImgProof({title = "Title is here", NotSuported, MarginTop=4}) {
  // gm : states ↓

  return (
    <Grid item className={Style.MainImgProof}>
      <Grid item>
        <img src={NotSuported? NotSupPng.src :ImgProofPng.src} className={Style.ImgProof}/>
      </Grid>
      <Grid item className={Style.TitleProof} style={{marginTop:MarginTop}}>{title}</Grid>
    </Grid>
  );
}
