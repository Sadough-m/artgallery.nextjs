import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import styles from "../../styles/Home.module.css";
import checked_pic from "../../public/images/icons/checked.svg";
import Image from "next/image";
import NotCheckedSvg from "../../public/images/icons/NotChecked.svg";
import CheckedSvg from "../../public/images/icons/CheckedBlue.svg";


export default function CustomCheckBox({
  disabled,
  label,
  checked,
  setChecked,
  onChange,
  color = "#242328",
  children,
  fontWeight = '400',
  PaddingLabel = 10
}) {
  const handleChecked = () => {
    if (!disabled) {
      setChecked(!checked);
    }
  };
  return (
    <Grid
      item
      onClick={() => { handleChecked(); onChange ? onChange() : "" }}
      className={styles.checkBox_dispaly}
    >
      <Grid
        container
        alignItems="center"
        className={styles.p_ch}
        style={{ flexWrap: "nowrap" }}
      >
       
          
       <img src={checked?CheckedSvg.src:NotCheckedSvg.src} className={styles.Checkbox}/>
        <Grid item className={styles.text_checkBox} style={{ color: color, fontWeight: fontWeight, paddingLeft:PaddingLabel }}>
          {label}
          {children}
        </Grid>
      </Grid>
    </Grid>
  );
}
{/* */}