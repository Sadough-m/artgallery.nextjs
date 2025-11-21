import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Grid, IconButton } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Messaging.module.css";

// gm : files ↓

// gm : components ↓
import useWindowSize from "../../../../Hooks/useWindowSize";

export default function MyMessage({Text}) {
  // gm : states ↓

  const [width, height] = useWindowSize()

  return (
    <Grid item className={Style.MyMessage}>
      <Grid container direction={width> 960 ? "row-reverse" : "column" }  alignItems={width> 960 ? "center" : "flex-end" } >
        <Grid item className={Style.TextMyMessage}>{Text}</Grid>
        <Grid item className={Style.TimeMyMessage}>10:20 PM</Grid>
      </Grid>
    </Grid>
  );
}
