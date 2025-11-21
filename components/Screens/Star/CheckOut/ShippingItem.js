import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Grid } from "@material-ui/core";
import CustomCheckBox from "../../../Forms/CustomCheckBox";

// gm : styles ↓
import Style from "../../../../styles/Star.module.css";

// gm : files ↓
import TestImg from "../../../../public/images/Visa.png";

// gm : components ↓

export default function ShippingItem() {
  // gm : states ↓
  const [Checked, setChecked] = useState(false);

  return (
    <Grid item className={Style.ShippingItem}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Grid container alignItems="center">
            <Grid item>
              <CustomCheckBox
                checked={Checked}
                setChecked={setChecked}
                label="Upto $1500 insured"
                fontWeight="500"
                PaddingLabel={22}
              />
            </Grid>
            <Grid item className={Style.PriceShipping}>$122.00</Grid>
          </Grid>
        </Grid>
        <Grid item>
            <img src={TestImg.src} className={Style.ImhShip}/>
        </Grid>
      </Grid>
    </Grid>
  );
}
