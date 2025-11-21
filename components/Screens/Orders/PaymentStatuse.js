import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../styles/Orders.module.css";

// gm : files ↓
import LoadingSvg from "../../../public/images/icons/LoadingBlack.svg";

// gm : components ↓

export default function PaymentStatuse({ status = "add" }) {
  // gm : states ↓

  return (
    <Grid item className={Style.PaymentStatuse}>
      <Grid item className={Style.TitlePaymentStatuse}>Payment statuse</Grid>
      <Button
        startIcon={<Image src={LoadingSvg} />}
        className={Style.ButtonMark}
      >
        Mark as Paid
      </Button>
    </Grid>
  );
}
