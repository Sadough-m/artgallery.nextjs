import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Exhibition.module.css";

// gm : files ↓

// gm : components ↓
import CustomSelect from "../../../Forms/CustomSelect";
import Location from "../../../Forms/Location";

export default function Info() {
  // gm : states ↓
  const [SelectedNote, setSelectedNote] = useState("Team");

  const HandleSelectedNote = (value) => {
    if (SelectedNote === value) {
      return true;
    } else return false;
  };

  return (
    <Grid item className={Style.Main_1}>
      <Grid item className={Style.TitleMain}>
        Info
      </Grid>
      <Grid container justifyContent="space-between" style={{marginTop:'-15px'}}>
        <Grid item className={Style.TwoForm}>
          <CustomSelect label="Exhibition type"/>
        </Grid>
        <Grid item className={Style.TwoForm}>
          <Location label="Location"/>
        </Grid>
      </Grid>
    </Grid>
  );
}
