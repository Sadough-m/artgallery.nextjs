import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Orders.module.css";
import CustomSelect from "../../../Forms/CustomSelect";

// gm : files ↓

// gm : components ↓

export default function TrackingInfo() {
  // gm : states ↓

  return (
    <Grid item className={Style.Tracking}>
      <Grid item className={Style.TrackInfo}>
        Tracking information
      </Grid>
      <Grid container justifyContent="space-between">
          <Grid item className={Style.TwoForm}>
              <CustomSelect label="Shipping carrier" bgColor="white"/>
          </Grid>
          <Grid item className={Style.TwoForm}>
              <CustomSelect label="Tracking number" bgColor="white"/>
          </Grid>
      </Grid>
    </Grid>
  );
}
