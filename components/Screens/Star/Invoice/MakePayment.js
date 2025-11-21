import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Star.module.css";

// gm : files ↓
import CloseSvg from "../../../../public/images/icons/Close12.svg";
import PaidSvg from "../../../../public/images/icons/PaidWhite.svg";

// gm : components ↓

export default function MakePayment() {
  // gm : states ↓

  return (
    <Grid item className={Style.Main}>
      <Grid item className={Style.MakeText}>
        Make a payment
      </Grid>
      <Grid container className={Style.ContainerButtons}>
        <Grid item className={Style.P_Btn}>
          <Button
            startIcon={<img src={CloseSvg.src} />}
            className={Style.RejectBtn}
          >
            Reject
          </Button>
        </Grid>
        <Grid item className={Style.P_Btn1}>
          <Button
            startIcon={<img src={PaidSvg.src} />}
            className={Style.PayBtn}
          >
            Make a payment
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
