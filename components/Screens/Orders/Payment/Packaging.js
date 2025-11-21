import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Orders.module.css";
import CustomSelect from "../../../Forms/CustomSelect";

// gm : files ↓
import StarSvg from '../../../../public/images/icons/Star.svg'

// gm : components ↓

export default function Packaging() {
  // gm : states ↓

  return (
    <Grid item className={Style.Main_1}>
      <Grid item className={Style.TitleMain}>Packaging</Grid>
      <CustomSelect label="Package type" IsPackaging={true}/>
      <Grid item className={Style.PackagingName}>
        <img src={StarSvg.src} className={Style.star}/>“Packaging name” <span className={Style.txt10}>is recommended for the artwork selected</span>
      </Grid>
    </Grid>
  );
}
