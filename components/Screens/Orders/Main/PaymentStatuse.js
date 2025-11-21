import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Orders.module.css";

// gm : files ↓
import LoadingSvg from "../../../../public/images/icons/LoadingWhite.svg";
import PaidSvg from "../../../../public/images/icons/Paid.svg";

// gm : components ↓

export default function PaymentStatuse() {
  // gm : states ↓

  return (
    <Grid item className={Style.Main}>
      <Grid item className={Style.TitleMain}>
        Payment statuse
      </Grid>
      <Grid container justifyContent="space-between">
        <Grid item className={Style.P_Btn}>
          <Button
            startIcon={<Image src={LoadingSvg} />}
            className={Style.BtnPending}
            variant="contained"
            color="secondary"
          >
            Mark as Pending
          </Button>
        </Grid>
        <Grid item className={Style.P_Btn_1}>
          <Button startIcon={<Image src={PaidSvg} />} className={Style.BtnPaid}>
            Mark as Paid
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
