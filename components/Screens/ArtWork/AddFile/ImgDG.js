import React, { useState } from "react";
import Image from "next/image";

// mrx : material ui ↓
import { Grid, IconButton, Hidden, ClickAwayListener } from "@material-ui/core";

// mrx : Styles ↓
import ArtWorkFlowStyle from "../../../../styles/artworkflow.module.css";

// rmx : files  ↓
import dgImg from "../../../../public/images/dg img.png";
import Trash from "../../../../public/images/icons/Trash white.svg";
import Zoom from "../../../../public/images/icons/Zoom white.svg";
import Move from "../../../../public/images/icons/Move white.svg";
import Close from "../../../../public/images/icons/Close.svg";
import video from "../../../../public/images/icons/video-player-movie.svg";
import MoveMobile from "../../../../public/images/icons/Move mobile.svg";
import dot from "../../../../public/images/icons/3dot.svg";
import zoomMobile from "../../../../public/images/icons/Zoom mobile.svg";
import notSupPic from "../../../../public/images/not support.png";
import OptionsMobile from "./OptionsMobile";


// mrx : components ↓

export default function ImgDG({
  uploading = true,
  notSup = false,
  center = true,
}) {
  const [Deleted, setDeleted] = useState(false);
  const [typeFile, setTypeFile] = useState("TIFF");

  // delete image
  const handleDeleted = () => {
    setDeleted(true);
  };

  
  if (notSup) {
    return (
      <>
        {!Deleted && (
          <>
            {/* for desktop (design in mobile and pc is too deffrent) */}
            <Hidden smDown>
              <Grid item className={ArtWorkFlowStyle.P_img}>
                <Image src={notSupPic} />

                <Grid item className={` ${ArtWorkFlowStyle.p_typeImg}`}>
                  {typeFile}
                </Grid>

                {/* audio or play ... */}
                <Grid
                  item
                  className={
                    center
                      ? ArtWorkFlowStyle.imgInsideImgModal
                      : ArtWorkFlowStyle.imgleftInsideModal
                  }
                >
                  <Image src={video} />
                </Grid>

                {/* mint */}
                {/* <span
                  item
                  className={`${ArtWorkFlowStyle.p_img_all} ${ArtWorkFlowStyle.p_trashIcon_2}`}
                >
                  <IconButton size="small" onClick={() => handleDeleted()}>
                    <Image src={Trash} />
                  </IconButton>
                </span> */}

                {/* delete */}
                <Grid
                  item
                  className={`${ArtWorkFlowStyle.p_img_all} ${ArtWorkFlowStyle.p_trashIcon_2}`}
                >
                  <IconButton size="small" onClick={() => handleDeleted()}>
                    <Image src={Trash} />
                  </IconButton>
                </Grid>

                {/* zoom */}
                <Grid
                  item
                  className={`${ArtWorkFlowStyle.p_img_all} ${ArtWorkFlowStyle.p_ZoomIcon_2}`}
                >
                  <IconButton>
                    <Image src={Zoom} />
                  </IconButton>
                </Grid>

                {/* move */}
                <Grid
                  item
                  className={`${ArtWorkFlowStyle.p_img_all} ${ArtWorkFlowStyle.p_MoveIcon_2}`}
                >
                  <IconButton size="small">
                    <Image src={Move} />
                  </IconButton>
                </Grid>
              </Grid>
            </Hidden>

            {/* for mobile */}
            <Hidden mdUp>
              <Grid container direction="column" style={{ marginLeft: "10px" }}>
                <Grid item>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Grid container alignItems="center" spacing={2}>
                        <Grid item>
                          <Image src={MoveMobile} />
                        </Grid>
                        <Grid item>
                          <Image
                            src={notSupPic}
                            className={ArtWorkFlowStyle.borderRadius6}
                            width={"135px"}
                            height={"64px"}
                          />
                        </Grid>
                        <Grid item>
                          <Grid container direction="column">
                            <Grid item className={ArtWorkFlowStyle.info_img1}>
                              1480 x 900
                            </Grid>
                            <Grid item className={ArtWorkFlowStyle.info_img1}>
                              Jpeg
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <OptionsMobile />
                  </Grid>
                </Grid>
              </Grid>
            </Hidden>
          </>
        )}
      </>
    );

    // uploaded
  } else if (!uploading)
    return (
      <>
        {!Deleted && (
          <>
            <Hidden smDown>
              <Grid item className={ArtWorkFlowStyle.P_img}>
                <Image src={dgImg} className={ArtWorkFlowStyle.imgUp} />
                <Grid
                  item
                  className={`${ArtWorkFlowStyle.p_img_all} ${ArtWorkFlowStyle.p_trashIcon_2}`}
                >
                  <IconButton size="small" onClick={() => handleDeleted()}>
                    <Image src={Trash} />
                  </IconButton>
                </Grid>
                <Grid
                  item
                  className={`${ArtWorkFlowStyle.p_img_all} ${ArtWorkFlowStyle.p_ZoomIcon_2}`}
                >
                  <IconButton>
                    <Image src={Zoom} />
                  </IconButton>
                </Grid>
                <Grid
                  item
                  className={`${ArtWorkFlowStyle.p_img_all} ${ArtWorkFlowStyle.p_MoveIcon_2}`}
                >
                  <IconButton size="small">
                    <Image src={Move} />
                  </IconButton>
                </Grid>
                <Grid
                  item
                  className={`${ArtWorkFlowStyle.p_img_all} ${ArtWorkFlowStyle.p_typeImg}`}
                >
                  {typeFile}
                </Grid>
                <Grid
                  item
                  className={`${ArtWorkFlowStyle.p_img_all} ${ArtWorkFlowStyle.p_sizeImg}`}
                >
                  1480 x 900
                </Grid>
              </Grid>
            </Hidden>

            {/* for mobile */}
            <Hidden mdUp>
              <Grid container direction="column" style={{ marginLeft: "10px" }}>
                <Grid item>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Grid container alignItems="center" spacing={2}>
                        <Grid item>
                          <Image src={MoveMobile} />
                        </Grid>
                        <Grid item>
                          <Image
                            src={dgImg}
                            className={ArtWorkFlowStyle.borderRadius6}
                            width={"135px"}
                            height={"64px"}
                          />
                        </Grid>
                        <Grid item>
                          <Grid container direction="column">
                            <Grid item className={ArtWorkFlowStyle.info_img1}>
                              1480 x 900
                            </Grid>
                            <Grid item className={ArtWorkFlowStyle.info_img1}>
                              Jpeg
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <OptionsMobile />
                  </Grid>
                </Grid>
              </Grid>
            </Hidden>
          </>
        )}
      </>
    );
  // uploading
  else
    return (
      <>
        <Hidden smDown>
          <Grid item className={ArtWorkFlowStyle.P_img_uploaded}>
            <Image src={dgImg} className={ArtWorkFlowStyle.imgUploading} />

            <Grid item className={ArtWorkFlowStyle.Percent_uploaded}>
              %56
            </Grid>
            <Grid item className={` ${ArtWorkFlowStyle.p_typeImg}`}>
              Jpeg
            </Grid>
            <Grid item className={` ${ArtWorkFlowStyle.closeIcon}`}>
              <IconButton size="small">
                <Image src={Close} />
              </IconButton>
            </Grid>
          </Grid>
        </Hidden>

        {/* for mobile */}
        <Hidden mdUp>
          <Grid container direction="column" style={{ marginLeft: "10px" }}>
            <Grid item>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item >
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item>
                      <Image src={MoveMobile} />
                    </Grid>
                    <Grid item>
                      <Image
                        src={dgImg}
                        className={ArtWorkFlowStyle.imgUploading}
                        width={"135px"}
                        height={"64px"}
                      />
                    </Grid>
                    <Grid item >
                      <Grid container direction="column">
                        <Grid item className={ArtWorkFlowStyle.info_img1}>
                          1480 x 900
                        </Grid>
                        <Grid item className={ArtWorkFlowStyle.info_img1}>
                          Jpeg
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <OptionsMobile />
               
              </Grid>
            </Grid>
          </Grid>
        </Hidden>

        
      </>
    );
}
