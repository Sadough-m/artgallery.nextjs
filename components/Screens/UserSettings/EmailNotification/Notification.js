import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/UserSettings.module.css";
import SwitchComponent from "../../../common/SwitchComponent";

// gm : files ↓

// gm : components ↓

export default function Notification({ EmailNotification, setEmailNotification }) {
  // gm : states ↓

  return (
    <Grid item className={Style.Notification}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Grid item className={Style.titleNotification}>
            Subtitle
          </Grid>
          <Grid item className={Style.deskNotification}>
            Receive messages from our platform
          </Grid>
        </Grid>
        <Grid item className={Style.p_switch}>
          <SwitchComponent
            Switch={EmailNotification}
            setSwitch={setEmailNotification}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
