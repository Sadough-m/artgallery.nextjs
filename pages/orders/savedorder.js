import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Grid, Hidden, IconButton } from "@material-ui/core";
import HeaderLanding from "../../components/common/header";

// gm : styles ↓
import Style from "../../styles/Orders.module.css";

// gm : files ↓

// gm : components ↓
import Tags from "../../components/Screens/Orders/Saved/Tags";
import Icons from "../../components/Screens/Orders/Saved/Icons";
import PaymentStatuse from "../../components/Screens/Orders/PaymentStatuse";
import Artworks from "../../components/Screens/Orders/Saved/Artworks";
import Note from "../../components/Screens/Orders/Saved/Note";
import Profile from "../../components/Screens/Orders/Saved/Profile/Profile";
import NavBarMobile from "../../components/Screens/Orders/common/NavBarMobile";

export default function SavedOrder() {
  // gm : states ↓

  return (
    <Grid item>
      
      <Grid container justifyContent="center" className={Style.wrapper_saved}>
        {/* left side */}
        <Grid item className={Style.LeftSide_saved}>
          <NavBarMobile title="order #001" />

          {/* components */}
          <Grid item >
            <Hidden smDown>
              <PaymentStatuse/>
            </Hidden>
            <Artworks/>
            <Hidden mdUp>
              <Tags />
            </Hidden>
            <Note />
          </Grid>

        </Grid>

        {/* right side */}
        <Grid item className={Style.RightSide_saved}>
          <Grid item className={Style.C_RightSide_saved}>
            <Hidden mdUp>
              <PaymentStatuse/>
            </Hidden>
            <Hidden smDown>
              <Icons />
            </Hidden>
            <Profile/>
            <Hidden smDown>
              <Tags />
            </Hidden>
           
          </Grid>
        </Grid>
      </Grid>
      
    </Grid>
  );
}
