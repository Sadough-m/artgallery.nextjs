import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Grid, Hidden } from "@material-ui/core";

// gm : styles ↓
import Style from "../../styles/Star.module.css";

// gm : files ↓

// gm : components ↓
import Header from "../../components/Screens/Star/Artwork/Header";
import ArtworkInfoV1 from "../../components/Screens/Star/Artwork/ArtworkInfoV1";
import ArtworkInfoV2 from "../../components/Screens/Star/Artwork/ArtworkInfoV2";
import Report from "../../components/Screens/Star/Report";
import Proof from "../../components/Modals/Star/Proof";
import Transfer from "../../components/Modals/Star/Transfer";
import ArtworkReport from "../../components/Modals/Star/ArtworkReport";
import ArtistReport from "../../components/Modals/Star/ArtistReport";

export default function Artwork() {
  // gm : states ↓

  return (
    <Grid item className={Style.Artwork}>
      <Header />
      <Grid item className={Style.P_ArtworkInfo}>
        {/* <ArtworkInfoV1/> */}
        <ArtworkInfoV2 HaveLimitted={true}/>
      </Grid>
      <Hidden smDown>
        <Report/>
      </Hidden>
      {/* <Proof open={true}/>
      <Transfer open={true}/>
      <ArtworkReport open={true}/> */}
      {/* <ArtistReport open={true}/> */}
    </Grid>
  );
}
