import React, { useState, useEffect, useContext } from "react";

// gm : material ui ↓
import { Hidden, Grid, Button } from "@material-ui/core";

// gm : styles ↓
import Style from "../../styles/UserSettings.module.css";

// gm : files  ↓

// gm : components ↓
import Header from "../../components/common/header";
import NavSettings from "../../components/Screens/UserSettings/NavSettings";
import Menu from "../../components/Screens/UserSettings/Menu";
import MessaginTemplate from "../../components/Screens/UserSettings/MessagingTemplate";

// gm : Artist List ↓
export default function MessagingTemplates() {
  // gm : states ↓

  return (
    <Grid item>

      {/* NavBar Settings */}
      <NavSettings />

      <Grid
        container
        direction="row"
        justifyContent="center"
        className={Style.margin1}
      >
        {/* left side */}
        <Grid item className={Style.leftSide}>
          <Menu SelectedPage="Messaging Template" />
        </Grid>

        {/* right side */}
        <Grid item className={Style.rightSide}>
          <Grid item className={Style.wrapper_right}>
            {/* Forms */}
            <Grid item className={Style.mtn5}>
              <MessaginTemplate />
            </Grid>
            <br />
            <br />
            <br />

            {/*End Forms */}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
