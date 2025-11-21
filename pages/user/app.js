import React, { useState } from "react";
import Image from "next/image";

// gm : material ui ↓
import { Hidden, Grid, Button, IconButton } from "@material-ui/core";

// gm : styles ↓
import Style from "../../styles/UserSettings.module.css";

// gm : files  ↓
import ArrowLeftSvg from "../../public/images/icons/Arrow left -.svg";
import HashtagSvg from "../../public/images/BigHashtag.png";
import SlackPic from "../../public/images/SlackPic.png";

// gm : components ↓
import App from "../../components/Screens/UserSettings/Apps/App";
import HeaderApp from "../../components/Screens/UserSettings/Apps/HeaderApp";

// gm : Artist List ↓
export default function AppPage() {
  // gm : states ↓

  return (
    <Grid item className={Style.BgPageApp}>
      {/* App Area */}
      <Grid item className={Style.p_Slack}>
        <HeaderApp/>

        <Grid
          container
          justifyContent="center"
          className={Style.AboutSlack}
          direction="column"
          alignItems="center"
        >
          <Grid item>
            <Grid item>
              <img src={HashtagSvg.src} />
            </Grid>
          </Grid>
          <Grid item className={Style.titleSlack}>
            Slack
          </Grid>
          <Grid item className={Style.DeskSlack}>
            Slack is a digital workplace that connects you
          </Grid>
        </Grid>
      </Grid>
      {/* install app */}
      <Grid container justifyContent="center" className={Style.P_InstallApp}>
        <Grid item className={Style.InstallApp}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Grid item className={Style.TrialText}>
                Free plan available, 7 days free trial
              </Grid>
              <Grid item className={Style.Link}>
                Plans
              </Grid>
            </Grid>
            <Grid item className={Style.P_BtnInstall}>
              <Button
                variant="contained"
                color="primary"
                className={Style.BtnInstall}
              >
                Instal App
              </Button>
            </Grid>
          </Grid>
          <img src={SlackPic.src} className={Style.ImgSlack} />
        </Grid>
      </Grid>
      {/* Similar Apps */}
      <Grid item className={Style.p_sililarApp}>
        <Grid item className={Style.TextSimilarApps}>
          Similar apps
        </Grid>
        <Grid container>
          <App />
          <App />
          <App />
          <App />
        </Grid>
      </Grid>
    </Grid>
  );
}
