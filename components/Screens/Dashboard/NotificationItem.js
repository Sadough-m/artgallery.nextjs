import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Grid, IconButton } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../styles/Dashboard.module.css";

// gm : files ↓
import CloseSvg from "../../../public/images/icons/Close1.svg";

// gm : components ↓

export default function NotificationItem({ title, date }) {
  // gm : states ↓

  return (
    <Grid item className={Style.Ntf_Single}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item className={Style.TitleNotification}>
          {title}
        </Grid>
        <Grid item className={Style.DateNotification}>
          <span className={Style.DateText}>{date}</span>
          <IconButton className={Style.BtnCloseNtf} size="small">
            <img src={CloseSvg.src} />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
}
