import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Grid, IconButton } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/UserSettings.module.css";

// gm : files ↓
import dots from "../../../../public/images/icons/3dot.svg";
import EditDelete from "./EditDelete";

// gm : components ↓

export default function Location({ Data, placeHolder = "Location name " }) {
  // gm : states ↓

  return (
    <Grid item className={Style.Location}>
      <input
        type="text"
        className={Style.locationForm}
        value={Data?.name}
        placeholder={placeHolder}
        disabled={true}
      />
      <Grid item className={Style.dotsLocation}>
        <EditDelete
          Data={Data}
        />
      </Grid>
    </Grid>
  );
}
