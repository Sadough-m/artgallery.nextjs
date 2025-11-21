import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../../styles/Orders.module.css";
import Artwork from "./Artwork";

// gm : files ↓

// gm : components ↓

export default function Table() {
  // gm : states ↓

  return (
    <Grid item className={Style.p_orders_items}>
      
      {/* title */}
      <div className={Style.box_title}>
        <div className={`${Style.p_imgTable} ${Style.TitleFont}`}>Artwork</div>
        <div className={`${Style.webSite} ${Style.TitleFont}`}>Limited</div>
        <div className={`${Style.data} ${Style.TitleFont1}`}>Price</div>
        <div className={`${Style.Count} ${Style.TitleFont}`}>Size</div>
      </div>

      {/* Artworks */}
      <Artwork />
      <Artwork />

      <div className={Style.content_shipping}>
        <div className={Style.box}>
          <div className={Style.p_imgTable}>
            <div className="fw_500">Shipping</div>
            <div className={Style.DateText}>20 - 04 -2020</div>
          </div>
          <div className={Style.webSite}></div>
          <div className={Style.data}>$1,955.00</div>
          <div className={Style.Count}>×5</div>
        </div>
      </div>
    </Grid>
  );
}
