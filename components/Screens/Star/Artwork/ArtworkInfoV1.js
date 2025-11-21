import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Star.module.css";

// gm : files ↓
import ArtworkPng from "../../../../public/images/pic Modal artwork.png";
import Img1 from "../../../../public/images/img1.png";
import AvailableSvg from "../../../../public/images/icons/Available.svg";
import InfoSvg from "../../../../public/images/icons/Info gray.svg";

// gm : components ↓

export default function ArtworkInfoV1() {
  // gm : states ↓

  return (
    <Grid item className={Style.ArtworkInfo}>
      <Grid container justifyContent="center">
        {/* Left Side */}
        <Grid item className={Style.LeftSide}>
          <Grid item>
            <img src={ArtworkPng.src} className={Style.ImgArtwork} />
          </Grid>
          <Grid item>
            <Grid container >
              <Grid item>
                <img src={ArtworkPng.src} className={Style.TinyImg} />
              </Grid>
              <Grid item>
                <img src={ArtworkPng.src} className={Style.TinyImg} />
              </Grid>
              <Grid item>
                <img src={ArtworkPng.src} className={Style.TinyImg} />
              </Grid>
              <Grid item>
                <img src={ArtworkPng.src} className={Style.TinyImg} />
              </Grid>
              <Grid item>
                <img src={ArtworkPng.src} className={Style.TinyImg1} />
              </Grid>
              
            </Grid>
          </Grid>
          <Grid item className={Style.AvText}>
            <img src={AvailableSvg.src} className={Style.AvImage} />
            Available
          </Grid>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item className={Style.MnText}>
              <span className={Style.BadgeGreen}></span>
              Minted
            </Grid>
            <Grid item>
              <img src={InfoSvg.src} className={Style.InfoSvg} />
            </Grid>
          </Grid>
        </Grid>
        {/* Right Side */}
        <Grid item className={Style.RightSide}>
          <Grid container direction="column" alignItems="center">
            <Grid item className={Style.P_RightImg}>
              <img src={Img1.src} />
            </Grid>
            <Grid item className={Style.VerficationText}>
              Artwork verification
            </Grid>
            <Grid item className={Style.DummyText}>
              Lorem ipsum dolor sit amet, ctetur apiscing elit. Volutpat, arcu
              nec risus consequat urna nunc elit. Blandit sollicitudin non augue
              morbi.{" "}
            </Grid>
            <Grid item className={Style.P_StartVer}>
              <Button
                color="primary"
                variant="contained"
                className={Style.StartVerifing}
              >
                Start Verifying{" "}
              </Button>
            </Grid>
            <Grid item className={Style.P_CancelVer}>
              <Button
                className={Style.CancelVerifing}
              >
                Cancel{" "}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
