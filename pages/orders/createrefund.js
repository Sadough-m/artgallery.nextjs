import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid, Hidden, IconButton } from "@material-ui/core";
import HeaderLanding from "../../components/common/header";

// gm : styles ↓
import Style from "../../styles/Orders.module.css";

// gm : files ↓
import CloseSvg from "../../public/images/icons/Close dark.svg";
import CheckSvg from "../../public/images/icons/Check White.svg";
import ArrowLeft from "../../public/images/icons/Arrow left -.svg";

// gm : components ↓
import Summary from "../../components/Screens/Orders/Payment/Summary";
import PaymentTo from "../../components/Screens/Orders/Payment/PaymentTo";
import Artwork from "../../components/Screens/Orders/Payment/Artworks";
import PaymentMethod from "../../components/Screens/Orders/Payment/PaymentMethod";
import Note from "../../components/Screens/Orders/Main/Note";
import Payment from "../../components/Screens/Orders/Refund/Payment";
import ManualAmount from "../../components/Screens/Orders/Refund/ManualAmount";
import Reason from "../../components/Screens/Orders/Refund/Reason";

export default function CreateRefund() {
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
            Create refund
          </Grid>
        </Grid>

        {/* Middle */}
        <Grid item className={Style.Middle_Payment}>
          {/* Componensts */}
          <Payment />
          <ManualAmount />
          <Reason />
          <br />
          <br />
        </Grid>

        {/* Right Side */}
        <Grid item className={Style.RightSide_Payment}>
          <Grid item className={Style.Wrapper_Right}>
            <Hidden smDown>
              <Grid item className={Style.P_BtnRefund}>
                <Button
                  className={Style.DiscardButtonRefund}
                  startIcon={<img src={CloseSvg.src} />}
                >
                  Discard
                </Button>
                <Button
                  startIcon={<img src={CheckSvg.src} />}
                  color="primary"
                  variant="contained"
                  className={Style.CreateRefund}
                >
                  Create Refund
                </Button>
              </Grid>
            </Hidden>
            {/* Componensts */}
            <Hidden smDown>
              <Summary HaveItem={false} RefundBtn={true} />
            </Hidden>
          </Grid>
        </Grid>
      </Grid>
      {/* Componensts */}
      <Hidden mdUp>
        <Grid item style={{ marginTop: -16 }}>
          <Summary HaveItem={false} RefundBtn={true} />
        </Grid>
      </Hidden>
    </Grid>
  );
}
