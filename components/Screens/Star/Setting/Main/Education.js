import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../../styles/Star.module.css";
import EducationSection from "./Sections/EducationSection";

// gm : files ↓

// gm : components ↓

export default function Education() {
  // gm : states ↓

  return (
    <Grid item className={Style.Main}>
      <Grid item className={Style.TitleMainCV}>
        Education
      </Grid>
      <EducationSection />
    </Grid>
  );
}
