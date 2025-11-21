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
import Verifying from "../../../../components/Screens/Star/Setting/AccountStatuse/Verifying";
import Pending from "../../../../components/Screens/Star/Setting/AccountStatuse/Pending";
import Verified from "../../../../components/Screens/Star/Setting/AccountStatuse/Verified";

export default function Statuse() {
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
          <Verifying />
          <Grid item className={Style.SpaceAccounts}>
            <Pending />
          </Grid>
          <Grid item className={Style.SpaceAccounts}>
            <Verified />
          </Grid>
        </Grid>
      </Grid>
      {/* <TransferCollection open={true}/> */}
    </Grid>
  );
}
