import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../../styles/Star.module.css";

// gm : files ↓
import PlsuBlueSvg from "../../../../../public/images/icons/Plus - Circle.svg";
import PlsuGraySvg from "../../../../../public/images/icons/Plus - Circle gray.svg";

// gm : components ↓

export default function ItemArtwork({
  EditBtn = false,
  title,
  IsGray,
  TextBtn = "Add Discount",
  HandleModal,
}) {
  // gm : states ↓

  return (
    <>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        className={Style.P_ArtworkSec}
      >
        <Grid item className={Style.Discount}>
          {title}
        </Grid>
        <Grid item className={Style.percentDiscount}>
          {EditBtn ? "10%" : ""}
          {!IsGray && (
            <Button
              color="primary"
              startIcon={!EditBtn ? <img src={PlsuBlueSvg.src} /> : ""}
              className={Style.fitBtn_1}
              onClick={HandleModal}
            >
              {EditBtn ? "(Edit)" : TextBtn}
            </Button>
          )}

          {IsGray && (
            <Button
              startIcon={!EditBtn ? <img src={PlsuGraySvg.src} /> : ""}
              className={Style.fitBtn_12}
              onClick={HandleModal}
            >
              {EditBtn ? "(Edit)" : TextBtn}
            </Button>
          )}
        </Grid>
      </Grid>
    </>
  );
}
