import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Orders.module.css";
import Table from "./Table";

// gm : files ↓

// gm : components ↓

export default function Payment() {
  // gm : states ↓

  return (
    <Grid item className={Style.NewMain}>
      <Grid item className={Style.MainTitle}>
        Payments
      </Grid>
      <Grid item className={Style.P_Tb}>
        <Table />
      </Grid>
    </Grid>
  );
}
