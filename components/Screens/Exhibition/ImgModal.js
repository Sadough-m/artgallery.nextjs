import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Grid, Hidden, IconButton } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../styles/Exhibition.module.css";

// gm : files ↓
import DefaultPng from "../../../public/images/Default.png";
import FailedSupPng from "../../../public/images/failed upload.png";
import DeleteSvg from "../../../public/images/icons/Trash white.svg";
import MoveSvg from "../../../public/images/icons/Move white.svg";
import MoveGraySvg from "../../../public/images/icons/Move mobile.svg";
import ZoomSvg from "../../../public/images/icons/Zoom white.svg";
import UploadingPng from "../../../public/images/UploadingNew.png";
import CloseSvg from "../../../public/images/icons/Close1.svg";
import LockPng from "../../../public/images/LockIcon.png";
import AudioPng from "../../../public/images/Audio.png";

import AudioIcon from "../../../public/images/icons/media/audioBottomIcon.svg";
import ImageIcon from "../../../public/images/icons/media/imageBottomType.svg";
import VedioIcon from "../../../public/images/icons/media/vedioBottomIcon.svg";

// gm : components ↓

export default function ImgModal({
  Uploading,
  IsSupport,
  HaveMiddleIcon,
  HaveLeftIcon ,
  Mg_Right = "10px",

}) {
  // gm : states ↓

  if (Uploading) {
    return (
      <Grid item className={Style.ImgModal}>
        <div
          className={Style.P_IMG_NotSup_Modal}
          style={{ marginRight: Mg_Right }}
        >
          {/* Image */}
          <img src={UploadingPng.src} className={Style.IMG_Modal} />

          {/* Percent Upload */}
          <span className={Style.PercentUpload}>%56</span>

          {/* Cancel Upload */}
          <IconButton className={Style.CancelIcon} size="small">
            <img src={CloseSvg.src} />
          </IconButton>
        </div>
      </Grid>
    );
  } else
    return (
      <>
        {IsSupport && (
          // Image Uploaded

          <Grid item className={Style.ImgModal}>
            <div
              className={Style.P_IMG_Modal}
              style={{ marginRight: Mg_Right }}
            >
              {/* Image */}
              <img src={DefaultPng.src} className={Style.IMG_Modal} />
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

              {/* Extra Icon */}
              {HaveMiddleIcon && (
                <img src={LockPng.src} className={Style.IconMiddle} />
              )}
              {HaveLeftIcon && (
                <img src={AudioPng.src} className={Style.IconDownLeft} />
              )}


            </div>
          </Grid>
        )}

        {/* File Not Support : Error */}
        {!IsSupport && (
          <Grid item className={Style.ImgModal}>
            <div
              className={Style.P_IMG_NotSup_Modal}
              style={{ marginRight: Mg_Right }}
            >
              {/* Image */}
              <img src={FailedSupPng.src} className={Style.IMG_Modal} />

              {/* Type Tiff */}
              <span className={Style.Tiff}>Tiff</span>

              {/* Type File */}
              <img className={Style.ImgTypeFile} src={ImageIcon.src} />

              {/* Extra Icon */}
              {HaveMiddleIcon && (
                <img src={LockPng.src} className={Style.IconMiddle} />
              )}
              {HaveLeftIcon && (
                <img src={AudioPng.src} className={Style.IconDownLeft} />
              )}

            </div>
          </Grid>
        )}
      </>
    );
}
