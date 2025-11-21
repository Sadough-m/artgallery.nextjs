import React from "react";
import Image from "next/image";
import Link from "next/link";

// good man : material ui ↓
import { Grid } from "@material-ui/core";

// good man : styles ↓
import ArtWorkFlowStyle from "../../../styles/artworkflow.module.css";

// good man : files ↓
import infoIcon from "../../../public/images/icons/Info gray.svg";

// good man : components ↓

export default function Info({ opacity = 1, children }) {
  return (
    <Grid item className={ArtWorkFlowStyle.imgInfo}>
      <Image src={infoIcon} />
      <Grid
        item
        className={ArtWorkFlowStyle.infoOnHover1}
        style={{ opacity: opacity }}
      >
        {children && children}
        <span className={ArtWorkFlowStyle.square_info}></span>
      </Grid>
    </Grid>
  );
}
