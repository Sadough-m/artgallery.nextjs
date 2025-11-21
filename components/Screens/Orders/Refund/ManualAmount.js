import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Orders.module.css";

// gm : files ↓
import CheckSvg from "../../../../public/images/icons/Check - Circle blue.svg";

// gm : components ↓
import Table from "./Table";
import InputForm from "../../../Forms/InputForm";

export default function ManualAmount() {
  // gm : states ↓

  return (
    <Grid item className={Style.NewMain}>
      <Grid item className={Style.MainTitle2}>
        Manual amount
      </Grid>
      <Button
        color="primary"
        startIcon={<img src={CheckSvg.src} />}
        className={Style.RefundBtnAbs}
      >
        Refund Shipping
      </Button>
      <Grid item className="posRel">
        <InputForm label="Amount" placeHolder="Enter amount" />
        <Button color="primary" startIcon={<img src={CheckSvg.src}/>} className={Style.PayBtn}>Pay in FUll</Button>
      </Grid>
      <Grid item className={Style.AvailableText}>
        $3600.00 avaiable for this order
      </Grid>
    </Grid>
  );
}
