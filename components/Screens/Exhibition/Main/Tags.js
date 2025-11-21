import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Orders.module.css";

// gm : files ↓
import InputForm from "../../../Forms/InputForm";

// gm : components ↓

export default function Tags() {
  // gm : states ↓

  return (
    <Grid item className={Style.Main_1}>
      <Grid item className={Style.TitleMain}>
      Tags
      </Grid>
      <InputForm label="Tags" placeHolder="Enter value and press “Enter”"/>
    </Grid>
  );
}
