import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Star.module.css";

// gm : files ↓
import CloseSvg from '../../../../public/images/icons/CloseGrayNew.svg'
import ArrowSvg from "../../../../public/images/icons/Arrow right white.svg";

// gm : components ↓
import Header from "../../../../components/Screens/Star/Setting/Header";
import Menu from "../../../../components/Screens/Star/Setting/Menu";
import Education from "../../../../components/Screens/Star/Setting/Main/Education";

export default function ConfirmCv() {
  // gm : states ↓

  return (
    <Grid item>
      <Header HaveProceed={false} />
      <Grid container className={Style.WrapperCommunity}>
        {/* Left Side */}
        <Grid item className={Style.LeftSide_Com}>
          <Menu />
        </Grid>
        {/* Right Side */}
        <Grid item className={Style.RightSide_Com}>
          <Grid item className={Style.AccountStatuse}>
            <Grid container>
              <Grid item>
                <img src={CloseSvg.src} />
              </Grid>
              <Grid item className={Style.RightChoose}>
                <Grid item className="fw_500">
                Don’t recognize any of these Information ?
                </Grid>
                <Grid item className={Style.TextTranfer}>
                  Please choose and press not recognized. Please be certain,
                  since in some cases we have to burn tokens of minted works.
                </Grid>
                <Button
                  color="secondary"
                  variant="contained"
                  className={Style.AccountBtn}
                  endIcon={<img src={ArrowSvg.src} />}
                >
                  Procced to your Artworks
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={Style.P_Main}>
            <Education/>
          </Grid>
        </Grid>
      </Grid>
      {/* <TransferCollection open={true}/> */}
    </Grid>
  );
}
