import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Orders.module.css";

// gm : files ↓
import PlsuSvg from "../../../../public/images/icons/Plus Black.svg";
import Table from "./Table";

// gm : components ↓


export default function ArtworksShipping({HaveTracking}) {
  // gm : states ↓

  return (
    <Grid item className={Style.Main_1}>
      <Grid item className={Style.TitleMain}>
        Artworks
      </Grid>
      <Table HaveTracking={HaveTracking}/>
    </Grid>
  );
}
