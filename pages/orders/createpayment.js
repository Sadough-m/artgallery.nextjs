import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid, Hidden, IconButton } from "@material-ui/core";
import HeaderLanding from "../../components/common/header";

// gm : styles ↓
import Style from "../../styles/Orders.module.css";

// gm : files ↓
import CloseSvg from "../../public/images/icons/Close dark.svg";
import ArrowLeft from "../../public/images/icons/Arrow left -.svg";

// gm : components ↓
import Summary from "../../components/Screens/Orders/Payment/Summary";
import PaymentTo from "../../components/Screens/Orders/Payment/PaymentTo";
import Artwork from "../../components/Screens/Orders/Payment/Artworks";
import PaymentMethod from "../../components/Screens/Orders/Payment/PaymentMethod";
import Note from "../../components/Screens/Orders/Main/Note";

export default function CreatePayment() {
  // gm : states ↓

  return (
    <Grid item>
      <Grid container>
        {/* left side */}
        <Grid item className={Style.LeftSide__Payment}>
          <Grid item className={Style.TextCreatePay}>
            <Hidden mdUp>
              <IconButton>
                <img src={ArrowLeft.src} />
              </IconButton>
            </Hidden>
            Create payment
          </Grid>
        </Grid>

        {/* Middle */}
        <Grid item className={Style.Middle_Payment}>
          {/* Componensts */}
          <Artwork />
          <Note />
          <PaymentMethod />

          <br />
          <br />
        </Grid>

        {/* Right Side */}
        <Grid item className={Style.RightSide_Payment}>
          <Grid item className={Style.Wrapper_Right}>
            <Hidden smDown>
              <Button
                className={Style.DiscardButton}
                startIcon={<img src={CloseSvg.src} />}
              >
                Discard
              </Button>
            </Hidden>
            {/* Componensts */}
            <Hidden smDown>
              <Summary />
            </Hidden>
            <PaymentTo />
          </Grid>
        </Grid>
      </Grid>
      {/* Componensts */}
      <Hidden mdUp>
        <Summary />
      </Hidden>
    </Grid>
  );
}
