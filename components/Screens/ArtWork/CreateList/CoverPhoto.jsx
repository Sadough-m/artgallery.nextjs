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
import File from "../../../Forms/File";

export default function CoverPhoto() {
  // gm : states ↓

  return (
    <Grid item className={Style.wrapper_main}>
      <Grid item className={Style.title_main}>
        Cover photo
      </Grid>

      {/* forms */}
      <Grid item style={{ marginTop: "15px" }}>
        <File placeHolder="Import cover photo here" label="Cover photo" />
      </Grid>

      <Button
        startIcon={<Image src={circleIcon} />}
        className={Style.addNum}
        color="primary"
      >
        Add From URL
      </Button>
    </Grid>
  );
}
