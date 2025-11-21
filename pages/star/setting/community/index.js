import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Star.module.css";

// gm : files ↓

// gm : components ↓
import Header from "../../../../components/Screens/Star/Setting/Header";
import ChooseCollection from "../../../../components/Screens/Star/Setting/ChooseCollection";
import Table from "../../../../components/Screens/Star/Setting/Table";
import TransferCollection from "../../../../components/Modals/Star/TransferCollection";

export default function Community() {
  // gm : states ↓

  return (
    <Grid item>
      <Header />
      <Grid item className={Style.WrapperSetting}>
        <ChooseCollection />
        <Table/>
      </Grid>
      {/* <TransferCollection open={true}/> */}
    </Grid>
  );
}
