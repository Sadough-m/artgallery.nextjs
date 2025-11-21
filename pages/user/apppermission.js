import React, { useState } from "react";
import Image from "next/image";

// gm : material ui ↓
import { Hidden, Grid, Button, IconButton } from "@material-ui/core";

// gm : styles ↓
import Style from "../../styles/UserSettings.module.css";

// gm : files  ↓

// gm : components ↓
import HeaderApp from "../../components/Screens/UserSettings/Apps/HeaderApp";
import PermissionApp from "../../components/Screens/UserSettings/Apps/PermissionApp";
import InstallApp from "../../components/Screens/UserSettings/Apps/InstallApp";

// gm : Artist List ↓
export default function AppPermission() {
  // gm : states ↓

  return (
    <Grid item className={Style.BgPageApp}>
      {/* App Area */}
      <HeaderApp />
      <Grid container justifyContent="center">
        <Grid item className={Style.WrapperNewApp}>
          <Grid item className={Style.TextInstall}>
            You are installing <span className={Style.AppName}>“Slack”</span>
          </Grid>
          <Grid item className={Style.AboutAppText}>Slack will :</Grid>
          {/* Permission Apps */}
          <PermissionApp text="View Artor account data."/>
          <PermissionApp text="View Artwork data"/>
          <PermissionApp text="View other data"/>
          <PermissionApp text="View Artists"/>
          {/* Install App */}
          <InstallApp/>
        </Grid>
      </Grid>
    </Grid>
  );
}
