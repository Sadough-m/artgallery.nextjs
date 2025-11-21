import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../styles/UserSettings.module.css";

// gm : files ↓
import checkSvg from "../../../public/images/icons/Check - Circle.svg";
import instagramSvg from "../../../public/images/icons/instagram white.svg";
import instagramVerifiedSvg from "../../../public/images/icons/instagram verified.svg";

// gm : components ↓

export default function PublishCv() {
  // gm : states ↓

  return (
    <Grid item className={Style.p_PublishCV}>
      <Grid item className={Style.PublishCV}>
        Publish Creator CV
      </Grid>
      <Grid container justifyContent="space-between" alignItems="center" className={Style.margin10}>
        {/* <Grid item className={Style.text6}>
          To apply, Edit & Publish your Creator CV, you have verifyYour identity verification is handled by <a className="link">Echo</a>
        </Grid>
        <Grid item >
          <Grid item >
            <Button

              color="secondary"
              variant="contained"
              className={Style.button3}
              startIcon={<Image src={checkSvg} />}
            >
              Verify Account
            </Button>
          </Grid>
          <Grid item >
            <Button
              color="secondary"
              variant="contained"
              className={Style.button3}
              startIcon={<Image src={instagramSvg} />}
            >
              Verify Instagram
            </Button>
          </Grid>
        </Grid> */}
      </Grid>
    </Grid>
  );
}
