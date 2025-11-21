import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Star.module.css";

// gm : files ↓

// gm : components ↓

export default function ButtonList({SelectedButton, setSelectedButton}) {
  // gm : states ↓

  return (
    <Grid item className={Style.ButtonList}>
      <Button
        className={SelectedButton ==="Information" ? Style.ButtonSelected : Style.Button}
        onClick={() => setSelectedButton("Information")}
      >
        Information
      </Button>
      <Button
        className={SelectedButton ==="Proof"  ? Style.ButtonSelected : Style.Button}
        onClick={() => setSelectedButton("Proof")}
      >
        Proof
      </Button>
      <Button
        className={SelectedButton ==="Chain info"  ? Style.ButtonSelected : Style.Button}
        onClick={() => setSelectedButton("Chain info")}
      >
        Chain info
      </Button>
    </Grid>
  );
}
