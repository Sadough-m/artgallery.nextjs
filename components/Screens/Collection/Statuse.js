import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Grid, FormGroup, FormControlLabel, Switch } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

// gm : styles ↓
import ColStyle from "../../../styles/Collection.module.css";

// gm : files ↓

// gm : components ↓
import SwitchComponent from '../../common/SwitchComponent.jsx'


export default function Statuse({ haveLock, setSwitch, Switch }) {
  // gm : states ↓

  return (
    <Grid item className="posRel">
      <Grid container alignItems="center">
        <Grid item className="flex1">
          <Grid item className={ColStyle.statuseFont}>
            Status
          </Grid>
          <Grid item className={ColStyle.desk_statuse}>
            You’r Online, it mean is your artworks are show in markets
          </Grid>
        </Grid>
        <Grid item className={ColStyle.p_switch}>
          <SwitchComponent setSwitch={setSwitch} Switch={Switch} haveLock={haveLock} />
        </Grid>
      </Grid>
    </Grid>
  );
}
