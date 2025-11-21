import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Grid, IconButton } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Messaging.module.css";

// gm : files ↓

// gm : components ↓
import useWindowSize from "../../../../Hooks/useWindowSize";

export default function AudienceMessage({Text}) {
  // gm : states ↓

  const [width, height] = useWindowSize()

  return (
    <Grid item className={Style.AudienceMessage}>
      <Grid container direction={width> 960 ? "row" : "column" }  alignItems={width> 960 ? "center" : "flex-start" }>
        <Grid item className={Style.TextAudience}>{Text}</Grid>
        <Grid item className={Style.TimeAudienceMessage}>10:20 PM</Grid>
      </Grid>
    </Grid>
  );
}
