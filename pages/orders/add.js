import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid, Hidden, IconButton } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";

// gm : styles ↓
import Style from "../../styles/Orders.module.css";

// gm : files ↓
import CloseIcon from "../../public/images/icons/Close icon.svg";
import arrowLeft from "../../public/images/icons/Arrow left -.svg";

// gm : components ↓
import HeaderLanding from "../../components/common/header";
import PaymentStatuse from "../../components/Screens/Orders/Main/PaymentStatuse";
import Note from "../../components/Screens/Orders/Main/Note";
import Tags from "../../components/Screens/Orders/Main/Tags";
import SellTo from "../../components/Screens/Orders/Main/SellTo";
import Artworks from "../../components/Screens/Orders/Main/Artworks/Artworks";

export default function Add() {
  // gm : states ↓

  return (
    <Grid item>
     

      {/* mobile navbar */}
      <Hidden mdUp>
        <Grid
          container
          justifyContent="space-between"
          alignItems='center'
          className={Style.mobileNav}
        >
          <Grid item className={Style.textAdd}>
            <IconButton size="small" className={Style.iconBtn}>
              <img src={arrowLeft.src} />
            </IconButton>
            Add draft order
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" className={Style.addBtn}>
              Add Draft Order
            </Button>
          </Grid>
        </Grid>
      </Hidden>

      {/* start add contact */}
      <Grid
        container
        justifyContent="space-between"
        className={Style.wrapper_add}
      >
        {/* left side */}
        <Hidden smDown>
          <Grid item className={Style.leftSide_Add}>
            Add draft order
          </Grid>
        </Hidden>

        {/* Main */}
        <Grid item className={Style.Middle_Add}>
          <PaymentStatuse/>
          <SellTo/>
          <Artworks/>
          <Note/>
          <Tags/>
        </Grid>

        {/* right side */}
        <Hidden smDown>
          <Grid item className={Style.rightSide_Add}>
            <Grid item className={Style.p_buttons}>
              <Button
                startIcon={<img src={CloseIcon.src} />}
                className={Style.discardBtn}
              >
                Discard
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<CheckIcon />}
                className={Style.addContact}
              >
                Add Draft Order
              </Button>
            </Grid>
          </Grid>
        </Hidden>
      </Grid>

    </Grid>
  );
}
