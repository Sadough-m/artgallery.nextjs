import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../styles/Exhibition.module.css";

// gm : files ↓
import PlusSvg from '../../../public/images/icons/Plus - Circle.svg'

// gm : components ↓

export default function ItemFolding({ Title, Desk,  TextButton = "" }) {
  // gm : states ↓

  return (
    <Grid item className={Style.ItemFolding}>
      <Grid item className={Style.Title}>
        {Title}
      </Grid>
      {TextButton ==="" && (
        <Grid item className={Style.Desk}>
          {Desk}
        </Grid>
      )}
      {TextButton !=="" && (
        <Button color="primary" startIcon={<img src={PlusSvg.src}/>} className={Style.ButtonFold}>{TextButton}</Button>
      )}
    </Grid>
  );
}
