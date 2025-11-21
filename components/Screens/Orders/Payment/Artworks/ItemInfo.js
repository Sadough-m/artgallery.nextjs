import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../../styles/Orders.module.css";

// gm : files ↓

// gm : components ↓

export default function ItemInfo({ title, value, IsBold }) {
  // gm : states ↓

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      className={Style.P_ArtworkSec_1}
    >
      <Grid item className={!IsBold?Style.Discount:Style.TotalPaid}>
        {title}
      </Grid>
      <Grid item className={!IsBold?Style.price:Style.price_1}>
        {value}
      </Grid>
    </Grid>
  );
}
