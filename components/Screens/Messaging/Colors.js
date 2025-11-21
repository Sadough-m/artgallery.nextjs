import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../styles/Messaging.module.css";

// gm : files ↓

// gm : components ↓

export default function Colors() {
  // gm : states ↓
  const [ColorName, setColorName] = useState("Blue");

  return (
    <Grid item className={Style.Colors}>
      <Grid item className="fs14fw500">
        Color
      </Grid>
      <Grid item className={Style.P_Colors}>
        <span className={Style.BlueColor} onClick={() => setColorName("Blue")}>
          {ColorName === "Blue" && <span className={Style.WhiteColor}></span>}
        </span>
        <span
          className={Style.OrangeColor}
          onClick={() => setColorName("Orange")}
        >
          {ColorName === "Orange" && <span className={Style.WhiteColor}></span>}
        </span>
        <span
          className={Style.GreenColor}
          onClick={() => setColorName("Green")}
        >
          {ColorName === "Green" && <span className={Style.WhiteColor}></span>}
        </span>
        <span
          className={Style.PurpleColor}
          onClick={() => setColorName("Purple")}
        >
          {ColorName === "Purple" && <span className={Style.WhiteColor}></span>}
        </span>
      </Grid>
    </Grid>
  );
}
