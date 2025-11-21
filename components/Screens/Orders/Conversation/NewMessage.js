import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Orders.module.css";

// gm : files ↓
import NewMessageSvg from "../../../../public/images/icons/NewMessage.svg";

// gm : components ↓

export default function NewMessage() {
  // gm : states ↓

  return (
    <Grid item className={Style.NewMessage}>
      <Grid container alignItems="center">
        <Grid item className={Style.P_ImgNewMessage}>
          <img src={NewMessageSvg.src} className={Style.ImgNewMessage}/>
        </Grid>
        <Grid item>
          <Grid item className={Style.TextNewMessage}><span className="primary">1</span> New message from</Grid>
          <Grid item className={Style.MassagedName}>Esther Howard</Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
