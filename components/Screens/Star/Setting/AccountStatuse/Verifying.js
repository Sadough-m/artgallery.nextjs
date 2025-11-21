import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../../styles/Star.module.css";

// gm : files ↓
import InfoSvg from "../../../../../public/images/icons/InfoGray.svg";

// gm : components ↓

export default function Verifying() {
  // gm : states ↓

  return (
    <Grid item className={Style.AccountStatuse}>
      <Grid container>
        <Grid item>
          <img src={InfoSvg.src} />
        </Grid>
        <Grid item className={Style.RightChoose}>
          <Grid item className="fw_500">
            Your account is verifying
          </Grid>
          <Grid item className={Style.TextTranfer}>
            Please choose and press not recognized. Please be certain, since in
            some cases we have to burn tokens of minted works.
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
