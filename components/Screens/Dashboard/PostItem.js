import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid, Hidden, IconButton } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../styles/Dashboard.module.css";

// gm : files ↓
import arrowDown from "../../../public/images/icons/Arrow down.svg";
import checkLight from "../../../public/images/icons/Check - Circle light.svg";
import questionIcon from "../../../public/images/icons/question-circle.svg";
import { FlashOnRounded } from "@material-ui/icons";
import closeIcon from "../../../public/images/icons/Close12.svg";
import arrowRight from "../../../public/images/icons/Arrow right black.svg";

// gm : components ↓

// !!! note !!! : default open is just for test, u can delete it
export default function PostItem() {
  // gm : states ↓

  return (
    <Grid item>
      <Grid item className={Style.itemSec}>
        <img src={checkLight.src} className={Style.fitSvg} />
        I’m first
      </Grid>

      {/* area just for mobile */}
      <Hidden mdUp>
        <Grid item className={Style.wrapper_text_post_drp}>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            className="posRel"
          >
            <Grid item style={{ fontWeight: "500" }}>
              How to start working?
            </Grid>

            <span className={Style.underLine}></span>
          </Grid>

          <Grid item className={Style.post_desk}>
            Lorem ipsum dolor sit amet, conse tetur apiscing elit. Volt, arcu
            nec risus conseq at urna nunc.
          </Grid>

          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            className={Style.post_tx_btn}
          >
            <Grid item className={Style.post_timeRead}>
              02:30
            </Grid>
            <Grid item>
              <Button
                endIcon={<Image src={arrowRight} />}
                className={Style.readPost}
              >
                Read Post
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Hidden>
      
      <Grid item className={Style.itemSec}>
        <img src={questionIcon.src} className={Style.fitSvg} />
        I’m second
      </Grid>
      <Grid item className={Style.itemSec}>
        <img src={questionIcon.src} className={Style.fitSvg} />
        I’m third
      </Grid>
    </Grid>
  );
}
