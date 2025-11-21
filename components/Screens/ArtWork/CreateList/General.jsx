import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/artworkflow.module.css";

// gm : files ↓
import circleIcon from "../../../../public/images/icons/Plus - Circle.svg";

// gm : components ↓
import InputForm from "../../../Forms/InputForm";
import CustomSelect from "../../../Forms/CustomSelect";

export default function General() {
  // gm : states ↓

  return (
    <Grid item className={Style.wrapper_main}>
      <Grid item className={Style.title_main}>
        General
      </Grid>

      {/* forms */}
      <Grid container justifyContent="space-between">
        <Grid item className={Style.TwoInput}>
          <InputForm type="text" placeHolder="Enter title" label="Title" />
        </Grid>
        <Grid item className={Style.TwoInput}>
          <CustomSelect placeHolder="Choose one" label="List type" />
        </Grid>
      </Grid>

      <Button
        startIcon={<Image src={circleIcon} />}
        className={Style.addNum}
        color="primary"
      >
        Add Description
      </Button>
    </Grid>
  );
}
