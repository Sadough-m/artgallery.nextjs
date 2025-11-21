import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../../styles/Orders.module.css";
import Method from "./Method";

// gm : files ↓
import VisaPng from "../../../../../public/images/Visa.png";
import MastercardPng from "../../../../../public/images/Mastercard.png";
import PlusCircleSvg from "../../../../../public/images/icons/Plus - Circle.svg";

// gm : components ↓

export default function PaymentMethod() {
  // gm : states ↓

  return (
    <Grid item className={Style.Main_1}>
      <Grid item className={Style.TitleMain_1}>
        Payment method
      </Grid>
      <Method logo={VisaPng} />
      <Method logo={MastercardPng} />

      <Grid container justifyContent="center" className={Style.P_AddMethod}>
        <Grid item>
          <Button color="primary" startIcon={<Image src={PlusCircleSvg} />}>
            Add a Method
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
