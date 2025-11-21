import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid, IconButton } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../styles/Dashboard.module.css";

// gm : files ↓
import closeIcon from "../../../public/images/icons/Close12.svg";
import arrowRight from "../../../public/images/icons/Arrow right black.svg";
import useWindowSize from "../../../Hooks/useWindowSize";

// gm : components ↓

export default function Post({ img, textButton, timeRead, haveImg = true }) {
  // gm : states ↓

  // recognize page size
  const [width, height] = useWindowSize()

  return (
    <Grid item className={Style.Wrapper_post}>
      <Grid container>
        {/* Image  */}
        {haveImg && width>960 && (
          <Grid item>
            <img src={img.src} className={Style.imgPost} />
          </Grid>
        )}

        {/* start text area */}
        <Grid item className={Style.wrapper_text_post}>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            className="posRel"
          >
            <Grid item style={{ fontWeight: "500" }}>
              How to start working?
            </Grid>
            <Grid item>
              <IconButton size="small">
                <Image src={closeIcon} />
              </IconButton>
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
              {haveImg &&  timeRead }
            </Grid>
            <Grid item>
              <Button
                endIcon={<Image src={arrowRight} />}
                className={Style.readPost}
              >
                {textButton}
              </Button>
            </Grid>
          </Grid>
        </Grid>
        {/* end text area */}
      </Grid>
    </Grid>
  );
}
