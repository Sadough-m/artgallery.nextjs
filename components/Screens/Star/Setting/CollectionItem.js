import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Star.module.css";

// gm : files ↓
import LogoPng from "../../../../public/images/app name logo1.png";
import Info from "../../ArtWork/Info";

// gm : components ↓

export default function CollectionItem({ CollectionId, setCollectionId, Id }) {
  // gm : states ↓

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="space-between"
      className={
        CollectionId === Id
          ? Style.CollectionItem_Selected
          : Style.CollectionItem
      }
      onClick={() => setCollectionId(Id)}
    >
      <Grid item>
        <Grid container alignItems="center">
          <Grid item>
            <img src={LogoPng.src} />
          </Grid>
          <Grid item className={Style.P_Col}>
            <Grid item className={Style.ColText}>
              Collection
            </Grid>
            <Grid item className={Style.AboutCol}>
              Lorem ipsum dolor sit amet. Ut{" "}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Info>hello</Info>
      </Grid>
    </Grid>
  );
}
