import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Star.module.css";

// gm : files ↓

// gm : components ↓
import Header from "../../../../components/Screens/Star/Setting/Header";
import Menu from "../../../../components/Screens/Star/Setting/Menu";
import Creator from "../../../../components/Screens/Star/Setting/Creator";
import ContactInfo from "../../../../components/Screens/Star/Setting/ContactInfo";

export default function Verify() {
  // gm : states ↓

  return (
    <Grid item>
      <Header HaveProceed={false} />
      <Grid container className={Style.WrapperCommunity}>
        {/* Left Side */}
        <Grid item className={Style.LeftSide_Com}>
          <Menu />
        </Grid>
        {/* Right Side */}
        <Grid item className={Style.RightSide_Com}>
          <Grid item className="fw_500">
            Account verification
          </Grid>
          <Grid item className={Style.P_Creator}>
            <Creator />
            <ContactInfo/>
          </Grid>
        </Grid>
      </Grid>
      {/* <TransferCollection open={true}/> */}
    </Grid>
  );
}
