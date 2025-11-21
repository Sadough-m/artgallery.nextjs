import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Star.module.css";

// gm : files ↓
import GoldStarSvg from "../../../../public/images/icons/GoldStar.svg";

// gm : components ↓

export default function RegisterAccount() {
  // gm : states ↓

  return (
    <Grid item className={Style.Main}>
      <Grid container>
        <Grid item>
          <img src={GoldStarSvg.src} />
        </Grid>
        <Grid item className={Style.RegisterRightSide}>
          <Grid item className={Style.HaveAccount}>
            Have an account ?{" "}
          </Grid>
          <Grid item className={Style.SignInText}>
            <span className={Style.DarkText}>Sign in</span> to access the offer
            and manage the transfer on your dashboard. If, not{" "}
            <span className="link">register</span> to{" "}
            <span className={Style.DarkText}>
              <span className={Style.UnderLine}>manage,</span>{" "}
              <span className={Style.UnderLine}>mint,</span>{" "}
              <span className={Style.UnderLine}>sell,</span>{" "}
              <span className={Style.UnderLine}>consign</span> any creation you
              have for free.{" "}
            </span>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
