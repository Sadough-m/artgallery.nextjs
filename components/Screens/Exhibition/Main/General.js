import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Exhibition.module.css";

// gm : files ↓
import PlusCircleSvg from '../../../../public/images/icons/Plus - Circle.svg'

// gm : components ↓
import InputForm from "../../../Forms/InputForm";
import Date from "../../../Forms/Date";

export default function General() {
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
        General
      </Grid>
      <InputForm label="Title" placeHolder="Enter exhibition title" />
      <Grid container justifyContent="space-between">
        <Grid item className={Style.TwoForm}>
          <Date label="Start date"/>
        </Grid>
        <Grid item className={Style.TwoForm}>
          <Date label="End date"/>
        </Grid>
      </Grid>
      <Button color="primary" startIcon={<img src={PlusCircleSvg.src}/>} className={Style.fitBtn}>Add Description</Button>
    </Grid>
  );
}
