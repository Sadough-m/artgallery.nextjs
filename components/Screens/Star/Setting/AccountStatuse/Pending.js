import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../../styles/Star.module.css";

// gm : files ↓
import CloseSvg from "../../../../../public/images/icons/CloseRedOpacity.svg";
import ArrowSvg from "../../../../../public/images/icons/Arrow right white.svg";

// gm : components ↓

export default function Pending() {
  // gm : states ↓

  return (
    <Grid item className={Style.AccountStatuse}>
      <Grid container>
        <Grid item>
          <img src={CloseSvg.src} />
        </Grid>
        <Grid item className={Style.RightChoose}>
          <Grid item className="fw_500">
          Your account is Pending
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
           Contact us
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
