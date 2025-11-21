import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Grid } from "@material-ui/core";

// gm : styles ↓
import ColStyle from "../../../../styles/Collection.module.css";

// gm : files ↓

// gm : components ↓

export default function OptionCollabrator({ img, SelectID, title, Selected, setSelected }) {
  // gm : states ↓

  // select and de-select option
  const handleSelect = (ID) => {
    if (Selected?.filter((item) => item === ID)?.length >= 1) {
      setSelected(Selected?.filter((item) => item !== ID));
    } else {
      setSelected((prev) => [...prev, ID]);
    }
  };

  // return style Options
  const handleStyleOption = () => {
    if (Selected?.filter((item) => item === SelectID)?.length >= 1) {
      return ColStyle.optionCol_select;
    } else {
      return ColStyle.optionCol;
    }
  };

  return (
    <Grid item className={handleStyleOption()} onClick={() => handleSelect(SelectID)}>
      <Grid container align="center" direction="column">
        <Grid item className={Selected?.filter((item) => item === SelectID)?.length >= 1 ? ColStyle.imgBlack : ""}>
          <img src={img.src} />
        </Grid>
        <Grid
          item
          className={ColStyle.titleCollab_op}
          style={{ color: Selected?.filter((item) => item === SelectID)?.length >= 1 ? "#242328" : "#83909D" }}
        >
          {title}
        </Grid>
      </Grid>
    </Grid>
  );
}
