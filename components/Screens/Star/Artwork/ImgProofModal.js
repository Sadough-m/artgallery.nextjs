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

export default function ImgProofModal({title = "Title is here", NotSuported}) {
  // gm : states ↓

  return (
    <Grid item className={Style.MainImgProofModal}>
      <Grid item>
        <img src={NotSuported? NotSupPng.src :ImgProofPng.src} className={Style.ImgProofModal}/>
      </Grid>
      <Grid item className={Style.TitleProofModal} >{title}</Grid>
    </Grid>
  );
}
