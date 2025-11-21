import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Grid, IconButton } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../../styles/Orders.module.css";

// gm : files ↓
import DeleteSvg from "../../../../../public/images/icons/Remove red.svg";

// gm : components ↓
import Artwork from "./Artwork";

export default function Table({
  OrderItems,
  removeItem
}) {
  // gm : states ↓

  return (
    <Grid item className={Style.p_orders_items} style={{ width: "100%" }}>
      {/* title */}
      <div className={Style.box_title}>
        <div className={`${Style.p_imgTable} ${Style.TitleFont}`}>Artwork</div>
        <div className={`${Style.webSite} ${Style.TitleFont}`}>Classification</div>
        <div className={`${Style.data} ${Style.TitleFont1}`}>Price</div>
        <div className={`${Style.Count} ${Style.TitleFont}`}>Count</div>
      </div>

      {/* Artworks */}
      {
        OrderItems?.map((item) => (
          <Artwork removeItem={removeItem} Item={item} />
        ))
      }
    </Grid>
  );
}
