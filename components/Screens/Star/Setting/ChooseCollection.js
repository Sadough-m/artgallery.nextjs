import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Star.module.css";

// gm : files ↓
import VisaPng from "../../../../public/images/Visa.png";

// gm : components ↓

export default function ChooseCollection() {
  // gm : states ↓

  return (
    <Grid item className={Style.ChooseCollection}>
      <Grid container>
        <Grid item>
          <img src={VisaPng.src} />
        </Grid>
        <Grid item className={Style.RightChoose}>
          <Grid item className="fw_500">
            Transfer Works to collection
          </Grid>
          <Grid item className={Style.TextTranfer}>
            Lorem ipsum dolor sit amet. Sed nihil mollitia sed repudiandae
            consequatur ut accusantium dolore eos cupiditate laborum et rerum
            aliquam est sunt possimus et internos
          </Grid>
          <Button color="secondary" variant="contained" className={Style.ChooseBtn}>
            Choose a collection
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
