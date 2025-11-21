import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Orders.module.css";

// gm : files ↓
import editSvg from "../../../../public/images/icons/Edit.svg";
import MashangPng from "../../../../public/images/Mashang.png";
import Date from "../../../Forms/Date";

// gm : components ↓

export default function ShippingInfo({HaveDate = true}) {
  // gm : states ↓

  return (
    <Grid item className={Style.Profile}>
      <Grid item className="posRel">
        {/* Title */}
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          className={Style.TitleProfile}
        >
          <Grid item className={Style.overView}>
          Shipping info
          </Grid>
          <Grid item>
            <Button
              color="primary"
              variant="text"
              startIcon={<Image src={editSvg} />}
            >
              Edit
            </Button>
          </Grid>
        </Grid>

        {/* Profile Image */}
        <Grid item className={Style.ContainerShipping}>
          {HaveDate && (
            <Date label="Date" placeHolder="Choose date"/>
          )}

          {/* Info */}
          <Grid item className={Style.P_Info_1}>
            <Grid item className={Style.TxtShipping_1}>Shipping address</Grid>
            <Grid item className={Style.Address}>734 Diomond rA Los Angeles, CA, USA 92660</Grid>
          </Grid>

        </Grid>
      </Grid>
    </Grid>
  );
}
