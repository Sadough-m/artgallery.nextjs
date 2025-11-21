import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/UserSettings.module.css";

// gm : files ↓
import CheckSvg from "../../../../public/images/icons/Check - Circle blue.svg";
import ArrowRightSvg from "../../../../public/images/icons/Arrow right blue.svg";

// gm : components ↓

export default function PermissionApp({text}) {
  // gm : states ↓

  return (
    <Grid item className={Style.PermissionApp}>
      <Grid container justifyContent="space-between">
        <Grid item className={Style.ViewArtor}>
          <img src={CheckSvg.src} className={Style.CheckCircle} />
          {text}
        </Grid>
        <Grid item className={Style.P_MoreDetail}>
          <Button color="primary" endIcon={<Image src={ArrowRightSvg} />}>
            More Detail
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
