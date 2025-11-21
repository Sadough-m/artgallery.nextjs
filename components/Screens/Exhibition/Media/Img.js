import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Grid, Hidden, IconButton } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Exhibition.module.css";

// gm : files ↓
import DefaultPng from "../../../../public/images/Default.png";
import FailedSupPng from "../../../../public/images/failed upload.png";
import DeleteSvg from "../../../../public/images/icons/Trash white.svg";
import MoveSvg from "../../../../public/images/icons/Move white.svg";
import MoveGraySvg from "../../../../public/images/icons/Move mobile.svg";
import ZoomSvg from "../../../../public/images/icons/Zoom white.svg";
import UploadingPng from "../../../../public/images/UploadingNew.png";
import CloseSvg from "../../../../public/images/icons/Close1.svg";

import AudioIcon from "../../../../public/images/icons/media/audioBottomIcon.svg";
import ImageIcon from "../../../../public/images/icons/media/imageBottomType.svg";
import VedioIcon from "../../../../public/images/icons/media/vedioBottomIcon.svg";
import OptionsMobile from "../../ArtWork/AddFile/OptionsMobile";

// gm : components ↓

export default function Img({ Uploading, IsSupport }) {
  // gm : states ↓

  if (Uploading) {
    return (
      <>
        {/* Desktop */}
        <Hidden smDown>
          <Grid item>
            <div className={Style.P_IMG_NotSup}>
              {/* Image */}
              <img src={UploadingPng.src} className={Style.IMG} />

              {/* Percent Upload */}
              <span className={Style.PercentUpload}>%56</span>

              {/* Cancel Upload */}
              <IconButton className={Style.CancelIcon} size="small">
                <img src={CloseSvg.src} />
              </IconButton>
            </div>
          </Grid>
        </Hidden>

        {/* Mobile */}
        <Hidden mdUp>
          <Grid item className="w_100">
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              className={Style.P_ImgMobile}
            >
              <Grid item>
                <IconButton className={Style.Move_Mobile} size="small">
                  <img src={MoveGraySvg.src} />
                </IconButton>
                <Grid item className={Style.P_PercentImg}>
                  {/* Image */}
                  <img src={UploadingPng.src} className={Style.IMG_Mobile} />

                  {/* Percent */}
                  <span className={Style.PercentMobile}>%56</span>
                </Grid>
                <input
                  type="text"
                  className={Style.Input_Mobile}
                  placeholder="Type here..."
                />
              </Grid>
              <Grid item className={Style.P_CloseMobile}>
                <IconButton>
                  <img src={CloseSvg.src}/>
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Hidden>
      </>
    );
  } else
    return (
      <>
        {IsSupport && (
          // Image Uploaded
          <>
            {/* Desktop */}
            <Hidden smDown>
              <Grid item>
                <div className={Style.P_IMG}>
                  {/* Image */}
                  <img src={DefaultPng.src} className={Style.IMG} />
                  <span className={Style.OverflowImage}></span>

                  {/* Trash Icon */}
                  <IconButton className={Style.TrashIcon}>
                    <img src={DeleteSvg.src} />
                  </IconButton>

                  {/* Move Icon */}
                  <IconButton className={Style.MoveIcon}>
                    <img src={MoveSvg.src} />
                  </IconButton>

                  {/* Zoom Icon */}
                  <IconButton className={Style.ZoomIcon}>
                    <img src={ZoomSvg.src} />
                  </IconButton>

                  <input
                    type="text"
                    className={Style.InputImage}
                    placeholder="Type here..."
                  />
                </div>
              </Grid>
            </Hidden>

            {/* Mobile */}
            <Hidden mdUp>
              <Grid item className="w_100">
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  className={Style.P_ImgMobile}
                >
                  <Grid item>
                    <IconButton className={Style.Move_Mobile} size="small">
                      <img src={MoveGraySvg.src} />
                    </IconButton>
                    <img src={DefaultPng.src} className={Style.IMG_Mobile} />
                    <input
                      type="text"
                      className={Style.Input_Mobile}
                      placeholder="Type here..."
                    />
                  </Grid>
                  <Grid item className={Style.P_OptionMobile}>
                    <OptionsMobile />
                  </Grid>
                </Grid>
              </Grid>
            </Hidden>
          </>
        )}

        {/* File Not Support : Error */}
        {!IsSupport && (
          <>
            {/* Desktop */}
            <Hidden smDown>
              <Grid item>
                <div className={Style.P_IMG_NotSup}>
                  {/* Image */}
                  <img src={FailedSupPng.src} className={Style.IMG} />

                  {/* Type Tiff */}
                  <span className={Style.Tiff}>Tiff</span>

                  {/* Type File */}
                  <img className={Style.ImgTypeFile} src={ImageIcon.src} />
                </div>
              </Grid>
            </Hidden>

            {/* Mobile */}
            <Hidden mdUp>
              <Grid item className="w_100">
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  className={Style.P_ImgMobile}
                >
                  <Grid item>
                    <IconButton className={Style.Move_Mobile} size="small">
                      <img src={MoveGraySvg.src} />
                    </IconButton>
                    <Grid item className={Style.P_PercentImg}>
                      {/* Image */}
                      <img
                        src={FailedSupPng.src}
                        className={Style.IMG_Mobile}
                      />

                      {/* Percent */}
                      <span className={Style.PercentMobile}>Tiff</span>
                    </Grid>
                    <input
                      type="text"
                      className={Style.Input_Mobile}
                      placeholder="Type here..."
                    />
                  </Grid>
                  <Grid item className={Style.P_OptionMobile}>
                    <OptionsMobile />
                  </Grid>
                </Grid>
              </Grid>
            </Hidden>
          </>
        )}
      </>
    );
}
