import React, { useState } from "react";

// gm : material ui ↓
import { Hidden, Grid, Button } from "@material-ui/core";

// gm : styles ↓
import Style from "../../styles/UserSettings.module.css";

// gm : files  ↓

// gm : components ↓
import Header from "../../components/Screens/UserSettings/Apps/Header";
import App from "../../components/Screens/UserSettings/Apps/App";

// gm : Artist List ↓
export default function AppsList() {
  // gm : states ↓

  return (
    <Grid item className={Style.BgPage}>
      {/* Header  */}

      {/* Body  */}
      <Grid item className={Style.bodyApps}>
        {/* Your apps */}
        <Grid item>
          <Grid item className={Style.TextYourApps}>
            Your apps
          </Grid>
          <Grid container className={Style.P_MyApps}>
            <App Connected={true} />
            <App Connected={true} />
            <App Connected={true} />
            <App Connected={true} />
          </Grid>

          {/* New apps */}
          <Grid item className={Style.NewApps}>
            <Grid item className={Style.textDiscover}>
              Discover new apps
            </Grid>
            <Grid container>
              <App />
              <App />
              <App />
              <App />
              <App />
              <App />
              <App />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
