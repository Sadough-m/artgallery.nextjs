import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../styles/Star.module.css";

// gm : files ↓
import SupSvg from "../../../public/images/icons/Support.svg";

// gm : components ↓

export default function Report() {
  // gm : states ↓

  return (
    <Grid item className={Style.Report}>
      <Grid container direction="column" alignItems="flex-end">
        <Button item className={Style.ItemReport}>
          You are the artist and you wanan report
        </Button>
        <Button item className={Style.ItemReport}>
          Worng information
        </Button>
        <Button item className={Style.ItemReport_2} startIcon={<img src={SupSvg.src}/>}>
          Report a problem
        </Button>
      </Grid>
    </Grid>
  );
}
