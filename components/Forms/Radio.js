import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../styles/Home.module.css";

// gm : files ↓
import CheckedBlueSvg from "../../public/images/icons/RadioChecked.svg";
import RadioDisabledSvg from "../../public/images/icons/RadioDisable.svg";
import CheckBlackSvg from "../../public/images/icons/CheckBlack.svg";
import CheckBlackDisableSvg from "../../public/images/icons/CheckDisable.svg";

// gm : components ↓

export default function Radio({first=true,setSelectedRadio, FirstText, SecondText, IsBlue = true }) {
  // gm : states ↓
  const [First, setFirst] = useState(first);

  // sa : handle radio change
  const handleRadioChange=(status)=>{
    setSelectedRadio(status)
  }
  // return icon check box
  const HandleIconFirst = () => {
    if (First) {
      if (IsBlue) {
        return CheckedBlueSvg.src;
      } else return CheckBlackSvg.src;
    } else {
      if (IsBlue) {
        return RadioDisabledSvg.src;
      } else return CheckBlackDisableSvg.src;
    }
  };

  const HandleIconSecond = () => {
    if (!First) {
      if (IsBlue) {
        return CheckedBlueSvg.src;
      } else return CheckBlackSvg.src;
    } else {
      if (IsBlue) {
        return RadioDisabledSvg.src;
      } else return CheckBlackDisableSvg.src;
    }
  };

  return (
    <Grid item>
      <Grid container direction="column">
        <Grid item onClick={() => {
          setFirst(true)
          handleRadioChange(1)
        } } className={Style.P_Radio}>
          <img src={HandleIconFirst()} />
          <span className={First ? Style.ActiveText : Style.DeActiveText}>
            {FirstText}
          </span>
        </Grid>
        <Grid item onClick={() => {
          setFirst(false)
          handleRadioChange(2)

        }} className={Style.P_Radio}>
          <img src={HandleIconSecond()} />
          <span className={!First ? Style.ActiveText : Style.DeActiveText}>
            {SecondText}
          </span>
        </Grid>
      </Grid>
    </Grid>
  );
}
