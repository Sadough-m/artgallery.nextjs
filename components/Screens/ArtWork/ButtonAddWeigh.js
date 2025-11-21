import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// good man : material ui ↓
import { Button, Grid } from "@material-ui/core";

// good man : styles ↓
import ArtWorkStyle from "../../../styles/artworkflow.module.css";

// good man : files ↓
import remove from "../../../public/images/icons/Remove.svg";
import addIcon from "../../../public/images/icons/Plus - Circle.svg";
import addGray from "../../../public/images/icons/Plus - Circle gray.svg";

// good man : components ↓

export default function ButtonAddWeigh({ disabled, handleAdd, addWeight }) {
  // good man : states ↓

  return (
    <Grid item className={`${ArtWorkStyle.w_100}`}>
      <Button
        startIcon={
          <Image src={disabled ? addGray : addWeight ? remove : addIcon} />
        }
        variant="text"
        color="primary"
        className={ArtWorkStyle.ml_6}
        onClick={handleAdd}
        disabled={disabled}
      >
        {addWeight ? "Remove Weigh" : "Add Weigh"}
      </Button>
    </Grid>
  );
}
