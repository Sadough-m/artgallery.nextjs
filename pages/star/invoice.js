import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Grid, Hidden } from "@material-ui/core";

// gm : styles ↓
import Style from "../../styles/Star.module.css";

// gm : files ↓

// gm : components ↓
import Header from "../../components/Screens/Star/Artwork/Header";
import RegisterAccount from "../../components/Screens/Star/Invoice/RegisterAccount";
import MakePayment from "../../components/Screens/Star/Invoice/MakePayment";
import Artworks from "../../components/Screens/Star/Invoice/Artworks/Artworks";
import TimeLine from "../../components/Screens/Star/Invoice/TimeLine";
import Reject from "../../components/Modals/Star/Reject";
import MakePayement from "../../components/Modals/Star/MakePayement";

export default function Artwork() {
  // gm : states ↓

  return (
    <Grid item className={Style.Artwork}>
      <Header />
      <Grid item className={Style.Body}>
        <RegisterAccount />
        <MakePayment/>
        <Artworks/>
        <TimeLine/>
      </Grid>

      {/* <Reject open={true}/> */}
      {/* <MakePayement open={true}/> */}
    </Grid>
  );
}
