import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Grid } from "@material-ui/core";

// gm : styles ↓
import style from "../../../../styles/Home.module.css";

// gm : files ↓
import ArrowRightSvg from "../../../../public/images/icons/ArrowRight.svg";

// gm : components ↓

export default function Item({
  onClick,
  title,
  NumArtwork
}) {
  // gm : states ↓

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      className={style.P_List_Artworks}
      onClick={onClick}
    >
      <Grid item>{title}</Grid>
      <Grid item className={style.NumArtworks}>
        {NumArtwork}
        <img src={ArrowRightSvg.src} className={style.SvgRight} />
      </Grid>
    </Grid>
  );
}
