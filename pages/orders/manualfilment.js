import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid, Hidden, IconButton } from "@material-ui/core";
import HeaderLanding from "../../components/common/header";

// gm : styles ↓
import Style from "../../styles/Orders.module.css";

// gm : files ↓
import CheckSvg from "../../public/images/icons/Check White.svg";
import ArrowLeft from "../../public/images/icons/Arrow left -.svg";

// gm : components ↓
import CloseSvg from "../../public/images/icons/Close dark.svg";
import Summary from "../../components/Screens/Orders/Payment/Summary";
import ShippingInfo from "../../components/Screens/Orders/Payment/ShippingInfo";
import Services from "../../components/Screens/Orders/Payment/Services";
import Packaging from "../../components/Screens/Orders/Payment/Packaging";
import ArtworksShipping from "../../components/Screens/Orders/ArtworkShipping";
import useWindowSize from "../../Hooks/useWindowSize";

export default function ManualFilment() {
  // gm : states ↓

  const [width, height] = useWindowSize()
  return (
    <Grid item>
      <Grid container className={Style.Xs_Mb}>
        {/* left side */}
        <Grid item className={Style.LeftSide__Payment}>
          <Grid container alignItems="center" justifyContent={width>960?"center":"space-between"}>
            <Grid item className={Style.TextCreatePay}>
              <Hidden mdUp>
                <IconButton>
                  <img src={ArrowLeft.src} />
                </IconButton>
              </Hidden>
              Manual fulfilment
            </Grid>
            <Hidden mdUp>
              <Grid item>
                <Button color="primary" variant="contained" className={Style.Confirm}>Confirm</Button>
              </Grid>
            </Hidden>
          </Grid>
          
        </Grid>

        {/* Middle */}
        <Grid item className={`${Style.Middle_Payment} ${Style.Order_Xs1}`}>
          {/* Componensts */}
          <Grid item className={Style.Mt_Xs}>
            <ArtworksShipping HaveTracking={true} />
          </Grid>
        </Grid>

        {/* Right Side */}
        <Grid item className={Style.RightSide_Payment_manual}>
          <Grid item className={Style.Wrapper_Right}>
            <Hidden smDown>
              <Button
                className={Style.DiscardButton_1}
                startIcon={<img src={CloseSvg.src} />}
              >
                Discard
              </Button>
              <Button
                className={Style.ConfirmBtn}
                startIcon={<img src={CheckSvg.src} />}
              >
                Confirm
              </Button>
            </Hidden>
            {/* Componensts */}
            <Hidden smDown>
              <Summary HaveItem={true} FulfillBtn={true} />
            </Hidden>
            <ShippingInfo HaveDate={false} />
          </Grid>
        </Grid>
      </Grid>
      <Hidden mdUp>
        <Summary HaveItem={true} FulfillBtn={true} />
      </Hidden>
    </Grid>
  );
}
