import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Grid, Hidden, IconButton } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../styles/Orders.module.css";

// gm : files ↓
import arrowLeft from "../../../public/images/icons/Arrow left -.svg";
import dotsSvg from "../../../public/images/icons/MoreBlack.svg";
import PrinterSvg from "../../../public/images/icons/Printer.svg";

// gm : components ↓

export default function NavBarMobile() {
  // gm : states ↓

  return (
    <Grid item className={Style.nameContact}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <IconButton size="small" className={Style.arrowLeft}>
            <img src={arrowLeft.src} />
          </IconButton>
          Esther Howard
        </Grid>
        <Hidden mdUp>
            <Grid item>
              <IconButton size="small">
                <img src={dotsSvg.src} />
              </IconButton>
            </Grid>
        </Hidden>
      </Grid>
    </Grid>
  );
}
