import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../../styles/Orders.module.css";

// gm : files ↓
import VisaPng from "../../../../../public/images/Visa.png";
import MastercardPng from "../../../../../public/images/Mastercard.png";
import PlusCircleSvg from "../../../../../public/images/icons/Plus - Circle.svg";

// gm : components ↓
import Package from "./Package";

export default function Services({ IsEmpty = false }) {
  // gm : states ↓

  return (
    <Grid item className={Style.Main_1}>
      <Grid item className={Style.TitleMain}>
        Services
      </Grid>
      {IsEmpty && (
        <Grid item className={Style.ChoosePackage}>
          Please choose packaging
        </Grid>
      )}

      {!IsEmpty && (
        <>
          <Package logo={VisaPng} />
          <Package logo={MastercardPng} />
        </>
      )}

      {IsEmpty && (
        <Grid container justifyContent="center" className={Style.P_AddMethod}>
          <Grid item>
            <Button color="primary" startIcon={<Image src={PlusCircleSvg} />}>
              Request Custom Services
            </Button>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}
