import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/UserSettings.module.css";

// gm : files ↓
import HashtagPng from "../../../../public/images/AppsPic.png";

// gm : components ↓

export default function InstallApp() {
  // gm : states ↓

  return (
    <Grid item className={Style.InstallNewApp}>
      <Grid container alignItems="center" className={Style.TitleInstallApp}>
        <Grid item className={Style.P_ImgApp}>
          <Image src={HashtagPng} />
        </Grid>
        <Grid item>
          <Grid item className={Style.TextAppName}>
            Slack
          </Grid>
          <Grid item className={Style.TextAboutApp}>
            Slack is a digital workplace that connects you{" "}
          </Grid>
        </Grid>
      </Grid>
      <Grid item className={Style.CustomerData}>
        To erase customer data please disconnect the app and you request will be
        sent by 7 days. <span style={{ color: "#83909D" }}>Learn more</span>
      </Grid>
      <Grid
        container
        justifyContent="space-between"
        className={Style.P_InstallAppBtn}
      >
        <Grid item>
          <Button className={Style.DiscardBtn}>Discard</Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            className={Style.instalAppBtn}
          >
            Install App
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
