import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../styles/artworkflow.module.css";

// gm : files ↓

// gm : components ↓
import useWindowSize from "../../../Hooks/useWindowSize";

export default function PuttingItem({ Data }) {
  // gm : states ↓

  // def variables
  var TopDef = 20;
  var LeftDef = 0;

  // break point (num of items in a row)
  var IncreaseBreakPoint = 5;
  var BreakPoint = 5;

  // space
  var Y_Space = 230;
  var X_Space = 235;

  // Top Position
  const Top = (index) => {
    if (index / BreakPoint > 1) {
      BreakPoint += IncreaseBreakPoint;
      TopDef += Y_Space;
      LeftDef = 0;
    }
    return `${TopDef}px`;
  };

  // Left Position
  const Left = (index) => {
    const Temp = LeftDef;
    LeftDef += X_Space;
    return `${Temp}px`;
  };


  // set number of artworks in a row
  const SetBreakPoint = () => {
    if (width > 1900) {
        BreakPoint = 7;
      } 
    else if (width > 1700) {
        BreakPoint = 6;
      } 
    else if (width > 1500) {
      BreakPoint = 5;
    } else if (width > 1200) {
      BreakPoint = 4;
    }
    else if( width <= 1200 && width > 960){
        BreakPoint = 3;
    }
    IncreaseBreakPoint = BreakPoint;
  };
  const [width, height] = useWindowSize();


  return (
    <Grid item>
      {SetBreakPoint()}
      {Data.map((item, index) => (
        <Grid
          item
          className={Style.BoxTest}
          style={{ top: Top(index + 1), left: Left(index) }}
        ></Grid>
      ))}
    </Grid>
  );
}
