import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid, Hidden, IconButton } from "@material-ui/core";
import HeaderLanding from "../../components/common/header";

// gm : styles ↓
import Style from "../../styles/Orders.module.css";

// gm : files ↓
import ArrowLeft from "../../public/images/icons/Arrow left -.svg";
import CloseSvg from "../../public/images/icons/Close dark.svg";

// gm : components ↓
import Summary from "../../components/Screens/Orders/Payment/Summary";
import ShippingInfo from "../../components/Screens/Orders/Payment/ShippingInfo";
import Services from "../../components/Screens/Orders/Payment/Services";
import Packaging from "../../components/Screens/Orders/Payment/Packaging";
import ArtworksShipping from "../../components/Screens/Orders/ArtworkShipping";

export default function CreateShippingLabel() {
  // gm : states ↓

  return (
    <Grid item>
      <Hidden smDown>
        <HeaderLanding />
      </Hidden>
      <Grid container>
        {/* left side */}
        <Grid item className={Style.LeftSide__Payment}>
          <Grid item className={Style.TextCreatePay}>
            <Hidden mdUp>
              <IconButton>
                <img src={ArrowLeft.src} />
              </IconButton>
            </Hidden>
            Create a label
          </Grid>
        </Grid>

        {/* Middle */}
        <Grid item className={`${Style.Middle_Payment} ${Style.Order_Xs1}`} >
          {/* Componensts */}
          <Grid item className={Style.Xs_Mt}>
            <ArtworksShipping HaveTracking={false}/>
            <Packaging />
            <Services />           
          </Grid>
        </Grid>

        {/* Right Side */}
        <Grid item className={Style.RightSide_Payment_Shipping}>
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
              <Summary HaveItem={true} />
            </Hidden>
            <ShippingInfo />
          </Grid>
        </Grid>
      </Grid>
      <Hidden mdUp>
        <Summary HaveItem={true} />
      </Hidden>
    </Grid>
  );
}
