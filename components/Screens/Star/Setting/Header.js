import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid, IconButton } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Star.module.css";

// gm : files ↓
import CloseSvg from "../../../../public/images/icons/Close dark.svg";
import CheckSvg from "../../../../public/images/icons/Check White.svg";
import ArrowSvg from "../../../../public/images/icons/Arrow left -.svg";

// gm : components ↓
import useWindowSize from "../../../../Hooks/useWindowSize";

export default function Header({ HaveProceed }) {
  // gm : states ↓

  const [width, height] = useWindowSize()

  return (
    <Grid item className={Style.HeaderSetting}>
      <IconButton>
        <img src={width>960? CloseSvg.src : ArrowSvg.src} />
      </IconButton>
      <Grid item className={Style.Name}>
        Moras
      </Grid>
      {HaveProceed && (
        <Button
          className={Style.ProccedBtn_3}
          color="secondary"
          variant="contained"
          startIcon={<img src={CheckSvg.src} width="24px" />}
        >
          Procced
        </Button>
      )}
    </Grid>
  );
}
