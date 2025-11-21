import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../../styles/Star.module.css";

// gm : files ↓
import ArrowSvg from "../../../../../public/images/icons/Arrow right white.svg";
import CheckSvg from "../../../../../public/images/icons/CheckBlue.svg";

// gm : components ↓

export default function Verified() {
  // gm : states ↓

  return (
    <Grid item className={Style.AccountStatuse}>
      <Grid container>
        <Grid item>
          <img src={CheckSvg.src} />
        </Grid>
        <Grid item className={Style.RightChoose}>
          <Grid item className="fw_500">
            Your account is Verified
          </Grid>
          <Grid item className={Style.TextTranfer}>
            Please choose and press not recognized. Please be certain, since in
            some cases we have to burn tokens of minted works.
          </Grid>
          <Button
            color="secondary"
            variant="contained"
            className={Style.AccountBtn}
            endIcon={<img src={ArrowSvg.src}/>}
          >
            Procced to your CV
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
