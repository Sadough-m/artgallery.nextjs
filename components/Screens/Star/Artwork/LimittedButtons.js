import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Star.module.css";

// gm : files ↓

// gm : components ↓

export default function LimittedButton({SelectedLimitted, setSelectedLimitted}) {
  // gm : states ↓

  return (
    <Grid item className={Style.LimittedBtn}>
      <Button
        item
        className={
          SelectedLimitted === "Limited edition" ? Style.ButtonSelectedLimit : Style.ButtonLimit
        }
        onClick={() => setSelectedLimitted("Limited edition")}
      >
        Limited edition
      </Button>
      <Button
        item
        className={
          SelectedLimitted === "1" ? Style.ButtonSelectedLimit : Style.ButtonLimit
        }
        onClick={() => setSelectedLimitted("1")}
      >
        1
      </Button>
      <Button
        item
        className={
          SelectedLimitted === "2" ? Style.ButtonSelectedLimit : Style.ButtonLimit
        }
        onClick={() => setSelectedLimitted("2")}
      >
        2
      </Button>
      <Button
        item
        className={
          SelectedLimitted === "3" ? Style.ButtonSelectedLimit : Style.ButtonLimit
        }
        onClick={() => setSelectedLimitted("3")}
      >
        3
      </Button>
     
    </Grid>
  );
}
