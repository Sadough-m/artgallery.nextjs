import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Grid, IconButton } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/artworkflow.module.css";
import CustomSelect from "../../../Forms/CustomSelect";

// gm : files ↓
import trashGraySvg from "../../../../public/images/icons/Trash gray.svg";

// gm : components ↓

export default function SelectList() {
  // gm : states ↓

  return (
    <Grid container justifyContent="space-between" alignItems="center" className={Style.p_AllSelects}>
      <Grid item className={Style.p_Selects}>
        <CustomSelect  placeHolder="Choose one" labelSpace={false}/>
      </Grid>
      <Grid item className={Style.p_Selects}>
        <CustomSelect label="" placeHolder="Choose one" labelSpace={false}/>
      </Grid>
      <Grid item className={Style.p_Selects}>
        <CustomSelect label="" placeHolder="Choose one" labelSpace={false}/>
      </Grid>
      <Grid item className={Style.p_trashIcon3}>
        <IconButton>
          <Image src={trashGraySvg} />
        </IconButton>
      </Grid>
    </Grid>
  );
}
