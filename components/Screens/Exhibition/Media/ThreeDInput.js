import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid, Hidden, IconButton } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Exhibition.module.css";

// gm : files ↓
import ArrangeMentSvg from "../../../../public/images/icons/Arrangement.svg";
import ArrowRightSvg from "../../../../public/images/icons/Arrow right blue.svg";
import ImgThreeD from "../../../../public/images/icons/3DBlack.svg";
import RemoveSvg from "../../../../public/images/icons/Remove blue.svg";

// gm : components ↓

export default function ThreeDInput() {
  // gm : states ↓

  return (
    <Grid item className={Style.ThreeD}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item className={Style.ArrangementText}>
          <img src={ImgThreeD.src} className={Style.ImgThree} />
          3D input
        </Grid>
        <Grid item>
          <Button color="primary">
            <span className={Style.DotBlue}></span>Live
          </Button>
          <span className={Style.LineMiddle}></span>

          {/* Desktop */}
          <Hidden smDown>
            <Button
              color="primary"
              startIcon={<img src={RemoveSvg.src} />}
            >
              Remove
            </Button>
          </Hidden>
          
          {/* Mobile */}
          <Hidden mdUp>
            <IconButton>
              <img src={RemoveSvg.src} />
            </IconButton>
          </Hidden>
        </Grid>
      </Grid>
    </Grid>
  );
}
