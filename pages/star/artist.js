import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Grid, Hidden } from "@material-ui/core";

// gm : styles ↓
import Style from "../../styles/Star.module.css";

// gm : files ↓

// gm : components ↓
import HeaderArtist from "../../components/Screens/Star/Artist/HeaderArtist";
import ArtistMenu from "../../components/Screens/Star/Artist/ArtistMenu/ArtistMenu";
import Report from "../../components/Screens/Star/Report";
import IdentityVerification from "../../components/Modals/Star/IdentityVerification";

export default function Artist() {
  // gm : states ↓

  return (
    <Grid item className={Style.ArtistPage}>
      <HeaderArtist />
      <ArtistMenu />
      <Hidden smDown>
        <Report />
      </Hidden>
      {/* <IdentityVerification open={true}/> */}
    </Grid>
  );
}
