import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Orders.module.css";

// gm : files ↓
import PlusCircleSvg from "../../../../public/images/icons/Plus - Circle.svg";

// gm : components ↓
import Table from "./Table";
import InputForm from "../../../Forms/InputForm";
import TextArea from "../../../Forms/TextArea";

export default function Reason() {
  // gm : states ↓

  return (
    <Grid item className={Style.NewMain} style={{paddingBottom:10}}>
      <Grid item className={Style.MainTitle}>
      Reason
      </Grid>
      <TextArea label="Reason" placeHolder="Write your reason text here"/>
    </Grid>
  );
}
