import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Grid } from "@material-ui/core";
import CustomCheckBox from "../../../../Forms/CustomCheckBox";

// gm : styles ↓
import Style from "../../../../../styles/Orders.module.css";

// gm : files ↓

// gm : components ↓

export default function Package({ logo }) {
  // gm : states ↓
  const [Checked, setChecked] = useState(false);

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      className={Style.Method}
    >
      <Grid item>
        <CustomCheckBox
          label="Upto $1500 insured"
          fontWeight="500"
          checked={Checked}
          setChecked={setChecked}
        />
        <Grid item className={Style.CartNum_1}>
          $122.00
        </Grid>
      </Grid>
      <Grid item className={Style.p_LogoMethod}>
        <img src={logo.src} className={Style.LogoMethod} />
      </Grid>
    </Grid>
  );
}
