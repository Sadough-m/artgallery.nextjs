import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid, Hidden, IconButton } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../styles/Dashboard.module.css";

// gm : files ↓
import closeIcon from "../../../public/images/icons/Close12.svg";
import questionIcon from "../../../public/images/icons/question-circle.svg";
import postPic1 from "../../../public/images/post pic 1.png";
import arrowRight from "../../../public/images/icons/Arrow right white.svg";

// gm : components ↓
import DropDownSection from "./DropDownSection";

export default function WidePost() {
  // gm : states ↓

  return (
    <Grid item className={Style.wrapper_WidePost}>
      <Grid container>
        {/* start left side */}
        <Grid item className={Style.wrapper_whiteArea}>
          <DropDownSection defaultOpen={true} />
          <DropDownSection />
          <DropDownSection />
        </Grid>
        {/* emd left side */}

        {/* right side */}
        <Hidden smDown>
          <Grid item className={Style.wrapper_right_post}>
            <Grid item className={Style.closeButton}>
              <IconButton>
                <img src={closeIcon.src} />
              </IconButton>
            </Grid>

            <Grid item className={Style.wrapper_imgPost}>
              <Grid container alignItems="center">
                <Grid item>
                  <Grid container>
                    <Grid item>
                      <img src={postPic1.src} />
                    </Grid>
                    <Grid item className={Style.text_content}>
                      <Grid container direction="column">
                        <Grid item className={Style.titlePostWide}>
                          I’m first, this is title{" "}
                          <span className={Style.underLineGr}></span>
                        </Grid>
                        <Grid item className={Style.desk_text}>
                          Lorem ipsum dolor sit amet, conse tetur apiscing elit.
                          Volt, arcu nec risus conseq at urna nunc.
                        </Grid>
                        <Grid className={Style.p_clickBtn}>
                          <Button
                            variant="contained"
                            color="primary"
                            endIcon={<Image src={arrowRight} />}
                            className={Style.clickBtn}
                          >
                            Click
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item className={Style.learnMore}>
              <img src={questionIcon.src} className={Style.fitSvg12} />
              Learn more about{" "}
              <a href="#" className="link">
                Artwork
              </a>
            </Grid>
          </Grid>
        </Hidden>
        {/* end right side */}
      </Grid>
    </Grid>
  );
}
